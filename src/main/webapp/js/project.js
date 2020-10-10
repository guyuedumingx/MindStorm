// ——————————————————右侧简介——————————————————
var introduceOpen = getDom('.mainBoxLeft .introduce a');
var introduce = getDom('.mainBoxLeft .introduce .introduceMain');
var introduceP = introduce.getDom('p');
var introduceState = false;
var str = introduceP.innerHTML;
var projectName = getDom('.progressBar .projectName');
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
// projectName.style.top = window.pageYOffset - 48 + 'px';
// window.addEventListener('scroll', function () {
//     projectName.style.top = window.pageYOffset - 48 + 'px';
//     // console.log(window.pageYOffset);
// });
// window.scroll(0, 1);
// window.scroll(0, 0);
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
        }
    });
}