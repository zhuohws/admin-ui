var page2 = {
    content: ''
};
page2.pageInit = function (content) {
    page2.content = content;
    $('#para', page2.content).click(function(){
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