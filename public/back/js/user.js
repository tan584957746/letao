/**
 * Created by Administrator on 2019/9/11 0011.
 */
$(function(){
    //����ajax��ȡ���ݣ���Ⱦҳ��
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
                //ģ������������
                var htmlStr=template('tpl',info);
                $('.lt_content tbody').html(htmlStr);

                //��ҳ
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //��ǰҳ
                    currentPage:info.page,
                    //��ҳ��=������/ÿҳ������
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a, b, c,page){
                        currentpage=page; //���µ�ǰҳ
                        console.log(page);
                        //������Ⱦҳ��
                        render();
                    }
                });
            }

        })
    }

    //�����ť����ģ̬�򣬰�ť�Ƕ�̬���ɵģ���Ҫע���¼�ί��
    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        //�����ť��ȡ��ǰ�û���id
        userId=$(this).parent().data('id');
        console.log(userId);
        //�����ť���õ�ǰ�û���״̬
        isDelete=$(this).hasClass('btn-danger')?0:1;
        console.log(isDelete);
    });

    //���ȷ����ť��ִ�н��û����ã��������ݿ�
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
                   //���³ɹ���
                   // �ر�ģ̬��
                    $('#userModal').modal('hide');
                   // ������Ⱦҳ��
                    render();

                }
            }
        });
    });


});