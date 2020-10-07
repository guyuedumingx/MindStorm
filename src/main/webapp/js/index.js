// 引入工具类js
document.write("<script language='javascript' src='js/concise.js'></script>");

window.onload = function () {
    // 获取快捷键按钮
    var shortcut = getDom(".shortcutKey");
    // 获取帮助按钮
    var help = getDom('.help');
    //获取快捷键框
    var shotcutNav = getDom(".shortcut_nav");

    shortcut.addEventListener("click", function () {
        shotcutNav.style.display = "block";
    })
}