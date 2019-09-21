/**
 * Created by Administrator on 2019/9/19 0019.
 */
$(function(){
  //进入页面模板引擎渲染页面
    var currentPage=1;
    var pageSize=2;
    var picArr=[];

    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                //模板与数据相结合
                var htmlStr=template('productTpl',info);
                $('tbody').html(htmlStr);
                //分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total/info.size),
                    size:"normal",
                    itemTexts:function(type,page,current){
                        switch(type) {
                            case "page":
                                return page;
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页"

                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch(type) {
                            case "page":
                                return "前往第"+page+"页";
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页"

                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked: function(a,b,c,page){
                        currentPage=page;
                        render();
                    }
                });
            }
        });

    }

    //点击添加商品显示模态框
    $('.addBtn').on('click',function(){
        $('#product_modal').modal('show');
        //渲染二级分类列表
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data: {
                page:1,
                pageSize: 100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                //模板与数据相结合
                 var htmlStr=template('secondTpl',info);
                $('#dropdown-menu').html(htmlStr);
            }
        });
    });

    //下拉列表
    $('#dropdown-menu').on('click','a',function(){
        var txt=$(this).text();
        $('#addsecondText').text(txt);
        var id=$(this).data('id');
        $('[name="brandId"]').val(id);
        //更新状态
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    //上传图片
    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            picArr.unshift(data.result);
            $('#imgBox').prepend('<img src="'+data.result.picAddr+'" alt="" width="100"/>');
            if(picArr.length>3){
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }

            if(picArr.length===3){
               $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    });

    //表单校验
    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId:{
                validators: {
                    notEmpty: {
                        message:"请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message:"请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message:"请输入商品库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非0开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message:"请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码要求xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message:"请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message:"请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message:"请选择3张图片"
                    }
                }
            }
        }
    });

    //注册表单验证成功事件
    $('#form').on('success.form.bv',function(e){
        //阻止表单默认提交
        e.preventDefault();
        //获取表单元素的数据
        var paramsStr=$('#form').serialize();
        //还需要拼接上图片的数据,图片数据存在上面的数组中picArr
        paramsStr+='&picName1='+picArr[0].picName+'&picAddr1='+picArr[0].picAddr;
        paramsStr+='&picName2='+picArr[1].picName+'&picAddr3='+picArr[1].picAddr;
        paramsStr+='&picName3='+picArr[2].picName+'&picAddr3='+picArr[2].picAddr;
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramsStr,
            dataType:"json",
            success:function(info){
                if(info.success===true){
                    //关闭模态框
                    $('#product_modal').modal('hide');
                    //重新渲染第一页
                    currentPage=1;
                    render();
                    //重置表单数据
                    $('#form').data('bootstrapValidator').resetForm(true);
                    $('#addsecondText').text('请选择二级分类');
                    $('#imgBox img').remove();
                }
            }
        });
    });
});