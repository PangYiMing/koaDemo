/**
 * redis 基础
 * 消息中介 发出
 */


var client = require('./demo16/client')
client.publish('testMsg', 'xxx')
console.log('testMsg publish')
