// header

//个人下拉框
//获取下拉框
var spinner = getDom(".spinner");
//获取个人框
var headNav = getDom(".head_nav");
clickOpenBlankClose(headNav, spinner);
//获取个人中心按钮
var center = getDom(".presonal_cen");
//跳转到个人中心
center.addEventListener("click", function () {
    window.location.href = "/project.html?id=" + getCookie("user_id"); //跳转页面
})

//获取用户id
var loginPd = getCookie("user_id");
//个人容器
var personal = getDom(".personal");
//获取登录注册容器
var logOn = getDom(".logOn");
//获取昵称框
var nameU = getDom(".user_name");
//获取用户名
var userName = getCookie("user_name");

//判断是否登录------------
if (loginPd == null) {
    personal.style.display = "none";
} else {
    personal.style.display = "block";
    nameU.innerText = userName;
}
// end header

// 设置文本不可选中
var tool = new Tool(document, window);
tool.textProhibition();

// 创建user对象
var user = {};

// 从cookie中获取值
user.userId = getCookie('user_id');
user.userName = getCookie('user_name');

// 从url中获取项目id
var projectId = getLocation('project_id');
var ctrlState = false;

// 键盘按下事件
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 17) {
        if (!ctrlState) {
            if (nowNode) {
                nowNode.style.boxShadow = 'none';
                var t = nowNode;
                while (t.father) {
                    removeHeightLight(t.father);
                    t = t.father;
                }
                changeChild(nowNode, removeHeightLight);
                if (hideTheme.state) {
                    ergodicTree(function (node) {
                        node.addClass('hideTheme');
                    });
                }
            }
            nowNode = null;
            changeNodeEvent();
            lineColor = lineUpColor;
            document.removeEventListener('mousemove', move);
        }
        ctrlState = true;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 17) {
        ctrlState = false;
    }
});

// ——————————————————左侧——————————————————
var mainBoxLeft = getDom('.mainBoxLeft'); // 左侧大盒子
var projectCreatorName = mainBoxLeft.getDom('.creator h4 span'); // 项目创建者
var introduceOpen = mainBoxLeft.getDom('.introduce a'); // 项目简介展开的开关
var introduce = mainBoxLeft.getDom('.introduce .introduceMain'); // 项目简介内容盒子
var projectLevel = introduce.getDom('span'); // 获取项目等级盒子
var introduceP = introduce.getDom('p'); // 项目简介内容
var introduceState = false; // 项目简介展开状态
var operationProjectTitle = getDom('.operationProject .operationProjectTitle'); // 项目处理开关
var operationProject = getDomA('.mainBoxLeft .operationProject div'); // 项目处理按钮

// 随机颜色
operationProjectTitle.style.backgroundColor = randomColor(120, 180);
function setOperationProject() {
    for (var i = 0; i < operationProject.length; i++) {
        operationProject[i].style.backgroundColor = randomColor(120, 180);
    }
}
setOperationProject();

// 项目处理开关相关点击事件
operationProjectTitle.addEventListener('click', function () {
    this.hide();
    for (var i = 0; i < operationProject.length; i++) {
        operationProject[i].show();
    }
});

document.addEventListener('click', function (e) {
    if (!isParent(e.target, operationProjectTitle.parentNode)) {
        operationProjectTitle.show();
        for (var i = 0; i < operationProject.length; i++) {
            operationProject[i].hide();
        }
    }
});

// 项目简介展开按钮点击事件
introduceOpen.addEventListener('click', function () {
    if (introduceState) {
        this.innerText = '展开';
        introduce.style.height = '100%';
        introduceState = false;
    } else {
        this.innerText = '收起';
        introduce.style.height = mainBoxLeft.offsetHeight - 70 + 'px';
        introduceState = true;
    }
});

// 页面缩放时动态维护展开后的高度
window.addEventListener('resize', function () {
    if (introduceState) {
        introduce.style.transition = 'none';
        introduce.style.height = mainBoxLeft.offsetHeight - 70 + 'px';
        setTimeout(function () {
            introduce.style.transition = 'height .5s';
        }, 1);
    }
});

// ——————————————————中间——————————————————
var projectName = getDom('.progressBar .projectName'); // 项目名
var creationDate = getDom('.progressBar .progressBarTop .creationDate'); // 创建日期
var closingDate = getDom('.progressBar .progressBarTop .closingDate'); // 截止日期
var progressContent = getDom('.progressBox .progressContent'); // 进图条盒子
var progressWave = getDom('.progressBox .wave'); // 流动效果盒子
var progressCountDown = getDom('.progressBar .countDown'); // 提示还剩多长时间的盒子
var treeBox = getDom('.mainBoxMiddle .treeBox'); // 树盒子框架
var treeBoxMain = getDom('.mainBoxMiddle .treeBox .treeBoxMain'); // 树盒子
var treeBoxPercentageTips = getDom('.mainBoxMiddle .treeBox .treeBoxPercentageTips'); // 提示树盒子缩放倍数的盒子
var treeBoxState = false; // 鼠标是否在树盒子中
var treeMultiple = 100; // 树盒子缩放倍数

// 显示树盒子缩放倍数提示盒子
function percentageTips(num) {
    if (treeBoxPercentageTips.timer) {
        clearInterval(treeBoxPercentageTips.timer);
    }
    var i = 0;
    treeBoxPercentageTips.innerText = num + '%';
    treeBoxPercentageTips.show();
    treeBoxPercentageTips.timer = setInterval(function () {
        if (i == 30) {
            clearInterval(treeBoxPercentageTips.timer);
            treeBoxPercentageTips.hide();
        } else {
            i++;
            treeBoxPercentageTips.style.opacity = 1 / 30 * (30 - i) + '';
        }
    }, 25);
}

// 计算剩余时间
function calculateRemainingTime(millisecond) {
    if (millisecond < DAY) {
        return 'Less than a day';
    } else if (millisecond < WEEK) {
        return Math.floor(millisecond / DAY) + ' days left';
    } else if (millisecond < MONTH) {
        return Math.floor(millisecond / WEEK) + ' weeks left';
    } else if (millisecond < YEAR) {
        return Math.floor(millisecond / MONTH) + ' months left';
    } else {
        return Math.floor(millisecond / YEAR) + ' years left';
    }
}

// 维护treeBoxState变量相关事件
treeBox.addEventListener('mouseover', function () {
    treeBoxState = true;
});
treeBox.addEventListener('mouseout', function () {
    treeBoxState = false;
});

// 树盒子缩放
treeBox.addEventListener('mousewheel', function (e) {
    if (ctrlState) {
        e.preventDefault();
        if (e.deltaY < 0) {
            treeMultiple += 10;
            treeMultiple = treeMultiple < 300 ? treeMultiple : 300;
            treeBoxMain.style.zoom = treeMultiple / 100;
        } else {
            treeMultiple -= 10;
            treeMultiple = treeMultiple > 100 ? treeMultiple : 100;
            treeBoxMain.style.zoom = treeMultiple / 100;
        }
        percentageTips(treeMultiple);
    }
});

// 点击空白处事件
treeBoxMain.addEventListener('mousedown', function (e) {
    if (nowNode) {
        nowNode.style.boxShadow = 'none';
        var t = nowNode;
        while (t.father) {
            removeHeightLight(t.father);
            t = t.father;
        }
        changeChild(nowNode, removeHeightLight);
        if (hideTheme.state) {
            ergodicTree(function (node) {
                node.addClass('hideTheme');
            });
        }
        nowNode = null;
        changeNodeEvent();
    }
});

var treeFullScreenState = false; // 全屏状态
var treeFullScreenOnOff = getDom('.mainBoxMiddle .treeBox .treeBoxFullScreen'); // 树盒子全屏按钮

// 全屏按钮点击事件
treeFullScreenOnOff.addEventListener('click', function () {
    if (treeFullScreenState) {
        cancelFullscreen();
        this.style.backgroundImage = 'url(img/project_fullScreen.png)';
        treeFullScreenState = false;
    } else {
        domFullScreen(treeBox);
        this.style.backgroundImage = 'url(img/project_cancelFullScreen.png)';
        treeFullScreenState = true;
    }
});

//监听退出全屏事件
function checkFull() {
    return document.webkitIsFullScreen;
}
window.addEventListener('resize', function () {
    if (!checkFull()) {
        //要执行的动作
        treeFullScreenOnOff.style.backgroundImage = 'url(img/project_fullScreen.png)';
        treeFullScreenState = false;
    }
});

var nowNode; // 当前正在拖动的节点
// var nodeConstLen = [150, 120, 90, 80, 80, 80];
// var nodeConstLen = [50, 60, 70, 80, 80];
var nodeConstLen = [80, 80, 80, 80, 80, 80, 80, 80, 80, 80];
// var nodeConstLen = [80, 75, 70, 65, 50]; // 父子节点之间的固定距离
var nodeMinLen = 80; // 无关联节点之间的最小距离
var bfb = 0.7; // 节点之间线的松紧，紧0 - 1松
// var lineDownColor = 'rgb(246, 255, 80)'; // 高亮时的颜色
var lineDownColor = '#6AC1ED'; // 高亮时的颜色
// var lineDownColor = '#aaa'; // 高亮时的颜色
var lineUpColor = '#333'; // 非高亮时的颜色
var lineColor = lineUpColor; // 当前线颜色
var nowNodeBoxShadowColor = '#b410e6'; // 当前选中节点盒子阴影颜色
var constraintArr = new Array(); // 记录约束的数组
var setLineArr = new Array(); // 记录要添加线条的数组
var mx, my; // 鼠标上次的位置
var topBoundary = 0; // 边界约束中的边界
var leftBoundary = 0;
var bottomBoundary = treeBoxMain.offsetHeight;
var rightBoundary = treeBoxMain.offsetWidth;
var boundaryMinLength = bottomBoundary * 0.18; //边界约束中和边界的最小距离
var treeBoxMainWidth = treeBoxMain.offsetWidth;
// var treeBoxMainHeight = treeBoxMain.offsetHeight;

// 鼠标拖动的函数
function move(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    if (cx >= leftBoundary + boundaryMinLength && cx <= rightBoundary - boundaryMinLength) {
        nowNode.x = nowNode.x + (cx - mx) / (treeMultiple / 100);
        mx = cx;
    }
    if (cy >= topBoundary + boundaryMinLength && cy <= bottomBoundary - boundaryMinLength) {
        nowNode.y = nowNode.y + (cy - my) / (treeMultiple / 100);
        my = cy;
    }
}

function maintainTreeBox() {
    var bl = treeBoxMainWidth / treeBoxMain.offsetWidth;
    treeBoxMainWidth = treeBoxMain.offsetWidth;
    mx /= bl;
    my /= bl;
    bottomBoundary = treeBoxMain.offsetHeight;
    rightBoundary = treeBoxMainWidth;
    boundaryMinLength = bottomBoundary * 0.18;
    ergodicTree(function (node) {
        node.x /= bl;
        node.y /= bl;
        setPosition(node);
    });
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}

// 缩放时维护坐标
window.addEventListener('resize', maintainTreeBox);

// 给节点添加高亮
function addHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.lineColor = lineDownColor;
    node.line.lineZIndex = 19;
}

// 给节点删除高亮
function removeHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.style.boxShadow = 'none';
    node.lineColor = lineUpColor;
    node.line.lineZIndex = 1;
}

// 操作子节点
function changeChild(node, fun) {
    fun(node);
    var chArr = node.childArr;
    for (var i = 0; i < chArr.length; i++) {
        fun(chArr[i]);
        changeChild(chArr[i], fun);
    }
}

// 添加线的函数
function setline(node1, node2) {
    try {
        treeBoxMain.removeChild(node1.line);
    } catch (e) { }
    node1.line = document.createElement('div');
    var x1 = node1.offsetLeft + node1.offsetWidth / 2;
    var y1 = node1.offsetTop + node1.offsetHeight / 2;
    var x2 = node2.offsetLeft + node2.offsetWidth / 2;
    var y2 = node2.offsetTop + node2.offsetHeight / 2;
    var lineLen = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var xz = (x1 + x2) / 2;
    var yz = (y1 + y2) / 2;
    var k = (y2 - y1) / (x2 - x1);
    var jd = Math.atan(k) * 180 / Math.PI;
    node1.line.style.width = lineLen + 'px';
    node1.line.style.height = '1px';
    node1.line.style.position = 'absolute';
    node1.line.style.left = xz - lineLen / 2 + 'px';
    node1.line.style.top = yz - 0.5 + 'px';
    node1.line.style.zIndex = 1;
    node1.line.style.transform = 'rotate(' + jd + 'deg)';
    node1.line.style.backgroundColor = node1.lineColor;
    node1.line.style.zIndex = node1.lineZIndex;
    node1.line.style.boxShadow = '0px 0px 8px ' + node1.lineColor;
    treeBoxMain.appendChild(node1.line);
}

// 设置节点位置
function setPosition(node) {
    node.style.left = node.x - node.offsetWidth / 2 + 'px';
    node.style.top = node.y - node.offsetHeight / 2 + 'px';
}

// 将元组添加到SetLine(设置线条)中
function addSetLine(node1, node2) {
    setLineArr.push([node1, node2]);
}

// 将元组添加到Constraint(执行约束)中
function addConstraint(node1, node2, type, len) {
    constraintArr.push([node1, node2, type, len]);
}

// 执行约束
function runConstraint(node1, node2, type, len) {
    if (type == 1) { //定长约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    } else if (type == 2) { //最小长度约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    } else if (type == 3) { // 边界约束
        var x2 = node1.x;
        var y2 = node1.y;
        if (x2 < leftBoundary + boundaryMinLength) {
            node1.x = node1.x + (leftBoundary + boundaryMinLength - node1.x) * bfb;
        } else if (x2 > rightBoundary - boundaryMinLength) {
            node1.x = node1.x - (node1.x - rightBoundary + boundaryMinLength) * bfb;
        }
        if (y2 - topBoundary < boundaryMinLength) {
            node1.y = node1.y + (topBoundary + boundaryMinLength - node1.y) * bfb;
        } else if (bottomBoundary - y2 < boundaryMinLength) {
            node1.y = node1.y - (node1.y - bottomBoundary + boundaryMinLength) * bfb;
        }
        setPosition(node1);
    }
}

// 节点数组
var nodeSet = new Array();

// 给树添加相关约束
function addTreeConstraint(root, n) {
    if (!root.father) {
        root.father = null;
    }
    root.layer = n;
    root.x = root.offsetLeft;
    root.y = root.offsetTop;
    root.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        if (nowNode) {
            nowNode.style.boxShadow = 'none';
            var t = nowNode;
            while (t.father) {
                removeHeightLight(t.father);
                t = t.father;
            }
            changeChild(nowNode, removeHeightLight);
        }
        mx = e.clientX;
        my = e.clientY;
        nowNode = this;
        changeNodeEvent();
        var t = nowNode;
        while (t.father) {
            addHeightLight(t.father);
            t = t.father;
        }
        changeChild(root, addHeightLight);
        nowNode.style.boxShadow = '0px 0px 30px ' + nowNodeBoxShadowColor;
        if (ctrlState && !lockingNode.state) {
            document.addEventListener('mousemove', move);
        }
        if (hideTheme.state) {
            ergodicTree(function (node) {
                node.addClass('hideTheme');
            });
            if (nowNode) {
                var t = nowNode;
                t.removeClass('hideTheme');
                while (t.father) {
                    t = t.father;
                    t.removeClass('hideTheme');
                }
                changeChild(nowNode, function (node) {
                    node.removeClass('hideTheme');
                });
            }
        }
    });
    nodeSet.push(root);
    var arr = root.childArr;
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].father = root;
            addConstraint(arr[i], root, 1, nodeConstLen[n]);
            addSetLine(arr[i], root);
            addTreeConstraint(arr[i], n + 1);
        }
    }
}

// 鼠标抬起事件
document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', move);
});

// 判断节点是否全部加载完的变量
var nodeRequest = 1;

// 递归请求创建树
function createTree(node) {
    node.childArr = new Array();
    node.style.display = 'none';
    node.line = document.createElement('div');
    node.lineColor = lineUpColor;
    node.lineZIndex = 0;
    treeBoxMain.appendChild(node);
    ajax({
        type: 'get',
        url: '/node',
        data: {
            id: node.id
        },
        success: function (res) {
            if (res) {
                node.childIdArr = res.children;
                var theme = document.createElement('div');
                theme.addClass('theme');
                theme.innerText = res.theme;
                node.appendChild(theme);
                node.content = res.content; // 主要内容
                node.editable = res.editable; // 是否可被编辑
                node.userName = res.userName; // 创建者
                node.authorId = res.author; // 创建者Id
                node.lastEditName = res.lastEditName; // 最后修改者
                node.lastEditTime = res.lastEditTime; // 最后修改时间
                node.star = res.star; // 点赞数
                for (var i = 0; i < node.childIdArr.length; i++) {
                    nodeRequest++;
                    var ch = document.createElement('div');
                    ch.father = node;
                    node.childArr.push(ch);
                    ch.id = node.childIdArr[i];
                    addClass(ch, 'node');
                    ch.style.backgroundColor = randomColor(160, 220);
                    createTree(ch);
                }
                nodeRequest--;
            } else {
                topAlert('节点不存在');
                nodeRequest--;
            }
        }
    })
}

// 创建根节点
var root = document.createElement('div');

// 添加相关样式
addClass(root, 'root');
root.style.backgroundColor = randomColor(120, 180);

// 从根节点开始创建树
function createRoot(rootID) {
    root.id = rootID;
    createTree(root);
}

// 判断是否所有节点都请求完毕的定时器，全部加载完之后开始添加相关约束
var nodeRequetTimer = setInterval(function () {
    if (nodeRequest == 0) {
        addTreeConstraint(root, 0);
        for (var i = 0; i < nodeSet.length; i++) {
            nodeSet[i].style.display = 'block';
            nodeSet[i].style.left = getIntRandom(leftBoundary + 3 * boundaryMinLength, rightBoundary - 3 * boundaryMinLength) + 'px';
            nodeSet[i].style.top = getIntRandom(topBoundary + 1.5 * boundaryMinLength, bottomBoundary - 1.5 * boundaryMinLength) + 'px';
            nodeSet[i].x = nodeSet[i].offsetLeft;
            nodeSet[i].y = nodeSet[i].offsetTop;
            addConstraint(nodeSet[i], null, 3, null);
            for (var j = i + 1; j < nodeSet.length; j++) {
                if ((nodeSet[i].father != nodeSet[j]) && (nodeSet[j].father != nodeSet[i])) {
                    addConstraint(nodeSet[i], nodeSet[j], 2, nodeMinLen);
                }
            }
        }
        clearInterval(nodeRequetTimer);
    }
}, 5);

// 遍历某个子树的函数
function ergodicNode(node, fun) {
    fun(node);
    var arr = node.childArr;
    for (var i = 0; i < arr.length; i++) {
        ergodicNode(arr[i], fun);
    }
}

// 遍历整棵树的函数
function ergodicTree(fun) {
    if (fun) {
        fun(root);
        var arr = root.childArr;
        for (var i = 0; i < arr.length; i++) {
            ergodicNode(arr[i], fun);
        }
    }
}

// #向页面中动态的增加一个节点（开发中）
function treeAppendNode(father, nodeData) {
    var node = document.createElement('div');
    node.father = father;
    node.style.backgroundColor = randomColor(100, 180);
    node.addClass('node');
    node.id = 100;
    node.childArr = new Array();
    node.style.display = 'none';
    node.line = document.createElement('div');
    node.lineColor = lineUpColor;
    node.lineZIndex = 0;
    treeBoxMain.appendChild(node);
    node.childIdArr = [];
    var theme = document.createElement('div');
    theme.addClass('theme');
    theme.innerText = nodeData.theme;
    node.appendChild(theme);
    node.content = nodeData.content; // 主要内容
    node.editable = nodeData.editable; // 是否可被编辑
    node.userName = user.userName; // 创建者
    node.authorId = user.userId;// 创建者Id
    node.lastEditName = user.userName; // 最后修改者
    node.lastEditTime = Date.now(); // 最后修改时间
    node.star = 0; // 点赞数
    node.style.display = 'block';
    node.style.left = getIntRandom(leftBoundary + boundaryMinLength, rightBoundary - boundaryMinLength) + 'px';
    node.style.top = getIntRandom(topBoundary + boundaryMinLength, bottomBoundary - boundaryMinLength) + 'px';
    node.x = node.offsetLeft;
    node.y = node.offsetTop;
    // addTreeConstraint(node, father.layer + 1);
    addConstraint(node, father, 1, nodeConstLen[node.layer]);
    addConstraint(node, null, 3, null);
    addSetLine(node, father);
    for (var i = 0; i < nodeSet.length; i++) {
        if (nodeSet[i] != father) {
            addConstraint(node, nodeSet[i], 2, nodeMinLen);
        }
    }
}

// ——————————————————右侧—————————————————— 
var projectIdBox = getDom('.mainBoxRight .projectId h4 span'); // 项目ID
var projectCopyId = getDom('.mainBoxRight .projectId h4 .copyId'); // 复制ID
var btnArr = getDomA('.mainBoxRight .controller .btnBox .btn'); // 按钮数组
var onOffArr = getDomA('.onOffBox .onOff .onOffBorder'); // 开关数组
var addNode = btnArr[0]; // 创建节点
var removeNode = btnArr[1]; // 删除节点
var changeNode = btnArr[2]; // 修改节点
var queryNode = btnArr[3]; // 查询节点
var refreshTree = btnArr[4]; // 刷新树
var operationNodeBox = getDom('.operationNodeBox'); // 操作节点盒子
var operationNodeBoxClose = operationNodeBox.getDom('.close'); // 操作节点盒子中关闭按钮
var operationNodeBoxTheme = operationNodeBox.getDom('h4 input'); // 节点主题
var operationNodeBoxJurisdictionBox = operationNodeBox.getDom('.onOff');// 是否允许被其他人修改盒子
var operationNodeBoxJurisdiction = operationNodeBox.getDom('.onOff .onOffBorder'); // 是否允许被其他人修改开关
var operationNodeBoxContent = operationNodeBox.getDom('textarea'); // 详细内容
var operationNodeBoxNodeCreator = operationNodeBox.getDom('.nodeCreator'); // 节点创建者
var operationNodeBoxLastRevision = operationNodeBox.getDom('.lastRevision'); // 最后修改
var operationNodeBoxSubmit = operationNodeBox.getDomA('input')[1]; // 提交按钮
var tipsBox = getDom('.tipsBox'); // 提示框盒子
var tipsTitle = tipsBox.getDom('.boxTitle'); // 提示框标题
var tipsContent = tipsBox.getDom('.content'); // 提示内容
var tipsClose = tipsBox.getDom('.close'); // 提示盒子右上角的叉
var tipsYes = tipsBox.getDom('.yes'); // 是
var tipsNo = tipsBox.getDom('.no'); // 否
var nowOperation = 'null'; // 盒子当前状态
var tipsState = 'null'; // 提示盒子状态
var nowNodeBox = getDom('.nowNode'); // 显示当前节点的盒子
var hideLine = onOffArr[0]; // 隐藏节点间线条
var lockingNode = onOffArr[1]; // 锁定所有节点
var hideTheme = onOffArr[2]; // 隐藏无关节点主题
var lockingNodeState = false;
addNode.jurisdiction = false;
removeNode.jurisdiction = false;
changeNode.jurisdiction = false;
queryNode.jurisdiction = false;
refreshTree.jurisdiction = true;
operationNodeBox.hide();
operationNodeBoxClose.hide();
operationNodeBoxTheme.hide();
operationNodeBoxJurisdictionBox.hide();
operationNodeBoxContent.hide();
operationNodeBoxNodeCreator.hide();
operationNodeBoxLastRevision.hide();
operationNodeBoxSubmit.hide();
for (var i = 0; i < btnArr.length; i++) {
    btnArr[i].style.backgroundColor = randomColor(120, 180);
}

// 初始化ID
projectIdBox.innerText = projectId;

// 添加点击复制ID事件
projectCopyId.addEventListener('click', function () {
    setShearPlateData(projectId);
});

function btnDisable(btn) {
    btn.jurisdiction = false;
    btn.style.cursor = 'not-allowed';
}

function btnCancelDisable(btn) {
    btn.jurisdiction = true;
    btn.style.cursor = 'pointer';
}

// 改变当前节点的函数
function changeNodeEvent() {
    if (nowNode) {
        nowNodeBox.children[0].innerText = nowNode.children[0].innerText;
        nowNodeBox.children[1].style.backgroundColor = getCSS(nowNode, 'background-color');
        nowNodeBox.children[1].style.width = nowNode.offsetWidth + 'px';
        nowNodeBox.children[1].style.height = nowNode.offsetHeight + 'px';
        nowNodeBox.children[1].style.borderRadius = nowNode.offsetHeight / 2 + 'px';
        nowNodeBox.children[1].innerText = '';
        btnCancelDisable(addNode);
        btnCancelDisable(removeNode);
        btnCancelDisable(changeNode);
        btnCancelDisable(queryNode);
    } else {
        nowNodeBox.children[0].innerText = '???';
        nowNodeBox.children[1].style.backgroundColor = '#ccc';
        nowNodeBox.children[1].style.width = '30px';
        nowNodeBox.children[1].style.height = '30px';
        nowNodeBox.children[1].style.borderRadius = '15px';
        nowNodeBox.children[1].innerText = '?';
        btnDisable(addNode);
        btnDisable(removeNode);
        btnDisable(changeNode);
        btnDisable(queryNode);
    }
}

// 页面加载时先调用一次
changeNodeEvent();

// 关闭按钮的点击事件
operationNodeBoxClose.addEventListener('click', function () {
    nowOperation = 'null';
    operationNodeBox.hide();
    operationNodeBoxClose.hide();
    operationNodeBoxTheme.hide();
    operationNodeBoxJurisdictionBox.hide();
    operationNodeBoxContent.hide();
    operationNodeBoxNodeCreator.hide();
    operationNodeBoxLastRevision.hide();
    operationNodeBoxSubmit.hide();
});

function tipsCloseFunction() {
    tipsState = 'null';
    tipsTitle.innerText = '？';
    tipsContent.innerText = '？？？';
    tipsBox.hide();
}

// 提示框中关闭按钮点击事件
tipsClose.addEventListener('click', tipsCloseFunction);

// 导出按钮点击事件
operationProject[0].addEventListener('click', function () {
    tipsState = 'exportProject';
    tipsTitle.innerText = '导出项目';
    tipsContent.innerText = '项目将会导出到本地，是否继续';
    tipsBox.show();
});

// 删除节点框中确定按钮点击事件
tipsYes.addEventListener('click', function () {
    if (tipsState == 'deleteNode') {
        ajax({
            type: 'delete',
            url: '/node',
            data: {
                nodeId: nowNode.id
            },
            success: function (res) {
                if (res.status_code == '200') {
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else if (tipsState == 'exportProject') {
        ajax({
            type: 'get',
            url: '/util/xmind',
            data: {
                project_id: projectId
            }
        });
    }
    tipsCloseFunction();
});

// 删除节点框中取消按钮点击事件
tipsNo.addEventListener('click', tipsCloseFunction);

// 创建节点按钮的点击事件
addNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'add';
        operationNodeBox.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = '';
        operationNodeBoxTheme.readOnly = false;
        operationNodeBoxTheme.addClass('editable');
        operationNodeBoxJurisdictionBox.show();
        if (operationNodeBoxJurisdiction.state) {
            onOffChange(operationNodeBoxJurisdiction);
        }
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = '';
        operationNodeBoxContent.readOnly = false;
        operationNodeBoxContent.addClass('textareaEditable');
        operationNodeBoxNodeCreator.hide();
        operationNodeBoxLastRevision.hide();
        operationNodeBoxSubmit.show();
    }
});

// 删除节点按钮的点击事件
removeNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        tipsState = 'deleteNode';
        tipsTitle.innerText = '删除节点';
        tipsContent.innerText = '该操作不可恢复，是否继续';
        tipsBox.show();
    }
});

// 修改节点按钮的点击事件
changeNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'change';
        operationNodeBox.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = nowNode.children[0].innerText;
        operationNodeBoxTheme.readOnly = false;
        operationNodeBoxTheme.addClass('editable');
        operationNodeBoxJurisdictionBox.hide();
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = nowNode.content;
        operationNodeBoxContent.readOnly = false;
        operationNodeBoxContent.addClass('textareaEditable');
        operationNodeBoxNodeCreator.hide();
        operationNodeBoxLastRevision.hide();
        operationNodeBoxSubmit.show();
    }
});

// 查看节点按钮的点击事件
queryNode.addEventListener('click', function () {
    if (this.jurisdiction) {
        nowOperation = 'query';
        operationNodeBox.show();
        operationNodeBoxClose.show();
        operationNodeBoxTheme.show();
        operationNodeBoxTheme.value = nowNode.children[0].innerText;
        operationNodeBoxTheme.readOnly = true;
        operationNodeBoxTheme.removeClass('editable');
        operationNodeBoxJurisdictionBox.hide();
        operationNodeBoxContent.show();
        operationNodeBoxContent.value = nowNode.content;
        operationNodeBoxContent.readOnly = true;
        operationNodeBoxContent.removeClass('textareaEditable');
        operationNodeBoxNodeCreator.show();
        operationNodeBoxNodeCreator.children[0].innerText = nowNode.userName;
        operationNodeBoxLastRevision.show();
        operationNodeBoxLastRevision.children[0].innerText = nowNode.lastEditName + ' ' + new Date(nowNode.lastEditTime - 0).toLocaleDateString();
        operationNodeBoxSubmit.hide();
    }
});

// 刷新按钮点击事件
refreshTree.addEventListener('click', function () {
    location.reload();
});

// 操作节点框中提交按钮点击事件
operationNodeBoxSubmit.addEventListener('click', function () {
    if (nowOperation == 'add') {
        var inpTheme = operationNodeBoxTheme.value;
        if (inpTheme.length <= 0) {
            topAlert('节点主题不能为空');
            return;
        } else if (inpTheme.length >= 20) {
            topAlert('节点主题不能超过20个字符');
            return;
        }
        var inpContent = operationNodeBoxContent.value;
        if (inpContent.length == 0) {
            inpContent = '暂无';
        }
        ajax({
            type: 'post',
            url: '/node',
            data: {
                content: inpContent,
                editable: operationNodeBoxJurisdiction.state,
                theme: inpTheme,
                parentId: nowNode.id,
                projectId: projectId
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    // treeAppendNode(nowNode, {
                    //     theme: inpTheme,
                    //     content: inpContent,
                    //     editable: operationNodeBoxJurisdiction.state
                    // });
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else if (nowOperation == 'change') {
        var inpTheme = operationNodeBoxTheme.value;
        if (inpTheme.length <= 0) {
            topAlert('节点主题不能为空');
            return;
        } else if (inpTheme.length >= 20) {
            topAlert('节点主题不能超过20个字符');
            return;
        }
        var inpContent = operationNodeBoxContent.value;
        if (inpContent.length == 0) {
            inpContent = '暂无';
        }
        ajax({
            type: 'put',
            url: '/node',
            data: {
                id: nowNode.id,
                theme: inpTheme,
                content: inpContent,
                editable: nowNode.editable,
                projectId: projectId
            },
            header: {
                'Content-Type': 'application/json',
                "X-HTTP-Method-Override": "PUT"
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    location.reload();
                } else {
                    topAlert('淦');
                }
            }
        });
    } else {
        topAlert('淦');
    }
});

// 循环按钮精灵图
cycleSprite(btnArr, 0, 0, 40);

// 开关切换函数
function onOffChange(onOff) {
    if (onOff.state) {
        onOff.state = false;
        onOff.style.backgroundColor = '#2c3e50';
        onOff.children[0].style.left = '1.5px';
        onOff.children[0].style.backgroundColor = ' #46607b';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffFalse.png)';
    } else {
        onOff.state = true;
        onOff.style.backgroundColor = '#16a085';
        onOff.children[0].style.left = '23.5px';
        onOff.children[0].style.backgroundColor = '#1abc9c';
        onOff.children[0].style.backgroundImage = 'url(img/public_onOffTrue.png)';
    }
}

// 开关初始化函数
function setOnOffEvent(onOff, fun) {
    onOff.state = false;
    if (fun) {
        onOff.addEventListener('click', function () {
            onOffChange(this);
            fun();
        });
    } else {
        onOff.addEventListener('click', function () {
            onOffChange(this);
        });
    }
}

// 隐藏节点间线条
setOnOffEvent(hideLine, function () {
    if (hideLine.state) {
        lineUpColor = '#e6eef1';
        ergodicTree(function (node) {
            node.lineColor = '#e6eef1';
        });
        if (nowNode) {
            var t = nowNode;
            while (t.father) {
                t = t.father;
                t.lineColor = 'rgb(106, 193, 237)';
            }
            changeChild(nowNode, function (node) {
                node.lineColor = 'rgb(106, 193, 237)';
            });
        }
    } else {
        lineUpColor = '#333';
        ergodicTree(function (node) {
            node.lineColor = '#333';
        });
        if (nowNode) {
            var t = nowNode;
            while (t.father) {
                t = t.father;
                t.lineColor = 'rgb(106, 193, 237)';
            }
            changeChild(nowNode, function (node) {
                node.lineColor = 'rgb(106, 193, 237)';
            });
        }
    }
});

// 锁定所有节点
setOnOffEvent(lockingNode);

// 隐藏无关节点主题
setOnOffEvent(hideTheme, function () {
    if (hideTheme.state) {
        ergodicTree(function (node) {
            node.addClass('hideTheme');
        });
        if (nowNode) {
            var t = nowNode;
            t.removeClass('hideTheme');
            while (t.father) {
                t = t.father;
                t.removeClass('hideTheme');
            }
            changeChild(nowNode, function (node) {
                node.removeClass('hideTheme');
            });
        }
    } else {
        ergodicTree(function (node) {
            node.removeClass('hideTheme');
        });
    }
});

// 设置节点是否可被其他人修改
setOnOffEvent(operationNodeBoxJurisdiction);

// 维护约束的定时器
setInterval(function () {
    if (!lockingNode.state) {
        for (var i = 0; i < constraintArr.length; i++) {
            var node1 = constraintArr[i][0];
            var node2 = constraintArr[i][1];
            var type = constraintArr[i][2];
            var len = constraintArr[i][3];
            runConstraint(node1, node2, type, len);
        }
    }
}, 5);

// 维护节点间线条的定时器
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, 5);

// ——————————页面加载完之后发送请求——————————
window.onload = function () {

    // 请求项目页面
    ajax({
        type: 'get',
        url: '/project',
        data: {
            id: projectId
        },
        success: function (res) {
            introduceP.innerText = res.introduction;
            projectCreatorName.innerText = res.creatorName;
            projectName.innerText = res.name;
            projectLevel.innerText = res.rank;
            creationDate.innerText = new Date(res.createTime - 0).toLocaleDateString();
            closingDate.innerText = new Date(res.deadline - 0).toLocaleDateString();
            progressCountDown.innerText = calculateRemainingTime(res.deadline - Date.now());
            var progress = (1 - (res.deadline - Date.now()) / (res.deadline - res.createTime)) * 100;
            progressContent.style.width = progress + '%';
            progressWave.style.left = progress + '%';
            createRoot(res.headNodeId);
        }
    });
}