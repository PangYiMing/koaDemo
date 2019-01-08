/**
 * mongo 基础
 * 获取
 */

const Koa = require('koa');
const app = new Koa();


var client = require('./demo20/client');
var db = client();

var User = db.model('User')

app.use(async ctx => {
    var user = new User({
        uid: 1,
        username: 'Sid'
    })
    user.save(function (err) {
        if (err) {
            ctx.body = "hello world err:" + err;
        } else {
            User.find({}, function (err, docs) {
                if (err) {
                    ctx.body = "hello world err:" + err;
                } else {
                    ctx.response.toJSON();
                }
            })
        }
    })
});

app.listen(3000);