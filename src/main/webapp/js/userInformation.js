// 引入工具类js
document.write("<script language='javascript' src='js/concise.js'></script>");
document.write("<script language='javascript' src='js/toolFunction.js'></script>");
document.write("<script language='javascript' src='js/ajax.js'></script>");
document.write("<script language='javascript' src='js/toolClass.js'></script>");

window.onload = function () {
    var pagination = getDom(".pagination");

    var pArr = pagination.getDomA("li");

        for(var i=0; i<pArr.length; i++){
            pArr[i].index = i;
            pArr[i].addEventListener("click", function () {
                for (var j = 0; j < pArr.length; j++){
                    pArr[j].style.backgroundColor= "";
                }
                pArr[this.index].style.backgroundColor = "#f8fcfa";
            })
        }

 }