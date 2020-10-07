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
        url: '/user',
        data: {
            email: em,
            password: pa,
            method: 'login'
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
registerEmail.judge = true;
inputTips(registerUserName, '请输入昵称');
inputTips(registerEmail, '请输入邮箱');
inputTips(registerVerificationCode, '请输入验证码');
inputTips(registerPassword, '请输入密码');
inputTips(registerConfirmPassword, '请确认密码');

function reportError(node, errorTips) {

}

function judgePassword(node) {
    var str = node.value;
    if (str != '请输入密码') {
        if (!/.*[a-zA-Z]+.*/.test(str)) {
            console.log('密码中至少包含一个字母');
            return false;
        }
        if (!/.*[0-9]+.*/.test(str)) {
            console.log('密码中至少包含一个数字');
            return false;
        }
        if (!/^[a-zA-Z0-9]*$/.test(str)) {
            console.log('密码只能由字母和数字组成');
            return false;
        }
        if (!/^[a-zA-Z0-9]{8,18}$/.test(str)) {
            console.log('密码长度应为8-18位');
            return false;
        }
        return true;
    }
    return false;
}

function judgeVerificationCode(node1, value) {
    if (value) {
        var ivc = node1.value;
        if (ivc == value) {
            return true;
        } else {
            console.log('验证码不正确');
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
            return true;
        } else {
            console.log('两次输入密码不一致');
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
        console.log('用户名不能为空');
        return false;
    }
    if (str.length > 20) {
        console.log('用户名长度不能超过20个字符');
        return false;
    }
    return true;
}

function judgeEmail(node) {
    var str = node.value;
    if (str != '请输入邮箱') {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
            console.log('邮箱格式不正确');
            return false;
        }
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
                method: 'isExist'
            },
            success: function (res) {
                if (res == '200') {
                    node.judge = true;
                    console.log('用户名已存在');
                } else {
                    node.judge = false;
                    console.log('√');
                }
            }
        });
    }
}

function registerGetVC(node) {
    if (judgeEmail(node) && node.judge == false) {
        ajax({
            type: 'get',
            url: '/util',
            data: {
                email: node.value,
                method: 'sendEmail',
            },
            success: function (res) {
                if (res.status_code == '200') {
                    registerRealVerificationCode = res.auth_code;
                } else {
                    console.log('验证码发送失败');
                }
            }
        });
    } else {
        if (registerEmail.value == '请输入邮箱') {
            console.log('请输入邮箱');
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
                        console.log('请输入密码');
                    } else if (registerConfirmPassword.value == '请确认密码') {
                        console.log('请确认密码');
                    }
                }
            } else {
                if (registerVerificationCode.value == '请输入验证码') {
                    console.log('请输入验证码');
                } else if (!registerRealVerificationCode) {
                    console.log('验证码有误');
                }
            }
        } else {
            if (registerEmail.value == '请输入邮箱') {
                console.log('请输入邮箱');
            } else {
                console.log('邮箱格式不正确');
            }
        }
    } else {
        if (registerUserName.value == '请输入昵称') {
            console.log('请输入昵称');
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
    registerGetVC(registerEmail);
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
            url: '/user',
            data: {
                email: em,
                user_name: userName,
                password: psd,
                method: 'register'
            },
            success: function (res) {
                if (res == '200') {
                    topAlert('注册成功');
                } else {
                    topAlert('注册失败');
                }
            }
        });
    }
});