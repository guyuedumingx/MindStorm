var tool = new Tool(document, window);
tool.textProhibition();

var ctrlState = false;
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 17) {
        ctrlState = true;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 17) {
        ctrlState = false;
    }
});
// ——————————————————头部——————————————————
// projectName.style.top = window.pageYOffset - 48 + 'px';
// window.addEventListener('scroll', function () {
//     projectName.style.top = window.pageYOffset - 48 + 'px';
//     // console.log(window.pageYOffset);
// });
// window.scroll(0, 1);
// window.scroll(0, 0);

// var mainBoxBGC = 'rgb(230, 238, 241)';
// var mainBox = getDom('.mainBox');
// for (var i = 0; i < mainBox.children.length; i++) {
//     for (var j = 0; j < mainBox.children[i].children.length; j++) {
//         mainBox.children[i].children[j].style.backgroundColor = mainBoxBGC;
//     }
// }

// ——————————————————左侧——————————————————
var introduceOpen = getDom('.mainBoxLeft .introduce a'); // 项目简介展开的开关
var introduce = getDom('.mainBoxLeft .introduce .introduceMain'); // 项目简介内容盒子
var introduceP = introduce.getDom('p'); // 项目简介内容
var introduceState = false; // 项目简介展开状态

// 项目简介展开按钮点击事件
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

// ——————————————————中间——————————————————
var projectName = getDom('.progressBar .projectName'); // 项目名
var creationDate = getDom('.progressBar .progressBarTop .creationDate'); // 创建日期
var closingDate = getDom('.progressBar .progressBarTop .closingDate'); // 截止日期
var progressContent = getDom('.progressBox .progressContent'); // 进图条盒子
var progressWave = getDom('.progressBox .wave'); // 流动效果盒子
var treeBox = getDom('.mainBoxMiddle .treeBox'); // 树盒子框架
var treeBoxMain = getDom('.mainBoxMiddle .treeBox .treeBoxMain'); // 树盒子

var treeFullScreenState = false;
var treeFullScreenOnOff = getDom('.mainBoxMiddle .treeBox .treeBoxFullScreen'); // 树盒子全屏按钮
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
var nowNode; // 当前正在拖动的节点
// var nodeConstLen = [150, 120, 90, 80, 80, 80];
// var nodeConstLen = [50, 60, 70, 80, 80];
var nodeConstLen = [80, 75, 70, 65, 50]; // 父子节点之间的固定距离
var nodeMinLen = 120; // 无关联节点之间的最小距离
var bfb = 0.7; // 节点之间线的松紧，紧0 - 1松
// var lineDownColor = 'rgb(246, 255, 80)'; // 高亮时的颜色
var lineDownColor = '#6AC1ED'; // 高亮时的颜色
// var lineDownColor = '#aaa'; // 高亮时的颜色
var lineUpColor = '#333'; // 非高亮时的颜色
var lineColor = lineUpColor; // 当前线颜色
var constraintArr = new Array(); // 记录约束的数组
var setLineArr = new Array(); // 记录要添加线条的数组
var mx, my; // 鼠标上次的位置
var topBoundary = 0; // 边界约束中的边界
var leftBoundary = 0;
var bottomBoundary = 700;
var rightBoundary = 1500;
var boundaryMinLength = 100; //边界约束中和边界的最小距离

// 鼠标拖动的函数
function move(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    if (cx >= leftBoundary + boundaryMinLength && cx <= rightBoundary - boundaryMinLength) {
        nowNode.x = nowNode.x + cx - mx;
        mx = cx;
    }
    if (cy >= topBoundary + boundaryMinLength && cy <= bottomBoundary - boundaryMinLength) {
        nowNode.y = nowNode.y + cy - my;
        my = cy;
    }
}

function addHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.lineColor = lineDownColor;
    node.line.lineZIndex = 19;
}

function removeHeightLight(node) {
    node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.style.boxShadow = 'none';
    node.lineColor = lineUpColor;
    node.line.lineZIndex = 1;
}

function changeChild(node, fun) {
    var chArr = node.childArr;
    fun(node);
    for (var i = 0; i < chArr.length; i++) {
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

function setPosition(node) {
    node.style.left = node.x - node.offsetWidth / 2 + 'px';
    node.style.top = node.y - node.offsetHeight / 2 + 'px';
}

function addSetLine(node1, node2) {
    setLineArr.push([node1, node2]);
}

function addConstraint(node1, node2, type, len) {
    constraintArr.push([node1, node2, type, len]);
}

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
var nodeSet = new Array();

function addTreeConstraint(root, n) {
    if (!root.father) {
        root.father = null;
    }
    root.layer = n;
    root.x = root.offsetLeft;
    root.y = root.offsetTop;
    root.addEventListener('mousedown', function (e) {
        mx = e.clientX;
        my = e.clientY;
        nowNode = this;
        nowNode.style.boxShadow = '0px 0px 30px ' + lineDownColor;
        var t = nowNode;
        while (t.father) {
            addHeightLight(t.father);
            t = t.father;
        }
        changeChild(root, addHeightLight);
        if (ctrlState) {
            document.addEventListener('mousemove', move);
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

document.addEventListener('mouseup', function () {
    if (nowNode) {
        nowNode.style.boxShadow = 'none';
        var t = nowNode;
        while (t.father) {
            removeHeightLight(t.father);;
            t = t.father;
        }
        changeChild(nowNode, removeHeightLight);
    }
    nowNode = null;
    lineColor = lineUpColor;
    document.removeEventListener('mousemove', move);
})

setInterval(function () {
    for (var i = 0; i < constraintArr.length; i++) {
        var node1 = constraintArr[i][0];
        var node2 = constraintArr[i][1];
        var type = constraintArr[i][2];
        var len = constraintArr[i][3];
        runConstraint(node1, node2, type, len);
    }
}, 5);
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, 5);

var nodeRequest = 1;

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
            id: node.user_id
        },
        success: function (res) {
            if (res) {
                node.childIdArr = res.childrenId;
                node.innerHTML = res.userName;
                for (var i = 0; i < node.childIdArr.length; i++) {
                    nodeRequest++;
                    var ch = document.createElement('div');
                    ch.father = node;
                    node.childArr.push(ch);
                    ch.user_id = node.childIdArr[i];
                    addClass(ch, 'node');
                    ch.style.backgroundColor = randomColor(100, 180);
                    createTree(ch);
                }
                nodeRequest--;
            } else {
                console.log('用户不存在');
                nodeRequest--;
            }
        }
    })
}

var root = document.createElement('div');
addClass(root, 'root');
root.style.backgroundColor = randomColor(100, 180);

function createRoot(rootID) {
    root.user_id = rootID;
    createTree(root);
}
var nodeRequetTimer = setInterval(function () {
    if (nodeRequest == 0) {
        addTreeConstraint(root, 0);
        for (var i = 0; i < nodeSet.length; i++) {
            nodeSet[i].style.display = 'block';
            nodeSet[i].style.left = getIntRandom(leftBoundary + boundaryMinLength, rightBoundary - boundaryMinLength) + 'px';
            nodeSet[i].style.top = getIntRandom(topBoundary + boundaryMinLength, bottomBoundary - boundaryMinLength) + 'px';
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
// ——————————————————有侧—————————————————— 
var projectLevel = getDom('.mainBoxRight .projectLevel h4 span'); // 项目等级
var btnArr = getDomA('.mainBoxRight .controller .btnBox .btn');
var onOffArr = getDomA('.onOffBox .onOff .onOffBorder');

cycleSprite(btnArr, 0, 0, 27);

function onOffChange(onOff) {
    if (onOff.state) {
        onOff.state = false;
        onOff.style.backgroundColor = '#2c3e50';
        onOff.children[0].style.left = '1.5px';
        onOff.children[0].style.backgroundColor = ' #46607b';
        onOff.children[0].innerText = 'x';
    } else {
        onOff.state = true;
        onOff.style.backgroundColor = '#16a085';
        onOff.children[0].style.left = '23.5px';
        onOff.children[0].style.backgroundColor = '#1abc9c';
        onOff.children[0].innerText = '✔';
    }
}

function setOnOffEvent(onOff) {
    onOff.state = false;
    onOff.addEventListener('click', function () {
        onOffChange(this);
    });
}

for (var i = 0; i < onOffArr.length; i++) {
    setOnOffEvent(onOffArr[i]);
}

// ——————————页面加载完之后发送请求——————————
window.onload = function () {
    ajax({
        type: 'get',
        url: '/project',
        data: {},
        success: function (res) {
            introduceP.innerText = res.introdution;
            projectName.innerText = res.name;
            projectLevel.innerText = res.rank;
            creationDate.innerText = new Date(res.creatTime).toLocaleDateString();
            closingDate.innerText = new Date(res.ddl).toLocaleDateString();
            var progress = (1 - (res.ddl - Date.now()) / (res.ddl - res.creatTime)) * 100;
            progressContent.style.width = progress + '%';
            progressWave.style.left = progress + '%';
            createRoot(res.headNodeId);
        }
    });
}