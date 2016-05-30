'use strict';

import connection from '../init/database';
import _ from 'lodash';

export default function getProblemList(OJid, callback) {
  connection.query('SELECT * FROM problem WHERE ojid = ? ORDER BY time desc', [ OJid ], function(err, rows, fields) {
    if(err) {
      callback({
        code: 1,
        error: err
      })
    } else {
      let isFetchPro = false;
      let res = rows.map(function(e, i) {
        if(!e.status) isFetchPro = true;
        return {
          ...e,
          title: unescape(e.title),
          description: unescape(e.description),
          input: unescape(e.input),
          output: unescape(e.output),
          sampleinput: unescape(e.sampleinput),
          sampleoutput: unescape(e.sampleoutput),
          hint: unescape(e.hint),
          source: unescape(e.source)
        }
      })
      callback({
        code: 0,
        error: '',
        body: {
          isFetchPro,
          data: res
        }
      });
    }
  });
}
