'use strict';

import superagent from 'superagent';
import cheerio from 'cheerio';
import url from 'url';

let getProblemContent = function(item) {
  let problemUrl = item.problemUrl;

  superagent.get(problemUrl)
            .end(function(err, res) {
              if(err) throw err;

              let $ = cheerio.load(res.text);

              //let title = $('.ptt').text();

              console.log(res.text);

              /*
              const content = {
                title: $('.ptt').text(),
                timelimit: patternRes[1],
                memorylimit: patternRes[3],
                description: connection.escape(panelContent.eq(0).text()),
                specialjudge: $('font[color=red]').text() === '' ? 0 : 1,
                input: connection.escape(panelContent.eq(1).text()),
                output: connection.escape(panelContent.eq(2).text()),
                sampleinput: connection.escape(panelContent.eq(3).text()),
                sampleoutput: connection.escape(sampleoutputWithHint[0]),
                hint: connection.escape(typeof sampleoutputWithHint[1] === 'undefined' ? '' : sampleoutputWithHint[1]
              };

              let pattern = /Time Limit:\s+(\d+)\/(\d+)\sMS.*Memory Limit:\s+(\d+)\/(\d+)\sK/g;
              let patternRes = pattern.exec(res.text);


              let panelContent = $('.panel_content');

              let sampleoutputWithHint = panelContent.eq(4).text().split('Hint');

              console.log(panelContent.eq(5).children('a').text());


              const content = {
                title: connection.escape($('h1').text()),
                timelimit: patternRes[1],
                memorylimit: patternRes[3],
                description: connection.escape(panelContent.eq(0).text()),
                specialjudge: $('font[color=red]').text() === '' ? 0 : 1,
                input: connection.escape(panelContent.eq(1).text()),
                output: connection.escape(panelContent.eq(2).text()),
                sampleinput: connection.escape(panelContent.eq(3).text()),
                sampleoutput: connection.escape(sampleoutputWithHint[0]),
                hint: connection.escape(typeof sampleoutputWithHint[1] === 'undefined' ? '' : sampleoutputWithHint[1]
              };
              */
          });

}

getProblemContent({
  "ojid": 1,
  "pid": "1087",
  "problemUrl": "http://poj.org/problem?id=1087"
});


