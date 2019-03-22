/**
 * 文件修改
 * 
 */

const fs = require('fs');
const filePath = __dirname + '/test.txt'
const filePath2 = __dirname + '/userId.txt'
const filePath3 = __dirname + '/phoneNum.txt'
console.log(filePath)

function rw(path, num) {
  fs.readFile(filePath, function (err, data) {
    // 读取文件失败/错误
    if (err) {
      console.log(err)
      return
    }
    data = data.toString()
    let str = data.split('\n')
    for (let index = 0; index < str.length; index++) {
      const element = str[index];
      str[index] = str[index].split(',')[num]
    }
    let newStr = ''
    // [xx,xxx] 拼接成字符串
    for (let index = 0; index < str.length; index++) {
      if (str[index]) {
        if (index !== 0 && index % 10 === 0) {
          newStr = newStr + '\n' + str[index] + ','
        } else {
          newStr = newStr + str[index] + ','
        }
      }
    }
    console.log(newStr)
    fs.writeFile(path, newStr, function (err) {
      if (err) {
        throw err;
      }
      console.log('Saved.');
    });
  });

}
rw(filePath2, 1)
rw(filePath3, 0)
