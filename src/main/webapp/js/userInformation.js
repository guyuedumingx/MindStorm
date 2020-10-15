var tool = new Tool(document, window);
tool.textProhibition();


var pagination = getDom(".pagination");

var pArr = pagination.getDomA("li");

for (var i = 0; i < pArr.length; i++) {
    pArr[i].index = i;
    pArr[i].addEventListener("click", function () {
        for (var j = 0; j < pArr.length; j++) {
            pArr[j].style.backgroundColor = "#f8fcfa";
        }
        pArr[this.index].style.backgroundColor = "red";
    })
}