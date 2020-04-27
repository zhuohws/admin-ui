"use strict";
var pageElement = {
    content: '',
}
pageElement.pageInit = function (content) {
    pageElement.content = content;
    //注意进度条依赖 element 模块，否则无法进行正常渲染和功能性操作
    layui.use('element', function(){
        var element = layui.element;
        element.progress('demo11', '25%');
        element.progress('demo12', '71%');
        element.progress('demo13', '33%');
    });
}