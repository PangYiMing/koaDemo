/**
 * redis 基础
 * 消息中介 接受
 */


var client = require('./demo16/client')
client.subscribe('testMsg')
console.log('testMsg ready')

client.on('testMsg', (channel, msg) => {
    console.log('channel', channel, 'msg', msg)
})
