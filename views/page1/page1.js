var page1 = {
    content: ''
};
page1.pageInit = function (content) {
    page1.content = content;
    initShortCut();
    initCatousel();
    initFieldset();
    initTable();
};

// 轮播
function initCatousel () {
    //建造实例
    carousel.render({
        elem: '#test1',
        width: '100%', //设置容器宽度
        height: '230px',
        arrow: 'none', //始终显示箭头
        anim: 'default', //切换动画方式
        autoplay: false,
        indicator: 'outside'
    });
}

// 初始化显示
function initShortCut () {
    // 接口取值
    var cutList = [
        {
            menuName: '首页',
            menuIcon: 'layui-icon layui-icon-home',
            menuId: 'A',
            menuUrl: 'page1/page1.html',
            unionId: 'shouye',
        },
        {
            menuName: '饼状图',
            menuIcon: 'layui-icon layui-icon-dollar',
            menuId: 4,
            menuUrl: 'page4/page4.html',
        },
        {
            menuName: '柱状图',
            menuIcon: 'layui-icon layui-icon-template-1',
            menuId: 5,
            menuUrl: 'echarts/bar/bar.html',
        },
        {
            menuName: '折线图',
            menuIcon: 'layui-icon layui-icon-senior',
            menuId: 6,
            menuUrl: 'page6/page6.html',
        },
        {
            menuName: '首页',
            menuIcon: 'layui-icon layui-icon-home',
            menuId: 'A',
            menuUrl: 'page1/page1.html',
            unionId: 'shouye',
        },
        {
            menuName: '饼状图',
            menuIcon: 'layui-icon layui-icon-dollar',
            menuId: 4,
            menuUrl: 'page4/page4.html',
        },
        {
            menuName: '柱状图',
            menuIcon: 'layui-icon layui-icon-template-1',
            menuId: 5,
            menuUrl: 'echarts/bar/bar.html',
        },
        {
            menuName: '折线图',
            menuIcon: 'layui-icon layui-icon-senior',
            menuId: 6,
            menuUrl: 'page6/page6.html',
        },
        {
            menuName: '首页',
            menuIcon: 'layui-icon layui-icon-home',
            menuId: 'A',
            menuUrl: 'page1/page1.html',
            unionId: 'shouye',
        },
        {
            menuName: '饼状图',
            menuIcon: 'layui-icon layui-icon-dollar',
            menuId: 4,
            menuUrl: 'page4/page4.html',
        },
        {
            menuName: '柱状图',
            menuIcon: 'layui-icon layui-icon-template-1',
            menuId: 5,
            menuUrl: 'echarts/bar/bar.html',
        },
        {
            menuName: '折线图',
            menuIcon: 'layui-icon layui-icon-senior',
            menuId: 6,
            menuUrl: 'page6/page6.html',
        }
    ]
    var ulStr = '<div carousel-item>';
    $.each(cutList, function(i,n){
        if (Math.round(i%8) == 0 || i == 0) {
            ulStr += '<div class="layui-row layui-col-space10 ul-item">'
        }
        var listr = '<div class="layui-col-md3 li-item" data-url="' + n.menuUrl + '" data-menuId="' + n.menuId + '" data-menuName="' + n.menuName + '">'
            + '<div class="ico">'
               + '<i class="' + n.menuIcon + '"></i>'
            + '</div>'
            + '<p>' + n.menuName + '</p>'
        + '</div>'
        ulStr += listr;
        if (Math.round((i+1)%8) == 0 || i == cutList.length - 1) {
            ulStr += '</div>';
        }
    })
    ulStr += '</div>';
    $('#test1').html(ulStr);
}

// 绑定事件
function initFieldset () {
    $('#test1 .li-item').click(function(){
        var obj = {
            menuUrl : $(this).attr('data-url'),
            menuId : $(this).attr('data-menuId'),
            menuName : $(this).attr('data-menuName')
        }
        switchTab(obj);
    })
}

// 初始化table
function initTable () {
    $('#example-table').bootstrapTable({
        // url: 'data1.json',
        locale: 'zh-CN', //设置语言
        pagination: true,
        height: 520,
        width: '100%',
        striped: true,// 间隔色
        pagination: true,// 是否分页
        sidePagination: 'client',// 设置为服务器端分页
        fixedColumns: true,
        fixedNumber: 3,
        rowStyle: function (row, index) {
            if (row.salesVolume && (row.salesVolume > 100000)) {
                return { css: { 'color': '#009688' } }
            }
            return {};
        },
        data: [
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 2,
                name: '盼盼软面包',
                describe: '盼盼软面包，红豆经过精挑细选，现价只要29',
                price: '29',
                salesVolume: 162222,
                repertory: 67541
            },
            {
                id: 3,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '蒙牛优益C',
                describe: '蒙牛优益C 百香果味 330ml*4活菌型 软酸菌饮品',
                price: '46.7',
                salesVolume: 99999,
                repertory: 999
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 1622,
                repertory: 67541
            },
        ],
        columns: [{
            field: 'id',
            width: '6%',
            align: 'center',
            title: '序号',
            formatter: function (value, row, index) {
                return index + 1
            }
        }, {
            field: 'name',
            width: '14%',
            align: 'center',
            title: '名称'
        }, {
            field: 'price',
            width: '10%',
            align: 'center',
            title: '价格',
            sortable: true
        }, {
            field: 'describe',
            width: '50%',
            align: 'center',
            title: '描述'
        }, {
            field: 'salesVolume',
            width: '10%',
            align: 'center',
            title: '销量',
            sortable: true,
        }, {
            field: 'repertory',
            width: '10%',
            align: 'center',
            title: '库存',
            sortable: true,
            formatter: function (value, row, index) {
                var html;
                if (row.repertory && (row.repertory < 1000)) {
                    html = '<span style="color: #FF5722;">' + row.repertory + '<span>';
                } else {
                    html = '<span>' + row.repertory + '<span>';
                }
                return html;
            }
        }]
    })
}