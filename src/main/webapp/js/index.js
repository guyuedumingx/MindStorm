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

    //快捷键显示
    clickOpenBlankClose(shortcut, shotcutNav);

    //是否公开
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

    //放大新建

    // 获取新建盒子
    var changeEst = getDom(".change_est");
    // 获取加入盒子
    var changeJoin = getDom(".change_join");
    //获取新建输入大盒子
    var estBig = getDom(".est_bigBox");
    //获取加入输入大盒子
    var joinBig = getDom(".join_bigBox");
    //获取加入外盒子
    var join = getDom(".join");
    //获取新建外盒子
    var establish = getDom(".establish");

    // 点击新建放大
    changeEst.addEventListener("click", function () {
        changeEst.style.animation = "toEstBig 0.3s ease-in-out 0s forwards  normal";
        changeJoin.style.animation = "toSmall 0.3s ease-in-out 0s forwards normal";
        setTimeout(function () {
            changeEst.style.display = "none";
            join.style.display = "none";
            estBig.style.display = "block";
        }, 300);
    })
    // 点击加入放大
    changeJoin.addEventListener("click", function () {
        changeEst.style.animation = "toSmall 0.3s ease-in-out 0s forwards  normal";
        changeJoin.style.animation = "toJoinBig 0.3s ease-in-out 0s forwards normal";
        setTimeout(function () {
            changeJoin.style.display = "none";
            establish.style.display = "none";
            joinBig.style.display = "block";
        }, 300);
    })

    // 新建返回
    var back = getDomA(".back");
    back[0].addEventListener("click", function () {
        changeEst.style.animation = "";
        changeJoin.style.animation = "";
        //新建返回
        changeEst.style.display = "inline-block";
        join.style.display = "inline-block";
        estBig.style.display = "none";
    })
    back[1].addEventListener("click", function () {
        changeEst.style.animation = "";
        changeJoin.style.animation = "";
        //加入返回
        changeJoin.style.display = "inline-block";
        establish.style.display = "inline-block";
        joinBig.style.display = "none";
        	console.log("1");
    })

    // 获取输入id框
    var inputID = getDom(".inputID");

    inputTips(inputID, "请输入项目ID", "idTips");
    
    //个人下拉框
    //获取下拉框
    var spinner = getDom(".spinner");
    //获取个人框
    var headNav = getDom(".head_nav");
    clickOpenBlankClose(headNav, spinner);

    
    

    
}