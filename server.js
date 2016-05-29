import express from 'express';
const app = express();

import HDOJProblemSubmit from './OJcrawler/HDOJ/problem';
import getProblemList from './web/getProblemList';

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/*
列表页面
有hash参数，ojid，筛选出该oj所有题目，
按时间(0不排序，1升序，-1降序)，按pid排序
*/
app.get('/problem', function (req, res) {
  getProblemList(req.query, function(ans) {
    res.json(ans);
  });
});

app.get('/:oj/:pid', function (req, res) {
  let oj = req.params.oj;
  let pid = req.params.pid;

  switch(oj) {
    case 'HDOJ': {
      HDOJProblemSubmit(pid, function(ans) {
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
