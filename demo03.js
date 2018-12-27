/**
 * 返回给用户的网页往往都写成模板文件
 */
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const main = async ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./res/test.html');
};

app.use(main);
app.listen(3000);