// 引入工具类js
// document.write("<script language='javascript' src='js/concise.js'></script>");
// document.write("<script language='javascript' src='js/toolFunction.js'></script>");

var tool = new Tool(document, window);
tool.textProhibition();


// 获取快捷键按钮
var shortcut = getDom(".shortcutKey");
// 获取帮助按钮
var help = getDom('.help');
// 获取快捷键框
var shotcutNav = getDom(".shortcut_nav");

//快捷键显示
clickOpenBlankClose(shortcut, shotcutNav);



//放大新建

// 获取新建盒子
var changeEst = getDom(".change_est");
// 获取加入盒子
var changeJoin = getDom(".change_join");
//获取新建输入大盒子
var estBig = getDom(".est_bigBox");
//获取加入输入大盒子
var joinBig = getDom(".join_bigBox");
//获取加入外盒子
var join = getDom(".join");
//获取新建外盒子
var establish = getDom(".establish");
//获取新建提示
var estTips = getDom(".est_tips");
//获取新建提示
var joinTips = getDom(".join_tips");

// 选中提示
changeEst.addEventListener("mouseover", function () {
    estTips.style.animation = "show 0.5s ease-in-out 0s forwards  normal"
})
changeEst.addEventListener("mouseout", function () {
    estTips.style.animation = ""
})
changeJoin.addEventListener("mouseover", function () {
    joinTips.style.animation = "show 0.5s ease-in-out 0s forwards  normal"
})
changeJoin.addEventListener("mouseout", function () {
    joinTips.style.animation = ""
})


// 点击新建放大
changeEst.addEventListener("click", function () {
    changeEst.style.animation = "toEstBig 0.3s ease-in-out 0s forwards  normal";
    changeJoin.style.animation = "toSmall 0.3s ease-in-out 0s forwards normal";
    estTips.style.animation = ""
    joinTips.style.display = "none";
    setTimeout(function () {
        changeEst.style.display = "none";
        join.style.display = "none";
        estBig.style.display = "block";
    }, 200);
})
// 点击加入放大
changeJoin.addEventListener("click", function () {
    changeEst.style.animation = "toSmall 0.3s ease-in-out 0s forwards  normal";
    changeJoin.style.animation = "toJoinBig 0.3s ease-in-out 0s forwards normal";
    joinTips.style.animation = ""
    estTips.style.display = "none";
    setTimeout(function () {
        changeJoin.style.display = "none";
        establish.style.display = "none";
        joinBig.style.display = "block";
    }, 200);
})

// 新建返回
var back = getDomA(".back");
back[0].addEventListener("click", function () {
    changeEst.style.animation = "";
    changeJoin.style.animation = "";
    //新建返回
    changeEst.style.display = "inline-block";
    join.style.display = "inline-block";
    estBig.style.display = "none";
    joinTips.style.display = "table";
})
back[1].addEventListener("click", function () {
    changeEst.style.animation = "";
    changeJoin.style.animation = "";
    estTips.style.display = "table";
    //加入返回
    changeJoin.style.display = "inline-block";
    establish.style.display = "inline-block";
    joinBig.style.display = "none";
    inputID.removeClass("idPd");
})



//个人下拉框
//获取下拉框
var spinner = getDom(".spinner");
//获取个人框
var headNav = getDom(".head_nav");
clickOpenBlankClose(headNav, spinner);

//是否公开选择-----------
var onOff = getDom(".onOffBorder");
var onOffRod = getDom(".onOffRod");
//初始状态
onOff.state = false;

//点击改变
onOff.addEventListener('click', function () {

    if (onOff.state) {
        onOff.state = false;
        onOff.style.backgroundColor = '#2c3e50';
        onOffRod.style.left = '1.5px';
        onOffRod.style.backgroundColor = ' #46607b';
        onOffRod.innerText = 'x';
    } else {
        onOff.state = true;
        onOff.style.backgroundColor = '#16a085';
        onOffRod.style.left = '23.5px';
        onOffRod.style.backgroundColor = '#1abc9c';
        onOffRod.innerText = '✔';
    }
})

// 表单判断------------
// 获取加入按钮
var joinBut = getDom(".click_join");

// 获取输入id框
var inputID = getDom(".inputID");

function joinButClick() {
    if (inputID.value == "请输入项目ID") {
        inputID.addClass("idPd");
    } else {
        var idnum = inputID.value;
        ajax({
            type: 'get',
            url: '/util/project',
            data: {
                id: idnum
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    window.location.href = "/project.html?" + "project_id=" + idnum; //跳转页面
                    // "test2.html?"+"txt="+encodeURI(s.value);
                } else {
                    topAlert("该房间不存在");
                }
            }
        });
    }
}
//回车进入
inputEnterEvent(inputID, joinButClick);

// 点击进入
joinBut.addEventListener("click", joinButClick);

// 移除样式
inputID.addEventListener("click", function () {
    inputID.removeClass("idPd");
});

inputTips(inputID, "请输入项目ID", "idTips");



// 新建交互------
// 获取新建按钮
var estBut = getDom(".click_est");

//获取项目名称
var inputName = getDom(".inputName");

// 获取简介框
var introduceInput = getDom(".introduce_input");


//获取时间
var timeInput = getDom("#projectTime");
//获取等级
var rankInput = getDom("#projectRank");

var timeArr = [123456, 234567, 345678, 456789];

estBut.addEventListener("click", function () {
    if (inputName.value == "") {
        inputName.style.color = "rgb(196, 60, 60)";
        inputName.style.boxShadow = "0 0 5px rgb(196, 60, 60)";
    } else {
        var createTime = Date.now();
        var name = inputName.value;
        var indu = introduceInput.value;
        var index = (timeInput.selectedIndex);
        var time = timeArr[index];
        var rank = rankInput.options[rankInput.selectedIndex].text;
        if (onOffRod.innerText == '✔') {
            var public = true;
        } else {
            var public = false;
        }
        ajax({
            type: 'post',
            url: '/project',
            data: {
                public: public,
                name: name,
                deadline: createTime + time,
                rank: rank,
                createTime: createTime,
                introduction: indu
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    window.location.href = "/project.html?project_id=" + res.project_id; //跳转页面
                    // "test2.html?"+"txt="+encodeURI(s.value);
                } else {
                    topAlert("项目创建失败");
                }
            }
        });
    }
})
inputName.addEventListener("click", function () {
    inputName.style.color = "#132C33";
    inputName.style.boxShadow = "";
})






var sum = getDom(".sum");

//字数限制
introduceInput.addEventListener("keyup", function () {
    sum.innerText = introduceInput.value.length + "/200";
    if (introduceInput.value.length > 200)
        sum.style.color = "rgb(196, 60, 60)";
    else {
        sum.style.color = "#88b3c4";
    }
})

//获取个人中心按钮
var center = getDom(".presonal_cen");
//跳转到个人中心
center.addEventListener("click", function () {
    window.location.href = "/project.html?id=" + getCookie("user_id"); //跳转页面
})

//获取用户id
var loginPd = getCookie("user_id");
//个人容器
var personal = getDom(".personal");
//获取登录注册容器
var logOn = getDom(".logOn");
//获取昵称框
var nameU = getDom(".user_name");
//获取用户名
var userName = getCookie("user_name");

//判断是否登录------------
if (loginPd == null) {
    personal.style.display = "none";
    logOn.style.display = "block";
} else {
    personal.style.display = "block";
    logOn.style.display = "none";
    nameU.innerText = userName;
}