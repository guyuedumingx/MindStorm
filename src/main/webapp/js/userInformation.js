var tool = new Tool(document, window);
tool.textProhibition();

//获取用户id
var userId = getCookie("user_id");

//获取用户名
var userName = getCookie("user_name");
//储存user对象
var user;
//请求获得数组对象
ajax({
    type: 'get',
    url: '/user',
    data: {
        id: userId
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

for (var i = 0; i < projectLength; i++) {
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
//添加项目
function addLi(projectName, projectIntro, projectDate, projectNum) {
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