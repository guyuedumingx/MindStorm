var uid = 1;
ajax({
    type: 'get',
    url: '/user',
    data: {
        user_id: uid,
        is_author: true,
        method: 'getUserInfo',
    },
    success: function (res) {
        console.log(res);
    }
});