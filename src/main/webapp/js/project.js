// 设置文本不可选中
var tool = new Tool(document, window);
tool.textProhibition();

// 设置主题色
// var mainColor = '#1e1e1e'; // 主背景色
// var modularColor = 'rgb(51, 51, 51)'; // 模块背景色
// var textColor = 'rgba(255, 255, 255, 0.8)'; // 文字颜色
// var textLightColor = 'rgba(255, 167, 15)'; // 文本高亮色
// var progressColor = '#cccccc'; // 进度条颜色
// var progressBoxColor = '#666666'; // 进度条盒子颜色
var colorSet = [['#e6eef1', 'rgb(248, 252, 250)', '#214b5b', 'rgba(255, 167, 15)', '#214b5b', '#ffffff'],
['#1e1e1e', 'rgb(51, 51, 51)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 167, 15)', '#cccccc', '#666666']];
var colorState = 0;
var mainColor; // 主背景色
var modularColor; // 模块背景色
var textColor = '#214b5b'; // 文字颜色
var textLightColor; // 文本高亮色
var progressColor; // 进度条颜色
var progressBoxColor; // 进度条盒子颜色

// 配色函数
function setColor() {
    mainColor = colorSet[colorState][0];
    modularColor = colorSet[colorState][1];
    textColor = colorSet[colorState][2];
    textLightColor = colorSet[colorState][3];
    progressColor = colorSet[colorState][4];
    progressBoxColor = colorSet[colorState][5];
    getDom('body').style.backgroundColor = mainColor;
    getDom('body').style.transition = 'background-color .5s';
    var mainBox = getDom('.mainBox');
    for (var i = 0; i < mainBox.children.length; i++) {
        for (var j = 0; j < mainBox.children[i].children.length; j++) {
            mainBox.children[i].children[j].style.backgroundColor = modularColor;
            mainBox.children[i].children[j].style.transition = 'background-color .5s';
        }
    }
    getDom('.mainBoxLeft .creator h4').style.color = textColor;
    getDom('.mainBoxLeft .creator h4').style.transition = 'color .5s';
    getDom('.mainBoxLeft .introduce .introduceMain').style.backgroundColor = modularColor;
    getDom('.mainBoxLeft .introduce .introduceMain').style.transition = 'background-color .5s';
    getDomA('.mainBoxLeft .introduce h4')[0].style.color = textColor;
    getDomA('.mainBoxLeft .introduce h4')[0].style.transition = 'color .5s';
    getDomA('.mainBoxLeft .introduce h4')[1].style.color = textColor;
    getDomA('.mainBoxLeft .introduce h4')[1].style.transition = 'color .5s';
    getDom('.mainBoxLeft .introduce p').style.color = textColor;
    getDom('.mainBoxLeft .introduce p').style.transition = 'color .5s';
    getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.background = 'linear-gradient(rgba(' + modularColor.split(')')[0].split('(')[1] + ', 0), rgba(' + modularColor.split(')')[0].split('(')[1] + ', 1))';
    getDom('.mainBoxLeft .introduce a').style.color = textLightColor;
    getDom('.mainBoxLeft .introduce a').style.transition = 'color .5s';
    var setColorArr = getDomA('.onOffBox .onOff .onOffTips');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.color = textColor;
        setColorArr[i].style.transition = 'color .5s';
    }
    getDom('.mainBoxMiddle .treeBox').style.border = '20px solid ' + modularColor;
    getDom('.mainBoxMiddle .treeBox').style.transition = 'border .5s';
    getDom('.mainBoxMiddle .treeBox .treeBoxMain').style.backgroundColor = mainColor;
    getDom('.mainBoxMiddle .treeBox .treeBoxMain').style.transition = 'background-color .5s';
    getDom('.progressBar .projectName').style.color = textColor;
    getDom('.progressBar .projectName').style.transition = 'color .5s';
    getDom('.progressBar .progressBarTop .creationDate').style.color = textColor;
    getDom('.progressBar .progressBarTop .creationDate').style.transition = 'color .5s';
    getDom('.progressBar .progressBarTop .closingDate').style.color = textColor;
    getDom('.progressBar .progressBarTop .closingDate').style.transition = 'color .5s'; textColor;
    getDom('.progressBar .countDown').style.color = textColor;
    getDom('.progressBar .countDown').style.transition = 'color .5s';
    getDom('.progressBar .progressBarTop .progressBox .progressContent').style.backgroundColor = progressColor;
    getDom('.progressBar .progressBarTop .progressBox .progressContent').style.transition = 'background-color .5s';
    getDom('.progressBar .progressBarTop .progressBox .wave').style.backgroundColor = progressColor;
    getDom('.progressBar .progressBarTop .progressBox .wave').style.transition = 'background-color .5s';
    getDom('.progressBar .progressBarTop .progressBox').style.backgroundColor = progressBoxColor;
    getDom('.progressBar .progressBarTop .progressBox').style.transition = 'background-color .5s';
    getDom('.mainBoxRight .projectId h4').style.color = textColor;
    getDom('.mainBoxRight .projectId h4').style.transition = 'color .5s';
    getDom('.mainBoxRight .nowNode .nowNodeTheme').style.color = textColor;
    getDom('.mainBoxRight .nowNode .nowNodeTheme').style.transition = 'color .5s';
    getDom('.mainBoxRight .nowNode .nowNodeTitle').style.color = textColor;
    getDom('.mainBoxRight .nowNode .nowNodeTitle').style.transition = 'color .5s';
    setColorArr = getDomA('.displayControl .operationProject div .Before');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.backgroundColor = modularColor;
        setColorArr[i].style.transition = 'background-color .5s';
    }
    setColorArr = getDomA('.mainBoxRight .controller .btnBox .btn .Before');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.backgroundColor = modularColor;
        setColorArr[i].style.transition = 'background-color .5s';
    }
}

setColor();

function changeColor(state) {
    mainColor = colorSet[state][0];
    modularColor = colorSet[state][1];
    textColor = colorSet[state][2];
    textLightColor = colorSet[state][3];
    progressColor = colorSet[state][4];
    progressBoxColor = colorSet[state][5];
    getDom('body').style.backgroundColor = mainColor;
    var mainBox = getDom('.mainBox');
    for (var i = 0; i < mainBox.children.length; i++) {
        for (var j = 0; j < mainBox.children[i].children.length; j++) {
            mainBox.children[i].children[j].style.backgroundColor = modularColor;
        }
    }
    getDom('.mainBoxLeft .creator h4').style.color = textColor;
    getDom('.mainBoxLeft .introduce .introduceMain').style.backgroundColor = modularColor;
    getDomA('.mainBoxLeft .introduce h4')[0].style.color = textColor;
    getDomA('.mainBoxLeft .introduce h4')[1].style.color = textColor;
    getDom('.mainBoxLeft .introduce p').style.color = textColor;
    getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.opacity = '0';
    getDom('.mainBoxLeft .introduce a').style.color = textLightColor;
    var setColorArr = getDomA('.onOffBox .onOff .onOffTips');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.color = textColor;
    }
    getDom('.mainBoxMiddle .treeBox').style.border = '20px solid ' + modularColor;
    getDom('.mainBoxMiddle .treeBox .treeBoxMain').style.backgroundColor = mainColor;
    getDom('.progressBar .projectName').style.color = textColor;
    getDom('.progressBar .progressBarTop .creationDate').style.color = textColor;
    getDom('.progressBar .progressBarTop .closingDate').style.color = textColor;
    getDom('.progressBar .countDown').style.color = textColor;
    getDom('.progressBar .progressBarTop .progressBox .progressContent').style.backgroundColor = progressColor;
    getDom('.progressBar .progressBarTop .progressBox .wave').style.backgroundColor = progressColor;
    getDom('.progressBar .progressBarTop .progressBox').style.backgroundColor = progressBoxColor;
    getDom('.mainBoxRight .projectId h4').style.color = textColor;
    getDom('.mainBoxRight .nowNode .nowNodeTheme').style.color = textColor;
    getDom('.mainBoxRight .nowNode .nowNodeTitle').style.color = textColor;
    getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.transition = 'opacity 0s';
    setTimeout(function () {
        getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.transition = 'opacity 1s';
        getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.background = 'linear-gradient(rgba(' + modularColor.split(')')[0].split('(')[1] + ', 0), rgba(' + modularColor.split(')')[0].split('(')[1] + ', 1))';
        getDom('.mainBoxLeft .introduce .introduceMain .introduceMainAfter').style.opacity = '1';
    }, 250);
    setColorArr = getDomA('.displayControl .operationProject div .Before');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.backgroundColor = modularColor;
    }
    setColorArr = getDomA('.mainBoxRight .controller .btnBox .btn .Before');
    for (var i = 0; i < setColorArr.length; i++) {
        setColorArr[i].style.backgroundColor = modularColor;
    }
    ergodicTree(function (node) {
        node.getDom('.theme').style.color = textColor;
    });
    lineUpColor = textColor;
    hideLineClick();
}

// 夜间模式(ctrl + E)
var naghtState = 1; // 当前状态
document.addEventListener('keydown', function (e) {
    if (e.key == 'e' && e.ctrlKey) {
        e.preventDefault();
        changeColor(naghtState);
        naghtState = 1 - naghtState;
    }
});

// header
//-----------------------------------------------------

//获取用户id
var loginPd = getCookie("user_id");
//获取用户名
var userName = getCookie("user_name");
//个人容器
var personal = getDom(".personal");
//获取外部昵称框
var nameU = getDom(".user_name");
//获取内部昵称框
var nameBox = getDom(".nameBox");
//获取简介框
var perSig = getDom(".perSig");
//获取邮箱框
var emailBox = getDom(".email");
//获取头像框------
var headBox = getDom(".headBox");
var head = getDom(".head");
//获取input
var inPic = getDom(".inPic");
//获取but
var changeH = getDom(".changeH");

//头像更换样式
headBox.addEventListener("mouseover", function () {
    inPic.style.display = "block";
    changeH.style.display = "block";
});
headBox.addEventListener("mouseout", function () {
    inPic.style.display = "none";
    changeH.style.display = "none";
});

//获取登录注册容器
// var logOn = getDom(".logOn");

//请求获得数组对象-----------
function userMess(head, headBox, emailBox, perSig) {
    ajax({
        type: 'get',
        url: '/user',
        data: {

        },
        header: {},
        success: function (res) {
            //获取个人简介--
            var userIntroduce = res.userSignature;
            //获取邮箱
            var email = res.email;
            //获取头像
            var header = res.userAvatar;
            headBox.style.backgroundImage = "url(" + header + ")";
            head.style.backgroundImage = "url(" + header + ")";
            emailBox.innerText = email;
            perSig.value = userIntroduce;
        },
        error: function () { }
    });

}
userMess(head, headBox, emailBox, perSig);
//判断是否登录------------
if (loginPd == null) {
    personal.style.display = "none";
} else {
    personal.style.display = "block";
    //调用获取用户信息

    nameU.innerText = userName;
    nameBox.value = userName;
}

//退出登录
//获取退出按钮
var logOut = getDom(".logOut");
logOut.addEventListener("click", function () {
    //删除id
    removeCookie("user_id");
    //删除昵称
    removeCookie("user_name");
    //跳转到登录页面
    window.location.href = "/login.html";
})



//个人下拉框
//获取下拉框
var spinner = getDom(".spinner");
//获取个人框
var headNav = getDom(".head_nav");
clickOpenBlankClose(headNav, spinner);


//头像上传
//导入

function UpladFile() {
    var file = inPic.files[0];
    var formdata = new FormData();
    formdata.append("file", file);
    //获取文件后缀
    var format = file.name.slice(file.name.lastIndexOf('.') + 1);
    var extName = "GIF,JPG,JPEG,PNG";
    //图片大小限制
    var maxSize = 2 * 1024 * 1024; //2m
    var size = file.size;
    //首先对格式进行验证
    if (extName.indexOf(format.toUpperCase()) == -1) {
        topAlert("您只能输入" + extName + "格式的文件");
    } else {
        //大小判断
        if (size > maxSize) {
            topAlert("图片大小不能超过2M");
        } else {
            ajax({
                type: 'post',
                url: "/user/avatar",
                data: formdata,
                success: function (res) {
                    if (res.status_code == '200') {
                        headBox.style.backgroundImage = "url(" + res.url + ")";
                        head.style.backgroundImage = "url(" + res.url + ")";
                    } else {
                        topAlert("导入失败");
                    }
                }
            }, true);
        }
    }
}
var url = getCookie("user_avatar");
headBox.style.backgroundImage = "url(" + url + ")";
head.style.backgroundImage = "url(" + url + ")";
inPic.addEventListener("change", UpladFile);


//获取修改按钮
var modifyN = getDom(".modifyN");
//点击修改
modifyN.addEventListener("click", function () {
    nameBox.readOnly = false;
    nameBox.style.borderBottom = "solid 1px";
});
//回车修改cookie
nameBox.inputEnterEvent(function () {
    nameBox.value = nameBox.value;
    nameU.innerText = nameBox.value;
    nameBox.readOnly = true;
    nameBox.style.borderBottom = "";
});

//----------------------------------------------
// end header

// 创建user对象
var user = {};

// 从cookie中获取值
user.userId = getCookie('user_id') - 0;
user.userName = getCookie('user_name');

// 从url中获取项目id
var projectId = getLocation('project_id');
var ctrlState = false;

// 键盘按下事件
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 17) {
        if (transparentBaffle.getCSS('display') == 'none') {
            if (!ctrlState) {
                if (nowNode) {
                    nowNode.style.boxShadow = 'none';
                    var t = nowNode;
                    while (t.father) {
                        removeHeightLight(t.father);
                        t = t.father;
                    }
                    changeChild(nowNode, removeHeightLight);
                    if (hideTheme.state) {
                        ergodicTree(function (node) {
                            node.addClass('hideTheme');
                        });
                    }
                }
                nowNode = null;
                changeNodeEvent();
                lineColor = lineUpColor;
                document.removeEventListener('mousemove', move);
            }
            ctrlState = true;
        }
    }
});
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 17) {
        ctrlState = false;
    }
});

// ——————————————————左侧——————————————————
var mainBoxLeft = getDom('.mainBoxLeft'); // 左侧大盒子
var projectCreatorName = mainBoxLeft.getDom('.creator h4 span'); // 项目创建者
var introduceOpen = mainBoxLeft.getDom('.introduce a'); // 项目简介展开的开关
var introduce = mainBoxLeft.getDom('.introduce .introduceMain'); // 项目简介内容盒子
var projectLevel = introduce.getDom('span'); // 获取项目等级盒子
var introduceP = introduce.getDom('p'); // 项目简介内容
var introduceState = false; // 项目简介展开状态
var participantOn = introduce.getDom('.introduceMain .member'); // 成员列表开关
var participant = getDom('.mainBoxLeft .introduce .participant'); // 成员列表盒子
var participantUl = participant.getDom('ul'); // 成员列表表中的Ul
var participantOff = participant.getDom('i'); // 成员列表盒子关闭按钮
var operationProjectTitle = getDom('.operationProject .operationProjectTitle'); // 项目处理开关
var operationProject = [getDom('.mainBoxLeft .operationProject .exportProject'), getDom('.mainBoxLeft .operationProject .removeProject')]; // 项目处理按钮

// 生成成员列表
function generateParticipant(arr) {
    for (var i = 0; i < arr.length; i++) {
        ajax({
            type: 'get',
            url: '/user',
            data: {
                id: arr[i]
            },
            success: function (res) {
                var li = document.createElement('li');
                var userPhoto = document.createElement('div');
                var userName = document.createElement('div');
                userName.innerText = res.name;
                userName.addClass('userName');
                userPhoto.style.backgroundImage = 'url(' + res.userAvatar + ')';
                userPhoto.addClass('userPhoto');
                li.appendChild(userPhoto);
                li.appendChild(userName);
                participantUl.appendChild(li);
            }
        });
    }
}


// 成员列表伸缩功能
participantOn.addEventListener('click', function () {
    if (participant.getCSS('left') == '100%') {
        participant.style.left = '0%';
        participant.style.borderRadius = '5px 5px 5px 5px';
    } else {
        participant.style.left = '100%';
        participant.style.borderRadius = '0px 5px 5px 0px';
    }
});
participantOff.addEventListener('click', function () {
    participant.style.left = '0%';
    participant.style.borderRadius = '5px 5px 5px 5px';
});

// 随机颜色
operationProjectTitle.style.backgroundColor = randomColor(120, 180);

function setOperationProject() {
    for (var i = 0; i < operationProject.length; i++) {
        operationProject[i].style.backgroundColor = randomColor(120, 180);
    }
}
setOperationProject();

// 项目处理开关相关点击事件
operationProjectTitle.addEventListener('click', function () {
    this.hide();
    for (var i = 0; i < operationProject.length; i++) {
        operationProject[i].show();
    }
});

document.addEventListener('click', function (e) {
    if (!isParent(e.target, operationProjectTitle.parentNode)) {
        operationProjectTitle.show();
        for (var i = 0; i < operationProject.length; i++) {
            operationProject[i].hide();
        }
    }
});

// 项目简介展开按钮点击事件
introduceOpen.addEventListener('click', function () {
    if (introduceState) {
        this.innerText = '展开';
        introduce.style.height = '100%';
        introduceState = false;
    } else {
        this.innerText = '收起';
        introduce.style.height = mainBoxLeft.offsetHeight - 50 + 'px';
        introduceState = true;
    }
});

// 页面缩放时动态维护展开后的高度
window.addEventListener('resize', function () {
    if (introduceState) {
        introduce.style.transition = 'none';
        introduce.style.height = mainBoxLeft.offsetHeight - 50 + 'px';
        setTimeout(function () {
            introduce.style.transition = 'height .5s';
        }, 1);
    }
});

// ——————————————————中间——————————————————
var projectName = getDom('.progressBar .projectName'); // 项目名
var creationDate = getDom('.progressBar .progressBarTop .creationDate'); // 创建日期
var closingDate = getDom('.progressBar .progressBarTop .closingDate'); // 截止日期
var progressContent = getDom('.progressBox .progressContent'); // 进图条盒子
var progressWave = getDom('.progressBox .wave'); // 流动效果盒子
var progressCountDown = getDom('.progressBar .countDown'); // 提示还剩多长时间的盒子
var treeBox = getDom('.mainBoxMiddle .treeBox'); // 树盒子框架
var treeBoxMain = getDom('.mainBoxMiddle .treeBox .treeBoxMain'); // 树盒子
var treeBoxPercentageTips = getDom('.mainBoxMiddle .treeBox .treeBoxPercentageTips'); // 提示树盒子缩放倍数的盒子
var treeBoxState = false; // 鼠标是否在树盒子中
var treeMultiple = 100; // 树盒子缩放倍数

// 显示树盒子缩放倍数提示盒子
function percentageTips(num) {
    if (treeBoxPercentageTips.timer) {
        clearInterval(treeBoxPercentageTips.timer);
    }
    var i = 0;
    treeBoxPercentageTips.innerText = num + '%';
    treeBoxPercentageTips.show();
    treeBoxPercentageTips.timer = setInterval(function () {
        if (i == 30) {
            clearInterval(treeBoxPercentageTips.timer);
            treeBoxPercentageTips.hide();
        } else {
            i++;
            treeBoxPercentageTips.style.opacity = 1 / 30 * (30 - i) + '';
        }
    }, 25);
}

// 计算剩余时间
function calculateRemainingTime(millisecond) {
    if (millisecond < DAY) {
        return 'Less than a day';
    } else if (millisecond < WEEK) {
        return Math.floor(millisecond / DAY) + ' days left';
    } else if (millisecond < MONTH) {
        return Math.floor(millisecond / WEEK) + ' weeks left';
    } else if (millisecond < YEAR) {
        return Math.floor(millisecond / MONTH) + ' months left';
    } else {
        return Math.floor(millisecond / YEAR) + ' years left';
    }
}

// 维护treeBoxState变量相关事件
treeBox.addEventListener('mouseover', function () {
    treeBoxState = true;
});
treeBox.addEventListener('mouseout', function () {
    treeBoxState = false;
});

// 树盒子缩放
treeBox.addEventListener('mousewheel', function (e) {
    if (ctrlState) {
        e.preventDefault();
        if (e.deltaY < 0) {
            treeMultiple += 10;
            treeMultiple = treeMultiple < 300 ? treeMultiple : 300;
            treeBoxMain.style.zoom = treeMultiple / 100;
        } else {
            treeMultiple -= 10;
            treeMultiple = treeMultiple > 100 ? treeMultiple : 100;
            treeBoxMain.style.zoom = treeMultiple / 100;
        }
        percentageTips(treeMultiple);
    }
});

// 点击空白处事件
treeBoxMain.addEventListener('mousedown', function (e) {
    if (nowNode) {
        nowNode.style.boxShadow = 'none';
        var t = nowNode;
        while (t.father) {
            removeHeightLight(t.father);
            t = t.father;
        }
        changeChild(nowNode, removeHeightLight);
        if (hideTheme.state) {
            ergodicTree(function (node) {
                node.addClass('hideTheme');
            });
        }
        nowNode = null;
        changeNodeEvent();
    }
});

var treeFullScreenState = false; // 全屏状态
var treeFullScreenOnOff = getDom('.mainBoxMiddle .treeBox .treeBoxFullScreen'); // 树盒子全屏按钮

// 全屏按钮点击事件
treeFullScreenOnOff.addEventListener('click', function () {
    if (treeFullScreenState) {
        cancelFullscreen();
        this.style.backgroundImage = 'url(img/project_fullScreen.png)';
        treeFullScreenState = false;
    } else {
        domFullScreen(treeBox);
        this.style.backgroundImage = 'url(img/project_cancelFullScreen.png)';
        treeFullScreenState = true;
    }
});

//监听退出全屏事件
function checkFull() {
    return document.webkitIsFullScreen;
}
window.addEventListener('resize', function () {
    if (!checkFull()) {
        //要执行的动作
        treeFullScreenOnOff.style.backgroundImage = 'url(img/project_fullScreen.png)';
        treeFullScreenState = false;
    }
});

var nowNode; // 当前正在拖动的节点
// var nodeConstLen = [150, 120, 90, 80, 80, 80];
// var nodeConstLen = [50, 60, 70, 80, 80];
// var nodeConstLen = [80, 80, 80, 80, 80, 80, 80, 80, 80, 80];
var nodeConstLen = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
// var nodeConstLen = [80, 75, 70, 65, 50]; // 父子节点之间的固定距离
var nodeMinLen = 80; // 无关联节点之间的最小距离
var bfb = 0.5; // 节点之间线的松紧，紧0 - 1松
// var lineDownColor = 'rgb(246, 255, 80)'; // 高亮时的颜色
var lineDownColor = '#6AC1ED'; // 高亮时的颜色
// var lineDownColor = '#aaa'; // 高亮时的颜色
var lineUpColor = textColor; // 非高亮时的颜色
var lineColor = lineUpColor; // 当前线颜色
var nowNodeBoxShadowColor = '#fed71a'; // 当前选中节点盒子阴影颜色
var constraintArr = new Array(); // 记录约束的数组
var setLineArr = new Array(); // 记录要添加线条的数组
var mx, my; // 鼠标上次的位置
var topBoundary = 0; // 边界约束中的边界
var leftBoundary = 0;
var bottomBoundary = treeBoxMain.offsetHeight;
var rightBoundary = treeBoxMain.offsetWidth;
var boundaryMinLength = bottomBoundary * 0.18; //边界约束中和边界的最小距离
var treeBoxMainWidth = treeBoxMain.offsetWidth;
// var treeBoxMainHeight = treeBoxMain.offsetHeight;

// 鼠标拖动的函数
function move(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    if (cx >= leftBoundary + boundaryMinLength && cx <= rightBoundary - boundaryMinLength) {
        nowNode.x = nowNode.x + (cx - mx) / (treeMultiple / 100);
        mx = cx;
    }
    if (cy >= topBoundary + boundaryMinLength && cy <= bottomBoundary - boundaryMinLength) {
        nowNode.y = nowNode.y + (cy - my) / (treeMultiple / 100);
        my = cy;
    }
}

function maintainTreeBox() {
    var bl = treeBoxMainWidth / treeBoxMain.offsetWidth;
    treeBoxMainWidth = treeBoxMain.offsetWidth;
    mx /= bl;
    my /= bl;
    bottomBoundary = treeBoxMain.offsetHeight;
    rightBoundary = treeBoxMainWidth;
    boundaryMinLength = bottomBoundary * 0.18;
    ergodicTree(function (node) {
        node.x /= bl;
        node.y /= bl;
        setPosition(node);
    });
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}

// 缩放时维护坐标
window.addEventListener('resize', maintainTreeBox);

// 给节点添加高亮
function addHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.lineColor = lineDownColor;
    node.line.lineZIndex = 19;
}

// 给节点删除高亮
function removeHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.style.boxShadow = 'none';
    node.lineColor = lineUpColor;
    node.line.lineZIndex = 1;
}

// 操作子节点
function changeChild(node, fun) {
    fun(node);
    var chArr = node.childArr;
    for (var i = 0; i < chArr.length; i++) {
        fun(chArr[i]);
        changeChild(chArr[i], fun);
    }
}

// 添加线的函数
function setline(node1, node2) {
    try {
        treeBoxMain.removeChild(node1.line);
    } catch (e) { }
    node1.line = document.createElement('div');
    var x1 = node1.offsetLeft + node1.offsetWidth / 2;
    var y1 = node1.offsetTop + node1.offsetHeight / 2;
    var x2 = node2.offsetLeft + node2.offsetWidth / 2;
    var y2 = node2.offsetTop + node2.offsetHeight / 2;
    var lineLen = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var xz = (x1 + x2) / 2;
    var yz = (y1 + y2) / 2;
    var k = (y2 - y1) / (x2 - x1);
    var jd = Math.atan(k) * 180 / Math.PI;
    node1.line.style.width = lineLen + 'px';
    node1.line.style.height = '1px';
    node1.line.style.position = 'absolute';
    node1.line.style.left = xz - lineLen / 2 + 'px';
    node1.line.style.top = yz - 0.5 + 'px';
    node1.line.style.zIndex = 1;
    node1.line.style.transform = 'rotate(' + jd + 'deg)';
    node1.line.style.backgroundColor = node1.lineColor;
    node1.line.style.zIndex = node1.lineZIndex;
    node1.line.style.boxShadow = '0px 0px 8px ' + node1.lineColor;
    treeBoxMain.appendChild(node1.line);
}

// 设置节点位置
function setPosition(node) {
    node.style.left = node.x - node.offsetWidth / 2 + 'px';
    node.style.top = node.y - node.offsetHeight / 2 + 'px';
}

// 将元组添加到SetLine(设置线条)中
function addSetLine(node1, node2) {
    setLineArr.push([node1, node2]);
}

// 将元组添加到Constraint(执行约束)中
function addConstraint(node1, node2, type, len) {
    constraintArr.push([node1, node2, type, len]);
}

// 执行约束
function runConstraint(node1, node2, type, len) {
    if (type == 1) { //定长约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    } else if (type == 2) { //最小长度约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    } else if (type == 3) { // 边界约束
        var x2 = node1.x;
        var y2 = node1.y;
        if (x2 < leftBoundary + boundaryMinLength) {
            node1.x = node1.x + (leftBoundary + boundaryMinLength - node1.x) * bfb;
        } else if (x2 > rightBoundary - boundaryMinLength) {
            node1.x = node1.x - (node1.x - rightBoundary + boundaryMinLength) * bfb;
        }
        if (y2 - topBoundary < boundaryMinLength) {
            node1.y = node1.y + (topBoundary + boundaryMinLength - node1.y) * bfb;
        } else if (bottomBoundary - y2 < boundaryMinLength) {
            node1.y = node1.y - (node1.y - bottomBoundary + boundaryMinLength) * bfb;
        }
        setPosition(node1);
    }
}

// 节点数组
var nodeSet = new Array();

// 给树添加相关约束
function addTreeConstraint(root, n) {
    if (!root.father) {
        root.father = null;
    }
    root.layer = n;
    root.x = root.offsetLeft;
    root.y = root.offsetTop;
    root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if (nowNode) {
            nowNode.style.boxShadow = 'none';
            var t = nowNode;
            while (t.father) {
                removeHeightLight(t.father);
                t = t.father;
            }
            changeChild(nowNode, removeHeightLight);
        }
        mx = e.clientX;
        my = e.clientY;
        nowNode = this;
        changeNodeEvent();
        var t = nowNode;
        while (t.father) {
            addHeightLight(t.father);
            t = t.father;
        }
        changeChild(root, addHeightLight);
        nowNode.style.boxShadow = '0px 0px ' + nowNode.offsetHeight + 'px ' + nowNodeBoxShadowColor;
        if (ctrlState && !lockingNode.state) {
            document.addEventListener('mousemove', move);
        }
        if (hideTheme.state) {
            ergodicTree(function (node) {
                node.addClass('hideTheme');
            });
            if (nowNode) {
                var t = nowNode;
                t.removeClass('hideTheme');
                while (t.father) {
                    t = t.father;
                    t.removeClass('hideTheme');
                }
                changeChild(nowNode, function (node) {
                    node.removeClass('hideTheme');
                });
            }
        }
    });
    nodeSet.push(root);
    var arr = root.childArr;
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].father = root;
            addConstraint(arr[i], root, 1, nodeConstLen[n]);
            addSetLine(arr[i], root);
            addTreeConstraint(arr[i], n + 1);
        }
    }
}

// 鼠标抬起事件
document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', move);
});

// 判断节点是否全部加载完的变量
var nodeRequest = 1;

// 递归请求创建树
function createTree(node) {
    node.childArr = new Array();
    node.style.display = 'none';
    node.line = document.createElement('div');
    node.lineColor = lineUpColor;
    node.lineZIndex = 0;
    treeBoxMain.appendChild(node);
    ajax({
        type: 'get',
        url: '/node',
        data: {
            id: node.id
        },
        success: function (res) {
            if (res) {
                node.childIdArr = res.children;
                var theme = document.createElement('div');
                theme.addClass('theme');
                theme.style.color = textColor;
                theme.style.transition = 'color .5s';
                theme.innerText = res.theme;
                node.appendChild(theme);
                node.content = res.content; // 主要内容
                node.editable = res.editable; // 是否可被编辑
                node.userName = res.userName; // 创建者
                node.authorId = res.author; // 创建者Id
                node.lastEditName = res.lastEditName; // 最后修改者
                node.lastEditTime = res.lastEditTime; // 最后修改时间
                node.star = res.star; // 点赞数
                node.stared = res.stared; // 点赞状态
                for (var i = 0; i < node.childIdArr.length; i++) {
                    nodeRequest++;
                    var ch = document.createElement('div');
                    ch.father = node;
                    node.childArr.push(ch);
                    ch.id = node.childIdArr[i];
                    addClass(ch, 'node');
                    ch.style.backgroundColor = randomColor(160, 220);
                    createTree(ch);
                }
                nodeRequest--;
            } else {
                topAlert('节点不存在');
                nodeRequest--;
            }
        }
    })
}

// 创建根节点
var root = document.createElement('div');

// 添加相关样式
addClass(root, 'root');
root.style.backgroundColor = randomColor(120, 180);

// 从根节点开始创建树
function createRoot(rootID) {
    root.id = rootID;
    createTree(root);
}

var nodeMaxSize = 36; // 子节点最大尺寸
var nodeMinSize = 18; // 子节点最小尺寸

// 判断是否所有节点都请求完毕的定时器，全部加载完之后开始添加相关约束
var nodeRequetTimer = setInterval(function () {
    if (nodeRequest == 0) {
        addTreeConstraint(root, 0);

        // 求出最大的点赞数
        var maxStar = 0;
        for (var i = 0; i < nodeSet.length; i++) {
            maxStar = maxStar > nodeSet[i].star ? maxStar : nodeSet[i].star;
        }

        // 初始化所有节点
        for (var i = 0; i < nodeSet.length; i++) {

            // 给所有节点设置宽高圆角和随机位置
            nodeSet[i].style.width = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
            nodeSet[i].style.height = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
            nodeSet[i].style.borderRadius = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) / 2 + 'px';
            nodeSet[i].style.left = getIntRandom(leftBoundary + 3 * boundaryMinLength, rightBoundary - 3 * boundaryMinLength) + 'px';
            nodeSet[i].style.top = getIntRandom(topBoundary + 1.5 * boundaryMinLength, bottomBoundary - 1.5 * boundaryMinLength) + 'px';
            nodeSet[i].style.display = 'block';
            nodeSet[i].x = nodeSet[i].offsetLeft;
            nodeSet[i].y = nodeSet[i].offsetTop;

            // 添加边界约束
            addConstraint(nodeSet[i], null, 3, null);

            // 给没有直接父子关系的节点间添加最小距离约束
            for (var j = i + 1; j < nodeSet.length; j++) {
                if ((nodeSet[i].father != nodeSet[j]) && (nodeSet[j].father != nodeSet[i])) {
                    addConstraint(nodeSet[i], nodeSet[j], 2, nodeMinLen);
                }
            }
        }

        // 根节点最大
        root.style.width = '54px';
        root.style.height = '54px';
        root.style.borderRadius = '27px';

        // 清除定时器
        clearInterval(nodeRequetTimer);
    }
}, 5);

// 遍历某个子树的函数
function ergodicNode(node, fun) {
    fun(node);
    var arr = node.childArr;
    for (var i = 0; i < arr.length; i++) {
        ergodicNode(arr[i], fun);
    }
}

// 遍历整棵树的函数
function ergodicTree(fun) {
    if (fun) {
        fun(root);
        var arr = root.childArr;
        for (var i = 0; i < arr.length; i++) {
            ergodicNode(arr[i], fun);
        }
    }
}

// #向页面中动态的增加一个节点（开发中）
function treeAppendNode(father, nodeData) {
    var node = document.createElement('div');
    node.father = father;
    node.style.backgroundColor = randomColor(100, 180);
    node.addClass('node');
    node.id = 100;
    node.childArr = new Array();
    node.style.display = 'none';
    node.line = document.createElement('div');
    node.lineColor = lineUpColor;
    node.lineZIndex = 0;
    treeBoxMain.appendChild(node);
    node.childIdArr = [];
    var theme = document.createElement('div');
    theme.addClass('theme');
    theme.innerText = nodeData.theme;
    node.appendChild(theme);
    node.content = nodeData.content; // 主要内容
    node.editable = nodeData.editable; // 是否可被编辑
    node.userName = user.userName; // 创建者
    node.authorId = user.userId; // 创建者Id
    node.lastEditName = user.userName; // 最后修改者
    node.lastEditTime = Date.now(); // 最后修改时间
    node.star = 0; // 点赞数
    node.style.display = 'block';
    node.style.left = getIntRandom(leftBoundary + boundaryMinLength, rightBoundary - boundaryMinLength) + 'px';
    node.style.top = getIntRandom(topBoundary + boundaryMinLength, bottomBoundary - boundaryMinLength) + 'px';
    node.x = node.offsetLeft;
    node.y = node.offsetTop;
    // addTreeConstraint(node, father.layer + 1);
    addConstraint(node, father, 1, nodeConstLen[node.layer]);
    addConstraint(node, null, 3, null);
    addSetLine(node, father);
    for (var i = 0; i < nodeSet.length; i++) {
        if (nodeSet[i] != father) {
            addConstraint(node, nodeSet[i], 2, nodeMinLen);
        }
    }
}

// ——————————————————右侧—————————————————— 
var projectIdBox = getDom('.mainBoxRight .projectId h4 span'); // 项目ID
var projectCopyId = getDom('.mainBoxRight .projectId h4 .copyId'); // 复制ID
var btnArr = getDomA('.mainBoxRight .controller .btnBox .btn'); // 按钮数组
var onOffArr = getDomA('.onOffBox .onOff .onOffBorder'); // 开关数组
var addNode = btnArr[0]; // 创建节点
var removeNode = btnArr[1]; // 删除节点
var changeNode = btnArr[2]; // 修改节点
var queryNode = btnArr[3]; // 查询节点
var refreshTree = btnArr[4]; // 刷新树
var operationNodeBox = getDom('.operationNodeBox'); // 操作节点盒子
var operationNodeBoxClose = operationNodeBox.getDom('.close'); // 操作节点盒子中关闭按钮
var operationNodeBoxTheme = operationNodeBox.getDom('h4 input'); // 节点主题
var operationNodeBoxJurisdictionBox = operationNodeBox.getDom('.onOff'); // 允许追加子节点盒子
var operationNodeBoxJurisdiction = operationNodeBox.getDom('.onOff .onOffBorder'); // 允许追加子节点开关
var operationNodeBoxContent = operationNodeBox.getDom('textarea'); // 详细内容
var operationNodeBoxNodeCreator = operationNodeBox.getDom('.nodeCreator'); // 节点创建者
var operationNodeBoxLastRevision = operationNodeBox.getDom('.lastRevision'); // 最后修改
var operationNodeBoxStarBox = operationNodeBox.getDom('.star'); // 点赞按钮
var operationNodeBoxStar = operationNodeBox.getDom('.starPhoto'); // 点赞按钮
var operationNodeBoxStarNumber = operationNodeBox.getDom('.starNumber'); // 点赞数
var operationNodeBoxSubmit = operationNodeBox.getDomA('input')[1]; // 提交按钮
var tipsBox = getDom('.tipsBox'); // 提示框盒子
var tipsTitle = tipsBox.getDom('.boxTitle'); // 提示框标题
var tipsContent = tipsBox.getDom('.content'); // 提示内容n
var tipsClose = tipsBox.getDom('.close'); // 提示盒子右上角的叉
var tipsYes = tipsBox.getDom('.yes'); // 是
var tipsNo = tipsBox.getDom('.no'); // 否
var transparentBaffle = getDom('.transparentBaffle'); // 透明挡板
var nowOperation = 'null'; // 盒子当前状态
var tipsState = 'null'; // 提示盒子状态
var nowNodeBox = getDom('.nowNode'); // 显示当前节点的盒子
var hideLine = onOffArr[0]; // 隐藏节点间线条
var lockingNode = onOffArr[1]; // 锁定所有节点
var hideTheme = onOffArr[2]; // 隐藏无关节点主题

// 初始化
btnDisable(addNode);
btnDisable(removeNode);
btnDisable(changeNode);
btnDisable(queryNode);
refreshTree.jurisdiction = true;
operationNodeBox.hide();
operationNodeBoxClose.hide();
operationNodeBoxTheme.hide();
operationNodeBoxJurisdictionBox.hide();
operationNodeBoxContent.hide();
operationNodeBoxNodeCreator.hide();
operationNodeBoxLastRevision.hide();
operationNodeBoxSubmit.hide();
operationNodeBoxStarBox.hide();
transparentBaffle.hide();

// 按钮随机颜色
for (var i = 0; i < btnArr.length; i++) {
    btnArr[i].style.backgroundColor = randomColor(120, 180);
}

// 初始化ID
projectIdBox.innerText = projectId;

// 添加点击复制ID事件
projectCopyId.addEventListener('click', function () {
    setShearPlateData(projectId);
});

// 按钮禁用
function btnDisable(btn) {
    btn.jurisdiction = false;
    btn.style.cursor = 'not-allowed';
}

// 取消按钮禁用
function btnCancelDisable(btn) {
    btn.jurisdiction = true;
    btn.style.cursor = 'pointer';
}

// 改变当前节点的函数
function changeNodeEvent() {
    if (nowNode) {
        nowNodeBox.children[0].innerText = nowNode.children[0].innerText;
        nowNodeBox.children[1].style.backgroundColor = getCSS(nowNode, 'background-color');
        nowNodeBox.children[1].style.width = nowNode.offsetWidth + 'px';
        nowNodeBox.children[1].style.height = nowNode.offsetHeight + 'px';
        nowNodeBox.children[1].style.borderRadius = nowNode.offsetHeight / 2 + 'px';
        nowNodeBox.children[1].innerText = '';

        // 判断按钮权限
        if (!nowNode.editable || (nowNode.authorId == user.userId)) {
            btnCancelDisable(addNode);
        } else {
            btnDisable(addNode);
        }
        if (nowNode.authorId == user.userId) {
            btnCancelDisable(changeNode);
            if (nowNode.childArr.length == 0) {
                btnCancelDisable(removeNode);
            } else {
                btnDisable(removeNode);
            }
        } else {
            btnDisable(removeNode);
            btnDisable(changeNode);
        }
        btnCancelDisable(queryNode);
    } else {
        // nowNodeBox.children[0].innerText = '请选择节点';
        nowNodeBox.children[0].innerText = '';
        nowNodeBox.children[1].style.backgroundColor = '#ccc';
        nowNodeBox.children[1].style.width = '30px';
        nowNodeBox.children[1].style.height = '30px';
        nowNodeBox.children[1].style.borderRadius = '15px';
        nowNodeBox.children[1].innerText = '?';
        btnDisable(addNode);
        btnDisable(removeNode);
        btnDisable(changeNode);
        btnDisable(queryNode);
    }
}

// 页面加载时先调用一次
changeNodeEvent();

// 关闭按钮的点击事件
operationNodeBoxClose.addEventListener('click', function () {
    nowOperation = 'null';
    operationNodeBox.hide();
    transparentBaffle.hide();
    operationNodeBoxClose.hide();
    operationNodeBoxTheme.hide();
    operationNodeBoxJurisdictionBox.hide();
    operationNodeBoxContent.hide();
    operationNodeBoxNodeCreator.hide();
    operationNodeBoxLastRevision.hide();
    operationNodeBoxSubmit.hide();
});

// 关闭提示框函数
function tipsCloseFunction() {
    tipsState = 'null';
    tipsTitle.innerText = '？';
    tipsContent.innerText = '？？？';
    tipsBox.hide();
    transparentBaffle.hide();
}

// 提示框中关闭按钮点击事件
tipsClose.addEventListener('click', tipsCloseFunction);

// 导出按钮点击事件
operationProject[0].addEventListener('click', function () {
    tipsState = 'exportProject';
    tipsTitle.innerText = '导出项目';
    tipsContent.innerText = '项目将会导出到本地，是否继续';
    tipsBox.show();
    transparentBaffle.show();
});

// 删除按钮点击事件
operationProject[1].addEventListener('click', function () {
    if (projectCreatorId != user.userId) {
        topAlert('您没有权限执行此操作');
    } else {
        tipsState = 'deleteProject';
        tipsTitle.innerText = '删除项目';
        tipsContent.innerText = '此项目将会被删除，是否继续';
        tipsBox.show();
        transparentBaffle.show();
    }
});

// 提示框中确定按钮点击事件
tipsYes.addEventListener('click', function () {
    if (tipsState == 'deleteNode') {
        ajax({
            type: 'delete',
            url: '/node',
            data: {
                nodeId: nowNode.id
            },
            success: function (res) {
                if (res.status_code == '200') {
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else if (tipsState == 'exportProject') {
        window.location = '/util/xmind?project_id=' + projectId;
    } else if (tipsState == 'deleteProject') {
        ajax({
            type: 'delete',
            url: '/project',
            data: {
                id: projectId
            },
            success: function (res) {
                if (res.status_code == '200') {
                    window.location = 'index.html'
                } else {
                    topAlert('删除失败');
                }
            }
        });
    }
    tipsCloseFunction();
});

// 提示框中取消按钮点击事件
tipsNo.addEventListener('click', tipsCloseFunction);

// 创建节点按钮的点击事件
addNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'add';
        operationNodeBox.show();
        transparentBaffle.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = '';
        operationNodeBoxTheme.readOnly = false;
        operationNodeBoxTheme.addClass('editable');
        operationNodeBoxJurisdictionBox.show();
        if (operationNodeBoxJurisdiction.state) {
            onOffChange(operationNodeBoxJurisdiction);
        }
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = '';
        operationNodeBoxContent.readOnly = false;
        operationNodeBoxContent.addClass('textareaEditable');
        operationNodeBoxNodeCreator.hide();
        operationNodeBoxLastRevision.hide();
        operationNodeBoxSubmit.show();
        operationNodeBoxStarBox.hide();
    }
});

// 删除节点按钮的点击事件
removeNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        tipsState = 'deleteNode';
        tipsTitle.innerText = '删除节点';
        tipsContent.innerText = '该操作不可恢复，是否继续';
        tipsBox.show();
        transparentBaffle.show();
    }
});

// 修改节点按钮的点击事件
changeNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'change';
        operationNodeBox.show();
        transparentBaffle.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = nowNode.children[0].innerText;
        operationNodeBoxTheme.readOnly = false;
        operationNodeBoxTheme.addClass('editable');
        operationNodeBoxJurisdictionBox.show();
        if (operationNodeBoxJurisdiction.state) {
            onOffChange(operationNodeBoxJurisdiction);
        }
        if (nowNode.editable) {
            onOffChange(operationNodeBoxJurisdiction);
        }
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = nowNode.content;
        operationNodeBoxContent.readOnly = false;
        operationNodeBoxContent.addClass('textareaEditable');
        operationNodeBoxNodeCreator.hide();
        operationNodeBoxLastRevision.hide();
        operationNodeBoxSubmit.show();
        operationNodeBoxStarBox.hide();
    }
});

// 查看节点按钮的点击事件
queryNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'query';
        operationNodeBox.show();
        transparentBaffle.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = nowNode.children[0].innerText;
        operationNodeBoxTheme.readOnly = true;
        operationNodeBoxTheme.removeClass('editable');
        operationNodeBoxJurisdictionBox.hide();
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = nowNode.content;
        operationNodeBoxContent.readOnly = true;
        operationNodeBoxContent.removeClass('textareaEditable');
        operationNodeBoxNodeCreator.show();
        operationNodeBoxNodeCreator.children[0].innerText = nowNode.userName;
        operationNodeBoxLastRevision.show();
        var date = new Date(nowNode.lastEditTime - 0);
        var str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        operationNodeBoxLastRevision.children[0].innerText = nowNode.lastEditName + ' ' + str;
        operationNodeBoxSubmit.hide();
        // operationNodeBoxStar.innerText = nowNode.star;
        if (nowNode.stared) {
            operationNodeBoxStar.replaceClass('starFalse', 'starTrue');
        } else {
            operationNodeBoxStar.replaceClass('starTrue', 'starFalse');
        }
        operationNodeBoxStarNumber.innerText = nowNode.star;
        operationNodeBoxStarBox.show();
    }
});

// 刷新按钮点击事件
refreshTree.addEventListener('click', function () {
    location.reload();
});

// 操作节点框中提交按钮点击事件
operationNodeBoxSubmit.addEventListener('click', function () {
    if (nowOperation == 'add') {
        var inpTheme = operationNodeBoxTheme.value;
        if (inpTheme.length <= 0) {
            topAlert('节点主题不能为空');
            return;
        } else if (inpTheme.length >= 20) {
            topAlert('节点主题不能超过20个字符');
            return;
        }
        var inpContent = operationNodeBoxContent.value;
        if (inpContent.length == 0) {
            inpContent = '暂无';
        }
        ajax({
            type: 'post',
            url: '/node',
            data: {
                content: inpContent,
                editable: operationNodeBoxJurisdiction.state,
                theme: inpTheme,
                parentId: nowNode.id,
                projectId: projectId
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else if (nowOperation == 'change') {
        var inpTheme = operationNodeBoxTheme.value;
        if (inpTheme.length <= 0) {
            topAlert('节点主题不能为空');
            return;
        } else if (inpTheme.length >= 20) {
            topAlert('节点主题不能超过20个字符');
            return;
        }
        var inpContent = operationNodeBoxContent.value;
        if (inpContent.length == 0) {
            inpContent = '暂无';
        }
        ajax({
            type: 'put',
            url: '/node',
            data: {
                id: nowNode.id,
                theme: inpTheme,
                content: inpContent,
                editable: operationNodeBoxJurisdiction.state,
                projectId: projectId
            },
            header: {
                'Content-Type': 'application/json',
                "X-HTTP-Method-Override": "PUT"
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else {
        topAlert('淦');
    }
});

// 点赞按钮点击事件
operationNodeBoxStar.addEventListener('click', function () {
    ajax({
        type: 'put',
        url: '/util',
        data: {
            nodeId: nowNode.id
        },
        header: {
            'Content-Type': 'application/json',
            "X-HTTP-Method-Override": "PUT"
        }, // 请求头
        success: function (res) {
            if (res.status_code == '200') {
                if (nowNode.stared) {
                    nowNode.star--;
                    operationNodeBoxStarNumber.innerText = nowNode.star;
                    nowNode.stared = false;
                    operationNodeBoxStar.replaceClass('starTrue', 'starFalse');
                } else {
                    nowNode.star++;
                    operationNodeBoxStarNumber.innerText = nowNode.star;
                    nowNode.stared = true;
                    operationNodeBoxStar.replaceClass('starFalse', 'starTrue');
                }
            } else {
                topAlert('操作失败');
            }
        }
    });
});

// 循环按钮精灵图
cycleSprite(btnArr, 0, 0, 40);

// 开关切换函数
function onOffChange(onOff) {
    if (onOff.state) {
        onOff.state = false;
        onOff.style.backgroundColor = '#2c3e50';
        onOff.children[0].style.left = '1.5px';
        onOff.children[0].style.backgroundColor = ' #46607b';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffFalse.png)';
    } else {
        onOff.state = true;
        onOff.style.backgroundColor = '#16a085';
        onOff.children[0].style.left = '23.5px';
        onOff.children[0].style.backgroundColor = '#1abc9c';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffTrue.png)';
    }
}

// 开关初始化函数
function setOnOffEvent(onOff, fun) {
    onOff.state = false;
    if (fun) {
        onOff.addEventListener('click', function () {
            onOffChange(this);
            fun();
        });
    } else {
        onOff.addEventListener('click', function () {
            onOffChange(this);
        });
    }
}

// 隐藏无关节点间线条函数
function hideLineClick() {
    if (hideLine.state) {
        lineUpColor = mainColor;
        ergodicTree(function (node) {
            node.lineColor = mainColor;
        });
        if (nowNode) {
            var t = nowNode;
            while (t.father) {
                t = t.father;
                t.lineColor = 'rgb(106, 193, 237)';
            }
            changeChild(nowNode, function (node) {
                node.lineColor = 'rgb(106, 193, 237)';
            });
        }
    } else {
        lineUpColor = textColor;
        ergodicTree(function (node) {
            node.lineColor = textColor;
        });
        if (nowNode) {
            var t = nowNode;
            while (t.father) {
                t = t.father;
                t.lineColor = 'rgb(106, 193, 237)';
            }
            changeChild(nowNode, function (node) {
                node.lineColor = 'rgb(106, 193, 237)';
            });
        }
    }
}

// 隐藏节点间线条
setOnOffEvent(hideLine, hideLineClick);

// 锁定所有节点
setOnOffEvent(lockingNode);

// 隐藏无关节点主题
setOnOffEvent(hideTheme, function () {
    if (hideTheme.state) {
        ergodicTree(function (node) {
            node.addClass('hideTheme');
        });
        if (nowNode) {
            var t = nowNode;
            t.removeClass('hideTheme');
            while (t.father) {
                t = t.father;
                t.removeClass('hideTheme');
            }
            changeChild(nowNode, function (node) {
                node.removeClass('hideTheme');
            });
        }
    } else {
        ergodicTree(function (node) {
            node.removeClass('hideTheme');
        });
    }
});

// 设置节点允许追加子节点
setOnOffEvent(operationNodeBoxJurisdiction);

// 维护约束的定时器
setInterval(function () {
    if (!lockingNode.state) {
        for (var i = 0; i < constraintArr.length; i++) {
            var node1 = constraintArr[i][0];
            var node2 = constraintArr[i][1];
            var type = constraintArr[i][2];
            var len = constraintArr[i][3];
            runConstraint(node1, node2, type, len);
        }
    }
}, 5);

// 维护节点间线条的定时器
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, 5);

// ——————————页面加载完之后发送请求——————————
window.onload = function () {

    // 请求项目页面
    ajax({
        type: 'get',
        url: '/project',
        data: {
            id: projectId
        },
        success: function (res) {
            introduceP.innerText = res.introduction;
            projectCreatorId = res.author;
            projectCreatorName.innerText = res.creatorName;
            generateParticipant(res.contributors);
            projectName.innerText = res.name;
            projectLevel.innerText = res.rank;
            var date = new Date(res.createTime - 0);
            var str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            creationDate.innerText = str;
            date = new Date(res.deadline - 0);
            str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            closingDate.innerText = str;
            progressCountDown.innerText = calculateRemainingTime(res.deadline - Date.now());
            var progress = (1 - (res.deadline - Date.now()) / (res.deadline - res.createTime)) * 100;
            progressContent.style.width = progress + '%';
            progressWave.style.left = progress + '%';
            createRoot(res.headNodeId);
        }
    });
}