var input = getDQS('input');
var buttom = getDQS('buttom');
var flag = true;
buttom.addEventListener('click', function () {
    var id = input.value;
    ajax({
        type: 'get',
        url: '/user',
        data: {
            user_id: id,
            is_author: flag,
            method: 'getUserInfo'
        },
        success: function (res) {
            console.log(res);
        }
    });
    flag = !flag;
});