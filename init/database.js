'use strict';

import mysql from 'mysql';
import { mysqlConfig } from '../config';
import logger from './log';

let connection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});

connection.connect(function(err) {
  if (err) {
    logger.error('mysql error connecting: ' + err.stack);
    return;
  }
  //logger.debug('mysql connect success as id ' + connection.threadId);
});

export default connection;
