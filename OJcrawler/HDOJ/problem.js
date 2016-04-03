'use strict';

import connection from '../../init/database';
import { OJList } from '../../config';
import logger from '../../init/log';
import { addToQueue } from '../../init/rabbitMQ';

const HdojConfig = OJList[0];

export default function(pid) {
  let info = {
    ojid: HdojConfig.ojid,
    problemUrl: HdojConfig.problemUrl + pid,
    tableName: HdojConfig.tableName
  };

  addToQueue('problem', info, function(){
    connection.end();
  });
}
