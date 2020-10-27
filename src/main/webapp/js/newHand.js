// ——————————————页面配色——————————————
var mainColor;
var modularColor = '#f5f5f5';
var textColor = '#214b5b';
var textLightColor;
var progressColor;
var progressBoxColor;

function setColor() {
    mainColor = '#1e1e1e'; // 主背景色
    modularColor = 'rgb(51, 51, 51)'; // 模块背景色
    textColor = 'rgba(255, 255, 255, 0.8)'; // 文字颜色
    textLightColor = 'rgba(255, 167, 15)'; // 文本高亮色
    progressColor = '#cccccc'; // 进度条颜色
    progressBoxColor = '#666666'; // 进度条盒子颜色
    getDom('body').style.backgroundColor = mainColor;
    getDom('.briefIntroduction h4').style.color = textColor;
    getDom('.briefIntroduction .enter').style.backgroundColor = modularColor;
    var arr = getDom('.w4').children;
    for (var i = 0; i < arr.length; i++) {
        arr[i].getDom('.main').children[0].style.color = textColor;
        arr[i].getDom('.main').children[1].style.color = textColor;
    }
    getDom('.how h4').style.color = textColor;

}

// 配色
// setColor();

// ——————————添加向上滑动的特效——————————
var goTop = new GoTopEffect(150, 150, 1);
goTop.addArr(getDom('.briefIntroduction').children);
goTop.addArr(getDom('.w4').children);
goTop.add(getDom('.how .tag'));
goTop.add(getDom('.how h4'));
goTop.addArr(getDom('.how .content').children);
goTop.add(getDom('.go'));
// goTop.add(getDom('.footer'));
goTop.ready();
goTop.run();

// ——————————————跳转页面——————————————
var enter = getDom('.enter');
var go = getDom('.go');
function jumpPage() {
    if (getCookie('user_id')) {
        window.location = 'index.html';
    } else {
        window.location = 'login.html';
    }
}
enter.addEventListener('click', jumpPage);
go.addEventListener('click', jumpPage);

// ——————————w4——————————
var w4 = getDom('.w4').children;
for (var i = 0; i < w4.length; i++) {
    if (i & 1) {
        w4[i].style.flexFlow = 'row-reverse nowrap';
        // w4[i].getDom('.tag').style.textAlign = 'left';
    } else {
        w4[i].style.flexFlow = 'row nowrap';
        w4[i].style.backgroundColor = modularColor;
        // w4[i].getDom('.tag').style.textAlign = 'right';
    }
}