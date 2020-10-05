// 登录
var login = getDQS('.login');
var loginInput = getDQSA('input', login);
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
            if (res == '200') {
                topAlert('登录成功');
            } else {
                topAlert('邮箱或密码不正确');
            }
        }
    })
});
// 注册
var register = getDQS('.register');
var registerInput = getDQSA('input', register);
var registerUserName = registerInput[0]; // 用户名
var registerEmail = registerInput[1]; // 邮箱
var registerVerificationCode = registerInput[2]; //输入验证码
var registerGetVerificationCode = registerInput[3]; //获取验证码
var registerPassword = registerInput[4]; //输入密码
var registerConfirmPassword = registerInput[5]; //确认密码
var registerSubmit = registerInput[6]; // 提交
var registerRealVerificationCode; //后端返回的验证码
registerEmail.judge = true;

function judgePassword(node) {
    var str = node.value;
    if (!/.*[a-zA-Z]+.*/.test(str)) {
        console.log('密码中要包含字母');
        return false;
    }
    if (!/.*[0-9]+.*/.test(str)) {
        console.log('密码中要包含数字');
        return false;
    }
    if (!/^[a-zA-Z0-9]*$/.test(str)) {
        console.log('密码只能包含字母和数字');
        return false;
    }
    if (!/^[a-zA-Z0-9]{8,18}$/.test(str)) {
        console.log('密码长度应为8-18位');
        return false;
    }
    return true;
}

function judgeVerificationCode(node1, value) {
    var ivc = node1.value;
    if (ivc == value) {
        return true;
    } else {
        console.log('验证码不正确');
        return false;
    }
}

function judgeCPassword(node1, node2) {
    var str1 = node1.value;
    var str2 = node2.value;
    if (judgePassword(str1) && str1 == str2) {
        return true;
    } else {
        console.log('两次输入密码不一致');
        return false;
    }
}

function judgeUserName(node) {
    var str = node.value;
    if (!/\w{1,20}/.test(str)) {
        console.log('用户名长度要在1-20之间');
        return false;
    }
    return true;
}

function judgeEmail(node) {
    var str = node.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
        console.log('邮箱格式不正确');
        return false;
    }
    // 判断邮箱是否存在
    ajax({
        type: 'get',
        url: '',
        data: {

        },
        success: function (res) {
            node.judge = res;
        }
    })
}

function judgeExistenceEmail(node) {

}

function getVC(node) {
    console.log('获取验证码'); //开发中;
}
/**
 * 判断表单填写验证等是否合法，若不合法则给出相对应的处理
 */
function registerJudge() {
    var em = registerEmail.value;
    var userName = registerUserName.value;
    var psd = registerPassword.value;
    var cpsd = registerConfirmPassword.value;
    var inVC = registerVerificationCode.value;
    // return true;
    if (judgeUserName(registerUserName)) {
        if (registerEmail.judge == false) {
            if (judgeVerificationCode(registerVerificationCodec, registerRealVerificationCode)) {
                if (judgeCPassword(registerPassword, registerConfirmPassword)) {
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
                            console.log('res:' + res);
                            if (res == 200) {
                                console.log('注册成功');
                            } else {
                                console.log('注册失败');
                            }
                        }
                    });
                }
            }
        }
    }
}

registerUserName.addEventListener('blur', function () {
    var UN = registerUserName.value;
    console.log(UN.length);
    if (UN.length == 0) {
        console.log('用户名不能为空'); // 开发中
    }
});
registerEmail.addEventListener('blur', function () {
    judgeEmail(this);
});
registerGetVerificationCode.addEventListener('click', function () {
    getVC(registerEmail);
});
registerPassword.addEventListener('blur', function () {
    if (judgePassword(this)) {
        console.log(true);
    }
});
registerConfirmPassword.addEventListener('blur', function () {
    if (judgeCPassword(registerPassword, this)) {
        console.log(true);
    }
});
registerSubmit.addEventListener('click', function () {
    if (registerJudge()) {
        ajax({
            type: 'post',
            url: '/user',
            data: {},
            success: function (res) {
                console.log(res);
            }
        });
    }
});

// 忘记密码
var retrievePassword = getDQS('.retrievePassword');
var retrievePasswordInput = getDQSA('input', retrievePassword);
var rePEmail = retrievePasswordInput[0];
var rePVC = retrievePasswordInput[1];
var rePGetVC = retrievePasswordInput[2];
var rePPassword = retrievePasswordInput[3];
var rePConfirmPassword = retrievePasswordInput[4];
var rePSubmit = retrievePasswordInput[5];

/**
 * 验证找回密码信息是否合法
 */
function rePJudge() {

}
rePEmail.addEventListener('blur', function () {
    judgeEmail(this);
});
rePGetVC.addEventListener('click', function () {
    getVC(rePEmail);
});
rePPassword.addEventListener('blur', function () {
    judgePassword(this);
});
rePConfirmPassword.addEventListener('blur', function () {
    judgeCPassword(rePPassword, this);
});
rePSubmit.addEventListener('click', function () {
    if (rePJudge()) {
        ajax({

        });
    }
});