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
            token: 123,
            method: 'login'
        },
        success: function (res) {
            alert(res);
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

/**
 * 判断表单填写验证等是否合法，若不合法则给出相对应的处理
 */
function registerJudge() {
    return true;
}
registerEmail.addEventListener('blur', function () {
    console.log('判断邮箱是否存在，是否被注册过');
});
registerGetVerificationCode.addEventListener('click', function () {
    console.log('获取验证码');
});
registerSubmit.addEventListener('click', function () {
    if (registerJudge()) {
        ajax({
            type: 'post',
            url: '/user',
            data: {},
            success: function (res) {

            }
        });
    }
})