
// start(path);
// function start(path) {
//     fs.readFile(path, async function(err, data) {
//         // 读取文件失败/错误
//         if (err) {
//             console.log(err);
//             return;
//         }
//         data = data.toString();
//         // 把网络请求 本地获取 都转换成 输入

//         data = await setData(data, 'script');
//         // data = await setData(data, 'link');
//         // console.log('finally html show:', data);
//         fs.writeFileSync(path, data);

//         // const dom = new JSDOM(data, { runScripts: 'dangerously' });
//     });
// }

// function setData(data, tag) {
//     return new Promise(async resolve => {
//         let mytag;
//         let myattr;
//         let regStr1;
//         if (tag === 'script') {
//             mytag = tag;
//             myattr = 'src';
//             regStr1 = `(\\<${tag}\\n*(\\s*[a-zA-Z]+=".*"\\n*)*(\\s*[a-zA-Z]+\\n*)*\\s*\\>\\<\\/${tag}\\>)`;
//         } else if (tag === 'link') {
//             mytag = 'style';
//             myattr = 'href';
//             regStr1 = `(\\<${tag}\\n*(\\s*[a-zA-Z]+=".*"\\n*)*(\\s*[a-zA-Z]+\\n*)*\\s*\\/\\>)`;
//         }
//         console.log(tag, regStr1);
//         let reg = new RegExp(regStr1, 'g');

//         // 网络
//         // 网络 01 匹配正则，拿到链接
//         let reg2 = new RegExp(`${myattr}="(.*?)"`);
//         let urlArray = [];

//         while (reg.test(data)) {
//             let regObj = {};
//             regObj.regStr = RegExp.$1;
//             reg2.exec(RegExp.$1);
//             regObj.url = RegExp.$1;
//             urlArray.push(regObj);
//         }
//         console.log(urlArray);
//         for (let index = 0; index < urlArray.length; index++) {
//             const regObj = urlArray[index];
//             data = data.replace(regObj.regStr, '');
//         }

//         for (let index = 0; index < urlArray.length; index++) {
//             const regObj = urlArray[index];

//             // 网络 02 获取链接内容
//             res = await fetch(regObj.url, {
//                 timeout: 10000,
//             });
//             text = await res.text();
//             // 网络 03 把内容装入script标签，并替换原有内容

//             text = `<${mytag}>\n${text}\n</${mytag}>\n`;

//             data = text + data;
//         }

//         resolve(data);
//     });
// }