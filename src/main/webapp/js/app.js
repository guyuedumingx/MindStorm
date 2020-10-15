// 测试用的node.js服务器
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
const {
    send
} = require('process');
app.use(bodyParser.urlencoded({
    extended: false
}));
var url = __dirname.substring(0, __dirname.length - 3);
// app.use(express.static('C:\\Users\\Lenovo\\Desktop\\111\\111'));
app.use(express.static(url));
var user = new Array();
user.push({
    author: 1,
    id: 1,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [2, 3, 7],
    star: 22,
    editable: true,
    lastEditName: '张三',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '张三',
});
user.push({
    author: 2,
    id: 2,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [4, 5],
    star: 19,
    editable: true,
    lastEditName: '李四',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '李四',
});
user.push({
    author: 1,
    id: 3,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [6],
    star: 3,
    editable: true,
    lastEditName: '马六',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '王五',
});
user.push({
    author: 1,
    id: 4,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [8, 9],
    star: 4,
    editable: true,
    lastEditName: '马六',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '马六',
});
user.push({
    author: 1,
    id: 5,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [10],
    star: 8,
    editable: true,
    lastEditName: '陈七',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '张三',
});
user.push({
    author: 1,
    id: 6,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [11],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
user.push({
    author: 1,
    id: 7,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
user.push({
    author: 1,
    id: 8,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
user.push({
    author: 1,
    id: 9,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
user.push({
    author: 1,
    id: 10,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
user.push({
    author: 1,
    id: 11,
    theme: '节点主题节点主题节点主题',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    editable: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8'),
    userName: '陈七',
});
var template = {
    id: "@id()",
    username: "@cname()",
    email: "@email()"
}
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('C:\\Users\\Lenovo\\Desktop\\lsjs'));

app.get('/', function (req, res) {
    fs.readFile('../index.html', 'utf8', function (err, doc) {
        if (err == null) {
            res.send(doc);
        }
    });
});
app.post('/node', function (req, res) {
    res.send({
        status_code: '200'
    });
});
app.get('/node', function (req, res) {
    var id = req.query.id;
    console.log(id);
    var judge = false;
    for (var i = 0; i < user.length; i++) {
        if (user[i].id == id) {
            res.send(user[i]);
            judge = true;
            break;
        }
    }
    if (!judge) {
        res.send(false);
    }
});
app.get('/', function (req, res) {
    fs.readFile('test.html', 'utf8', function (err, doc) {
        if (err == null) {
            res.send(doc);
        }
    });
});
app.post('/user', function (req, res) {
    var text = req.body;
    console.log(text);
    if (text.method == 'register') {
        if (text.email != '1808078515@qq.com') {
            res.send('200');
        } else {
            res.send('500');
        }
    } else if (text.method == 'login') {
        if (text.email == '1808078515@qq.com' && text.password == '20011219ycx') {
            res.send({
                status_code: '200',
                token: 'asd'
            });
        } else {
            res.send({
                status_code: '500',
                token: 'sb'
            });
        }
    }
});
app.get('/util', function (req, res) {
    var text = req.query;
    console.log(text);
    if (text.method == 'isExist') {
        if (text.email == '1808078515@qq.com') {
            res.send('200');
        } else {
            res.send('500');
        }
    } else if (text.method == 'sendEmail') {
        res.send({
            auth_code: '1234',
            status_code: '200'
        });
    }
});
app.get('/project', function (req, res) {
    res.send({
        id: 123456,
        name: '绝不互相甩锅',
        isPublic: false,
        rank: 3,
        author: 123456,
        headNodeId: 1,
        introduction: '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹',
        contributors: [123456, 123457, 123458, 123459, 123450, 123455],
        creatTime: new Date('2020-10-3 8:8:8').valueOf(),
        ddl: new Date('2020-10-20 8:8:8').valueOf()
    });
});
app.listen(8848);
console.log('服务器已启动 端口号8848');