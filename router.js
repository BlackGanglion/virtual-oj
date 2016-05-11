'use strict';

const Router = require('koa-66');
const router = new Router();

import ProblemSubmit from './OJcrawler/HDOJ/problem';

router.get('/:oj/:id', (ctx, next) => {
  return next().then(() => {
    var oj = ctx.params.oj;
    var id = ctx.params.id;
    ProblemSubmit(id);
  });
});

export {router};
