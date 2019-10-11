/**
 * Created by Administrator on 2019/10/3 0003.
 */
$(function(){
    //动态渲染轮播图
    var productId=getSearch('productId');
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data: {
            id:productId
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr=template('productTpl',info);
            $('.lt_main .mui-scroll').html(htmlStr);

            //初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //初始化数字输入框
            mui('.mui-numbox').numbox()
        }
    });

    //选中尺码
    $('.lt_main').on('click','.lt_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    });

    //加入购物车
    $('#addCart').on('click',function(){
        var size=$('.lt_size span.current').text();
        console.log(size);
        var num=$('.lt_num input').val();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data: {
                productId:productId,
                num:num,
                size:size
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error===400){
                    //未登录，拦截到登录页
                    location.href='login.html?retUrl='+location.href;
                }
                if(info.success){
                    //已登陆,显示模态框,跳到购物车页
                    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                        console.log(e.index);
                        if(e.index===0){
                            location.href='cart.html';
                        }
                    });
                }
            }
        });
    });
});