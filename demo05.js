/**
 * koa-route 根据path分配内容
 * 重定向
 */

const Koa = require("koa");
const router = require("koa-route");
const app = new Koa();

const main = ctx => {
  ctx.response.type = "html";
  const { host } = ctx;
  console.log("host", host, "ctx:", ctx.path);
  // console.log(
  //   `${Date.now()}${ctx.path} :_____ ${ctx.request.method} ${ctx.request.url}`
  // );
  ctx.response.body = '<a href="/other">Index Page</a>';
};
const other = ctx => {
  ctx.response.body = "other";
};
const redirect = ctx => {
  ctx.response.redirect("/ss");
  ctx.response.body = '<a href="/">Index Page</a>';
};
const ss = ctx => {
  ctx.response.body = "ss";
};

app.use(router.get("/", main));
app.use(router.get("/other", other));
app.use(router.get("/ss", ss));
app.use(router.get("/redirect", redirect));
app.use(router.get("*", main));
app.listen(3000);
