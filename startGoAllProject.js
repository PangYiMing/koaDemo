/**
 * 无反应
 */
var process = require('child_process');
var fs = require('fs');

// 选择测试环境
let env = 't3'
// 选择工程的名字
// let filter = 'fe'
let filter = 'teaching_admin_fe'
let products = [
  // fe ---start----
  // "teacher",
  // "student",
  // "task",
  // "businessAdmin",
  // fe ---end----


  // fe_admin ---start----
  // "",
  // fe_admin ---end----


  // fe_content_admin ---start----
  // "",
  // fe_content_admin ---end----

  // fe_dashboard ---start---- 未配置
  // "",
  // fe_dashboard ---end----


  // fe_front ---start---- 
  // "",
  // fe_front ---end----

  // learnta_fe ---start---- 有些没有t3
  // "activity",
  // "business",
  // "ccnu",
  // "ccnuAdmin",
  // "crmAdmin",
  // "member",
  // "entryAdmin",
  // "officialAdmin",  // t1没有
  // "officialSite",
  // "officialSiteSh",  //t3没有
  // "operationAdmin",
  // "partner", // 废弃
  // "miniapp", // 废弃
  // "customerSuccess", //t3没有
  // "training",  //t3没有
  // learnta_fe ---end----

  // teaching_admin_fe ---start----
  "material",   //t3没有
  // teaching_admin_fe ---end----


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
  // "admin",
  // "single",

  // "business",
  // "single",
  // "official",
  // "activity",
  // "member",
  // "bd",
  // "dashboard",
  // "crm",
  // "ccnu",
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