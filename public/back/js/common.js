/**
 * Created by Administrator on 2019/9/6 0006.
 */
//进度条
$(function(){

    //ajax全局事件
    //实现在第一个ajax发送的时候，开启进度条
      $(document).ajaxStart(function(){
          //开启进度条
          NProgress.start();
      });

    //在所有的ajax请求都完成的时候，结束进度条
      $(document).ajaxStop(function(){
          //结束进度条
          setTimeout(function(){
              NProgress.done();
          },500);
      });

    //登录拦截功能，问问后台有没有这个用户的信息
    //location.href获取地址,截取的字符串返回-1的时候说明不在这个页面
    if(location.href.indexOf('login.html')===-1) {
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            dataType:"json",
            success:function(info){
                if(info.error===400){
                    location.href="login.html"
                }
            }

        });
    }


    //分类切换功能
    $('.categroy').on('click',function(){
        $('.nav .child').stop().slideToggle();
    });

    //切换左侧导航栏的显示与隐藏
    $('.nav_toggle').on('click',function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.topbar').toggleClass('hidemenu');
    });


    //切换模态框的显示与隐藏
    $('.modal_toggle').on('click',function(){
        $('#myModal').modal('show');
    });


    //模态框的退出功能,删除用户信息，返回登录页
    $('.modal_out').on('click',function(){
        //发送ajax请求，退出成功返回登录页
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success: function(info){
                console.log(info);
                location.href="login.html";
            }
        });
    });




});