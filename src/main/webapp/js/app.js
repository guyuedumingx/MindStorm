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
    theme: '节点主题一',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [2, 3, 4, 5, 6, 7, 8],
    star: 22,
    stared: false,
    banAppend: false,
    lastEditName: '张三',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '张三',
    father: 0,
});
user.push({
    author: 2,
    id: 2,
    theme: '节点主题二',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 19,
    stared: true,
    banAppend: true,
    lastEditName: '李四',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '李四',
    father: 1,
});
user.push({
    author: 3,
    id: 3,
    theme: '节点主题三',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [9, 10],
    star: 3,
    stared: true,
    banAppend: true,
    lastEditName: '马六',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '王五',
    father: 1,
});
user.push({
    author: 4,
    id: 4,
    theme: '节点主题四',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 4,
    stared: true,
    banAppend: false,
    lastEditName: '马六',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '马六',
    father: 1,
});
user.push({
    author: 1,
    id: 5,
    theme: '节点主题五',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 8,
    stared: true,
    banAppend: true,
    lastEditName: '陈七',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '张三',
    father: 1,
});
user.push({
    author: 6,
    id: 6,
    theme: '节点主题六',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    stared: false,
    banAppend: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 1,
});
user.push({
    author: 1,
    id: 7,
    theme: '节点主题七',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 1,
});
user.push({
    author: 8,
    id: 8,
    theme: '节点主题八',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [11],
    star: 15,
    stared: false,
    banAppend: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 1,
});
user.push({
    author: 1,
    id: 9,
    theme: '节点主题九',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    stared: false,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 3,
});
user.push({
    author: 7,
    id: 10,
    theme: '节点主题十',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    stared: false,
    banAppend: true,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 3,
});
user.push({
    author: 1,
    id: 11,
    theme: '节点主题十一',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [12],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 8,
});
user.push({
    author: 1,
    id: 12,
    theme: '节点主题十二',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [13],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 11,
});
user.push({
    author: 1,
    id: 13,
    theme: '节点主题十三',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [14],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 12,
});
user.push({
    author: 1,
    id: 14,
    theme: '节点主题十四',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [15],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 13,
});
user.push({
    author: 1,
    id: 15,
    theme: '节点主题十五',
    content: '节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容节点内容',
    children: [],
    star: 15,
    stared: true,
    banAppend: false,
    lastEditName: '王五',
    lastEditTime: new Date('2020/10/10 8:8:8').valueOf(),
    userName: '陈七',
    father: 14,
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
function getNode(id) {
    console.log('要获取的节点：' + id);
    for (var i = 0; i < user.length; i++) {
        if (user[i]) {
            if (user[i].id == id) {
                return user[i];
            }
        }
    }
    return null;
}
app.post('/node', function (req, res) {
    var text = req.body;
    user.push({
        author: 8848,
        id: user.length + 1,
        theme: text.theme,
        content: text.content,
        children: [],
        star: 0,
        editable: text.banAppend,
        lastEditName: '60rzvvbj',
        lastEditTime: Date.now(),
        userName: '60rzvvbj',
    });
    getNode(text.parentId).children.push(user.length);
    res.send({
        status_code: '200'
    });
});
app.delete('/node', function (req, res) {
    var text = req.query;
    for (var i = 0; i < user.length; i++) {
        if (user[i]) {
            if (user[i].id == text.id) {
                var f = user.father;
                for (var j = 0; j < f.children.length; j++) {
                    if (f.children[j] == text.id) {
                        f.children[j] == null;
                    }
                }
            }
            user[i] = null;
        }
    }
    res.send({
        status_code: '200'
    })
});
app.put('/node', function (req, res) {
    var text = req.query;
    var nowNode = getNode(text.id);
    Object.assign(nowNode, {
        theme: text.theme,
        content: text.content,
        banAppend: text.banAppend,
        lastEditName: '60rzvvbj',
        lastEditTime: Date.now()
    });
    res.send({
        status_code: '200'
    });
});
app.get('/node', function (req, res) {
    var id = req.query.id;
    setTimeout(function () {
        res.send(getNode(id));
    }, 200);
});
app.get('/', function (req, res) {
    fs.readFile('test.html', 'utf8', function (err, doc) {
        if (err == null) {
            res.send(doc);
        }
    });
});
app.post('/user/login', function (req, res) {
    var text = req.body;

    // console.log(text);
    // if (text.method == 'register') {
    //     if (text.email != '1808078515@qq.com') {
    //         res.send('200');
    //     } else {
    //         res.send('500');
    //     }
    // } else if (text.method == 'login') {
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
    // }
});
app.get('/util/email', function (req, res) {
    var text = req.query;
    if (text.email == '1808078515@qq.com') {
        res.send('200');
    } else {
        res.send('500');
    }
});
app.post('/util/email', function (req, res) {
    var text = req.body;
    res.send({
        auth_code: '123456',
        status_code: '200'
    });
});

app.get('/user', function (req, res) {
    var text = req.query;
    var n = getNode(text.id);
    res.send({
        name: n.userName,
        userAvatar: '/img/logo1.png'
    });
});
app.get('/project', function (req, res) {
    res.send({
        id: 123456,
        name: '绝不互相甩锅',
        isPublic: false,
        rank: 3,
        author: 123456,
        creatorName: '张三',
        headNodeId: 1,
        introduction: '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹',
        contributors: [1, 2, 3, 4, 5, 6, 7, 8],
        createTime: new Date('2020-10-3 8:8:8').valueOf(),
        deadline: new Date('2020-10-28 8:8:8').valueOf()
    });
});
app.put('/util', function (req, res) {
    res.send({
        status_code: '200'
    });
});
app.listen(8848);
console.log('服务器已启动 端口号8848');