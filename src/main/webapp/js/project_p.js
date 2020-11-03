// ————————————全局————————————

// 设置文本不可选中
var tool = new Tool(document, window);
tool.textProhibition();

var projectId = getLocation('project_id');
var ctrlState = false;

// 键盘按下切换ctrl状态
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 17) {
        // if (transparentBaffle.getCSS('display') == 'none') {
        //     if (!ctrlState) {
        //         if (nowNode) {
        //             nowNode.style.boxShadow = 'none';
        //             var t = nowNode;
        //             while (t.father) {
        //                 removeHeightLight(t.father);
        //                 t = t.father;
        //             }
        //             changeChild(nowNode, removeHeightLight);
        //             if (hideTheme.state) {
        //                 ergodicTree(function (node) {
        //                     node.addClass('hideTheme');
        //                 });
        //             }
        //         }
        //         nowNode = null;
        //         changeNodeEvent();
        //         lineColor = lineUpColor;
        //         document.removeEventListener('mousemove', move);
        //     }
        //     ctrlState = true;
        // }
        ctrlState = true;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 17) {
        ctrlState = false;
    }
});

var userPerformance = 5; // 性能参数

var colorSet = [['#e6eef1', 'rgb(248, 252, 250)', 'rgb(33, 75, 91)', 'rgba(255, 167, 15)', '#214b5b', '#ffffff', 'url(img/logo1.png)'],
['#1e1e1e', 'rgb(51, 51, 51)', 'rgb(205, 205, 205)', 'rgba(255, 167, 15)', '#cccccc', '#666666', 'url(img/project_logo_q.png)']];
var colorState = 0;
var mainColor; // 主背景色
var modularColor; // 模块背景色
var textColor = 'rgb(33, 75, 91)'; // 文字颜色
var textLightColor; // 文本高亮色
var progressColor; // 进度条颜色
var progressBoxColor; // 进度条盒子颜色
var logoBGI; // logo的url
// 配色函数
function setColor() {
    mainColor = colorSet[colorState][0];
    modularColor = colorSet[colorState][1];
    textColor = colorSet[colorState][2];
    textLightColor = colorSet[colorState][3];
    progressColor = colorSet[colorState][4];
    progressBoxColor = colorSet[colorState][5];
    logoBGI = colorSet[colorState][6];
}

setColor();

// ————————————左侧控件————————————

var firstbtnArr = getDom('.control .first').children; // 第一套按钮数组
var addNode = firstbtnArr[0]; // 创建节点
var removeNode = firstbtnArr[1]; // 删除节点
var changeNode = firstbtnArr[2]; // 修改节点
var queryNode = firstbtnArr[3]; // 查询节点
var refreshTree = firstbtnArr[4]; // 刷新树

cycleSprite(firstbtnArr, 0, 0, 30);

// ——————————————中间——————————————
var treeBox = getDom('.treeBox'); // 树盒子框架
var treeBoxMain = getDom('.treeBox .treeBoxMain'); // 树盒子
var treeBoxPercentageTips = getDom('.treeBox .treeBoxPercentageTips'); // 提示树盒子缩放倍数的盒子
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

// 维护treeBoxState变量相关事件
treeBox.addEventListener('mouseover', function () {
    treeBoxState = true;
});
treeBox.addEventListener('mouseout', function () {
    treeBoxState = false;
});


// 树盒子缩放
treeBox.addEventListener('mousewheel', function (e) {
    console.log(1);
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
        // if (hideTheme.state) {
        //     ergodicTree(function (node) {
        //         node.addClass('hideTheme');
        //     });
        // }
        nowNode = null;
        changeNodeEvent();
    }
});


var treeFullScreenState = false; // 全屏状态
var treeFullScreenOnOff = getDom('.treeBox .treeBoxFullScreen'); // 树盒子全屏按钮

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

// 全屏快捷键(ctrl + F)
document.addEventListener('keydown', function (e) {
    if (e.key == 'f' && e.ctrlKey) {
        e.preventDefault();
        if (!treeFullScreenState) {
            domFullScreen(treeBox);
            this.style.backgroundImage = 'url(img/project_cancelFullScreen.png)';
            treeFullScreenState = true;
        }
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

// 初始化树结构相关参数
var nowNode; // 当前正在拖动的节点
var nodeConstLen = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
// var nodeConstLen = [80, 75, 70, 65, 50]; // 父子节点之间的固定距离
var nodeMinLen = 80; // 无关联节点之间的最小距离
var bfb = 0.7; // 节点之间线的松紧，紧0 - 1松
// var lineDownColor = 'rgb(246, 255, 80)'; // 高亮时的颜色
// var lineDownColor = '#6AC1ED'; // 高亮时的颜色
var lineDownColor = 'rgb(106, 193, 237)'; // 高亮时的颜色
// var lineDownColor = '#aaa'; // 高亮时的颜色
var lineUpColor = 'rgba(' + textColor.split(')')[0].split('(')[1] + ', 0.5)'; // 非高亮时的颜色
var lineColor = lineUpColor; // 当前线颜色
var nowNodeBoxShadowColor = '#fed71a'; // 当前选中节点盒子阴影颜色
var constraintArr = new Array(); // 记录约束的数组
var setLineArr = new Array(); // 记录要添加线条的数组
var mx, my; // 鼠标上次的位置
var topBoundary = 0; // 边界约束中的边界
var leftBoundary = 0;
var bottomBoundary = treeBoxMain.offsetHeight;
var rightBoundary = treeBoxMain.offsetWidth;
var boundaryMinLength = bottomBoundary * 0.18; //边界约束中和边界的最小距离
var treeBoxMainWidth = treeBoxMain.offsetWidth;

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

// 缩放时维护树盒子
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
    // node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    node.lineColor = lineDownColor;
    node.line.lineZIndex = 19;
}

// 给节点删除高亮
function removeHeightLight(node) {
    // node.style.boxShadow = '0px 0px 30px ' + lineDownColor;
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

// 生成节点间线条的函数
function setline(node1, node2) {
    try {
        treeBoxMain.removeChild(node1.line);
    } catch (e) { }

    // 创建div元素
    node1.line = document.createElement('div');

    // 计算相关坐标距离
    var x1 = node1.offsetLeft + node1.offsetWidth / 2;
    var y1 = node1.offsetTop + node1.offsetHeight / 2;
    var x2 = node2.offsetLeft + node2.offsetWidth / 2;
    var y2 = node2.offsetTop + node2.offsetHeight / 2;
    var lineLen = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var xz = (x1 + x2) / 2;
    var yz = (y1 + y2) / 2;
    var k = (y2 - y1) / (x2 - x1);
    var jd = Math.atan(k) * 180 / Math.PI;

    // 设置线条样式属性
    node1.line.style.width = lineLen + 'px';
    node1.line.style.height = '1px';
    node1.line.style.position = 'absolute';
    node1.line.style.left = xz - lineLen / 2 + 'px';
    node1.line.style.top = yz - 0.5 + 'px';
    node1.line.style.zIndex = 1;
    node1.line.style.transform = 'rotate(' + jd + 'deg)';
    node1.line.style.backgroundColor = node1.lineColor;
    node1.line.style.zIndex = node1.lineZIndex;
    // node1.line.style.boxShadow = '0px 0px 8px ' + node1.lineColor;
    if (node1.lineColor == 'rgb(106, 193, 237)') {
        node1.line.style.boxShadow = '0px 0px 8px ' + node1.lineColor;
    }

    // 将线条添加到树盒子中
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

    // 设置节点层级
    root.layer = n;

    // 设置节点坐标
    root.x = root.offsetLeft;
    root.y = root.offsetTop;

    // 给节点添加鼠标点击事件
    root.addEventListener('mousedown', function (e) {
        e.stopPropagation();

        // 如果有当前选中节点，就清除当前节点的相关样式
        if (nowNode) {
            nowNode.style.boxShadow = 'none';
            var t = nowNode;
            while (t.father) {
                removeHeightLight(t.father);
                t = t.father;
            }
            changeChild(nowNode, removeHeightLight);
        }

        // 获取鼠标位置
        mx = e.clientX;
        my = e.clientY;

        // 维护当前选中节点
        nowNode = this;
        changeNodeEvent();

        // 更新当前节点所有相关节点的样式
        var t = nowNode;
        while (t.father) {
            addHeightLight(t.father);
            t = t.father;
        }
        changeChild(root, addHeightLight);

        // 设置当前节点的样式
        nowNode.style.boxShadow = '0px 0px ' + nowNode.offsetHeight + 'px ' + nowNodeBoxShadowColor;
        // if (ctrlState && !lockingNode.state) {
        //     document.addEventListener('mousemove', move);
        // }
        if (ctrlState) {
            document.addEventListener('mousemove', move);
        }

        // 判断节点主题是否被隐藏，并执行相关动作
        // if (hideTheme.state) {
        //     ergodicTree(function (node) {
        //         node.addClass('hideTheme');
        //     });
        //     if (nowNode) {
        //         var t = nowNode;
        //         t.removeClass('hideTheme');
        //         while (t.father) {
        //             t = t.father;
        //             t.removeClass('hideTheme');
        //         }
        //         changeChild(nowNode, function (node) {
        //             node.removeClass('hideTheme');
        //         });
        //     }
        // }
    });

    // 将当前节点添加到节点数组中
    nodeSet.push(root);

    // 遍历当前节点的所有子节点
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

    // 初始化节点相关属性参数
    node.childArr = new Array();
    node.style.display = 'none';
    node.line = document.createElement('div');
    node.lineColor = lineUpColor;
    node.lineZIndex = 0;

    // 将当前节点添加到树盒子中
    treeBoxMain.appendChild(node);

    // 请求当前节点相关的数据
    ajax({
        type: 'get',
        url: '/node',
        data: {
            id: node.id
        },
        success: function (res) {
            if (res) {
                node.childIdArr = res.children;

                // 添加节点主题
                var theme = document.createElement('div');
                theme.addClass('theme');
                theme.style.color = textColor;
                theme.style.transition = 'color .5s';
                theme.innerText = res.theme;
                node.appendChild(theme);

                // 添加节点相关数据
                node.content = res.content; // 主要内容
                node.editable = res.banAppend; // 是否可被编辑
                node.userName = res.userName; // 创建者
                node.authorId = res.author; // 创建者Id
                node.lastEditName = res.lastEditName; // 最后修改者
                node.lastEditTime = res.lastEditTime; // 最后修改时间
                node.star = res.star; // 点赞数
                node.stared = res.stared; // 点赞状态

                // 根据ID循环创建每一个子节点
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
    });
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

var nodeMaxSize = 36; // 子节点最大尺寸
var nodeMinSize = 18; // 子节点最小尺寸

// 判断是否所有节点都请求完毕的定时器，全部加载完之后开始添加相关约束
var nodeRequetTimer = setInterval(function () {
    if (nodeRequest == 0) {
        addTreeConstraint(root, 0);

        // 求出最大的点赞数
        var maxStar = 0;
        for (var i = 0; i < nodeSet.length; i++) {
            maxStar = maxStar > nodeSet[i].star ? maxStar : nodeSet[i].star;
        }

        // 初始化所有节点
        for (var i = 0; i < nodeSet.length; i++) {

            // 给所有节点设置宽高圆角和随机位置
            nodeSet[i].style.width = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
            nodeSet[i].style.height = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
            nodeSet[i].style.borderRadius = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) / 2 + 'px';
            nodeSet[i].style.left = getIntRandom(leftBoundary + 3 * boundaryMinLength, rightBoundary - 3 * boundaryMinLength) + 'px';
            nodeSet[i].style.top = getIntRandom(topBoundary + 1.5 * boundaryMinLength, bottomBoundary - 1.5 * boundaryMinLength) + 'px';
            nodeSet[i].style.display = 'block';
            nodeSet[i].x = nodeSet[i].offsetLeft;
            nodeSet[i].y = nodeSet[i].offsetTop;

            // 添加边界约束
            addConstraint(nodeSet[i], null, 3, null);

            // 给没有直接父子关系的节点间添加最小距离约束
            for (var j = i + 1; j < nodeSet.length; j++) {
                if ((nodeSet[i].father != nodeSet[j]) && (nodeSet[j].father != nodeSet[i])) {
                    addConstraint(nodeSet[i], nodeSet[j], 2, nodeMinLen);
                }
            }
        }

        // 根节点最大
        root.style.width = '54px';
        root.style.height = '54px';
        root.style.borderRadius = '27px';

        // 清除定时器
        clearInterval(nodeRequetTimer);
        treeReloadFlag = false;
    }
}, userPerformance);

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

// 向页面中动态的增加一个节点
function treeAppendNode(father, nodeData) {

    // 创建div元素
    var appendNode = document.createElement('div');

    // 设置父节点
    appendNode.father = father;

    // 父节点添加子节点
    father.childArr.push(appendNode);

    // 添加相关样式和节点id
    appendNode.style.backgroundColor = randomColor(100, 180);
    appendNode.addClass('node');
    appendNode.id = nodeData.id;
    appendNode.childArr = new Array();
    appendNode.style.display = 'none';
    appendNode.line = document.createElement('div');
    appendNode.lineColor = lineUpColor;
    appendNode.lineZIndex = 0;

    // 将节点添加到树盒子中
    treeBoxMain.appendChild(appendNode);
    appendNode.childIdArr = [];
    var theme = document.createElement('div');
    theme.addClass('theme');
    theme.innerText = nodeData.theme;
    appendNode.appendChild(theme);

    // 添加相关数据
    appendNode.content = nodeData.content; // 主要内容
    appendNode.editable = nodeData.editable; // 是否可被编辑
    appendNode.userName = user.userName; // 创建者
    appendNode.authorId = user.userId; // 创建者Id
    appendNode.lastEditName = user.userName; // 最后修改者
    appendNode.lastEditTime = Date.now(); // 最后修改时间
    appendNode.star = 0; // 点赞数

    // 随机位置
    appendNode.style.display = 'block';
    appendNode.style.left = getIntRandom(leftBoundary + boundaryMinLength, rightBoundary - boundaryMinLength) + 'px';
    appendNode.style.top = getIntRandom(topBoundary + boundaryMinLength, bottomBoundary - boundaryMinLength) + 'px';
    appendNode.x = appendNode.offsetLeft;
    appendNode.y = appendNode.offsetTop;

    // 添加相关约束和事件
    addTreeConstraint(appendNode, father.layer + 1);
    addConstraint(appendNode, father, 1, nodeConstLen[father.layer]);
    addSetLine(appendNode, father);
    for (var i = 0; i < nodeSet.length; i++) {
        if (nodeSet[i] != appendNode && nodeSet != father) {
            addConstraint(appendNode, nodeSet[i], 2, nodeMinLen);
        }
    }
    addConstraint(appendNode, null, 3, null);
}

// 动态删除页面中的节点
function treeRemoveNode(node) {
    if (node.childArr.length == 0 && node.father) {
        var father = node.father;

        // 创建工具数组
        var arr = new Array();

        // 维护父节点的子节点列表
        for (var i = 0; i < father.childArr.length; i++) {
            if (father.childArr[i] != node) {
                arr.push(father.childArr[i]);
            }
        }
        father.childArr = arr;

        // 维护nodeSet数组
        arr = new Array();
        for (var i = 0; i < nodeSet.length; i++) {
            if (nodeSet[i] != node) {
                arr.push(nodeSet[i]);
            }
        }
        nodeSet = arr;

        // 维护约束数组
        arr = new Array();
        for (var i = 0; i < constraintArr.length; i++) {
            if (!(constraintArr[i][0] == node || (constraintArr[i][2] == 2 && constraintArr[i][1] == node))) {
                arr.push(constraintArr[i]);
            }
        }
        constraintArr = arr;

        // 维护线条数组
        arr = new Array();
        for (var i = 0; i < setLineArr.length; i++) {
            if (!(setLineArr[i][0] == node || setLineArr[i][1] == node)) {
                arr.push(setLineArr[i]);
            }
        }
        setLineArr = arr;

        // 将节点的线条从父盒子中删除
        treeBoxMain.removeChild(node.line);

        // 将节点从树盒子中删除
        treeBoxMain.removeChild(node);
    } else {
        topAlert('删除失败');
    }
}

// 刷新树盒子
var treeReloadFlag = true; // 节流阀

function treeReload() {
    if (treeReloadFlag) {
        return;
    }
    treeReloadFlag = true;

    // 将当前选中节点置空
    nowNode = null;
    changeNodeEvent();

    // 将所有节点和对应的线条从树盒子中删除掉
    for (var i = 0; i < nodeSet.length; i++) {
        try {
            treeBoxMain.removeChild(nodeSet[i].line);
        } catch (e) {
        }
        treeBoxMain.removeChild(nodeSet[i]);
    }

    // 重置节点数组线条数组和约束数组
    nodeSet = new Array();
    constraintArr = new Array();
    setLineArr = new Array();

    // 重置根节点
    root = document.createElement('div');
    addClass(root, 'root');
    root.style.backgroundColor = randomColor(120, 180);

    // 重新递归请求整棵树
    createRoot(projectHeadNodeId);
    nodeRequest = 1;
    nodeRequetTimer = setInterval(function () {
        if (nodeRequest == 0) {
            addTreeConstraint(root, 0);

            // 求出最大的点赞数
            var maxStar = 0;
            for (var i = 0; i < nodeSet.length; i++) {
                maxStar = maxStar > nodeSet[i].star ? maxStar : nodeSet[i].star;
            }

            // 初始化所有节点
            for (var i = 0; i < nodeSet.length; i++) {

                // 给所有节点设置宽高圆角和随机位置
                nodeSet[i].style.width = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
                nodeSet[i].style.height = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) + 'px';
                nodeSet[i].style.borderRadius = ((nodeMaxSize - nodeMinSize) * nodeSet[i].star / maxStar + nodeMinSize) / 2 + 'px';
                nodeSet[i].style.left = getIntRandom(leftBoundary + 3 * boundaryMinLength, rightBoundary - 3 * boundaryMinLength) + 'px';
                nodeSet[i].style.top = getIntRandom(topBoundary + 1.5 * boundaryMinLength, bottomBoundary - 1.5 * boundaryMinLength) + 'px';
                nodeSet[i].style.display = 'block';
                nodeSet[i].x = nodeSet[i].offsetLeft;
                nodeSet[i].y = nodeSet[i].offsetTop;

                // 添加边界约束
                addConstraint(nodeSet[i], null, 3, null);

                // 给没有直接父子关系的节点间添加最小距离约束
                for (var j = i + 1; j < nodeSet.length; j++) {
                    if ((nodeSet[i].father != nodeSet[j]) && (nodeSet[j].father != nodeSet[i])) {
                        addConstraint(nodeSet[i], nodeSet[j], 2, nodeMinLen);
                    }
                }
            }

            // 根节点最大
            root.style.width = '54px';
            root.style.height = '54px';
            root.style.borderRadius = '27px';

            // 清除定时器
            clearInterval(nodeRequetTimer);
            treeReloadFlag = false;
        }
    }, userPerformance);
}


// 改变当前节点的函数
function changeNodeEvent() {
    if (nowNode) {
        // nowNodeBox.children[0].innerText = nowNode.children[0].innerText;
        // nowNodeBox.children[1].style.backgroundColor = getCSS(nowNode, 'background-color');
        // nowNodeBox.children[1].style.width = nowNode.offsetWidth + 'px';
        // nowNodeBox.children[1].style.height = nowNode.offsetHeight + 'px';
        // nowNodeBox.children[1].style.borderRadius = nowNode.offsetHeight / 2 + 'px';
        // nowNodeBox.children[1].innerText = '';

        // 判断按钮权限
        // if (!nowNode.editable || (nowNode.authorId == user.userId)) {
        //     btnCancelDisable(addNode);
        // } else {
        //     btnDisable(addNode);
        // }
        // if (nowNode.authorId == user.userId) {
        //     btnCancelDisable(changeNode);
        //     if (nowNode.childArr.length == 0) {
        //         btnCancelDisable(removeNode);
        //     } else {
        //         btnDisable(removeNode);
        //     }
        // } else {
        //     btnDisable(removeNode);
        //     btnDisable(changeNode);
        // }
        // btnCancelDisable(queryNode);
    } else {
        // nowNodeBox.children[0].innerText = '请选择节点';
        // nowNodeBox.children[0].innerText = '';
        // nowNodeBox.children[1].style.backgroundColor = '#ccc';
        // nowNodeBox.children[1].style.width = '30px';
        // nowNodeBox.children[1].style.height = '30px';
        // nowNodeBox.children[1].style.borderRadius = '15px';
        // nowNodeBox.children[1].innerText = '?';
        // btnDisable(addNode);
        // btnDisable(removeNode);
        // btnDisable(changeNode);
        // btnDisable(queryNode);
    }
}

// 页面加载时先调用一次
changeNodeEvent();

// 维护约束的定时器
setInterval(function () {
    // if (!lockingNode.state) {
    for (var i = 0; i < constraintArr.length; i++) {
        var node1 = constraintArr[i][0];
        var node2 = constraintArr[i][1];
        var type = constraintArr[i][2];
        var len = constraintArr[i][3];
        runConstraint(node1, node2, type, len);
    }
    // }
}, userPerformance);

// 维护节点间线条的定时器
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, userPerformance);

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
            projectHeadNodeId = res.headNodeId;
            // introduceP.innerText = res.introduction;
            projectCreatorId = res.author;
            // projectCreatorName.innerText = res.creatorName;
            // generateParticipant(res.contributors);
            // projectName.innerText = res.name;
            // projectLevel.innerText = res.rank;
            // var date = new Date(res.createTime - 0);
            // var str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            // creationDate.innerText = str;
            // date = new Date(res.deadline - 0);
            // str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            // closingDate.innerText = str;
            // progressCountDown.innerText = calculateRemainingTime(res.deadline - Date.now());
            // var progress = (1 - (res.deadline - Date.now()) / (res.deadline - res.createTime)) * 100;
            // progressContent.style.width = progress + '%';
            // progressWave.style.left = progress + '%';
            createRoot(res.headNodeId);
        }
    });
}