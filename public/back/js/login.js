/**
 * Created by Administrator on 2019/9/6 0006.
 */
$(function(){

    //初始化表单校验插件
    $('#login_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }

            }
        }
    });

    //点击重置按钮重置表单
    $('[type="reset"]').on('click',function(){
        $('#login_form').data('bootstrapValidator').resetForm();
    });

    //注册表单验证成功事件
    $('#login_form').on('success.form.bv',function(e){
        //阻止浏览器的默认行为
        e.preventDefault();
        //使用ajax进行表单提交
        $.ajax({
            type:"post",
            url:'/employee/employeeLogin',
            data:$('#login_form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href='index.html';
                }
                if(info.error===1000){
                    $('#login_form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(info.error===1001){
                   $('#login_form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        });
    });


});