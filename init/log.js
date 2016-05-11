'use strict';

import log4js from 'log4js';
import { logConfig, globalConfig } from '../config';

log4js.configure({
  appenders: [{
    type: 'file',
    filename: globalConfig.path + '/' + logConfig.filename,
    maxLogSize: logConfig.maxLogSize,
    category: logConfig.category
  }]
});

let logger = log4js.getLogger(logConfig.category);

export default logger;
