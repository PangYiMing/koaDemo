/**
 * 中间件 next
 */

const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
}

// 中间件如果没有next就会停止向下传递
const two = (ctx, next) => {
    console.log('>> two');
    next();
    console.log('<< two');
}

const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);