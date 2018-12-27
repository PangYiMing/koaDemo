/**
 * 根据path分配内容
 */
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  if (ctx.request.path === '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/a">Go Other Page</a>';
  } else {
    ctx.response.body = 'other'
  }
};

app.use(main);
app.listen(3000);