'use strict';

const Router = require('koa-66');
const router = new Router();
const thunkify = require('thunkify');

import ProblemSubmit from './OJcrawler/HDOJ/problem';

const Submit = thunkify(ProblemSubmit);

router.get('/:oj/:id', (ctx, next) => {
  return next().then(() => {
    let oj = ctx.params.oj;
    let id = ctx.params.id;
    /*
    ProblemSubmit(id, function(res){
      ctx.body = JSON.stringify(res);
    });
    */

    let flow = function* (){
      console.log('Submit');


      let res = yield Submit(id);
      console.log(res);
    }

    let generator = flow();
    let res = generator.next();
    ctx.body = JSON.stringify(res);
  });
});

export {router};
