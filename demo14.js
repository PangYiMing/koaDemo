/**
 * 文件上传
 * curl --form upload=@/Users/admin/workspace/jstest/koaDemo/package.json http://127.0.0.1:3000
 * pwd
 */

const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const os = require('os');
const path = require('path');

const main = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    console.log(tmpdir)
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);

app.listen(3000);