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