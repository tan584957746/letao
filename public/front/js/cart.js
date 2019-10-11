/**
 * Created by Administrator on 2019/10/10 0010.
 */
$(function(){
    //下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback :function(){
                    render();
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    function render(){
        setTimeout(function(){
            $.ajax({
                type:'get',
                url:'/cart/queryCart',
                dataType:'json',
                success:function(info){
                    console.log(info);
                    if(info.error===400){
                        location.href='login.html?retUrl='+location.href;
                    }
                    var obj={
                        list:info
                    };
                    var htmlStr=template('cartTpl',obj);
                    $('#mui_slider_list').html(htmlStr);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                }
            });
        },500);
    }

    //编辑功能
    $('#mui_slider_list').on('tap','.mui_update',function(){
        //获取当前编辑的对象的所有自定义属性,放入模板中渲染页面
        var obj=this.dataset;
        var id=obj.id;
        console.log(obj);
        //生成模板
        var htmlStr=template('editTpl',obj);
        htmlStr=htmlStr.replace(/\n/g,'');
        //弹出模态框
        mui.confirm(htmlStr,'编辑商品',['确认','取消'],function(e){
            if(e.index===0){
                var size=$('.lt_size span.current').text();
                var num=$('.lt_num .mui-numbox-input').val();
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                       id: id,
                        size: size,
                        num: num
                    },
                    dataType: 'json',
                    success:function(info){
                        console.log(info);
                        if(info.success){
                            //重新加载下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });

        //初始化数字框
        mui('.mui-numbox').numbox();
    });

    //删除功能
    $('#mui_slider_list').on('tap','.mui_del',function(){
        var id=$(this).data('id');
        $.ajax({
            type: 'get',
            url:'/cart/deleteCart',
            data: {
                id: id
            },
            dataType: 'json',
            success:function(info){
               console.log(info);
                if(info.success){
                    //重新加载下拉刷新
                   mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                }
            }

        })
    });

    //点击选中尺码
    $('body').on('click','.lt_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    });


});