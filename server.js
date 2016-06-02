import express from 'express';
import _ from 'lodash';
const app = express();

import HDOJProblemSubmit from './OJcrawler/HDOJ/problem';
import POJProblemSubmit from './OJcrawler/POJ/problem';
import getProblemList from './web/getProblemList';
import getProblem from './web/getProblem';

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/pro', function (req, res) {
  if(_.isEmpty(req.query.OJId) || _.isEmpty(req.query.pid)) {
    res.json({
      code: 1,
      error: '请求参数有误',
      body: {}
    })
  } else {
    getProblem(req.query, function(ans) {
      res.json(ans);
    });
  }
})

app.get('/problem', function (req, res) {
  // 根据query参数进行判断
  if(_.isEmpty(req.query)) {
    res.json({
      code: 1,
      error: '请求参数有误',
      body: {}
    })
  } else {
    if(_.isEmpty(req.query.searchPid)) {
      getProblemList(req.query.OJId, function(ans) {
        res.json(ans);
      });
    } else {
      switch(req.query.OJId) {
        case '0': {
          HDOJProblemSubmit(req.query.searchPid, function(ans) {
            res.json(ans);
          });
          break;
        }
        case '1': {
          POJProblemSubmit(req.query.searchPid, function(ans) {
            res.json(ans);
          });
          break;
        }
        default: {
          res.json({
            code: 1,
            error: '请求参数有误, 请检查',
            body: {}
          });
        }
      }
    }
  }
});


// 测试接口
app.get('/:oj/:pid', function (req, res) {
  let oj = req.params.oj;
  let pid = req.params.pid;

  switch(oj) {
    case '0': {
      HDOJProblemSubmit(pid, function(ans) {
        res.json(ans);
      });
      break;
    }
    case '1': {
      POJProblemSubmit(pid, function(ans) {
        res.json(ans);
      });
      break;
    }
    default: {
      res.json({
        error: '请求参数有误, 请检查'
      });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  Listening on port ${port}...`));
