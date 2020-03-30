"use strict";
var home = {
    content: ''
};
home.pageInit = function (content) {
    home.content = content;
    initShortCut();
    initCatousel();
    initFieldset();
    initTable();
    initBook();
    initHistory();
};

function initBook () {
    var storage;
    if (window.localStorage) {
        storage = window.localStorage;
    } else if (window.sessionStorage) {
        storage = window.sessionStorage;
    } else {
        $('#remember').html('您的浏览器版本也太老了!');
        $('#remember').attr('contenteditable', false);
        return false;
    }
    var history = '';
    if (storage.getItem('memo')) {
        history = storage.getItem('memo');
    } else {
        history = '点击我新建备忘录';
        storage.setItem('memo', '点击我新建备忘录');
    }
    $('#remember').html(history);
    $('#remember').keyup(function(){
        var html = $(this).html();
        storage.setItem('memo', html);
    });
}

// 轮播
function initCatousel () {
    //建造轮播实例
    carousel.render({
        elem: '#test1',  // 容器id
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
            menuUrl: 'home/home.html',
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
            menuUrl: 'home/home.html',
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
            menuUrl: 'home/home.html',
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
    var tableHeight = $('.table-example>.layui-card-body')[0].clientHeight - 20;
    $('#example-table').bootstrapTable('destroy').bootstrapTable({
        // url: 'data1.json',
        locale: 'zh-CN', //设置语言
        pagination: true,
        height: tableHeight,
        // showRefresh: true,
        // silent: true,
        striped: true,// 间隔色
        pagination: true,// 是否分页
        sidePagination: 'client',
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        // fixedColumns: true,
        // fixedNumber: 3,
        // queryParams: function getParams(params) {// 参数传递
        //     // 查询条件
        //     var obj = {
        //         SORT: (params.sort == null ? "" : params.sort === "" ? "" : params.sort + " " + params.order)
        //     };
        //     return obj;
        // },
        onCheck: function (row, obj) {
            // 选中行
        },
        onUncheck: function (row, obj) {
            // 取消选中
        },
        onCheckAll: function (rows) {
            // 全选
        },
        onUncheckAll: function () {
            // 全不选
        },
        onClickRow: function (row, obj) {
            // 单击行
        },
        onDblClickRow: function (row, obj) {
            // 双击行
        },
        onLoadSuccess: function (data) {
            layer.msg('加载成功');
        },
        onLoadError: function (status, res) {
            layer.msg('加载失败');
        },
        rowStyle: function (row, index) {
            // if (row.salesVolume && (row.salesVolume > 100000)) {
            //     return { css: { 'color': '#555' } }
            // }
            return {};
        },
        data: [
            {
                id: 1,
                name: '猫头鹰咖啡',
                describe: '马来西亚进口，猫头鹰MOW采用阿拉比卡咖啡豆 研磨系列 全新 棉带浸泡',
                price: '46.7',
                salesVolume: 12345,
                repertory: 67541
            },
            {
                id: 2,
                name: '盼盼软面包',
                describe: '盼盼 法式软面包 早餐饼干糕点整箱装奶香味1320g ',
                price: '29.80',
                salesVolume: 16618,
                repertory: 67541
            },
            {
                id: 3,
                name: '盼盼麦香鸡味块薯片',
                describe: '盼盼麦香鸡味块薯片 休闲膨化零食大礼包810g',
                price: '33.9',
                salesVolume: 9999,
                repertory: 888
            },
            {
                id: 1,
                name: '蒙牛优益C',
                describe: '蒙牛优益C 百香果味 330ml*4活菌型 软酸菌饮品',
                price: '46.7',
                salesVolume: 99999,
                repertory: 222
            },
            {
                id: 1,
                name: '咪咪虾条',
                describe: '咪咪 虾条 虾味 怀旧好吃膨化零食大礼包 网红休闲小点心糕点（18g*20包）360g/袋 ',
                price: '6.2',
                salesVolume: 22633,
                repertory: 333
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
            checkbox: true,
            width: '6%',
            formatter: function (value, row, index) {
                return false;
            }
        },{
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
            width: '12%',
            align: 'center',
            title: '价格',
            sortable: true
        }, {
            field: 'describe',
            width: '40%',
            align: 'center',
            title: '描述'
        }, {
            field: 'salesVolume',
            width: '12%',
            align: 'center',
            title: '销量',
            sortable: true,
            formatter: function (value, row, index) {
                var html;
                if (row.salesVolume && (row.salesVolume > 10000)) {
                    html = '<span><i class="layui-icon layui-icon-fire" style="color: #FFB800;"></i> ' + row.repertory + '<span>';
                } else {
                    html = '<span>' + row.repertory + '<span>';
                }
                return html;
            }
        }, {
            field: 'repertory',
            width: '12%',
            align: 'center',
            title: '库存',
            sortable: true,
            formatter: function (value, row, index) {
                var html;
                if (row.repertory && (row.repertory < 1000)) {
                    html = '<span style="color: #a1a1a1;">' + row.repertory + '<span>';
                } else {
                    html = '<span>' + row.repertory + '<span>';
                }
                return html;
            }
        }]
    })
}


function initHistory () {
    var history = [
        {
            title: '中华人民共和国（1949—今）',
            content: [
                '1949 开国大典，中华人民共和国成立',
                '1950 抗美援朝战争；土地改革；镇压反革命运动',
                '1951 西藏和平解放',
                '1953 三大改造开始；和平共处五项原则提出',
                '1954 第一届全国人民代表大会；五四宪法（中国历史上第一部社会主义性质的宪法）通过；日内瓦会议',
                '1955 万隆会议',
                '1956 三大改造结束，中国完成从新民主主义社会向社会主义社会的过渡',
                '1958 大跃进运动；人民公社运动；北京电视台试播，中国电视业诞生',
                '1959~1961 三年困难时期',
                '1962 中法建交',
                '1964 中国第一颗原子弹爆炸成功',
                '1966 文化大革命爆发；中国第一颗氢弹爆炸成功',
                '1969 珍宝岛事件',
                '1971 基辛格访华；中国恢复联合国合法席位',
                '1972 尼克松访华；中日建交',
                '1976 文化大革命结束',
                '1978 中共十一届三中全会',
                '1979 中美建交；对越自卫反击战（中越战争）',
                '1980 设立经济特区（厦门、汕头、深圳、珠海）',
                '1982 农村改革开展；撒切尔访华',
                '1984 设立沿海开放城市（天津、上海、福州、广州等14个）',
                '1985 设立沿海经济开放区（长三角、珠三角、闽东南、环渤海）',
                '1988 设立海南经济特区；设立经济技术开发区',
                '1990 海基会成立；浦东开发和开放',
                '1991 海协会成立',
                '1992 南方谈话；汪辜会谈达成“九二共识”；中共十四大；沿海经济开放区连成沿海经济开放地带',
                '1993 中共十四届三中全会',
                '1994 中国正式接入互联网',
                '1997 中共十五大，邓小平理论写入党章；恢复对香港行使主权',
                '1999 李登辉提出“两国论”；恢复对澳门行使主权',
                '2002 陈水扁提出“一边一国论”；中共十六大，“三个代表”重要思想写入党章',
                '2005 国民党主席连战访问大陆',
                '2007 中共十七大，科学发展观写入党章',
                '2008 马英九当选，两岸三通实现',
                '2012 中共十八大',
            ]
        },
        {
            title: '一、夏朝（前2070—前1600）',
            content: [
                '前2070 启继承王位，建立夏朝，世袭制取代禅让制'
            ]
        },
        {
            title: '二、商朝（前1600—前1046）',
            content: [
                '前1600 鸣条之战，成汤灭夏建商',
                '前1300 盘庚迁殷',
            ]
        },
        {
            title: '三、西周（前1046—前771）',
            content: [
                '前1046 牧野之战，姬发灭商建周，行分封制（有争议）',
                '前900 周懿王即位，周室始衰',
                '前842 国人暴动（中国历史有确切纪年的开端，一说前841）',
                '前841 共和行政',
                '前771 犬戎攻破镐京，西周灭亡',
            ]
        },
    ]
    layui.use('flow', function(){
        var flow = layui.flow;
        var index = 0;
        flow.load({
            mb: 50,
            isAuto: true,
            elem: '#history-timeline',
            scrollElem: '#history-timeline',
            done: function(page, next){
                var str = '';
                str += '<li class="layui-timeline-item">'
                + '<i class="layui-icon layui-timeline-axis">&#xe63f;</i>'
                + '<div class="layui-timeline-content layui-text">'
                + '<div class="layui-timeline-title">' + history[index].title + '</div>';
                history[index].content.reverse();
                $.each(history[index].content, function(i, n){
                    str += '<p>' + n + '</p>'
                })
                str +=  '</div></li>';
                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(str, page < history.length);
                index += 1;
            }
        });
    });
    // var obj = {
    //     key: '9b02fd65654841299c72d3e24d101f85',
    //     yue: new Date().getMonth() + 1,
    //     ri: new Date().getDate(),
    //     type: 1
    // }
    // var src= 'http://api.avatardata.cn/HistoryToday/LookUp?'
    //     + 'key=' + obj.key
    //     + '&yue=' + obj.yue
    //     + '&ri=' + obj.ri
    //     + '&type=' + obj.type
    //     + '&callback=' + foo;
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    // script.src = src;
    // console.log(script);
    // // $(home.content).parents('body').append(script);
    // function foo (data) {
    //     console.log({data})
    // }
    // $.ajax({
    //     url: 'http://api.avatardata.cn/HistoryToday/LookUp',
    //     method: 'post',
    //     dataType: "jsonp",
    //     jsonp:"callback",
    //     jsonpCallback:"foo",
    //     data: {
    //         key: '9b02fd65654841299c72d3e24d101f85',
    //         yue: new Date().getMonth() + 1,
    //         ri: new Date().getDate(),
    //         type: 1
    //     },
    //     success: function (data) {
    //         console.log(data)
    //     },
    //     error: function (data) {
    //         console.log(data)
    //     }
    // })
}