'use strict';

import superagent from 'superagent';
import charset from 'superagent-charset';
import cheerio from 'cheerio';
import url from 'url';
import connection from '../../init/database';

let getProblemContent = function(item) {
  let problemUrl = item.problemUrl;

  charset(superagent);

  superagent.get(problemUrl)
            .charset('gb2312')
            .end(function(err, res) {
              if(err) throw err;

              let pattern = /Time Limit:\s+(\d+)\/(\d+)\sMS.*Memory Limit:\s+(\d+)\/(\d+)\sK/g;
              let patternRes = pattern.exec(res.text);

              let $ = cheerio.load(res.text);
              let panelContent = $('.panel_content');

              let sampleoutputWithHint = panelContent.eq(4).text().split('Hint');

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
                hint: connection.escape(typeof sampleoutputWithHint[1] === 'undefined' ? '' : sampleoutputWithHint[1])
              };

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
