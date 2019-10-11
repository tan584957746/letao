/**
 * Created by Administrator on 2019/10/8 0008.
 */
$(function(){


    $('#loginBtn').on('click',function(){
        var username=$('#username').val().trim();
        var password=$('#password').val().trim();
        if(username===''){
            mui.toast('请输入用户名');
            return;
        }
        if(password===''){
            mui.toast('请输入密码');
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error===403){
                    mui.toast('用户名或密码错误');
                }
                if(info.success){
                    //登录成功,判断地址栏有没有拼接这个参数
                    if(location.href.indexOf('retUrl')!=-1){
                        //如果是从其他页面拦截过来的，跳回去
                        location.href=location.search.replace('?retUrl=','')
                    }else {
                        //如果是直接访问login.html，跳转到个人中心页
                        location.href='user.html';
                    }



                }
            }
        });
    });

});