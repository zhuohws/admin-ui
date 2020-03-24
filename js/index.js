$(document).ready(function(){
    var myIndex = {
        selectedTabs: [],
        manuItem: []
    }

    // 加载菜单
    myIndex.manuItem = [
        {
            menuName: '首页',
            menuIcon: 'glyphicon glyphicon-home',
            menuId: 1,
            menuUrl: 'page1/page1.html',
            unionId: 'shouye',
        },
        {
            menuName: '互联网',
            menuIcon: 'glyphicon glyphicon-magnet',
            menuId: 2,
            menuUrl: '',
            unionId: 'youyi',
            children: [
                {
                    menuName: '移动模块',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 4,
                    menuUrl: 'page2/page2.html',
                },
                {
                    menuName: '后台模版',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 5,
                    menuUrl: 'page3/page3.html',
                },
                {
                    menuName: '电商平台',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 6,
                    menuUrl: 'page3/page3.html',
                }
            ]
        },
        {
            menuName: '太阳系',
            menuIcon: 'glyphicon glyphicon-tower',
            menuId: 3,
            menuUrl: '',
            unionId: 'sky',
            children: [
                {
                    menuName: '地球',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 7,
                    menuUrl: 'page4/page4.html',
                },
                {
                    menuName: '火星',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 8,
                    menuUrl: 'page5/page5.html',
                },
                {
                    menuName: '水星',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 9,
                    menuUrl: 'page6/page6.html',
                }
            ]
        },
    ];

    initMenu(myIndex.manuItem);
    eleInit();
    loginReload();

    function initMenu (manuItem) {
        $('.layui-nav').empty();
        var navHtml = '';
        $.each(manuItem, function (index, item) {
            navHtml += '<li class="layui-nav-item">';
            navHtml += '<a href="javascript:;" class="menu-item" data-url="' + item.menuUrl + '" data-menuId="' + item.menuId + '" data-menuName="' + item.menuName + '">' + item.menuName + '</a>';
            if (item.children && item.children.length > 0) {
                navHtml += ' <dl class="layui-nav-child">';
                $.each(item.children, function (i, n) {
                    navHtml += '<dd><a class="menu-item" data-url="' + n.menuUrl + '" data-menuId="' + n.menuId + '" data-menuName="' + n.menuName + '"><span class="menu-name">' + n.menuName + '</span></a></dd>';
                })
                navHtml += '</dl>';
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
        if (!$.cookie('user')) {
            location.href = "login.html";
        } else {
            $('#username').text($.cookie('user'));
            $('#username').click(function(){
                $.cookie('user', '');
                location.href = "login.html";
            })
        }
    };
})