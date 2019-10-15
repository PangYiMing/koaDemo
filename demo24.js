const fs = require('fs')
const mypath = require('path')
const fetch = require("node-fetch")

const relativePath = 'HostJson'
const path = mypath.join(__dirname, relativePath + '.js')
const GOBACKEND = '127.0.0.1:9090'
function getHostConfig(app, httpListen) {
  return new Promise(resolve => {
    try {
      // 从go拿到配置创建域名配置文件，如果有就引用，尽量确保成功,失败了也不要更改内容
      var hostJson = {}
      try {
        hostJson = require('./' + relativePath + '.js')
      } catch (error) {
        console.log('getHostConfig first error', error)
      }
      console.log('getHostConfig hostJson1', hostJson)


      // 需要从go拿到配置创建域名配置文件 render 重启调用。每次接口触发调用
      fetch(`http://${GOBACKEND}/__domain/getHostConfig`, {
        headers: {
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        method: 'post',
        body: JSON.stringify({
          token: '216e0c7a7e3dd426f118c74e8ddfd823'
        })
      }).then((res) => {
        res.json().then((result) => {
          const { code, msg, data } = result
          if (code === '200') {
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key]
                data[key] = JSON.parse(element)
              }
            }
            fs.writeFile(path, `module.exports = ${JSON.stringify(data)}`, function (err) {
              if (err) {
                throw err
              }
              delete require.cache[path]
              hostJson = require('./' + relativePath + '.js')
              console.log('getHostConfig json:', hostJson)
              app && httpListen(app)
              resolve(hostJson)
            })
          } else {
            console.log('getHostConfig msg', msg, 'result', result)
          }
        }).catch((err) => {
          app && httpListen(app)
          console.log('getHostConfig catch', 1, ' hostJson:', hostJson, ' err:', err)
          resolve(hostJson)
        })
      }).catch((err) => {
        app && httpListen(app)
        console.log('getHostConfig catch', 2, ' hostJson:', hostJson, ' err:', err)
        resolve(hostJson)
      })
    } catch (err) {
      app && httpListen(app)
      console.log('getHostConfig catch', 3, ' hostJson:', hostJson, ' err:', err)
      resolve(hostJson)
    }
  })

}
module.exports = getHostConfig

