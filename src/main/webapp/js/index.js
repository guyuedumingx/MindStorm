
// 引入工具类js
document.write("<script language='javascript' src='js/concise.js'></script>");


window.onload = function () {
    // 获取快捷键按钮
    var shortcut = getDQS(".shortcutKey");
    // 获取帮助按钮
    var help = getDQS('.help');
    //获取快捷键框
    var shotcutNav = getDQS(".shortcut_nav");
    shortcut.addEventListener("click", function () {
        shotcutNav.style.display = "block";
    })
    // 点击消失
    document.onclick = function (event) {
        var event = event || window.event;

        var targetId = event.target ? event.target.id : event.srcElement.id;

        // 看明白这个写法

        if (targetId != "shortcutKey")  // 不等于当前点点击的名字

        {
            shotcutNav.style.display = "block";
        }
    }
}
