'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import ProblemSubmit from './OJcrawler/HDOJ/problem';
const thunkify = require('thunkify');

/*
var Router = require('koa-66');
var Controller = require('./router');
var mountRouter = new Router();

mountRouter.mount('/', Controller.router);
app.use(mountRouter.routes());
*/

const app = new Koa();
const router = new Router();

const sayHi = async (ctx) => {
  const Submit = thunkify(ProblemSubmit);
  let res = await Submit(1257);
  console.log(res.toString());
  ctx.body = 'Hello World';
};

router.get('/', sayHi);


app.use(router.routes());

if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`✅  Listening on port ${port}...`));
}
