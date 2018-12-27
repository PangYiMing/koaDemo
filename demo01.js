/**
 * 无反应
 */
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.status = 304;
  // ctx.response.remove('Content-Type');
  // ctx.response.remove('Content-Length');
  // ctx.body = "hello world";
});

app.listen(3000);