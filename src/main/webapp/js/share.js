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
        if (xhr.status == 200) {
            headBox.style.backgroungImg = ""; //跳转页面
        } else {
            topAlert("导入失败");
        }
    };
}

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


//高度自适应-----------
function heightAuto() {
    //获取主要内容框架
    var mainBox = getDom(".mainBox");
    //项目离顶部距离
    mainBox.style.top = "60px";
}
heightAuto();

window.addEventListener('resize', heightAuto);