var tool = new Tool(document, window);
tool.textProhibition();

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
        url: 'http://192.168.43.247:8080/user',
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
                url: "http://192.168.43.247:8080/user/avatar",
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
    nameBox.value = userName;
    nameBox.readOnly = true;
    nameBox.style.borderBottom = "";
});

//搜索---------------------------
//搜索框
var searchCont = getDom(".searchCont");
//搜索按钮
var searchBut = getDom(".iconS");

function search() {
    var content = searchCont.value;
    console.log(content);
    if (!content) {
        topAlert("请输入内容！");
    } else {
        ajax({
            type: 'put',
            url: 'http://192.168.43.247:8080/project',
            data: {
                key: content
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res) {
                    console.log(res);
                } else {

                }
            }
        });
    }

}
// 搜索提交
searchBut.addEventListener("click", search);
// window.addEventListener('resize', search);


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
    personalBox.style.backgroundColor = "rgb(241, 240, 230)";
    personalBox.style.color = "#071f3d";
    projectSize(personalNav);
    window.addEventListener('resize', function () {
        projectSize(personalNav);
        projectSize(shareNav);
    });
}
start();
// 点击共享项目
shareBox.addEventListener("click", function () {
    // // 点击按钮样式
    // shareBox.style.backgroundColor = "rgb(241, 240, 230)";
    // shareBox.style.color = "#071f3d";
    // personalBox.style.backgroundColor = "";
    // personalBox.style.color = "#fff";
    // // 板块显示
    // shareNav.style.display = "block";
    // personalNav.style.display = "none";
    // projectSize(shareNav);
    // window.addEventListener('resize', function () {
    //     projectSize(shareNav);
    //     projectSize(personalNav);
    // });
    topAlert("暂未开发！");
});
// 点击参加项目
personalBox.addEventListener("click", function () {
    personalBox.style.backgroundColor = "rgb(241, 240, 230)";
    personalBox.style.color = "#071f3d";
    shareBox.style.backgroundColor = "";
    shareBox.style.color = "#fff";
    personalNav.style.display = "block";
    shareNav.style.display = "none";
    projectSize(personalNav);
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
function move(y) {
    //获取project显示框架
    var projectWidth = personalNav.offsetWidth;
    var rightBut = getDom(".rightBut", personalNav);
    var leftBut = getDom(".leftBut", personalNav);
    var projectLiA = getDom(".projectLi", personalNav);
    var x = 1;
    if (x == 1) {
        leftBut.style.display = "none";
    }
    rightBut.addEventListener("click", function () {
        moveLeftRight(projectLiA, "left", (-projectWidth), projectWidth/10);
        x++;
        leftBut.style.display = "block";
        if (x == y) {
            rightBut.style.display = "none";
        }
    })
    leftBut.addEventListener("click", function () {
        moveLeftRight(projectLiA, "left", (projectWidth), projectWidth/10);
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
function butStyle(project, liArr, x) {
    var leftBut = getDom(".leftBut", project);
    var rightBut = getDom(".rightBut", project);
    if (liArr.length < 7) {
        leftBut.style.display = "none";
        rightBut.style.display = "none";
    } else {

        //左右滑动
        move(x);
    window.addEventListener('resize', function () {
        move(x);
    });
        

    }
}

//项目添加---------
function addLi(li, name, introduce, author, number) {
    var divName = document.createElement("div");
    divName.className = "projectName";
    divName.innerText = name;
    var divIn = document.createElement("div");
    divIn.className = "introduce";
    divIn.innerText = "内容：";
    var spanTxt = document.createElement("span");
    spanTxt.innerText = introduce;
    spanTxt.title = introduce;
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
    li.appendChild(divBot);
    divBot.appendChild(divAut);
    divAut.appendChild(spanName);
    divBot.appendChild(divMan);
    divMan.appendChild(iMan);
    divMan.appendChild(spanMan);
}

function create(project, projectLength, liArr) {
    for (var i = 0; i < projectLength; i++) {
        var name = project[i].name;
        var introduce = project[i].introduction;
        var author = project[i].creatorName;
        var numbers = project[i].numbers;
        //将内容放进去
        addLi(liArr[i], name, introduce, author, numbers);
    }
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

}

userMess(head, headBox, emailBox, perSig);