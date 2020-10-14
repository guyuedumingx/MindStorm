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


// 点击进入
joinBut.addEventListener("click", function () {
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
                if (res.state_code == '200') {
                    window.location.href = "/project.html?" + "id=" + idnum; //跳转页面
                    // "test2.html?"+"txt="+encodeURI(s.value);
                } else {
                    topAlert("该房间不存在");
                }
            }
        });
    }
})

// 移除样式
inputID.addEventListener("click", function () {
    inputID.removeClass("idPd");
})

inputTips(inputID, "请输入项目ID", "idTips");



// 新建交互------
// 获取新建按钮
var estBut = getDom(".click_est");
estBut.addEventListener("click", function () {
    if (inputName.value == "") {
        inputName.style.color = "red";
    } else {
        var idnum = inputID.value;
        ajax({
            type: 'get',
            url: '/user/register',
            data: {
                id: idnum
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res == '200') {
                    window.location.href = "/project.html?" + "id=" + idnum; //跳转页面
                    // "test2.html?"+"txt="+encodeURI(s.value);
                } else {
                    topAlert("该房间不存在");
                }
            }
        });
    }
})





// 获取简介框
var introduceInput = getDom(".introduce_input");

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