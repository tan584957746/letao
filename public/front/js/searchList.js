/**
 * Created by Administrator on 2019/9/27 0027.
 */
$(function(){

    //赋值给input框
    $('.search_input').val(getSearch('key'));
    var currentPage=1;
    var pageSize=2;

    function render(callback){
        //加载框
        //$('.product').html('<div class="loading"></div>');
        var params={};
        //三个必传的参数
        params.proName=$('.search_input').val();
        params.page=currentPage;
        params.pageSize=pageSize;
        //两个可传可不传的参数
        var $current=$('.lt_sort a.current');
        //获取当前的高亮的a，判断有没有
        if($current.length>0){
            //有高亮的a，需要进行排序，需要传这两个参数，两个只能传一个
            //价格：price 1升序  2降序
            //库存：num
            //传给后台的键
            var sortName=$current.data('type');
            //传给后台的值，有没有这个类
            var sortValue=$current.find('i').hasClass('fa-angle-down')?2:1;
            params[sortName]=sortValue;
        };
        setTimeout(function(){
            $.ajax({
                type:'get',
                url:"/product/queryProduct",
                data: params,
                success:function(info){
                    console.log(info);
                    callback&&callback(info);

                }
            });
        },1000);

    };

    //一进入页面进行一次下拉刷新
    mui.init({
        pullRefresh : {
            //一般会指定区域滚动的容器为下拉刷新
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //配置下拉刷新
            down : {
                auto:true,//可选,默认false.首次加载自动下拉刷新一次
                callback :function(){
                    currentPage=1;
                    render(function(info){
                        var htmlStr=template('searchListTop',info);
                        $('.product').html(htmlStr);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //返回第一页的数据，有了数据后重新开启上拉加载
                        mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                    });
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },

            //配置上拉加载
            up : {
                callback :function(){
                    currentPage++;
                    render(function(info){
                        var htmlStr=template('searchListTop',info);
                        $('.product').append(htmlStr);
                        if(info.data.length===0){
                            //没有数据的时候，显示没有更多数据，并且禁用上拉加载
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }else {
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }

                    });
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }

        }
    });




    //点击搜索按钮，请求数据渲染页面
    $('.search_button').on('click',function(){
        //点击按钮执行一次下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

        //获取文本框的值
        var key=$('.search_input').val();
        //如果文本框的值为空
        if(key.trim()===''){
            mui.toast('请输入搜索关键字');
            return;
        }
        //读取本地存储数据
        var history=localStorage.getItem('search_list')||'[]';
        //转换成数组
        var arr=JSON.parse(history);
        //删除重复项,删除以后把数据添加到最前面
        var index=arr.indexOf(key);
        if(index!=-1){
            arr.splice(index,1);
        }
        //数组长度不能超过10
        if(arr.length>=10){
           arr.pop();
        }
        //获取文本框的值添加到数组中
        arr.unshift($('.search_input').val());
        //转换成json字符串存入本地
        localStorage.setItem('search_list',JSON.stringify(arr));
    });



    //排序功能，点击a进行排序
    $('.lt_sort a[data-type]').on('tap',function(){
        //判断有没有current类
        if($(this).hasClass('current')){
            //有，切换箭头的类
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else {
            //没有，添加current类
            $(this).addClass('current').siblings().removeClass('current');
        }

    //渲染页面
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    });


    //点击商品进入商品页,并把id传过去
    $('.product').on('tap','a',function(){
        var id=$(this).data('id');
        location.href='product.html?productId='+id;
    })


});