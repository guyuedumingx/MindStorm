// 引入工具类js
document.write("<script language='javascript' src='js/concise.js'></script>");
document.write("<script language='javascript' src='js/toolFunction.js'></script>");


window.onload = function () {
    // 获取快捷键按钮
    var shortcut = getDom(".shortcutKey");
    // 获取帮助按钮
    var help = getDom('.help');
    // 获取快捷键框
    var shotcutNav = getDom(".shortcut_nav");

    // <<<<<<< 原来的原生代码
    shortcut.addEventListener("click", function () {
        shotcutNav.style.display = "block";
    })
    // 点击消失
    document.onclick = function (event) {
        var event = event || window.event;
        var target = event.target.className;

        // 看明白这个写法
        if (target != "shortcutKey" && target != "shortcut_nav") { // 不等于当前点点击的名字
            shotcutNav.style.display = "none";
        }
    }
    // =======
    // clickOpenBlankClose(shortcut, shotcutNav);
    // >>>>>>> 调用封装好的函数的代码
    var openBut = getDom(".openBut");
    var openX = 1;
    openBut.addEventListener("click", function () {
        if (openX % 2 != 0) {
            openBut.style.backgroundImage = "url(./img/lamp_yellow.png)";
            openBut.style.boxShadow = "inset 0px 0px 5px 0px #f9f28b";
        }
        else {
            openBut.style.backgroundImage = "url(./img/lamp_blue.png)";
            openBut.style.boxShadow = "";
        }
        openX++;
    })

}