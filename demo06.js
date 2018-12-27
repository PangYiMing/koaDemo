/**
 * 静态目录
 */

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const app = new Koa();
console.log(__dirname)
const main = serve(path.join(__dirname+'/res'));
app.use(main);
app.listen(3000);
