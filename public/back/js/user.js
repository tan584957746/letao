/**
 * Created by Administrator on 2019/9/11 0011.
 */
$(function(){
    //发送ajax获取数据，渲染页面
    var currentpage=1;
    var pageSize=5;
    var userId;
    var isDelete;
    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentpage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                //模板与数据相结合
                var htmlStr=template('tpl',info);
                $('.lt_content tbody').html(htmlStr);

                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数=总条数/每页的条数
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a, b, c,page){
                        currentpage=page; //更新当前页
                        console.log(page);
                        //重新渲染页面
                        render();
                    }
                });
            }

        })
    }

    //点击按钮弹出模态框，按钮是动态生成的，需要注册事件委托
    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        //点击按钮获取当前用户的id
        userId=$(this).parent().data('id');
        console.log(userId);
        //点击按钮设置当前用户的状态
        isDelete=$(this).hasClass('btn-danger')?0:1;
        console.log(isDelete);
    });

    //点击确定按钮，执行禁用或启用，更新数据库
    $('.submitBth').on('click',function(){
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:userId,
                isDelete:isDelete
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                   //更新成功后
                   // 关闭模态框
                    $('#userModal').modal('hide');
                   // 重新渲染页面
                    render();

                }
            }
        });
    });


});