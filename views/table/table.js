"use strict";
var myTable = {
    content: '',
    tableHeight: '',
    rowData: [],
    rowIndex: [],
    currentData: {}
};
myTable.pageInit = function (content) {
    myTable.content = content;
    form.render();
    myTable.btnSet();
    myTable.setTableHeight();
    myTable.initTable();
};

myTable.btnSet = function () {
    $('#btn-search', myTable.content).click(function(){
        // 筛选条件
        console.log(form.val("searchFilter"));
        myTable.search();
    });
    $('#btn-add', myTable.content).click(function(){
        myTable.add();
    });
    $('#btn-delete', myTable.content).click(function(){
        myTable.delete();
    });
    $('#btn-edit', myTable.content).click(function(){
        myTable.edit();
    });
};
// 初始化
myTable.initTable = function () {
    $('#table_demo').bootstrapTable('destroy').bootstrapTable({
        url: '../json/table.json',
        locale: 'zh-CN', //设置语言
        pagination: true,
        height: myTable.tableHeight,
        // showRefresh: true,
        // silent: true,
        striped: true,// 间隔色
        pagination: true,// 是否分页
        sidePagination: 'client',           //分页（服务器/网页） server、client
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 25,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        clickToSelect: true,
        // fixedColumns: true,
        // fixedNumber: 3,
        queryParams: function getParams(params) {// 参数传递
            // 查询条件
            var obj = {
                SORT: (params.sort == null ? "" : params.sort === "" ? "" : params.sort + " " + params.order)
            };
            return obj;
        },
        onCheck: function (row, obj) {
            // 选中行
            myTable.rowIndex.push(obj.attr('data-index'));
        },
        onUncheck: function (row, obj) {
            // 取消选中
            myTable.rowIndex.splice($.inArray(obj.data("index"), myTable.rowIndex), 1);
        },
        onCheckAll: function (rows) {
            // 全选
            myTable.rowIndex = [];
            $.each(rows, function (i, n) {
                myTable.rowIndex.push(i);
            });
        },
        onUncheckAll: function () {
            // 全不选
            myTable.rowIndex = [];
        },
        onClickRow: function (row, obj) {
            // 单击行
        },
        onDblClickRow: function (row, obj) {
            // 双击行
        },
        onLoadSuccess: function (data) {
            myTable.rowData = data;
            myTable.rowIndex = [];
        },
        onLoadError: function (status, res) {
            layer.msg('加载失败');
            myTable.rowData = [];
            myTable.rowIndex = [];
        },
        rowStyle: function (row, index) {
            // if (row.salesVolume && (row.salesVolume > 100000)) {
            //     return { css: { 'color': '#555' } }
            // }
            return {};
        },
        columns: [{
            checkbox: true,
            width: '4%',
            formatter: function (value, row, index) {
                return false;
            }
        },{
            field: 'id',
            width: '4%',
            align: 'center',
            title: '序号',
            formatter: function (value, row, index) {
                return index + 1
            }
        }, {
            field: 'name',
            width: '10%',
            align: 'center',
            title: '名称'
        }, {
            field: 'price',
            width: '8%',
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
            width: '10%',
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
            width: '10%',
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
        }, {
            field: 'repertory',
            width: '12%',
            align: 'center',
            title: '操作',
            sortable: true,
            formatter: function (value, row, index) {
                var html = '';
                html += '<button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btn-edit" onclick="myTable.editRow('+index+')">修改</button>'
                    + '<button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btn-delete" onclick="myTable.deleteRow('+index+')">删除</button>'
                return html;
            }
        }]
    })
}

// 查询
myTable.search = function () {
    $('#table_demo').bootstrapTable('refresh');
}
// 新增
myTable.add = function () {
    console.log(myTable.rowData, myTable.rowIndex);
    myTable.openEdit({
        //
    })
}
// 修改
myTable.editRow = function(index) {
    myTable.openEdit(myTable.rowData[index]);
}
myTable.edit = function () {
    console.log(myTable.rowData, myTable.rowIndex);
    if (myTable.rowIndex.length == 1) {
        myTable.openEdit(myTable.rowData[myTable.rowIndex[0]]);
    } else {
        layer.msg('请选择一条数据');
    }
}
// 删除
myTable.deleteRow = function (index) {
    myTable.openDelete([index]);
}
myTable.delete = function () {
    if (myTable.rowIndex.length >= 1) {
        myTable.openDelete(myTable.rowIndex);
    } else {
        layer.msg('请至少选择一条数据');
    }
}
// 打开删除页
myTable.openDelete = function (rowIndexs) {
    var html = '<div style="padding: 10px 20px;">';
    $.each(rowIndexs, function(index, item){
        html += `
            <p>名称： ${myTable.rowData[item].name}</p>
            <p>价格： ${myTable.rowData[item].price}</p>
            <p>描述： ${myTable.rowData[item].describe}</p>
            <p>类型： ${myTable.rowData[item].type}</p>
            <p>销量： ${myTable.rowData[item].sale}</p>
            <p>库存： ${myTable.rowData[item].count}</p>`;
    });
    html += '</div>';
    layer.open({
        type: 1,
        title: '信息',
        content: html,
        area: ['400px', '340px'],
        btn: ['关闭'],
        btnAlign: 'c',
        shade: '0.3',
    })
}

// 打开编辑页
myTable.openEdit = function (obj) {
    myTable.currentData = obj;
    var html = `
    <style>
        .container-edit{
            padding: 20px 15px 10px 15px;
        }
        .container-edit .layui-input-block {
            margin-left: 80px;
            min-height: 36px;
        }
        .container-edit .layui-form-label {
            text-align: left;
            /* background: #efefef; */
        }
        .container-edit .layui-form-item {
            margin-bottom: 10px;
        }
    </style>
    <div class="container-edit" style="padding: 20px 15px 10px 15px;">
        <form class="layui-form" lay-filter="editGoods">
            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-block">
                    <input type="text" name="name"  placeholder="请输入名称" autocomplete="off" class="layui-input" id="edit-name">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">价格</label>
                <div class="layui-input-block">
                    <input type="text" name="price"  placeholder="请输入名称" autocomplete="off" class="layui-input" id="edit-price">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">描述</label>
                <div class="layui-input-block">
                    <textarea name="describe" placeholder="请输入描述" class="layui-textarea" rows="6" id="edit-describe"></textarea>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">类型</label>
                <div class="layui-input-block">
                    <select name="type" id="edit-type">
                        <option value="">请选择类型</option>
                        <option value="0">生活用品1</option>
                        <option value="1">生活用品2</option>
                        <option value="2">生活用品3</option>
                        <option value="3">生活用品4</option>
                        <option value="4">生活用品5</option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">销量</label>
                <div class="layui-input-block">
                    <input type="text" name="sale"  placeholder="请输入名称" autocomplete="off" class="layui-input" id="edit-sale">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">库存</label>
                <div class="layui-input-block">
                    <input type="text" name="count"  placeholder="请输入名称" autocomplete="off" class="layui-input" id="edit-count">
                </div>
            </div>
        </form>
    </div>
    `
    layer.open({
        type: 1,
        title: obj.id ? '编辑' : '新增',
        content: html,
        area: ['600px', '560px'],
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shade: '0.3',
        success: function(layero, index){
            var body = layer.getChildFrame('body', index);
            // 赋值
            form.val("editGoods", {
                'name': obj.name,
                'describe': obj.describe,
                'price': obj.price,
                'sale': obj.salesVolume,
                'count': obj.repertory,
                'type': obj.type
            });
        },
        yes: function(index, layero){
            var body = layer.getChildFrame('body', index);

            layer.close(index);
            var obj = form.val("editGoods");
            var html = `
            <div style="padding: 10px 20px;">
                <p>名称： ${obj.name}</p>
                <p>价格： ${obj.price}</p>
                <p>描述： ${obj.describe}</p>
                <p>类型： ${obj.type}</p>
                <p>销量： ${obj.sale}</p>
                <p>库存： ${obj.count}</p>
            </div>
            `
            layer.open({
                type: 1,
                title: '信息',
                content: html,
                area: ['400px', '340px'],
                btn: ['关闭'],
                btnAlign: 'c',
                shade: '0.3',
            })
        }
    })
}


myTable.setTableHeight = function () {
    myTable.tableHeight = $(window).height() - 215;
}