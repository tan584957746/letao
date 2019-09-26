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
        console.log({arr:arr})
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
        mui.confirm('您确定要删除该条记录吗?','温馨提示',['取消','确认'],function(e){
            if(e.index===1){
                //读取数据
                var arr=getHistory();
                //删除当前索引项
                var index=$(this).data('index');
                arr.splice(index,1);
                var jsonStr=JSON.stringify(arr);
                //存储到本地
                localStorage.setItem('search_list',jsonStr);
                //重新渲染页面
                render();
            }
        })
    })

});