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
        // w4[i].getDom('.tag').style.textAlign = 'right';
    }
}