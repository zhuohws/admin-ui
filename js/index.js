var myIndex = {
    menu: []
};
myIndex.pageInit = function (content) {
    myIndex.content = content;
    loginVerify();
    getMenu();
    elementBind();
    eventBind();
    var firstObj = (myIndex.menu[0].children && myIndex.menu[0].children.length > 0) ? myIndex.menu[0].children[0] : myIndex.menu[0];
    switchTab(firstObj);
};
// 检查用户是否登录
function loginVerify () {
    setTimeout(function(){
        if (!$.cookie('user') && !sessionStorage.getItem("user")) {
            location.href = "login.html";
        } else {
            $('#username').text($.cookie('user') ? $.cookie('user') : sessionStorage.getItem("user"));
            $('#login-out').click(function(){
                $.removeCookie('user');
                sessionStorage.removeItem("user");
                location.href = "login.html";
            })
        }
    }, 10)
};
// 获取menu
function getMenu () {
    // ajax获取菜单
    // 加载菜单
    myIndex.menu = [
        {
            menuName: '首页',
            menuIcon: 'layui-icon layui-icon-home',
            menuId: 'A',
            menuUrl: 'home/home.html',
            unionId: 'shouye',
        },
        {
            menuName: 'echarts组件',
            menuIcon: 'layui-icon layui-icon-chart',
            menuId: 'C',
            menuUrl: '',
            unionId: 'sky',
            children: [
                {
                    menuName: '柱状图',
                    menuIcon: 'layui-icon layui-icon-template-1',
                    menuId: 4,
                    menuUrl: 'echarts/bar/bar.html',
                },
                {
                    menuName: '饼状图',
                    menuIcon: 'layui-icon layui-icon-light',
                    menuId: 5,
                    menuUrl: 'echarts/pie/pie.html',
                },
                {
                    menuName: '折线图',
                    menuIcon: 'layui-icon layui-icon-senior',
                    menuId: 6,
                    menuUrl: 'echarts/line/line.html',
                }
            ]
        },
        {
            menuName: '互联网',
            menuIcon: 'layui-icon layui-icon-chart-screen',
            menuId: 'B',
            menuUrl: '',
            unionId: 'youyi',
            children: [
                {
                    menuName: '移动模块',
                    menuIcon: 'layui-icon layui-icon-face-surprised',
                    menuId: 1,
                    menuUrl: 'page2/page2.html',
                },
                {
                    menuName: '后台模版',
                    menuIcon: 'layui-icon layui-icon-fire',
                    menuId: 2,
                    menuUrl: 'page3/page3.html',
                },
                {
                    menuName: '电商平台',
                    menuIcon: 'layui-icon layui-icon-face-smile',
                    menuId: 3,
                    menuUrl: 'page3/page3.html',
                }
            ]
        },
        {
            menuName: '设置',
            menuIcon: 'layui-icon layui-icon-set',
            menuId: 'D',
            menuUrl: '',
            unionId: 'sky',
            children: [
                {
                    menuName: '系统设置',
                    menuIcon: 'layui-icon layui-icon-set-sm',
                    menuId: 7,
                    menuUrl: 'page4/page4.html',
                },
                {
                    menuName: '用户设置',
                    menuIcon: 'layui-icon layui-icon-set-sm',
                    menuId: 8,
                    menuUrl: '',
                    children: [
                        {
                            menuName: '角色设置',
                            menuIcon: 'layui-icon layui-icon-set-sm',
                            menuId: 'D81',
                            menuUrl: 'page4/page4.html',
                        },
                        {
                            menuName: '权限设置',
                            menuIcon: 'layui-icon layui-icon-set-sm',
                            menuId: 'D82',
                            menuUrl: 'page5/page5.html',
                        }
                    ]
                }
            ]
        },
    ];
    initMenu(myIndex.menu);
};
// 初始化menu
function initMenu (menu) {
    $('.layui-nav').empty();
    var navHtml = '';
    $.each(menu, function (index, item) {
        navHtml += '<li class="layui-nav-item">';
        navHtml += '<a href="javascript:;" class="menu-item" data-url="' + item.menuUrl + '" data-menuId="' + item.menuId + '" data-menuName="' + item.menuName + '"><i class="nav-icon ' + item.menuIcon + '"></i><span class="menu-text">' + item.menuName + '</span></a>';
        if (item.children && item.children.length > 0) {
            navHtml += transMenu(item.children);
        }
        navHtml += '</li>';
    });
    $('.layui-nav').html(navHtml);
    element.render('nav', 'navDemo');
    var initNavId = ((myIndex.menu[0].children && myIndex.menu[0].children.length > 0) ? myIndex.menu[0].children[0].menuId : myIndex.menu[0].menuId).toString();
    element.render('tab', 'tabDemo');
    element.tabChange('tabDemo', initNavId);
};
// 监听element切换等事件
function elementBind () {
    // 菜单点击事件
    element.on('nav(navDemo)', function(data){
        var obj = {
            menuUrl : $(this).attr('data-url'),
            menuId : $(this).attr('data-menuId'),
            menuName : $(this).attr('data-menuName')
        }
        switchTab(obj);
    });
    // tab切换绑定
    element.on('tab(tabDemo)', function(data){
        var activeId = $(this).attr('data-layid');
        $.each($('#navDemo').find('.menu-item'), function(i, n){
            if ($(n).attr('data-menuid') && $(n).attr('data-menuid') == activeId) {
                $('#navDemo').find('.layui-this').removeClass('layui-this');
                $('.layui-nav-itemed').removeClass('layui-nav-itemed');
                if (!$(n).parent().hasClass('layui-nav-item')) {
                    $(n).parents('.layui-nav-item').addClass('layui-nav-itemed');
                    $(n).parents('dd').addClass('layui-nav-itemed');
                }
                $(n).parent().addClass('layui-this');
            }
        })
    });
    // tab删除事件
    element.on('tabDelete(tabDemo)', function(data){
        var layId = $(this).parent().attr('data-layId');
        selectedTabs.splice(selectedTabs.indexOf(layId + ''), 1);
    });
};
// 默认事件绑定
function eventBind () {
    // 全屏&&退出全屏
    $('#fullExit').click(function(){
        $(this).toggleClass('fulling');
        if ($(this).hasClass('fulling')) {
            $(this).html('<i class="layui-icon layui-icon-screen-restore"></i>');
            requestFullScreen(document.documentElement);
        } else {
            $(this).html('<i class="layui-icon layui-icon-screen-full"></i>');
            exitFull();
        }
    });
    // 伸缩导航栏
    $('#toggleNav').click(function(){
        if (!$('.nav').hasClass('toggle-nav')) {
            $('.nav').addClass('toggle-nav');
            $('.main').addClass('toggle-main');
            $('#logo').addClass('toggle-logo');
            $('.layui-nav-itemed').removeClass('layui-nav-itemed');
            $('.layui-nav-more').hide(1);
            $('.menu-text').hide(1);
            $(this).html('<i class="layui-icon layui-icon-spread-left"></i>');
        } else {
            $('.nav').removeClass('toggle-nav');
            $('.main').removeClass('toggle-main');
            $('#logo').removeClass('toggle-logo');
            $('.layui-nav-more').show(1);
            $('.menu-text').show(1);
            $(this).html('<i class="layui-icon layui-icon-shrink-right"></i>');
        }
        setTimeout(function(){
            $("table").bootstrapTable('resetView')
        }, 1000)
    })
    $('.nav-icon').click(function(){
        return false;
    })
    // 刷新当前页面
    $('#refresh').click(function(){
        switchTab(activeTab);
    })
    // 用户信息
    $('#user').click(function(e){
        $('#user-info').show();
        e.stopPropagation();
    })
    // 空白处点击消失
    document.onclick = function (e) {
        $('#user-info').hide();
    }
};