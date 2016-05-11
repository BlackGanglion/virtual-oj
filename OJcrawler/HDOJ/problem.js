'use strict';

import connection from '../../init/database';
import { OJList } from '../../config';
import logger from '../../init/log';
import { addToQueue } from '../../init/rabbitMQ';
import async from 'async';

const HdojConfig = OJList[0];

export default function(pid) {
  let info = {
    ojid: HdojConfig.ojid,
    problemUrl: HdojConfig.problemUrl + pid,
    tableName: HdojConfig.tableName
  };

  async.auto({
    addToDataBase: function(callback) {
      connection.query("INSERT INTO ?? SET pid = ?, status = 0;", [info.tableName, pid], function(err){
        callback(err, null);
      })
    },
    addToQueue: ['addToDataBase', function(callback, res) {
      addToQueue('problem', info, function(){
        callback(null, null);
      });
    }]
  }, function(err, res) {
    if(err !== null) {
      logger.error(err);
    }
    connection.end();
  });

}
