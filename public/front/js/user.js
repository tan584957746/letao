/**
 * Created by Administrator on 2019/10/9 0009.
 */
$(function(){
    //��Ⱦҳ��
    $.ajax({
        type:'get',
        url: '/user/queryUserMessage',
        dataType: 'json',
        success:function(info){
            console.log(info);
            //δ��¼���ص���¼ҳ
            if(info.error===400){
                location.href='login.html'
            }
            //�ѵ�¼����Ⱦҳ��
            var htmlStr=template('userTpl',info);
            $('.user_info').html(htmlStr);
        }
    });

    //�˳�����
    $('.out_btn').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href='login.html';
                }
            }
        });
    });
});