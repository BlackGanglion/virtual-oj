'use strict';

var Koa = require('koa');
var app = new Koa();
var Router = require('koa-66');
var Controller = require('./router');
var mountRouter = new Router();

mountRouter.mount('/', Controller.router);
app.use(mountRouter.routes());

app.listen(3000);
