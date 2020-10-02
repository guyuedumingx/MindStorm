var input = getDQS('input');
var button = getDQS('button');
var flag = true;
button.addEventListener('click', function () {
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