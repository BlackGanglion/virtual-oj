import express from'express';
const app = express();

import ProblemSubmit from './OJcrawler/HDOJ/problem';

app.get('/:oj/:pid', function (req, res) {
  let oj = req.params.oj;
  let pid = req.params.pid;

  ProblemSubmit(pid, function(ans) {
    res.json(ans);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  Listening on port ${port}...`));
