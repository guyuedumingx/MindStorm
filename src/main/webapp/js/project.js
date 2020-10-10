// ——————————————————右侧简介——————————————————
var introduceOpen = getDom('.mainBoxLeft .introduce a');
var introduce = getDom('.mainBoxLeft .introduce .introduceMain');
var introduceP = introduce.getDom('p');
var introduceState = false;
var str = introduceP.innerHTML;
var s = '回答安睡裤就很烦实发回复丢奥会发生发\n哦if和暴富暴富奥斯发红包回复博爱发包方冰风暴奥斯佛阿发sofa搜发哦是开放\n八分饱发阿克a凹坑\n积分兑换把上阿斯利康就很大声狄拉克机\n会大还费电暗示法哈斯福海哦哈酒合法司法噶仿古白发给巴斯房改房爱是发给巴斯覆盖表覆盖富奥斯䦹';
introduceP.innerText = s;

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
window.onload = function () {
    ajax({
        type: 'get',
        url: '/project',
        data: {
            id: 0,
            method: 'enterProject'
        },
        success: function (res) {

        }
    });
}