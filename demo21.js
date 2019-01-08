/**
 * new promise
 */

const Koa = require('koa');
const app = new Koa();
const test = require('./demo21/proxy')


app.use(async ctx => {
    await test()
});

app.listen(3000);