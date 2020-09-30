var but = document.getElementById("but");
var em = document.getElementById("em");
var pw = document.getElementById("pw");
but.onclick = function () {
    var email = em.value;
    var password = pw.value;
    ajax({
        type: ('get'), // 请求方式
        url: '/user', // 请求地址(必填)
        data: {
            method: 'login',
            email: email,
            password: password
        }, // 参数(对象形式)
        header: {}, // 请求头(对象形式)
        success: function (data) {
            if (data) {
                alert("hhhhh");
            } else {
                alert("dsfsrdfgjht");
            }
        }, // 成功函数(必填)
        error: function () { } // 失败函数
    });
}

