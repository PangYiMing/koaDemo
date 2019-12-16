/**
 * 无反应
 */
const Koa = require('koa');
const app = new Koa();
const path = require("path");
const render = require("koa-ejs");
const viewDir = path.join(__dirname, "views");
console.log(viewDir)

render(app, {
  root: viewDir,
  layout: 'aaa',
  viewExt: "html",
  cache: true,
});
app.use(async ctx => {
  // ctx.status = 200;

  // ctx.response.remove('Content-Type');
  // ctx.response.remove('Content-Length');
  // ctx.body = "hello world";
  ctx.res.writeHead(200, {
    'xxxxxxx': 'text/plain'
  });
  await ctx.render('aaa')
  // console.log(ctx.query && ctx.query["gray-version"])

});

app.listen(3000);