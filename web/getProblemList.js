'use strict';

import connection from '../init/database';
import _ from 'lodash';

export default function getProblemList(query, callback) {
  const ojid = query.ojid;
  const timeOrder = query.time;
  const pidOrder = query.pid;

  if(_.isEmpty(ojid)) {
    connection.query('SELECT * FROM problem ORDER BY time desc', function(err, rows, fields) {
      if (err) throw err;
      callback(rows);
    });
    // connection.end();
  } else {

  }
}
