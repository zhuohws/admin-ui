var form = layui.form;
var layer = layui.layer;
//监听提交
form.on('submit(formDemo)', function(data){
    console.log(data.field);
    var obj = data.field;
    // 请求接口
    // $.ajax({
    //     type: 'POST',
    //     data: obj,
    //     url: 'url',
    //     success: function (data) {
    //         $.cookie('username', data.field.username);
    //         location.href="index.html";
    //         layer.msg('登录成功');
    //     },
    //     error: function () {
    //         layer.msg('登录失败');
    //     }
    // })
    if (data.field.username != 'admin' || data.field.userpass != '11111') {
        layer.msg('用户名或密码错误');
        return false;
    }
    // 存储
    $.cookie('user', data.field.username, { expires: 7, path: '/' });
    sessionStorage.setItem("user", data.field.username);
    location.href = "index.html";
    layer.msg('登录成功');
});