// re_require.

const fs = require('fs');
const fetch = require('node-fetch')
const relativePath = 'HostJson'
const filePath = __dirname + '/' + relativePath + '.js'
const GOBACKEND = 'localhost:9090'
console.log('filePath:', filePath, 'GOBACKEND:', GOBACKEND)

async function testReQuire(path) {
  // 从go拿到配置创建域名配置文件，如果有就引用，尽量确保成功,失败了也不要更改内容
  var hostJson = require('./' + relativePath + '.js')
  console.log('hostJson1', hostJson)

  // 需要从go拿到配置创建域名配置文件 render 重启调用。每次接口触发调用
  try {
    const res = await fetch(`http://${GOBACKEND}/__domain/getHostConfig`, {
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      method: 'post',
      body: JSON.stringify({
        token: '216e0c7a7e3dd426f118c74e8ddfd823'
      })
    })
    const { code, msg, data } = await res.json()

    if (code === '200') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          data[key] = JSON.parse(element)
        }
      }
      console.log('data', data)
      fs.writeFile(path, `module.exports = ${JSON.stringify(data)}`, function (err) {
        if (err) {
          throw err;
        }
        console.log('Saved.');
        delete require.cache[path];
        hostJson = require('./' + relativePath + '.js')
        console.log('hostJson2', hostJson)

      });
    } else {
      console.log(msg)
    }
  } catch (err) {
    console.log(err);

  }
}
testReQuire(filePath, 1)
