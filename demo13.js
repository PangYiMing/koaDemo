/**
 * 读取https中的键值对
 * curl -i http://localhost:3000/users -d "name=test"
 * curl -X POST --data "name=Jack" 127.0.0.1:3000
 */

const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(koaBody());
app.use(main);

app.listen(3000);