// 公用方法&&全局对象
// 2020/03/26
var layer = layui.layer,
    carousel = layui.carousel,
    element = layui.element;
var selectedTabs = [];
var activeTab = {};
// 全屏
function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(element);
    }else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
};
//退出全屏
function exitFull() {
    var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //Chrome等
        document.webkitExitFullscreen || //FireFox
        document.webkitExitFullscreen; //IE11
    if (exitMethod) {
        exitMethod.call(document);
    }else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
};
// 递归获取子menu
function transMenu (item) {
    var navHtml = '<dl class="layui-nav-child">';
    for (var i = 0; i < item.length; i++) {
        navHtml += '<dd><a href="javascript:;" class="menu-item" data-url="' + item[i].menuUrl + '" data-menuId="' + item[i].menuId + '" data-menuName="' + item[i].menuName + '">' + item[i].menuName + '</a>';
        if (item[i].children  && item[i].children.length > 0) {
            navHtml += transMenu(item[i].children);
        }
        navHtml += '<dd>';
    }
    navHtml += '</dl>';
    return navHtml;
};
// loading
function watingShow () {
    $('#loading').show();
}
function watingHide () {
    $('#loading').hide();
}

// 加载tab页
function switchTab (obj) {
    var url = obj.menuUrl,
        menuName = obj.menuName,
        menuId = obj.menuId;
    if (url && menuId) {
        activeTab = obj;
        if (selectedTabs.indexOf(menuId) == -1) {
            selectedTabs.push(menuId);
            var liStr = '<li lay-id="' + menuId + '" data-layId="' + menuId + '">' + menuName + '</li>';
            $('.layui-tab-title').append(liStr);
            var contentStr = '<div class="layui-tab-item">'
                // + '<iframe src="'+ url +'" frameborder="0" height="100%" width="100%"></iframe>'
                + '<div class="page-content"></div>'
            + '</div>';
            $('.layui-tab-content').append(contentStr);
            watingShow();
            $('.page-content').last().load(url, function(response,status,xhr) {
                if (response && response.indexOf('<title>404 Not Found</title>') > -1) {
                    $('.page-content').last().load('404.html');
                }
                watingHide();
                element.render('tab', 'tabDemo');
            });
        } else {
            // 刷新页面
            $('.page-content').last().load('loading.html', function(response,status,xhr) {
                setTimeout(function(){
                    watingShow();
                    $('.page-content').last().load(url, function(response,status,xhr) {
                        watingHide();
                    });
                }, 100);
            });
        }
        element.tabChange('tabDemo', menuId);
    }
};
// 窗口变化时更新table
$(window).resize(function(){
    $("table").bootstrapTable('resetView');
})