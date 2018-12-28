/**
 * redis 基础
 * 列表 
 */

// Object.prototype.toString = function () {
//   return JSON.stringify(this)
// }

var client = require('./demo16/client')

// client.rpush('testList', 'a')
// client.rpush('testList', '1')
// client.rpush('testList', 'r') 
// client.rpush('testList', 1)
// client.lpush('testList', 2)

// client.lpop('testList',(err, v) => {
//   console.log('object', err, v)
// })
client.rpop('testList', (err, v) => {
  console.log('object', err, v)
})

client.lrange('testList', 0, -1, (err, v) => {
  console.log('object', err, v)
})
