'use strict';

import superagent from 'superagent';
import cheerio from 'cheerio';
import url from 'url';

let getProblemContent = function(item) {
  let problemUrl = item.problemUrl;

  superagent.get(problemUrl)
            .end(function(err, res) {
              if(err) throw err;

              let pattern = /Time Limit:<\/b>\s+(\d+)MS<\/td><td width=\"10px\"><\/td><td><b>Memory Limit:<\/b>\s+(\d+)K/g;
              let patternRes = pattern.exec(res.text);

              let $ = cheerio.load(res.text);

              let ptx = $('.ptx');
              let ptxCount = ptx.length;
              let sio = $('.sio');

              const content = {
                title: $('.ptt').text(),
                timelimit: patternRes[1],
                memorylimit: patternRes[2],
                description: ptx.eq(0).text(),
                input: ptx.eq(1).text(),
                output: ptx.eq(2).text(),
                sampleinput: sio.eq(0).text(),
                sampleoutput: sio.eq(1).text(),
                hint: '',
                source: ptx.eq(ptxCount - 1).children('a').text()
              };

              console.log(content);
          });

}

getProblemContent({
  "ojid": 1,
  "pid": "1087",
  "problemUrl": "http://poj.org/problem?id=1087"
});


