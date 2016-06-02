'use strict';

import connection from '../../init/database';
import { OJList } from '../../config';
import logger from '../../init/log';
import { addToQueue } from '../../init/rabbitMQ';
import async from 'async';

const pojConfig = OJList[1];

let getProblemCache = function(pojInfo, callback) {
  connection.query('SELECT * FROM problem WHERE ojid = ? AND pid = ?',
    [pojInfo.ojid, pojInfo.pid], function(err, rows, fields) {
    if (err) throw err;
    callback(rows[0]);
  });
}

export default function(pid, callback) {
  let pojInfo = {
    ojid: pojConfig.ojid,
    pid: pid,
    problemUrl: pojConfig.problemUrl + pid
  }

  getProblemCache(pojInfo, function(res){
    if(typeof res === 'undefined') {
      async.auto({
        addToDataBase: function(callback) {
          connection.query("INSERT INTO problem SET ojid = ?, pid = ?, status = 0;",
            [pojInfo.ojid, pid], function(err){
            callback(err, null);
          });
        },
        addToQueue: ['addToDataBase', function(callback, res) {
          addToQueue('problem', pojInfo, function(){
            callback(null, null);
          });
        }]
      }, function(err, res) {
        if(err !== null) {
          logger.error(err);
          callback({
            code: 1,
            error: 'some error',
            body: {}
          });
        }
        callback({
          code: 0,
          error: '',
          body: {
            isFetchPro: true,
            data: [{
              ojid: pojInfo.ojid,
              pid: pojInfo.pid,
              title: '',
              time: '',
              source: '',
              status: 0
            }]
          }
        })
      });
    } else {
      let isFetchPro = false;
      if(res.status === 0) isFetchPro = true;
      callback({
        code: 0,
        error: '',
        body: {
          isFetchPro,
          data: [{
            ...res,
            title: unescape(res.title),
            description: unescape(res.description),
            input: unescape(res.input),
            output: unescape(res.output),
            sampleinput: unescape(res.sampleinput),
            sampleoutput: unescape(res.sampleoutput),
            hint: unescape(res.hint),
            source: unescape(res.source)
          }]
        }
      });
    }
  });
}
