'use strict';

import connection from '../../init/database';
import { OJList } from '../../config';
import logger from '../../init/log';
import { addToQueue } from '../../init/rabbitMQ';
import async from 'async';

const hdojConfig = OJList[0];

let getProblemCache = function(hdojInfo, callback) {
  connection.query('SELECT * FROM ?? WHERE pid = ?', [hdojInfo.tableName, hdojInfo.pid], function(err, rows, fields) {
    if (err) throw err;
    callback(rows[0]);
  });
}

export default function(pid, callback) {
  let hdojInfo = {
    ojid: hdojConfig.ojid,
    pid: pid,
    problemUrl: hdojConfig.problemUrl + pid,
    tableName: hdojConfig.tableName
  }

  getProblemCache(hdojInfo, function(res){
    if(typeof res === 'undefined') {
      async.auto({
        addToDataBase: function(callback) {
          connection.query("INSERT INTO ?? SET pid = ?, status = 0;", [hdojInfo.tableName, pid], function(err){
            callback(err, null);
          });
        },
        addToQueue: ['addToDataBase', function(callback, res) {
          addToQueue('problem', hdojInfo, function(){
            callback(null, null);
          });
        }]
      }, function(err, res) {
        if(err !== null) {
          logger.error(err);
          callback({ info: 'some error' });
        }
        callback({ info: 'success' });
      });
    } else {
      callback({
        info: 'getCache',
        ...res
      });
    }
  });
}
