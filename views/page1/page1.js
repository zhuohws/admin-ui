var page1 = {
    content: ''
};
page1.pageInit = function (content) {
    page1.content = content;
    $('#para', page1.content).click(function(){
        // layer.msg('hello');
        layer.open({
            type: 1,
            btnAlign: 'c',
            shade: false,
            title: '测试弹窗',
            area: ['400px', '200px'],
            content: '22222',
            btn: ['关闭'],
            yes: function (index, layero) {
                layer.close(index);
            }
        });
    });
};