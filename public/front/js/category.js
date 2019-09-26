/**
 * Created by Administrator on 2019/9/22 0022.
 */
$(function(){
    //��Ⱦһ������
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template('categroyTopTpl',info);
            $('#categroy_top').html(htmlStr);

            //����ҳ����Ⱦ��������
            render(info.rows[0].id);
        }
    });

    //��Ⱦ��������
    $('#categroy_top').on('click','a',function(){
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
        var id=$(this).data('id');
        render(id);
    });

    function render(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data: {
                id:id
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template('cateSecondTpl',info);
                $('#categroy_second').html(htmlStr);
            }
        })
    }


});