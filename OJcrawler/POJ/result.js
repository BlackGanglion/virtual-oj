'use strict';

import superagent from 'superagent';
import charset from 'superagent-charset';
import cheerio from 'cheerio';
import url from 'url';
import connection from '../../init/database';

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
                title: escape($('.ptt').text()),
                timelimit: patternRes[1],
                memorylimit: patternRes[2],
                description: escape(ptx.eq(0).text()),
                specialjudge: 0,
                input: escape(ptx.eq(1).text()),
                output: escape(ptx.eq(2).text()),
                sampleinput: escape(sio.eq(0).text()),
                sampleoutput: escape(sio.eq(1).text()),
                hint: '',
                source: escape(ptx.eq(ptxCount - 1).children('a').text())
              };

              let time = new Date().getTime();

              let query = `UPDATE problem SET
                           title = "${content.title}",
                           timelimit = ${content.timelimit},
                           memorylimit = ${content.memorylimit},
                           description = "${content.description}",
                           specialjudge = ${content.specialjudge},
                           input = "${content.input}",
                           output = "${content.output}",
                           sampleinput = "${content.sampleinput}",
                           sampleoutput = "${content.sampleoutput}",
                           hint = "${content.hint}",
                           source = "${content.source}",
                           time = "${time}",
                           status = 1
                           WHERE ojid = ${item.ojid} AND
                                 pid = ${item.pid}`;

              connection.query( query, function(err, rows) {
                                         if(err) {
                                          console.log('error ' + item.pid + ' ' + content.title);
                                          throw err;
                                        }

              console.log('success ' + item.pid + ' ' + content.title);
            });
            // connection.end();
          });

}

export default getProblemContent;
