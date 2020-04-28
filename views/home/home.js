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
    $('#example-table', home.content).bootstrapTable('destroy').bootstrapTable({
        url: '../json/table.json',
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
            title: '中华民国（1912—1949）',
            content: [
                '。。。。。。',
                '1912 中华民国建立；清帝逊位；《中华民国临时约法》（中国历史上第一部资产阶级性质的宪法）颁布',
                '1913 二次革命',
                '1915 袁世凯复辟；护国运动；新文化运动',
                '1917 文白之争；张勋复辟；护法运动',
                '1918 李大钊发表文章，马克思主义传入中国',
                '1919 五四运动，新民主主义革命开始',
                '1921 中共一大（中国共产党成立）',
                '1922 直奉战争；中共二大',
                '1924 国民党一大（新三民主义提出），国共第一次合作',
                '1925 孙中山逝世；五卅运动',
                '1926 北伐战争',
                '1927 蒋介石发动“四一二”政变；汪精卫发动“七一五”政变（武汉分共）；南京国民政府成立；南昌起义；八七会议；秋收起义；宁汉合流；井冈山革命根据地建立',
                '1928 井冈山会师；皇姑屯事件；东北易帜，北伐战争胜利，中国形式上统一',
                '1931 九一八事变',
                '1932 “一·二八”事变（淞沪抗战）；“攘外必先安内”政策确立；伪满洲国建立',
                '1934 红军长征开始',
                '1935 遵义会议；华北事变（中日民族矛盾上升为主要矛盾）；红一方面军到达陕北；“一二·九”运动；瓦窑堡会议',
                '1936 长征结束；西安事变（双十二事变、陕变），抗日民族统一战线正式形成',
                '1937 卢沟桥事变（七七事变）；淞沪会战；洛川会议；蒋介石承认中共合法地位，抗日民族统一战线最终形成；平型关大捷；南京大屠杀',
                '1938 台儿庄战役；《论持久战》发表；武汉会战（抗战进入相持阶段）',
                '1940 《新民主主义论》发表；百团大战',
                '1941 皖南事变（新四军事件）',
                '1942 延安整风运动；中国远征军入缅作战',
                '1945 中共七大，毛泽东思想写入党章；日本投降；重庆谈判达成《双十协定》',
                '1946 政治协商会议召开；全面内战（第三次国内革命战争、解放战争、动员戡乱）爆发',
                '1947 挺进大别山；《中国土地法大纲》颁布；内蒙古自治区成立',
                '1948 辽沈战役；淮海战役；平津战役',
                '1949 西柏坡会议（中共七届二中全会），工作重心由农村转移到城市；北平谈判；渡江战役，国民党当局退守台湾，两岸分治开始；第一届中国人民政治协商会议召开；《共同纲领》颁布',
            ]
        }
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