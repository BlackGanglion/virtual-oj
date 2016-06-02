'use strict';

import amqp from 'amqplib/callback_api';
import logger from '../../init/log';
import { getFromQueue } from '../../init/rabbitMQ';
import getHDOJProblemContent from '../HDOJ/result';
import getPOJProblemContent from '../POJ/result';

getFromQueue('problem', function(item){
  //console.log(item.pid);

  if(typeof item === 'object' && item.pid) {
    switch(item.ojid) {
      case 0: {
        getHDOJProblemContent(item);
        break;
      }
      case 1: {
        getPOJProblemContent(item);
        break;
      }
      default: {
        console.log('error');
      }
    }

  }
});
