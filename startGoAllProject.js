/**
 * 无反应
 */
var process = require('child_process');
var fs = require('fs');


let env = 't3'
// let filter = 'fe'
let filter = 'learnta_fe'
let products = [
  // "crmAdmin",
  // "ccnuAdmin",
  // "miniapp",
  // "partner",
  // "operationAdmin",
  // "officialSiteSh",
  // "officialSite",
  // "officialAdmin",
  // "entryAdmin",
  // "appage",
  // "promotion",
  // "go",
  // "task",
  // "admin",
  // "single",
  // "teacher4",
  // "teacher3",
  // "teacher",
  // "student4",
  // "student",
  // "student3",
  // "business",
  // "single",
  // "official",
  // "activity",
  "member",
  // "bd",
  // "dashboard",
  // "crm",
  // "ccnu",
  // "material",
  // "customersuccess",
  // "training",
  // ""
];

let currentPath;
const workPath = '/Users/admin/workspace/'
const workFile = '/Users/admin/workspace/All.sh'

let str = ''
fs.readdir(workPath, function (err, files) {
  files.forEach(projectDirName => {
    currentPath = workPath + projectDirName
    var stat = fs.lstatSync(currentPath);
    var is_direc = stat.isDirectory();
    if (is_direc && projectDirName === filter) {
      products.forEach(product => {
        // console.log(`cd ${currentPath} \n ./bin -p ${product} -t ${env} deploy`)
        str = str + `cd ${currentPath} \n ./bin -p ${product} -t ${env} deploy \n`;
        // process.exec(`cd ${currentPath} | ./bin -p ${product} -t ${env} deploy`, function (error, stdout, stderr) {
        //   if (error !== null) {
        //     // console.log('exec error: ' + error);
        //   } else {
        //     console.log(`error:${error} ,stdout:${stdout}, stderr:${stderr}`);
        //   }
        // });
      });

    }
  });
  fs.writeFile(workFile, str, function (err) {
    if (err) {
      throw err;
    }
    console.log('Saved.');
    fs.chmod(workFile, 0755, (err) => {
      console.log(err ? err : 'success')
      console.log(workFile)
      process.exec(workFile, function (error, stdout, stderr) {
        console.log(error, stdout)
        console.log(stderr)
      });
    })
  });


})


// fs.chmod('/Users/admin/workspace/jstest/koaDemo/pushAllProduct.sh', 0755, (err) => {
//   console.log(err ? err : 'success')
//   process.exec('/Users/admin/workspace/jstest/koaDemo/pushAllProduct.sh', function (error, stdout, stderr) {
//     console.log(error, stdout)
//     console.log(stderr)
//   });
// })


// const Koa = require('koa');
// const app = new Koa();

// app.use(async ctx => {
//   ctx.status = 304;
//   // ctx.response.remove('Content-Type');
//   // ctx.response.remove('Content-Length');
//   // ctx.body = "hello world";
// });

// app.listen(3000);