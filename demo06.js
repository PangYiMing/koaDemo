/**
 * 静态目录
 */

const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
const app = new Koa();
console.log(__dirname);
const main = serve(path.join(__dirname + "/res"));
app
  .use(async (ctx, next) => {
    ctx.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "version",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    });
    await next();
  })
  .use(main);
app.listen(3000);
