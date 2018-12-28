/**
 * redis 基础
 * 集合 
 */

// 只插入已经存在的

var client = require('./demo16/client')
client.sadd('testSet', 1)
client.sadd('testSet', 'b')
client.sadd('testSet', 'aa')


// client.rpop('testList', (err, v) => {
//   console.log('object', err, v)
// })

client.smembers('testSet', (err, v) => {
  console.log('testSet:', err, v)
})
