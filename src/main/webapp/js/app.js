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
            contributors: [123456, 123457, 123458, 123459, 123450, 123455]
        });
    }
});
app.listen(8848);
console.log('服务器已启动 端口号8848');