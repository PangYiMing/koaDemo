/**
 * redis 基础
 * 存储与读取
 */
const Koa = require("koa");
const router = require("koa-route");
const app = new Koa();
const redis = require('redis');

var client = redis.createClient(6379, 'localhost');

Object.prototype.toString = function () {
  return JSON.stringify(this)
}

const redisOfZADD = 'zadd'
const redisOfZREM = 'zrem'
const redisOfZRANGE = 'zrange'
const redisOfSET = 'set'
const redisOfGET = 'get'
const redisOfGETPARRENT = 'get*'
let aArray = [redisOfZADD, redisOfZREM, redisOfZRANGE, redisOfSET, redisOfGET, redisOfGETPARRENT]
function getFunFromName(name) {
  let key
  switch (name) {
    case redisOfZADD:
      key = 'add'
      client.zadd(key, 1, ' _ID2USERINFO + _id', function (err, result) {
        client.expire(key, 3 * 24 * 60 * 60)
        console.log(`redisZadd try err: ${err} , result: ${result}`)
      })
      break;
    case redisOfZREM:
      key = 'add'
      value = ' _ID2USERINFO + _id'
      client
        .zrem(key, value, (err, data) => {
          console.log(`client zrem ${key} v:${value} try err: ${err} , data : ${data}`)
        })
      break;
    case redisOfZRANGE:
      key = 'add'
      client.zrange(key, 0, -1, 'WITHSCORES', (err, data) => {
        console.log(`client zrange ${key} try err: ${err} , data : ${data}`, data)
      })
      break;
    case redisOfSET:
      // 存储
      client.set('hello1', 'this is a value12', function (err, result) {
        console.log(err, result);
      })
      break;
    //这种方式已经废弃了
    //client.set('hello', { a: 1, b: 2 })
    case redisOfGET:
      // 读取
      key = 'hello'
      client.get('hello', function (err, result) {
        console.log(`redis get ${key} err: ${err}, value: ${result}`)
      })
      break;
    case redisOfGETPARRENT:
      // 读取
      key = 'hell*'
      client.keys(key, (err, result) => {
        console.log(`redis keys ${key} err: ${err}, value: ${JSON.stringify(result)}`)
        client.mget(result, (error, value) => {
          console.log(`redis mget ${JSON.stringify(result)} err: ${error}, value: ${JSON.stringify(value)}`)
        })
      })
      break;
    default:
      break;
  }
}

function getHref() {
  return (
    `<div>
      ${`${aArray.map((ele) => {
      return `<div><a href="/${ele}">${ele}</a></div>`
    })}`.replace(/>,</g, '><')}
    <div><a href="/main">main</a></div>
    </div>`
  )
}
aArray.map((ele) => {
  app.use(router.get(`/${ele}`, ctx => {
    getFunFromName(ele)
    ctx.response.type = "html";
    ctx.response.body = (
      `<div>
        <div>this is ${ele}</div>
        ${getHref()}
      </div>`
    )
  }))
})
const main = ctx => {
  ctx.response.type = "html";
  ctx.response.body = (
    `<div>
      <div>this is main</div>
      ${getHref()}
    </div>`
  )
}

app.use(router.get("*", main))
app.listen(3000);
