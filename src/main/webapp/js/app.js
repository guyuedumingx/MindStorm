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
// app.use(express.static('C:\\Users\\Lenovo\\Desktop\\111\\111'));
app.use(express.static('G:\\rspro\\MindStorm\\src\\main\\webapp'));
var user = new Array();
user.push({
    id: 1,
    userName: '张三',
    childrenId: [2, 3, 4]
});
user.push({
    id: 2,
    userName: '李四',
    childrenId: [5, 6]
});
user.push({
    id: 3,
    userName: '王五',
    childrenId: [7, 8]
});
user.push({
    id: 4,
    userName: '狗蛋',
    childrenId: [12, 13, 14]
});
user.push({
    id: 5,
    userName: '马六',
    childrenId: [9, 10]
});
user.push({
    id: 6,
    userName: '陈七',
    childrenId: [15, 16]
});
user.push({
    id: 7,
    userName: '王八',
    childrenId: [11]
});
user.push({
    id: 8,
    userName: '赵九',
    childrenId: [17]
});
user.push({
    id: 9,
    userName: '周十',
    childrenId: [18]
});
user.push({
    id: 10,
    userName: '十一',
    childrenId: []
});
user.push({
    id: 11,
    userName: '十二',
    childrenId: []
});
user.push({
    id: 12,
    userName: '十三',
    childrenId: []
});
user.push({
    id: 13,
    userName: '十四',
    childrenId: [19, 20]
});
user.push({
    id: 14,
    userName: '十五',
    childrenId: []
});
user.push({
    id: 15,
    userName: '十六',
    childrenId: [21]
});
user.push({
    id: 16,
    userName: '十七',
    childrenId: [22]
});
user.push({
    id: 17,
    userName: '十八',
    childrenId: []
});
user.push({
    id: 18,
    userName: '智障',
    childrenId: []
});
user.push({
    id: 19,
    userName: '十九',
    childrenId: []
});
user.push({
    id: 20,
    userName: '二十',
    childrenId: []
});
user.push({
    id: 21,
    userName: '二一',
    childrenId: []
});
user.push({
    id: 22,
    userName: '二二',
    childrenId: []
});
user.push({
    id: 23,
    userName: '二三',
    childrenId: []
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
app.get('/node', function (req, res) {
    var id = req.query.id;
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
    var text = req.query;
    if (text.method == 'enterProject') {
        res.send({
            id: 123456,
            name: '绝不互相甩锅',
            isPublic: false,
            rank: 3,
            author: 123456,
            headNodeId: 0,
            introdution: '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹',
            contributors: [123456, 123457, 123458, 123459, 123450, 123455],
            creatTime: new Date('2020-10-3 8:8:8').valueOf(),
            ddl: new Date('2020-10-20 8:8:8').valueOf()
        });
    }
});
// app.put('/project', function (req, res) {
//     console.log(1);
//     var text = req.query;
//     if (text.method == 'enterProject') {
//         res.send({
//             id: 123456,
//             name: '绝不互相甩锅',
//             isPublic: false,
//             rank: 3,
//             author: 123456,
//             headNodeId: 0,
//             introdution: '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹',
//             contributors: [123456, 123457, 123458, 123459, 123450, 123455],
//             creatTime: new Date('2020-10-3 8:8:8').valueOf(),
//             ddl: new Date('2020-10-20 8:8:8').valueOf()
//         });
//     }
// });
// app.delete('/project', function (req, res) {
//     console.log(2);
//     var text = req.query;
//     if (text.method == 'enterProject') {
//         res.send({
//             id: 123456,
//             name: '绝不互相甩锅',
//             isPublic: false,
//             rank: 3,
//             author: 123456,
//             headNodeId: 0,
//             introdution: '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹',
//             contributors: [123456, 123457, 123458, 123459, 123450, 123455],
//             creatTime: new Date('2020-10-3 8:8:8').valueOf(),
//             ddl: new Date('2020-10-20 8:8:8').valueOf()
//         });
//     }
// });
app.listen(8848);
console.log('服务器已启动 端口号8848');