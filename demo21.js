/**
 * new promise
 */

const Koa = require('koa');
const app = new Koa();
const test = require('./demo21/proxy')


app.use(async ctx => {
  await test()
});
// var rp = require('request-promise');
// const koaBody = require('koa-body');
// app.use(koaBody());
// app.use(ctx => {
//   ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
// });
app.listen(3000);