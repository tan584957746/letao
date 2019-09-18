/**
 * Created by Administrator on 2019/9/13 0013.
 */
$(function(){
   //ajax渲染页面
    var currentPage=1;
    var pageSize=5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                var htmlStr=template('addTpl',info);
                $('tbody').html(htmlStr);

                //分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function(a,b,c,page){
                        //更新当前页
                        currentPage=page;
                        //重新渲染
                        render();
                    }
                });

            }
        });
    }

    //点击添加分类按钮，显示模态框
    $('#addBtn').on('click',function(){
        $('#addSecondModal').modal('show');

        //发送ajax渲染一级分类下拉列表
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template('addTopTpl',info);
                $('.dropdown-menu').html(htmlStr);
            }
        });
    });

    //下拉列表的选中功能，li是动态获取的，需要注销事件委托
    $('.dropdown-menu').on('click','a',function(){
        var txt=$(this).text();
        $('#dropText').text(txt);
        var id=$(this).data('id');
        $('[name="categoryId"]').val(id);
        //更新上传状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    //上传图片
    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            $('#imgBox img').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            //更新图片状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });

    //表单校验
    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId:{
                validators: {
                    notEmpty: {
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message:"请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: "请选择图片"
                    }
                }
            }
        }
    });

    //注册表单验证成功事件
    $('#form').on('success.form.bv',function(e){
        //阻止表单的默认提交
        e.preventDefault();
        //使用ajax进行提交
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#addSecondModal').modal('hide');
                   //重新渲染第一页
                    currentPage=1;
                    render();

                    //重置模态框
                    $('form').data('bootstrapValidator').resetForm(true);

                    $('#dropText').text('请选择一级分类');
                    $('#imgBox img').attr('src','./images/none.png');

                }
            }
        });
    });

});