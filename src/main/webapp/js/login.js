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

// 登录
var login = getDom('.login');
var loginInput = getDomA('input', login);
var loginEmail = loginInput[0];
var loginPassword = loginInput[1];
var loginSubmit = loginInput[2];
loginSubmit.addEventListener('click', function () {
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
                topAlert('登录成功');
            } else {
                topAlert('邮箱或密码不正确');
            }
        }
    })
});
// 注册
var register = getDom('.register');
var registerInput = getDomA('input', register);
var registerUserName = registerInput[0]; // 用户名
var registerEmail = registerInput[1]; // 邮箱
var registerVerificationCode = registerInput[2]; //输入验证码
var registerGetVerificationCode = registerInput[3]; //获取验证码
var registerPassword = registerInput[4]; //输入密码
var registerConfirmPassword = registerInput[5]; //确认密码
var registerSubmit = registerInput[6]; // 提交
var registerRealVerificationCode; //后端返回的验证码
var registerGetVerificationCodeState = true;
registerEmail.judge = true;
inputTips(registerUserName, '请输入昵称');
inputTips(registerEmail, '请输入邮箱');
inputTips(registerVerificationCode, '请输入验证码');
inputTips(registerPassword, '请输入密码');
inputTips(registerConfirmPassword, '请确认密码');

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

function clearError(node) {
    var nodeFather = node.parentNode;
    if (node.errorDiv) {
        try {
            nodeFather.removeChild(node.errorDiv);
        } catch (e) {

        }
    }
}

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
                sendFor: 'register',
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
                    topAlert('注册成功');
                } else {
                    topAlert('注册失败');
                }
            }
        });
    }
});