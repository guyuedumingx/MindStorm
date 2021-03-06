// 引入工具类js
// document.write("<script language='javascript' src='js/concise.js'></script>");
// document.write("<script language='javascript' src='js/toolFunction.js'></script>");

var tool = new Tool(document, window);
tool.textProhibition();
//-----------------------------------------------------
// // 获取快捷键按钮
// var shortcut = getDom(".shortcutKey");
// // 获取帮助按钮
// var help = getDom('.help');
// // 获取快捷键框
// var shotcutNav = getDom(".shortcut_nav");

// //快捷键显示
// clickOpenBlankClose(shortcut, shotcutNav);

//获取用户id
var loginPd = getCookie("user_id");
//获取用户名
var userName = getCookie("user_name");
//个人容器
var personal = getDom(".personal");
//获取外部昵称框
// var nameU = getDom(".user_name");
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
        error: function () {}
    });

}
userMess(head, headBox, emailBox, perSig);

//判断是否登录------------
if (loginPd == null) {
    personal.style.display = "none";
} else {
    personal.style.display = "block";
    //调用获取用户信息
    // userMess(headBox, emailBox, perSig);
    // nameU.innerText = userName;
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
    nameBox.readOnly = true;
    nameBox.style.borderBottom = "";
});

//----------------------------------------------

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
    if (!loginPd) {
        window.location.href = "/login.html";
    } else {
        changeEst.style.animation = "toEstBig 0.3s ease-in-out 0s forwards  normal";
        changeJoin.style.animation = "toSmall 0.3s ease-in-out 0s forwards normal";
        estTips.style.animation = ""
        joinTips.style.display = "none";
        setTimeout(function () {
            changeEst.style.display = "none";
            join.style.display = "none";
            estBig.style.display = "block";
        }, 200);
    }
})
// 点击加入放大
changeJoin.addEventListener("click", function () {
    if (!loginPd) {
        window.location.href = "/login.html";
    } else {
        changeEst.style.animation = "toSmall 0.3s ease-in-out 0s forwards  normal";
        changeJoin.style.animation = "toJoinBig 0.3s ease-in-out 0s forwards normal";
        joinTips.style.animation = ""
        estTips.style.display = "none";
        setTimeout(function () {
            changeJoin.style.display = "none";
            establish.style.display = "none";
            joinBig.style.display = "block";
        }, 200);
    }

})






//是否公开选择-----------
var onOff = getDom(".onOffBorder");
var onOffRod = getDom(".onOffRod");
//初始状态
onOff.state = false;
//设置口令框
var passwordChoice = getDom(".passwordChoice");

//点击改变
onOff.addEventListener('click', function () {
    if (onOff.state) {
        onOff.state = false;
        onOff.style.backgroundColor = '#2c3e50';
        onOff.children[0].style.left = '1.5px';
        onOff.children[0].style.backgroundColor = ' #46607b';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffFalse.png)';
        introduceInput.style.height = "180px";
        passwordChoice.style.display = "none";
    } else {
        onOff.state = true;
        onOff.style.backgroundColor = '#16a085';
        onOff.children[0].style.left = '23.5px';
        onOff.children[0].style.backgroundColor = '#1abc9c';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffTrue.png)';
        introduceInput.style.height = "141px";
        passwordChoice.style.display = "flex";
    }
})
//是否设置口令-----------
var onOffP = getDom(".onOffBorderP");
var onOffRodP = getDom(".onOffRodP");
//初始状态
onOffP.state = false;
//口令框架
var passwordC = getDom(".passwordC");
var projectPassword = getDom("#projectPassword");
//点击改变
onOffP.addEventListener('click', function () {
    if (onOffP.state) {
        onOffP.state = false;
        onOffP.style.backgroundColor = '#2c3e50';
        onOffP.children[0].style.left = '1.5px';
        onOffP.children[0].style.backgroundColor = ' #46607b';
        onOffP.children[0].style.backgroundImage = 'url(img/public_onOffFalse.png)';
        passwordC.style.color = "rgb(190, 190, 190)";
        projectPassword.style.color = "rgb(190, 190, 190)";
        passwordC.style.pointerEvents = "none";
    } else {
        onOffP.state = true;
        onOffP.style.backgroundColor = '#16a085';
        onOffP.children[0].style.left = '23.5px';
        onOffP.children[0].style.backgroundColor = '#1abc9c';
        onOffP.children[0].style.backgroundImage = 'url(img/public_onOffTrue.png)';
        passwordC.style.color = "#214B5B";
        projectPassword.style.color = "#214B5B";
        passwordC.style.pointerEvents = "auto";
    }
})

// 表单判断------------
// 获取加入按钮
var joinBut = getDom(".click_join");
var joinBut2 = getDom(".click2");

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
                    if (res.hasPassword == "true") {
                        var joinPassword = res.password;
                        password(idnum, joinPassword);
                    } else {
                        window.location.href = "/project_p.html?" + "project_id=" + idnum; //跳转页面
                        // "test2.html?"+"txt="+encodeURI(s.value);
                    }
                } else {
                    topAlert("该房间不存在");
                }
            }
        });
    }
}

function but2(idnum, joinPassword) {
    if (inputID.value == "") {
        alert("请输入口令");
    } else {
        var inputPass = inputID.value;
        if (inputPass == joinPassword) {
            window.location.href = "/project_p.html?" + "project_id=" + idnum; //跳转页面
        } else {
            topAlert("口令错误");
        }
    }
}
// 输入口令
function password(idnum, joinPassword) {
    joinBut.style.display = "none";
    joinBut2.style.display = "block";
    // inputID.type = "password";
    inputTips(inputID, "", "idTips");
    getDom(".join_til").innerText = "项目口令";
    joinBut2.addEventListener("click", function () {
        but2(idnum, joinPassword);
    })
    inputEnterEvent(inputID, function () {
        if (getDom(".join_til").innerText == "项目口令") {
            but2(idnum, joinPassword);
        }
    });
}


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
    if (getDom(".join_til").innerText == "加入项目") {
        changeEst.style.animation = "";
        changeJoin.style.animation = "";
        estTips.style.display = "table";
        //加入返回
        changeJoin.style.display = "inline-block";
        establish.style.display = "inline-block";
        joinBig.style.display = "none";
        inputID.removeClass("idPd");
    } else {
        // inputID.type = "text";
        inputTips(inputID, "请输入项目ID", "idTips");
        getDom(".join_til").innerText = "加入项目";
        inputID.removeClass("idPd");
        joinBut.style.display = "block";
        joinBut2.style.display = "none";
        joinBut2.removeEventListener("click", but2)
    }
})

//回车进入
inputEnterEvent(inputID, function () {
    if (getDom(".join_til").innerText == "加入项目") {
        joinButClick();
    }
});
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

var timeArr = [86400000, 259200000, 604800000, 2592000000, 7776000000, 15552000000, 31104000000];

estBut.addEventListener("click", function () {
    console.log(passwordPP);
    if (inputName.value == "") {
        inputName.style.color = "rgb(196, 60, 60)";
        inputName.style.boxShadow = "0 0 5px rgb(196, 60, 60)";
    } else if (introduceInput.value.length > 200) {
        topAlert("超字数啦啦啦啦！")
    } else {
        var passwordPP = projectPassword.value;
        var createTime = Date.now();
        var name = inputName.value;
        var indu = introduceInput.value;
        if (!indu)
            indu = "暂无";
        var index = (timeInput.selectedIndex);
        var time = timeArr[index];
        var rank = rankInput.options[rankInput.selectedIndex].text;
        if (onOffRod.state) {
            var public = true;
        } else {
            var public = false;
        }
        ajax({
            type: 'post',
            url: '/project',
            data: {
                public: !public,
                name: name,
                deadline: createTime + time,
                rank: rank,
                createTime: createTime,
                introduction: indu,
                password: passwordPP
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    window.location.href = "/project_p.html?project_id=" + res.project_id; //跳转页面
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

// //获取个人中心按钮
// var center = getDom(".presonal_cen");
// //跳转到个人中心
// center.addEventListener("click", function () {
//     window.location.href = "/project.html?id=" + getCookie("user_id"); //跳转页面
// })

//导入
var importNav = getDom(".import");

function UpladXmind() {
    var file = importNav.files[0];
    //创建formdata对象
    var formdata = new FormData();
    formdata.append("file", file);
    //获取文件后缀
    var format = file.name.slice(file.name.lastIndexOf('.') + 1);
    var extName = "XMIND";
    //首先对格式进行验证
    if (extName.indexOf(format.toUpperCase()) == -1) {
        topAlert("您只能导入xmind格式的文件");
    } else {
        ajax({
            type: 'post',
            url: '/util/xmind',
            data: formdata,
            // header: {"Content-Type": "multipart/form-data;boundary="+getIntRandom(1,10)},
            success: function (res) {
                if (res.status_code == '200') {
                    window.location.href = "/project_p.html?project_id=" + res.project_id; //跳转页面
                    // "test2.html?"+"txt="+encodeURI(s.value);
                } else {
                    topAlert("导入失败");
                }
            }
        }, true);
    }

}
importNav.addEventListener("change", UpladXmind);

var mainColor = '#1e1e1e'; // 主背景色
var modularColor = 'rgb(51, 51, 51)'; // 模块背景色
var textColor = 'rgba(255, 255, 255, 0.8)'; // 文字颜色
var textLightColor = 'rgba(255, 167, 15)'; // 文本高亮色
var progressColor = '#cccccc'; // 进度条颜色
var progressBoxColor = '#666666'; // 进度条盒子颜色
//主题-----------------------
function changeColor() {
    //标题颜色
    getDom(".mainTitle").style.color = textColor;
    //页面底色
    getDom("body").style.backgroundColor = mainColor;
    //大盒子底色
    getDom(".est_bigBox").style.backgroundColor = progressBoxColor;
    getDom(".est_bigBox").style.color = textColor;
    getDom(".join_bigBox").style.backgroundColor = progressBoxColor;

    //提示颜色
    getDom(".est_tips").style.color = textColor;
    getDom(".join_tips").style.color = textColor;
    //标题yans
    getDom(".est_til").style.color = textColor;
    getDom(".join_til").style.color = textColor;
    //加入输入框颜色
    getDom(".input_nav").style.borderColor = textColor;
    getDom(".click_join").style.borderColor = textColor;
    //加入输入文字颜色
    // getDom(".inputID").style.color = textColor;
    //新建按钮
    getDom(".click_est").style.backgroundColor = progressColor;
    getDom(".click_est").style.color = textColor;
    //小盒子
    var smallBox = getDomA(".smallBox");
    for (var i = 0; i < smallBox.length; i++) {
        //背景色
        smallBox[i].style.backgroundColor = progressBoxColor;
    }
}
// changeColor();