/**
 * Created by Administrator on 2019/10/9 0009.
 */
$(function(){
    //äÖÈ¾Ò³Ãæ
    $.ajax({
        type:'get',
        url: '/user/queryUserMessage',
        dataType: 'json',
        success:function(info){
            console.log(info);
            //Î´µÇÂ¼À¹½Øµ½µÇÂ¼Ò³
            if(info.error===400){
                location.href='login.html'
            }
            //ÒÑµÇÂ¼£¬äÖÈ¾Ò³Ãæ
            var htmlStr=template('userTpl',info);
            $('.user_info').html(htmlStr);
        }
    });

    //ÍË³ö¹¦ÄÜ
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