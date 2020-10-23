// 设置文本不可选中
var tool = new Tool(document, window);
tool.textProhibition();

// 页面切换
var loginLink = getDomA('.link a');
var forgetPasswoed = loginLink[0];
var goRegister = loginLink[1];
var goLogin = getDom('.register a');
var mainBox = getDom('.mainBox');

goRegister.addEventListener('click', function () {
    mainBox.style.transform = 'rotateY(-180deg)';
});

goLogin.addEventListener('click', function () {
    mainBox.style.transform = 'rotateY(0deg)';
});

forgetPasswoed.addEventListener('click', function (e) {
    e.preventDefault();
    topAlert('密码忘了活该');
});

// 邮箱提示blur事件
function emailTipsBlur() {
    this.tips.hide();
    if (this.nowTips != null) {
        this.tips.children[this.nowTips].removeClass('heightLight');
    }
    clearEmailTipsEvent(this);
}

// 邮箱提示mouseover事件
function emailTipsMouseOver() {
    if (this.father.nowTips != null) {
        this.father.tips.children[this.father.nowTips].removeClass('heightLight');
    }
    this.father.nowTips = this.index;
    this.father.value = this.father.tips.children[this.father.nowTips].innerText;
    this.father.tips.children[this.father.nowTips].addClass('heightLight');
}

function clearEmailTipsEvent(input) {
    input.removeEventListener('blur', emailTipsBlur);
    for (var i = 0; i < input.tips.children.length; i++) {
        input.tips.children[i].removeEventListener('mouseover', emailTipsMouseOver);
    }
}

// 邮箱提示函数
function emailTips(input) {
    input.addEventListener('keydown', function (e) {
        var str = input.value;
        if (e.key == 'Shift' || e.key == 'Control' || e.key == 'Alt') {
            return 0;
        }
        if (e.key == ' ') {
            e.preventDefault();
        }
        if (str.length == 0) {
            input.tips.hide();
            if (input.nowTips != null) {
                input.tips.children[input.nowTips].removeClass('heightLight');
            }
            clearEmailTipsEvent(input);
        } else if (e.key == 'ArrowUp') {
            e.preventDefault();
            if (input.nowTips == null) {
                input.nowTips = 0;
            }
            input.tips.children[input.nowTips].removeClass('heightLight');
            input.nowTips = (input.nowTips + 5) % 6;
            input.value = input.tips.children[input.nowTips].innerText;
            input.tips.children[input.nowTips].addClass('heightLight');
        } else if (e.key == 'ArrowDown') {
            e.preventDefault();
            if (input.nowTips == null) {
                input.nowTips = 5;
            }
            input.tips.children[input.nowTips].removeClass('heightLight');
            input.nowTips = (input.nowTips + 1) % 6;
            input.value = input.tips.children[input.nowTips].innerText;
            input.tips.children[input.nowTips].addClass('heightLight');
        } else if (e.key == 'Enter') {
            e.preventDefault();
            input.tips.hide();
            if (input.nowTips != null) {
                input.tips.children[input.nowTips].removeClass('heightLight');
            }
            clearEmailTipsEvent(input);
        } else if (/@/.test(str)) {
            input.tips.hide();
            if (input.nowTips != null) {
                input.tips.children[input.nowTips].removeClass('heightLight');
            }
            clearEmailTipsEvent(input);
        } else {
            clearEmailTipsEvent(input);
            input.nowTips = null;
            input.tips.children[0].innerText = str + '@qq.com';
            input.tips.children[1].innerText = str + '@126.com';
            input.tips.children[2].innerText = str + '@163.com';
            input.tips.children[3].innerText = str + '@sina.com';
            input.tips.children[4].innerText = str + '@21cn.com';
            input.tips.children[5].innerText = str + '@souhu.com';
            input.tips.show();
            input.addEventListener('blur', emailTipsBlur);
            for (var i = 0; i < input.tips.children.length; i++) {
                input.tips.children[i].index = i;
                input.tips.children[i].addEventListener('mouseover', emailTipsMouseOver);
                input.tips.children[i].father = input;
            }
        }
    });
    input.addEventListener('keyup', function (e) {
        var str = input.value;
        if (e.key == 'Shift' || e.key == 'Control' || e.key == 'Alt') {
            return 0;
        }
        if (e.key == 'ArrowUp') {
        } else if (e.key == 'ArrowDown') {
        } else if (e.key == 'Enter') {
        } else if (str.length == 0) {
            input.tips.hide();
            if (input.nowTips != null) {
                input.tips.children[input.nowTips].removeClass('heightLight');
            }
            clearEmailTipsEvent(input);
        } else if (/@/.test(str)) {
            clearEmailTipsEvent(input);
            str = str.split('@')[0];
        } else {
            clearEmailTipsEvent(input);
            input.nowTips = null;
            input.tips.children[0].innerText = str + '@qq.com';
            input.tips.children[1].innerText = str + '@126.com';
            input.tips.children[2].innerText = str + '@163.com';
            input.tips.children[3].innerText = str + '@sina.com';
            input.tips.children[4].innerText = str + '@21cn.com';
            input.tips.children[5].innerText = str + '@souhu.com';
            input.tips.show();
            input.addEventListener('blur', emailTipsBlur);
            for (var i = 0; i < input.tips.children.length; i++) {
                input.tips.children[i].index = i;
                input.tips.children[i].addEventListener('mouseover', emailTipsMouseOver);
                input.tips.children[i].father = input;
            }
        }
    });
}

// 登录
var login = getDom('.login');
var loginInput = getDomA('input', login);
var loginEmail = loginInput[0];
loginEmail.tips = loginEmail.parentNode.getDom('.emailTips');
var loginPassword = loginInput[1];
var loginSubmit = loginInput[2];

// 添加邮箱地址提示功能
emailTips(loginEmail);

// 添加ctrl+A事件
loginEmail.inputSelectAllText();
loginPassword.inputSelectAllText();

// 发送登录请求
function runLogin() {
    var em = loginEmail.value;
    var pa = loginPassword.value;
    ajax({
        type: 'post',
        url: '/user/login',
        data: {
            email: em,
            password: pa,
        },
        success: function (res) {
            if (res.status_code == '200') {
                window.location = 'index.html';
            } else {
                topAlert('邮箱或密码不正确');
            }
        }
    })
}

// 添加提交按钮点击事件
loginSubmit.addEventListener('click', runLogin);
loginPassword.inputEnterEvent(runLogin);

// 注册
var register = getDom('.register');
var registerInput = getDomA('input', register);
var registerUserName = registerInput[0]; // 用户名
var registerEmail = registerInput[1]; // 邮箱
registerEmail.tips = registerEmail.parentNode.getDom('.emailTips'); // 邮箱提示框
var registerVerificationCode = registerInput[2]; //输入验证码
var registerGetVerificationCode = registerInput[3]; //获取验证码
var registerPassword = registerInput[4]; //输入密码
var registerConfirmPassword = registerInput[5]; //确认密码
var registerSubmit = registerInput[6]; // 提交
var registerRealVerificationCode; //后端返回的验证码
var registerGetVerificationCodeState = true;
registerEmail.judge = true;

// 添加邮箱地址提示功能
emailTips(registerEmail);

// 初始化提示信息
inputTips(registerUserName, '请输入昵称', 'inputTips');
inputTips(registerEmail, '请输入邮箱', 'inputTips');
inputTips(registerVerificationCode, '请输入验证码', 'inputTips');
inputTips(registerPassword, '请输入密码', 'inputTips');
inputTips(registerConfirmPassword, '请确认密码', 'inputTips');

// 添加ctrl+A事件
registerUserName.inputSelectAllText();
registerEmail.inputSelectAllText();
registerVerificationCode.inputSelectAllText();
registerPassword.inputSelectAllText();
registerConfirmPassword.inputSelectAllText();

// 报错
function reportError(node, errorTips) {
    var nodeFather = node.parentNode;
    if (node.errorDiv) {
        nodeFather.removeChild(node.errorDiv);
    }
    node.errorDiv = document.createElement('div');
    addClass(node.errorDiv, 'errorTips');
    node.errorDiv.innerHTML = errorTips;
    nodeFather.appendChild(node.errorDiv);
}

// 清除报错
function clearError(node) {
    var nodeFather = node.parentNode;
    if (node.errorDiv) {
        try {
            nodeFather.removeChild(node.errorDiv);
        } catch (e) {

        }
    }
}

// 判断密码
function judgePassword(node) {
    var str = node.value;
    if (str != '请输入密码') {
        if (!/.*[a-zA-Z]+.*/.test(str)) {
            reportError(node, '密码中至少包含一个字母');
            return false;
        }
        if (!/.*[0-9]+.*/.test(str)) {
            reportError(node, '密码中至少包含一个数字');
            return false;
        }
        if (!/^[a-zA-Z0-9]*$/.test(str)) {
            reportError(node, '密码只能由字母和数字组成');
            return false;
        }
        if (!/^[a-zA-Z0-9]{8,18}$/.test(str)) {
            reportError(node, '密码长度应为8-18位');
            return false;
        }
        clearError(node);
        return true;
    }
    return false;
}

function judgeVerificationCode(node, value) {
    if (value) {
        var ivc = node.value;
        if (ivc == value) {
            clearError(node);
            return true;
        } else {
            reportError(node, '验证码不正确');
            return false;
        }
    }
    return false;
}

function judgeCPassword(node1, node2) {
    var str1 = node1.value;
    var str2 = node2.value;
    if (str2 != '请确认密码') {
        if (judgePassword(node1) && str1 == str2) {
            clearError(node2);
            return true;
        } else {
            reportError(node2, '两次输入密码不一致');
            return false;
        }
    }
}

function judgeUserName(node) {
    var str = node.value;
    if (str == '请输入昵称') {
        return false;
    }
    if (str.length == 0) {
        reportError(node, '用户名不能为空');
        return false;
    }
    if (str.length > 20) {
        reportError(node, '用户名不能超过20个字符');
        return false;
    }
    clearError(node);
    return true;
}

function judgeEmail(node) {
    var str = node.value;
    if (str != '请输入邮箱') {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
            reportError(node, '邮箱格式不正确');
            return false;
        }
        clearError(node);
        return true;
    }
    return false;
}

function setEmailJudge(node) {
    if (judgeEmail(node)) {
        ajax({
            type: 'get',
            url: '/util',
            data: {
                email: node.value,
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res == '200') {
                    node.judge = true;
                    reportError(node, '用户名已存在');
                } else {
                    clearError(node);
                    node.judge = false;
                }
            }
        });
    }
}

function registerGetVC(node) {
    if (judgeEmail(node) && node.judge == false) {
        registerGetVerificationCode.style.backgroundColor = '#b7cfd8';
        registerGetVerificationCode.style.backgroundColor = '#b7cfd8';
        registerGetVerificationCode.style.cursor = 'not-allowed';
        console.log(registerGetVerificationCode.style.backgroundColor);
        registerGetVerificationCode.timerI = 60;
        registerGetVerificationCodeState = false;
        registerGetVerificationCode.timer = setInterval(function () {
            registerGetVerificationCode.value = registerGetVerificationCode.timerI-- + 's后重新发送';
            if (registerGetVerificationCode.timerI == 1) {
                registerGetVerificationCode.style.backgroundColor = '#214b5b';
                registerGetVerificationCode.style.cursor = 'pointer';
                registerGetVerificationCode.value = '重新获取验证码';
                registerGetVerificationCodeState = true;
                clearInterval(registerGetVerificationCode.timer);
            }
        }, 1000);
        ajax({
            type: 'post',
            url: '/util',
            data: {
                email: node.value,
                sendFor: 'register'
            },
            success: function (res) {
                if (res.status_code == '200') {
                    registerRealVerificationCode = res.auth_code;
                } else {
                    topAlert('验证码发送失败');
                }
            }
        });
    } else {
        if (registerEmail.value == '请输入邮箱') {
            reportError(registerEmail, '请输入邮箱');
        }
    }
}

/**
 * 判断表单填写验证等是否合法，若不合法则给出相对应的处理
 */
function registerJudge() {
    if (judgeUserName(registerUserName)) {
        if (registerEmail.judge == false) {
            if (judgeVerificationCode(registerVerificationCode, registerRealVerificationCode)) {
                if (judgeCPassword(registerPassword, registerConfirmPassword)) {
                    return true;
                } else {
                    if (registerPassword.value == '请输入密码') {
                        reportError(registerPassword, '请输入密码');
                    } else if (registerConfirmPassword.value == '请确认密码') {
                        reportError(registerConfirmPassword, '请确认密码');
                    }
                }
            } else {
                if (registerVerificationCode.value == '请输入验证码') {
                    reportError(registerVerificationCode, '请输入验证码');
                } else if (!registerRealVerificationCode) {
                    reportError(registerVerificationCode, '验证码有误');
                }
            }
        } else {
            if (registerEmail.value == '请输入邮箱') {
                reportError(registerEmail, '请输入邮箱');
            } else {
                reportError(registerEmail, '邮箱格式不正确');
            }
        }
    } else {
        if (registerUserName.value == '请输入昵称') {
            reportError(registerUserName, '请输入昵称');
        }
    }
    return false;
}

registerUserName.addEventListener('blur', function () {
    judgeUserName(this);
});

registerEmail.addEventListener('blur', function () {
    setEmailJudge(this);
});

registerGetVerificationCode.addEventListener('click', function () {
    if (registerGetVerificationCodeState) {
        registerGetVC(registerEmail);
    }
});

registerGetVerificationCode.addEventListener('mouseover', function () {
    if (registerGetVerificationCodeState) {
        this.style.backgroundColor = '#101f30';
    }
});

registerGetVerificationCode.addEventListener('mouseout', function () {
    if (registerGetVerificationCodeState) {
        this.style.backgroundColor = '#214b5b';
    }
});

registerPassword.addEventListener('blur', function () {
    judgePassword(this);
});

registerConfirmPassword.addEventListener('blur', function () {
    judgeCPassword(registerPassword, this);
});

registerSubmit.addEventListener('click', function () {
    if (registerJudge()) {
        var em = registerEmail.value;
        var userName = registerUserName.value;
        var psd = registerPassword.value;
        ajax({
            type: 'post',
            url: '/user/register',
            data: {
                email: em,
                name: userName,
                password: psd
            },
            header: {
                'Content-Type': 'application/json'
            }, // 请求头
            success: function (res) {
                if (res.status_code == '200') {
                    window.location = 'index.html';
                } else {
                    topAlert('注册失败');
                }
            }
        });
    }
});