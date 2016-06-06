'use strict';

import superagent from 'superagent';
import cheerio from 'cheerio';
import url from 'url';
import connection from '../../../init/database';

let getProblemContent = function(item) {
  let problemUrl = item.problemUrl + item.pid;

  superagent.get(problemUrl)
            .end(function(err, res) {
              if(err) throw err;

              let pattern = /Time Limit:\s+<\/font>\s+(\d+)[\s\S]*Memory Limit:\s+<\/font>\s+(\d+)/g;
              let patternRes = pattern.exec(res.text);

              let input = /[^\w]\sInput<\/b><br>[\s\S]*?<br>([\s\S]*?)<\/p>/g;
              let inputRes = input.exec(res.text);

              let $ = cheerio.load(res.text);
              let panelContent = $('p');
              let title = $('.bigProblemTitle').text();

              const content = {
                title,
                timelimit: patternRes[1] * 1000,
                memorylimit: patternRes[2],
                description: panelContent.eq(0).text(),
                // input: inputRes[1],
                output: panelContent.eq(2).text().replace("\n  Output\n  \n  ", ""),
                sampleinput: panelContent.eq(3).text().replace("\n  Sample Input\n  \n  ", ""),
                sampleoutput: panelContent.eq(4).text().replace("\n  Sample Output\n  \n  ", "")
              };

              console.log(content);

              /*
              let pattern = /Time Limit:\s+(\d+)\/(\d+)\sMS.*Memory Limit:\s+(\d+)\/(\d+)\sK/g;
              let patternRes = pattern.exec(res.text);

              let $ = cheerio.load(res.text);
              let panelContent = $('.panel_content');

              let sampleoutputWithHint = panelContent.eq(4).text().split('Hint');

              console.log(panelContent.eq(5).children('a').text());
              */

              /*
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

              console.log(content.source);

              let query = `UPDATE ${item.tableName} SET
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
                           WHERE pid = ${item.pid}`;

              connection.query( query, function(err, rows) {
                                         if(err) {
                                          console.log('error ' + item.pid + ' ' + content.title);
                                          throw err;
                                        }

              console.log('success ' + item.pid + ' ' + content.title);
            });
              */
            connection.end();
          });

}

getProblemContent({
  "ojid": 2,
  "pid": "3927",
  "problemUrl": "http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode="
});


