/**
 * main函数抛出错误，被handler函数捕获。catch代码块里面使用ctx.app.emit()手动释放error事件，才能让监听函数监听到。
 */

const Koa = require('koa');
const app = new Koa();


const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
};

const main = ctx => {
  ctx.response.body = '<p>收拾收拾</p>';
  ctx.throw(500)

};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});
app.use(handler);
app.use(main);

app.listen(3000);