// ——————————————————头部——————————————————
// projectName.style.top = window.pageYOffset - 48 + 'px';
// window.addEventListener('scroll', function () {
//     projectName.style.top = window.pageYOffset - 48 + 'px';
//     // console.log(window.pageYOffset);
// });
// window.scroll(0, 1);
// window.scroll(0, 0);

// ——————————————————左侧——————————————————
var introduceOpen = getDom('.mainBoxLeft .introduce a'); // 项目简介展开的开关
var introduce = getDom('.mainBoxLeft .introduce .introduceMain'); // 项目简介内容盒子
var introduceP = introduce.getDom('p'); // 项目简介内容
var introduceState = false; // 项目简介展开状态

// 项目简介展开按钮点击事件
introduceOpen.addEventListener('click', function () {
    if (introduceState) {
        this.innerText = '展开';
        introduce.style.height = '180px';
        introduceP.style.webkitLineClamp = '5';
        introduceState = false;
    } else {
        this.innerText = '收起';
        introduce.style.height = '530px';
        introduceP.style.webkitLineClamp = '20';
        introduceState = true;
    }
});

// ——————————————————中间——————————————————
var projectName = getDom('.progressBar .projectName'); // 项目名
var creationDate = getDom('.progressBar .progressBarTop .creationDate');
var closingDate = getDom('.progressBar .progressBarTop .closingDate');

// ——————————————————有侧—————————————————— 
var projectLevel = getDom('.mainBoxRight .projectLevel h4 span'); // 项目等级
var onOffArr = getDomA('.onOffBox .onOff .onOffBorder');

function onOffChange(onOff) {
    if (onOff.state) {
        onOff.state = false;
        onOff.children[0].style.left = '0px';
    } else {
        onOff.state = true;
        onOff.children[0].style.left = '22px';
    }
}

function setOnOffEvent(onOff) {
    onOff.state = false;
    onOff.addEventListener('click', function () {
        onOffChange(this);
    });
}

for (var i = 0; i < onOffArr.length; i++) {
    setOnOffEvent(onOffArr[i]);
}

// ——————————页面加载完之后发送请求——————————
window.onload = function () {
    ajax({
        type: 'get',
        url: '/project',
        data: {
            id: 0,
            method: 'enterProject'
        },
        success: function (res) {
            introduceP.innerText = res.introdution;
            projectName.innerText = res.name;
            projectLevel.innerText = res.rank;
            creationDate.innerText = new Date(res.creatTime).toLocaleDateString();
            closingDate.innerText = new Date(res.ddl).toLocaleDateString();
        }
    });
}