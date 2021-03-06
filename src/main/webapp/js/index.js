var tool = new Tool(document, window);
tool.textProhibition();

var mainColor = '#1e1e1e'; // 主背景色
var modularColor = 'rgb(51, 51, 51)'; // 模块背景色
var textColor = 'rgba(255, 255, 255, 0.8)'; // 文字颜色
var textLightColor = 'rgba(255, 167, 15)'; // 文本高亮色
var progressColor = '#cccccc'; // 进度条颜色
var progressBoxColor = '#666666'; // 进度条盒子颜色

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

//获取项目盒子
var personalNav = getDom(".personalNav");
var shareNav = getDom(".shareNav");
var searchNav = getDom(".searchNav");

//保存返回项目
var userProject;
//我参加的项目
var userProjectLength;
//请求获得数组对象-----------
function userMess(head, headBox, emailBox, perSig) {
    if (!loginPd) {
        window.location = "newHand.html";
    }
    ajax({
        type: 'get',
        url: '/user',
        data: {},
        header: {},
        success: function (res) {

            //项目数组--
            userProject = res.recentProject;
            // 长度
            userProjectLength = userProject.length;
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
            addLiBox(userProjectLength, userProject, personalNav)
        },
        error: function () {}
    });



}

//判断是否登录------------
if (loginPd == null) {
    personal.style.display = "none";
} else {
    personal.style.display = "block";
    //调用获取用户信息
    // userMess(headBox, emailBox, perSig);
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

//修改---------------------------------
//获取修改按钮
var modifyN = getDom(".modifyN");
var modifyS = getDom(".modifyS");
//点击修改
modifyN.addEventListener("click", function () {
    nameBox.readOnly = false;
    nameBox.style.borderBottom = "solid 1px";
});
modifyS.addEventListener("click", function () {
    perSig.readOnly = false;
    perSig.style.borderBottom = "solid 1px";
});
//回车修改cookie
nameBox.inputEnterEvent(function () {
    ajax({
        type: 'post',
        url: '/user',
        data: {
            name: nameBox.value,
            signature: perSig.value
        },
        // header: {
        //     'Content-Type': 'application/json'
        // }, // 请求头
        success: function (res) {

        }
    });
    document.cookie = "user_name=" + nameBox.value;
    nameBox.value = nameBox.value;
    nameU.innerText = nameBox.value;
    nameBox.readOnly = true;
    nameBox.style.borderBottom = "";
});
perSig.inputEnterEvent(function () {
    ajax({
        type: 'post',
        url: '/user',
        data: {
            name: nameBox.value,
            signature: perSig.value
        },
        // header: {
        //     'Content-Type': 'application/json'
        // }, // 请求头
        success: function (res) {

        }
    });
    perSig.value = perSig.value;
    perSig.readOnly = true;
    perSig.style.borderBottom = "";
});

//搜索---------------------------
//搜索框
var searchCont = getDom(".searchCont");
//搜索按钮
var searchBut = getDom(".iconS");

function search() {
    if (searchBut.state) {
        searchBut.state = false;
        setTimeout(function () {
            searchBut.state = true;
        }, 2000);
        var content = searchCont.value;
        if (!content) {
            topAlert("请输入内容！");
        } else {
            ajax({
                type: 'put',
                url: '/project',
                data: {
                    key: content
                },
                header: {
                    'Content-Type': 'application/json'
                }, // 请求头
                success: function (res) {
                    if (res.status_code == '200') {
                        if (getDom(".noneP")) {
                            getDom(".noneP").parentNode.removeChild(getDom(".noneP"));
                        }
                        // <<<<<<< 原来
                        // projectSize(searchNav);
                        // searchNav.style.display = "block";
                        // =======
                        personalNav.hide();
                        shareNav.hide();
                        searchNav.show();
                        projectSize(searchNav);
                        // >>>>>>> 传入的更改

                        removeLi();
                        //项目数组--
                        searchProject = res.result;
                        // 长度
                        searchProjectLength = searchProject.length;

                        addLiBox(searchProjectLength, searchProject, searchNav)
                        personalBox.style.backgroundColor = "";
                        personalBox.style.color = "#214B5B";
                        shareBox.style.backgroundColor = "";
                        shareBox.style.color = "#214B5B";

                    } else {
                        topAlert("搜索失败");
                    }
                }
            });
        }
    }

}



//高度自适应--------------------
function heightAuto() {
    //获取主要内容框架
    var mainBox = getDom(".mainBox");
    //项目离顶部距离
    mainBox.style.top = "60px";
}
heightAuto();

window.addEventListener('resize', heightAuto);

// 项目添加-------------------------------------

// 获取公开项目
var shareBox = getDom(".shareBox");

textVerticalCenter(shareBox);
// 获取参加项目
var personalBox = getDom(".personalBox");

//获取新建加入按钮
var buildJoin = getDom(".buildJoin");


// 文字垂直居中
textVerticalCenter(buildJoin);


textVerticalCenter(personalBox);


// 项目大小
function projectSize(project) {
    //获取project显示框架
    var projectWidth = project.offsetWidth;
    var projectHeight = project.offsetHeight;
    //获取项目大框架
    var projectLi = getDom(".projectLi", project);
    //获取project板块
    var liNav = getDomA(".liNav", project);
    projectLi.style.width = projectWidth * liNav.length + "px";

    for (var i = 0; i < liNav.length; i++) {
        liNav[i].style.width = projectWidth + "px";
        liNav[i].style.height = projectHeight + "px";
    }
}

// 板块切换-----------
// 开始样式
function start() {
    personalBox.style.backgroundColor = "#D1DADA";
    personalBox.style.color = "#071F3D";
    projectSize(personalNav);
    window.addEventListener('resize', function () {
        projectSize(personalNav);
        projectSize(shareNav);
        projectSize(searchNav);
    });
}
start();
// 点击共享项目
shareBox.addEventListener("click", function () {
    shareBox.style.backgroundColor = "#D1DADA";
    shareBox.style.color = "#071F3D";
    shareNav.style.display = "block";
    personalBox.style.backgroundColor = "";
    personalBox.style.color = "#214B5B";
    personalNav.style.display = "none";
    searchNav.style.display = "none";
    projectSize(personalNav);
    projectSize(searchNav);
    projectSize(shareNav);
    var ulChild = getDom(".projectLi", shareNav);
    var liChild = ulChild.children.length;
    if (liChild == 0) {
        noProject(shareNav);
    }

});
// 点击参加项目
personalBox.addEventListener("click", function () {
    personalBox.style.backgroundColor = "#D1DADA";
    personalBox.style.color = "#071F3D";
    personalNav.style.display = "block";
    shareBox.style.backgroundColor = "";
    shareBox.style.color = "#214B5B";
    shareNav.style.display = "none";
    searchNav.style.display = "none";
    projectSize(personalNav);
    projectSize(searchNav);
    projectSize(shareNav);
});

// 项目板块----------------

//li背景-----------
function liStyle(liArr) {
    for (var i = 0; i < liArr.length; i++) {
        var liChild = liArr[i].children.length;
        if (liChild == 0) {
            liArr[i].style.backgroundColor = "transparent";
            liArr[i].className = "";
        } else {
            liArr[i].className = "boxS";
        }
    }
}

//左右移动
function move(y, projectNav) {
    //获取project显示框架
    var projectWidth = projectNav.offsetWidth;
    projectNav.moveFlag = true;
    var rightBut = getDom(".rightBut", projectNav);
    var leftBut = getDom(".leftBut", projectNav);
    var projectLiA = getDom(".projectLi", projectNav);
    var x = 1;
    if (x == 1) {
        leftBut.style.display = "none";
    }
    rightBut.addEventListener("click", function () {
        if (!projectNav.moveFlag) {
            return;
        }
        projectNav.moveFlag = false;
        moveLeftRight(projectLiA, "left", (-projectWidth), projectWidth / 10, function () {
            projectNav.moveFlag = true;
        });
        x++;
        leftBut.style.display = "block";
        if (x == y) {
            rightBut.style.display = "none";
        }
    })
    leftBut.addEventListener("click", function () {
        if (!projectNav.moveFlag) {
            return;
        }
        projectNav.moveFlag = false;
        moveLeftRight(projectLiA, "left", (projectWidth), projectWidth / 10, function () {
            projectNav.moveFlag = true;
        });
        x--;
        rightBut.style.display = "block";
        if (x == 1) {
            leftBut.style.display = "none";
        }
    })
}
//获取左右按钮-----------------
//project 父元素
//liArr 项目长度
function butStyle(projectNav, liArr, x) {
    var leftBut = getDom(".leftBut", projectNav);
    var rightBut = getDom(".rightBut", projectNav);
    if (liArr.length < 7) {
        leftBut.style.display = "none";
        rightBut.style.display = "none";
    } else {
        //左右滑动
        move(x, projectNav);
        window.addEventListener('resize', function () {
            move(x, projectNav);
        });
    }
}
var ddlColor = new getGradientColor("rgb(189, 204, 210)", "rgb(33, 75, 91)");
//项目添加---------
function addLi(li, name, introduce, author, number, projectID, projectTime) {
    var divName = document.createElement("div");
    divName.className = "projectName";
    divName.innerText = name;
    divName.title = name;
    var divIn = document.createElement("div");
    divIn.className = "introduce";
    divIn.innerText = "内容：";
    var spanTxt = document.createElement("span");
    spanTxt.innerText = introduce;
    spanTxt.title = introduce;
    var divDdl = document.createElement("div");
    divDdl.className = "ddl";
    var divBot = document.createElement("div");
    divBot.className = "bot cleafix";
    var divAut = document.createElement("div");
    divAut.className = "author";
    divAut.innerText = "创建人：";
    var spanName = document.createElement("span");
    spanName.innerText = author;
    var divMan = document.createElement("div");
    divMan.className = "people";
    var iMan = document.createElement("i");
    iMan.className = "team";
    var spanMan = document.createElement("span");
    spanName.className = "team_num";
    spanMan.innerText = number;
    li.appendChild(divName);
    li.appendChild(divIn);
    divIn.appendChild(spanTxt);
    li.appendChild(divDdl);
    // divDdl.style.padding = "0";
    if (projectTime > 100)
        projectTime = 100;
    divDdl.style.width = projectTime + "%";
    divDdl.style.backgroundColor = ddlColor.get(projectTime / 100);
    li.appendChild(divBot);
    divBot.appendChild(divAut);
    divAut.appendChild(spanName);
    divBot.appendChild(divMan);
    divMan.appendChild(iMan);
    divMan.appendChild(spanMan);
    li.addEventListener("click", function () {
        window.location = "project_p.html?project_id=" + projectID;
    })
}

//删除内容
function removeLi() {
    var searchNav = getDom(".searchNav");
    var projectLi = getDom(".projectLi", searchNav);
    var liNav = getDomA(".liNav", searchNav);
    for (var i = 0; i < liNav.length; i++) {
        projectLi.removeChild(liNav[i]);
    }
}

function create(project, projectLength, liArr) {
    for (var i = 0; i < projectLength; i++) {
        var name = project[i].name;
        var introduce = project[i].introduction;
        var author = project[i].creatorName;
        var numbers = project[i].numbers;
        var projectID = project[i].id;
        var createTime = project[i].createTime;
        var deadline = project[i].deadline;
        var projectTime = jdt(createTime, deadline);
        //将内容放进去
        addLi(liArr[i], name, introduce, author, numbers, projectID, projectTime);
    }
}
//显示暂无内容
function noProject(projectNav) {
    var divN = document.createElement("div");
    divN.className = "noneP";
    divN.innerText = "暂无项目";
    if (projectNav == searchNav) {
        divN.innerText = "抱歉，暂无内容";
    }
    projectNav.appendChild(divN);
    var noneP = getDom(".noneP");
    textVerticalCenter(noneP);
}
//项目板块添加
function addLiBox(projectLength, project, projectNav) {

    //项目板块数目
    var x = Math.ceil(projectLength / 6);
    //获取项目大框架
    var projectLi = getDom(".projectLi", projectNav);
    for (var i = 0; i < x; i++) {
        var div = document.createElement("div");
        div.className = "liNav";
        projectLi.appendChild(div);
        for (var j = 0; j < 6; j++) {
            var li = document.createElement("li");
            div.appendChild(li);
        }
    }
    projectSize(projectNav);
    // 获取li数组
    var liArr = getDomA("li", projectNav);

    // var liArrB = getDomA("li", shareNav);

    //按钮
    butStyle(projectNav, liArr, x);
    // butStyle(shareNav, liArrB);

    // 将项目放进板块
    create(project, projectLength, liArr);
    // create(shareProject, shareProjectLength, liArrB);

    //判断是否有内容
    liStyle(liArr);
    // liStyle(liArrB);

    if (projectLength == 0) {
        noProject(projectNav);
    }
}

//主题---------------li和start函数修改--------
function changeColor() {
    //标题颜色
    getDom(".mainTitle").style.color = textColor;
    //页面底色
    getDom("body").style.backgroundColor = mainColor;
    // 左边导航底色
    getDom(".navigationBar").style.backgroundColor = modularColor;
    //搜索框底色
    getDom(".searchBox").style.backgroundColor = progressColor;
    //搜索按钮颜色
    getDom(".iconS").style.backgroundColor = progressBoxColor;
    //新建加入按钮底色
    getDom(".buildJoin").style.backgroundColor = progressBoxColor;
    //新建加入按钮字颜色
    getDom(".buildJoin").style.color = textColor;
}
// changeColor();

//获取个人信息显示
userMess(head, headBox, emailBox, perSig);

// 搜索提交
searchBut.state = true;
searchBut.addEventListener("click", search);
//回车
inputEnterEvent(searchCont, search);

//公有项目
//项目板块添加
function addLiShareBox(projectLength, project, projectNav) {
    //获取项目大框架
    var projectLi = getDom(".projectLi", projectNav);
    var div = document.createElement("div");
    div.className = "liNav";
    projectLi.appendChild(div);
    for (var j = 0; j < 6; j++) {
        var li = document.createElement("li");
        div.appendChild(li);
    }
    projectSize(projectNav);
    // 获取li数组
    var liArr = getDomA("li", div);

    // 将项目放进板块
    create(project, projectLength, liArr);

    //判断是否有内容
    liStyle(liArr);

}

//公有总页数
var allPage = 0;
var pdqq = 0;

function getPublic(page) {
    pdqq++;
    ajax({
        type: 'put',
        url: '/util/project',
        data: {
            page: page
        },
        header: {
            'Content-Type': 'application/json'
        }, // 请求头
        success: function (res) {
            pdqq--;
            if (res.status_code == '200') {
                // if (page == 1 && res.result.length == 0) {
                //     noProject(shareNav);
                // }
                if (res.result.length != 0) {
                    //项目数组--
                    shareProject = res.result;
                    // 长度
                    shareProjectLength = shareProject.length;

                    addLiShareBox(shareProjectLength, shareProject, shareNav)
                    allPage++;
                }
            } else {
                // topAlert("发生未知错误");
            }
        }
    });
}
// 先请求两页
getPublic(1);
var getTimerp = setInterval(function () {
    if (pdqq == 0) {
        getPublic(2);
        clearInterval(getTimerp);
    }
}, 100)


function sharePage() {
    shareNav.moveFlag = true;
    var page = 1;
    var projectWidth = personalNav.offsetWidth;
    var rightBut = getDom(".rightBut", shareNav);
    var leftBut = getDom(".leftBut", shareNav);
    var projectLiA = getDom(".projectLi", shareNav);
    // 第一页没有左箭头
    // if (page == 1)
    leftBut.style.display = "none";
    if (page == allPage || allPage == 0)
        rightBut.style.display = "none";
    rightBut.addEventListener("click", function () {
        if (!shareNav.moveFlag) {
            return;
        }
        shareNav.moveFlag = false;
        moveLeftRight(projectLiA, "left", (-projectWidth), projectWidth / 10, function () {
            shareNav.moveFlag = true;
        });
        //当前页数加一等于总页数
        if (page + 1 == allPage) {
            //获取下一页的项目
            getPublic(page + 2);
        }
        // 左箭头显示
        leftBut.style.display = "block";
        // 当页数相同时即请求下一页无内容 右箭头消失
        var timerp = setInterval(function () {
            if (pdqq == 0) {
                if (page == allPage)
                    rightBut.style.display = "none";
                clearInterval(timerp);
            }
        }, 100)
        // 点击右页数增加
        page++;
    })
    leftBut.addEventListener("click", function () {
        if (!shareNav.moveFlag) {
            return;
        }
        shareNav.moveFlag = false;
        moveLeftRight(projectLiA, "left", (projectWidth), projectWidth / 10, function () {
            shareNav.moveFlag = true;
        });
        //页数减少
        page--;
        // 右箭头显示
        rightBut.style.display = "block";
        // 当第一页时左箭头隐藏
        if (page == 1)
            leftBut.style.display = "none";
    })

}
var timer = setInterval(function () {
    if (pdqq == 0) {
        sharePage();
        clearInterval(timer);
    }
}, 100)

start();

// 计算进度条的函数
function jdt(createTime, deadline) {
    return (1 - (deadline - Date.now()) / (deadline - createTime)) * 100;
}