/**
 * Created by Administrator on 2019/9/26 0026.
 */
$(function(){
    //假数据
    //准备假数据
    //var arr=['张飞','关羽','刘备','诸葛亮','关公','马云']
    //转换成json字符串
    //var jsonStr=JSON.stringify(arr);
    //存入本地localStorage
    //localStorage.setItem('search_list',jsonStr);

    //渲染搜索列表页
    //1 读取数据 2 转成数组 3渲染页面
    render();
    //读取数据
    function getHistory(){
        var history=localStorage.getItem('search_list')||'[]';
        var arr=JSON.parse(history);
        return arr;
    }
    //渲染页面
    function render(){
        var arr=getHistory();
        var htmlStr=template('searchTpl',{arr:arr});
        $('.lt_history').html(htmlStr);
    }

    //清空历史记录
    $('.lt_history').on('click','.history_empty',function(){
        mui.confirm('您确认要清空历史记录吗?','温馨提示',['取消','确认'],function(e){
            if(e.index===1){
                //清空历史记录
                localStorage.removeItem('search_list');
                //重新渲染页面
                render();
            }
        });
    });

    //删除历史记录中的某一项
    $('.lt_history').on('click','.mui_del',function(){
        //将外层的this指向，存储在that中
        var that=this;
        mui.confirm('您确定要删除该条记录吗?','温馨提示',['取消','确认'],function(e){
            if(e.index===1){
                //读取数据
                var arr=getHistory();
                //删除当前索引项
                //这里面是普通的function，这里的this指向window
                var index=$(that).data('index');
                arr.splice(index,1);
                var jsonStr=JSON.stringify(arr);
                //存储到本地
                localStorage.setItem('search_list',jsonStr);
                //重新渲染页面
                render();
            }
        })
    });

    //添加功能
    //添加搜索按钮
    $('.search_button').on('click',function(){
        //获取文本框的值
        var key=$('.search_input').val().trim();
        //关键字不能为空
        if(key===''){
            mui.toast('请输入搜索关键字');
            return;
        }
        //读取本地存储的数组
        var arr=getHistory();
        //删除重复的项
        var index=arr.indexOf(key);
        if(index!=-1){
            arr.splice(index,1);
        }
        //数组长读不能超过10
        if(arr.length>=10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));

        //渲染页面
        render();

        //清空输入框
        $('.search_input').val('');

        //跳转页面
        location.href='searchList.html?key='+key;


    })

});