var tool = new Tool(document, window);
tool.textProhibition();

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

//获取头像框
var headBox = getDom(".headBox");
//获取input
var inPic = getDom(".inPic");
//获取but
var changeH = getDom(".changeH");

headBox.addEventListener("mouseover", function () {
    inPic.style.display = "block";
    changeH.style.display = "block";
});
headBox.addEventListener("mouseout", function () {
    inPic.style.display = "none";
    changeH.style.display = "none";
});
//头像上传
//导入
var inPic = getDom(".inPic");

function UpladFile() {
    console.log(1);
    var file = inPic.files[0];
    //创建formdata对象
    var formdata = new FormData();
    formdata.append("file", file);
    //创建xhr，使用ajax进行文件上传
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/user/avatar");
    xhr.send(formdata);
    //回调
    xhr.onreadystatechange = function () {
        if (xhr.status_code == 200) {
            headBox.style.backgroungImg = "http://localhost:8080" + xhr.url;
        } else {
            topAlert("导入失败");
        }
    };
}
inPic.addEventListener("change", UpladFile);
//获取name盒子
var nameBox = getDom(".nameBox");
nameBox.value = userName;

//获取修改按钮
var modifyN = getDom(".modifyN");
//点击修改
modifyN.addEventListener("click", function () {
    nameBox.readOnly = false;
    nameBox.style.borderBottom = "solid 1px";
});
//回车修改cookie
// nameBox.inputEnterEvent(function () {
//     nameBox.value = userName;
//     nameBox.readOnly = true;
//     nameBox.style.borderBottom = "";
// });

//搜索-----------
//搜索框
var searchCont = getDom(".searchCont");
//搜索按钮
var searchBut = getDom(".iconS");


function search() {
    var content = searchCont.value;
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
// 搜索提交
searchBut.addEventListener("click", search);
window.addEventListener('resize', search);


//高度自适应-----------
function heightAuto() {
    //获取主要内容框架
    var mainBox = getDom(".mainBox");
    //项目离顶部距离
    mainBox.style.top = "60px";
}
heightAuto();

window.addEventListener('resize', heightAuto);

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

//获取项目盒子
var personalNav = getDom(".personalNav");
var shareNav = getDom(".shareNav");

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
function colorB() {
    personalBox.style.backgroundColor = "rgb(241, 240, 230)";
    personalBox.style.color = "#071f3d";
    projectSize(personalNav);
    window.addEventListener('resize', function () {
        projectSize(personalNav);
        projectSize(shareNav);
    });
}
colorB();
// 点击共享项目
shareBox.addEventListener("click", function () {
    // 点击按钮样式
    shareBox.style.backgroundColor = "rgb(241, 240, 230)";
    shareBox.style.color = "#071f3d";
    personalBox.style.backgroundColor = "";
    personalBox.style.color = "#fff";
    // 板块显示
    shareNav.style.display = "block";
    personalNav.style.display = "none";
    projectSize(shareNav);
    window.addEventListener('resize', function () {
        projectSize(shareNav);
        projectSize(personalNav);
    });
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




// 获取li数组
var liArrA = getDomA("li", personalNav);

var liArrB = getDomA("li", shareNav);
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
liStyle(liArrA);
liStyle(liArrB);

//获取左右按钮-----------------
function butStyle(project, liArr) {
    var leftBut = getDom(".leftBut", project);
    var rightBut = getDom(".rightBut", project);
    if (liArr.length<7) {
        leftBut.style.display = "none";
        rightBut.style.display = "none";
    }
}

butStyle(personalNav, liArrA);
butStyle(shareNav, liArrB);



//项目添加---------
function addLi(li,name, introduce,author,number) {
    var divName = document.createElement("div");
    divName.className = "projectName";
    divName.innerText = name;
    var divIn = document.createElement("div");
    divIn.className = "introduce";
    divIn.innerText = "内容：";
    var spanTxt = document.createElement("span");
    spanTxt.innerText = introduce;
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
for (var i = 1; i < liArrA.length; i++){
    addLi(liArrA[i], "name", "introduce", "author", "number");
}

