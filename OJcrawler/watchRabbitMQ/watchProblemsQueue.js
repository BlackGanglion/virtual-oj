'use strict';

import amqp from 'amqplib/callback_api';
import logger from '../../init/log';
import { getFromQueue } from '../../init/rabbitMQ';
import getProblemContent from '../HDOJ/result';

getFromQueue('problem', function(item){
  console.log(item.pid);

  if(typeof item === 'object' && item.tableName && item.pid) {
    getProblemContent(item);
  }
});
