/**
 * Created by Administrator on 2019/9/6 0006.
 */
//������
$(function(){

    //ajaxȫ���¼�
    //ʵ���ڵ�һ��ajax���͵�ʱ�򣬿���������
      $(document).ajaxStart(function(){
          //����������
          NProgress.start();
      });

    //�����е�ajax������ɵ�ʱ�򣬽���������
      $(document).ajaxStop(function(){
          //����������
          setTimeout(function(){
              NProgress.done();
          },500);
      });

    //��¼���ع��ܣ����ʺ�̨��û������û�����Ϣ
    //location.href��ȡ��ַ,��ȡ���ַ�������-1��ʱ��˵���������ҳ��
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


    //�����л�����
    $('.categroy').on('click',function(){
        $('.nav .child').stop().slideToggle();
    });

    //�л���ർ��������ʾ������
    $('.nav_toggle').on('click',function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.topbar').toggleClass('hidemenu');
    });


    //�л�ģ̬�����ʾ������
    $('.modal_toggle').on('click',function(){
        $('#myModal').modal('show');
    });


    //ģ̬����˳�����,ɾ���û���Ϣ�����ص�¼ҳ
    $('.modal_out').on('click',function(){
        //����ajax�����˳��ɹ����ص�¼ҳ
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