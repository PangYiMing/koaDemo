/**
 * 抛出错误给前端
 */
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.use(main);

app.listen(3000);