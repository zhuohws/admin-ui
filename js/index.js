$(document).ready(function(){
    var myIndex = {
        selectedTabs: [],
        menu: []
    }

    // 加载菜单
    myIndex.menu = [
        {
            menuName: '首页',
            menuIcon: 'layui-icon layui-icon-home',
            menuId: 'A',
            menuUrl: 'page1/page1.html',
            unionId: 'shouye',
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
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 1,
                    menuUrl: 'page2/page2.html',
                },
                {
                    menuName: '后台模版',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 2,
                    menuUrl: 'page3/page3.html',
                },
                {
                    menuName: '电商平台',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 3,
                    menuUrl: 'page3/page3.html',
                }
            ]
        },
        {
            menuName: 'echarts组件',
            menuIcon: 'layui-icon layui-icon-chart',
            menuId: 'C',
            menuUrl: '',
            unionId: 'sky',
            children: [
                {
                    menuName: '饼状图',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 4,
                    menuUrl: 'page4/page4.html',
                },
                {
                    menuName: '柱状图',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 5,
                    menuUrl: 'page5/page5.html',
                },
                {
                    menuName: '折线图',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 6,
                    menuUrl: 'page6/page6.html',
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
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 7,
                    menuUrl: 'page4/page4.html',
                },
                {
                    menuName: '用户设置',
                    menuIcon: 'layui-icon glyphicon-fire',
                    menuId: 8,
                    menuUrl: '',
                    children: [
                        {
                            menuName: '角色设置',
                            menuIcon: 'layui-icon glyphicon-fire',
                            menuId: 'D81',
                            menuUrl: 'page4/page4.html',
                        },
                        {
                            menuName: '权限设置',
                            menuIcon: 'layui-icon glyphicon-fire',
                            menuId: 'D82',
                            menuUrl: 'page5/page5.html',
                        }
                    ]
                }
            ]
        },
    ];

    initMenu(myIndex.menu);
    eleInit();
    loginReload();
    btnSet();

    function transMenu (menuItem) {
        var navHtml = '<dl class="layui-nav-child">';
        for (var i = 0; i < menuItem.length; i++) {
            navHtml += '<dd><a href="javascript:;" class="menu-item" data-url="' + menuItem[i].menuUrl + '" data-menuId="' + menuItem[i].menuId + '" data-menuName="' + menuItem[i].menuName + '">' + menuItem[i].menuName + '</a>';
            if (menuItem[i].children  && menuItem[i].children.length > 0) {
                navHtml += transMenu(menuItem[i].children);
            }
            navHtml += '<dd>';
        }
        navHtml += '</dl>';
        return navHtml;
    }

    function initMenu (menu) {
        $('.layui-nav').empty();
        var navHtml = '';
        $.each(menu, function (index, item) {
            navHtml += '<li class="layui-nav-item">';
            navHtml += '<a href="javascript:;" class="menu-item" data-url="' + item.menuUrl + '" data-menuId="' + item.menuId + '" data-menuName="' + item.menuName + '"><i class="nav-icon ' + item.menuIcon + '"></i><span class="menu-text">' + item.menuName + '</span></a>';
            if (item.children && item.children.length > 0) {
                navHtml += transMenu(item.children);
                // navHtml += ' <dl class="layui-nav-child">';
                // $.each(item.children, function (i, n) {
                //     navHtml += '<dd><a class="menu-item" data-url="' + n.menuUrl + '" data-menuId="' + n.menuId + '" data-menuName="' + n.menuName + '"><span class="menu-name">' + n.menuName + '</span></a></dd>';
                // })
                // navHtml += '</dl>';
            }
            navHtml += '</li>';
        });
        $('.layui-nav').html(navHtml);
        layui.element.render('nav', 'navDemo');
    };
    function eleInit () {
        // 菜单点击事件
        layui.element.on('nav(navDemo)', function(data){
            console.log(1)
            var url = $(this).attr('data-url');
            var menuId = $(this).attr('data-menuId');
            var menuName = $(this).attr('data-menuName');
            if (url && menuId) {
                if (myIndex.selectedTabs.indexOf(menuId) == -1) {
                    myIndex.selectedTabs.push(menuId);
                    var liStr = '<li lay-id="' + menuId + '" data-layId="' + menuId + '">' + menuName + '</li>';
                    $('.layui-tab-title').append(liStr);
                    var contentStr = '<div class="layui-tab-item">'
                        + '<iframe src="'+ url +'" frameborder="0" height="100%" width="100%"></iframe>'
                    + '</div>';
                    $('.layui-tab-content').append(contentStr);
                    layui.element.render('tab', 'tabDemo');
                }
                layui.element.tabChange('tabDemo', menuId);
            }
        });
        // tab删除事件
        layui.element.on('tabDelete(tabDemo)', function(data){
            var layId = $(this).parent().attr('data-layId');
            myIndex.selectedTabs.splice(layId, 1);
        });
        $('.layui-nav .menu-item').eq(0).trigger('click');
    };
    function loginReload () {
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
    // element.tabChange('demo', 'layid');
    function btnSet () {
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
        })
        $('.nav-icon').click(function(){
            return false;
        })
        // 刷新当前页面
        $('#refresh').click(function(){
            $('.layui-show').find('iframe').attr('src', $('.layui-show').find('iframe').attr('src'));
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
    }
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
    }

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
    }
})