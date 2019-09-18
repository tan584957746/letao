/**
 * Created by Administrator on 2019/9/13 0013.
 */
$(function () {
    //一进入页面发送ajax请求渲染一级分类页面

    //当前页数
    var currentPage = 1;
    //每页条数
    var pageSize = 5;

    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template('addTpl', info);
                $('tbody').html(htmlStr);

                //初始化分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);//当前被点击的页码
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    //点击按钮显示模态框
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
    });

    //使用表单校验插件，进行表单校验
    $('#form').bootstrapValidator({
        //设置小图标，指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "一级分类不能为空"
                    }
                }
            }
        }
    });

    //注册表单提交成功事件，阻止表单的默认提交方式，使用ajax进行提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault(); //阻止默认提交

        //使用ajax进行提交
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重新渲染页面,渲染第一页
                    currentPage = 1;
                    render();
                    //重置表单
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        });


    });


});