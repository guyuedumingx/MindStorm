var input = getDQS('input');
var button = getDQS('button');
var flag = true;
button.addEventListener('click', function () {
    ajax({
        type: 'get',
        url: '/user',
        data: {},
        success: function (res) {
            alert(1);
            console.log(res);
        },
        error: function () {
            alert(2);
        }
    });
});