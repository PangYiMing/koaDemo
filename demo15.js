/**
 * redis 基础
 * 存储与读取
 */

var redis = require('redis');

var client = redis.createClient(6379, 'localhost');

Object.prototype.toString = function () {
  return JSON.stringify(this)
}

// -----存储与读取
// client.set('hello', 'this is a value')
client.set('hello', { a: 1, b: 2 })

client.keys('hell*', (err, v) => {
  console.log('redis keys err:', err, ', value:', v)
  client.mget(v, (error, value) => {
    console.log('redis mget hello err:', error, ', value:', value)
  })
})
// client.get('hell\*', (err, v) => {
//   console.log('redis get hello err:', err, ', value:', v ? JSON.parse(v).a : v)
// })