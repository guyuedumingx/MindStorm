var tool = new Tool(document, window);
tool.textProhibition();

//获取用户id
// var userId = getCookie("user_id");

//获取用户名
// var userName = getCookie("user_name");
//储存user对象
var user;
//请求获得数组对象
ajax({
    type: 'get',
    url: '/user',
    data: {
        // id: userId
    },
    header: {},
    success: function (res) {
        user = res;
    },
    error: function () {}
});

//获取个人简介
var userIntroduce = user.userSignature;
//获取简介框
var introduceNav = getDom(".intro_txt");

introduceNav.innerText = userIntroduce;

//获取昵称框
var nameU = getDom(".userName");

nameU.innerText = userName;

//项目数组
var projectArr = user.recentProject;

//数组长度
var projectLength = projectArr.length;

//获取项目列表
var projectLi = getDom(".projectLi");

//添加项目-------------
function addLi(projectName, projectIntro, projectDate) {
    //创建标签
    var newLi = document.createElement("li");
    var newSpan1 = document.createElement("span")
    newSpan1.className = "txt_name";
    var newP = document.createElement("p");
    newP.className = "txt";
    var newI1 = document.createElement("i");
    newI1.className = "date";
    var newSpan2 = document.createElement("span");
    newSpan2.className = "pro_date";
    var newI2 = document.createElement("i");
    newI2.className = "team";
    var newSpan3 = document.createElement("span");
    newSpan3.className = "team_num";
    //内容
    newSpan1.innerHTML = projectName;
    newP.innerHTML = projectIntro;
    newSpan2.innerHTML = projectDate;
    newSpan3.innerHTML = projectNum;
    //添加
    projectLi.appendChild(newLi);
    newLi.appendChild(newSpan1);
    newLi.appendChild(newP);
    newLi.appendChild(newI1);
    newLi.appendChild(newSpan2);
    newLi.appendChild(newI2);
    newLi.appendChild(newSpan3);
}

for (var i = 0; i < projectLength; i++) {
    var projectName = projectArr[i].name;
    var projectIntro = projectArr[i].introduction;
    var projectDate = projectArr[i].createElement;
    // var projectNum = projectArr[i].use;
    addLi(projectName, projectIntro, projectDate)
}

    //高度自适应-----------
function heightAuto() {
    //获取个人信息框架
    var personalBox = getDom(".personalBox");
    //获取项目框架
    var bigBox = getDom(".bigBox");
    //个人信息高度
    var personalHeight = personalBox.offsetHeight;
    //项目离顶部距离
    var boxTop = personalHeight + 60;
    bigBox.style.top = boxTop + "px";

    //获取项目高度
    var projectHeight = bigBox.offsetHeight;
    //高度
    projectLi.style.maxHeight = projectHeight - 70 + "px"; //70为外边距
}
heightAuto();

window.addEventListener('resize', heightAuto);