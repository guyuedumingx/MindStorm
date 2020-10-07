// 忘记密码
var retrievePassword = getDom('.retrievePassword');
var retrievePasswordInput = getDomA('input', retrievePassword);
var rePEmail = retrievePasswordInput[0];
var rePVC = retrievePasswordInput[1];
var rePGetVC = retrievePasswordInput[2];
var rePPassword = retrievePasswordInput[3];
var rePConfirmPassword = retrievePasswordInput[4];
var rePSubmit = retrievePasswordInput[5];
rePEmail.judge = false;

function rePGetVCF(node) {
    if (judgeEmail(node) && node.judge == true) {
        ajax({

        });
    }
}
/**
 * 验证找回密码信息是否合法
 */
function rePJudge() {

}
rePEmail.addEventListener('blur', function () {
    judgeEmail(this);
});
rePGetVC.addEventListener('click', function () {
    rePGetVCF(rePEmail);
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