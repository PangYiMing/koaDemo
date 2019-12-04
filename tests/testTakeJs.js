const fs = require('fs');
const fetch = require('node-fetch');

// let path = __dirname + '/../.storybook/preview-head.html';
// let writePath = __dirname + '/../.storybook/preview-head2.html';

// tag : 'script' 'link'
function setHtmlLinkJsToFile(path, regLink, tag = 'script') {
    return new Promise(async resolve => {
        let data = fs.readFileSync(path);
        data = data.toString();
        let myattr;
        let regStr1;
        if (tag === 'script') {
            mytag = tag;
            myattr = 'src';
            regStr1 = `(\\<${tag}\\n*(\\s*[a-zA-Z]+=".*"\\n*)*(\\s*[a-zA-Z]+\\n*)*\\s*\\>\\<\\/${tag}\\>)`;
        } else if (tag === 'link') {
            mytag = 'style';
            myattr = 'href';
            regStr1 = `(\\<${tag}\\n*(\\s*[a-zA-Z]+=".*"\\n*)*(\\s*[a-zA-Z]+\\n*)*\\s*\\/\\>)`;
        }
        console.log(tag, regStr1);
        let reg = new RegExp(regStr1, 'g');

        // 网络
        // 网络 01 匹配正则，拿到链接
        let reg2 = new RegExp(`${myattr}="(.*?)"`);
        let urlArray = [];

        while (reg.test(data)) {
            let regObj = {};
            regObj.regStr = RegExp.$1;
            reg2.exec(RegExp.$1);
            regObj.url = RegExp.$1;
            urlArray.push(regObj);
        }
        console.log(urlArray);
        for (let index = 0; index < urlArray.length; index++) {
            const regObj = urlArray[index];
            data = data.replace(regObj.regStr, '');
        }

        for (let index = 0; index < urlArray.length; index++) {
            const regObj = urlArray[index];
            if (typeof regLink === 'string' && regObj.url !== regLink) {
                continue;
            } else if (Array.isArray(regLink) && !regLink.includes(regObj.url)) {
                continue;
            }
            console.log(
                '正在把',
                regObj.url,
                '写入到',
                __dirname +
                    '/../testLinkjs/' +
                    regObj.url
                        .split('/')
                        .pop()
                        .split('?')[0]
            );

            // 网络 02 获取链接内容
            let res = await fetch(regObj.url, {
                timeout: 10000,
            });
            let text = await res.text();
            // 网络 03 把内容装入script标签，并替换原有内容
            data = text;

            fs.writeFileSync(
                __dirname +
                    '/../testLinkjs/' +
                    regObj.url
                        .split('/')
                        .pop()
                        .split('?')[0],
                data
            );
        }

        resolve(data);
    });
}

function setLinkJsToFile(linkUrl) {
    return new Promise(async resolve => {
        // 网络 02 获取链接内容
        let res = await fetch(linkUrl, {
            timeout: 10000,
        });
        let text = await res.text();
        // 网络 03 把内容装入script标签，并替换原有内容
        let data = text;
        console.log(
            '正在把',
            linkUrl,
            '写入到',
            __dirname +
                '/../testLinkjs/' +
                linkUrl
                    .split('/')
                    .pop()
                    .split('?')[0]
        );

        fs.writeFileSync(
            __dirname +
                '/../testLinkjs/' +
                linkUrl
                    .split('/')
                    .pop()
                    .split('?')[0],
            data
        );

        resolve(data);
    });
}

function setLinkJsToData(linkUrl) {
    return new Promise(async resolve => {
        // 网络 02 获取链接内容
        let res = await fetch(linkUrl, {
            timeout: 10000,
        });
        let text = await res.text();
        // 网络 03 把内容装入script标签，并替换原有内容
        let data = '<srcipt>' + text + '</srcipt>';
        console.log(
            '正在把',
            linkUrl,
            '写入到',
            __dirname +
                '/../testLinkjs/' +
                linkUrl
                    .split('/')
                    .pop()
                    .split('.')[0] +
                '.html'
        );


        resolve(data);
    });
}

// setHtmlLinkJsToFile(__dirname + '/../.storybook/preview-head.html');
// setLinkJsToFile('https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js');
module.exports = { setHtmlLinkJsToFile, setLinkJsToFile, setLinkJsToData };
