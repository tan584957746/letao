/**
 * Created by Administrator on 2019/9/22 0022.
 */
//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
});
//初始化图片轮播
var gallery = mui('.mui-slider');
gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});

//解析地址栏
function getSearch(k){
    //获取地址栏的参数
    var search=location.search; //"?key=1&name=pp"
    search=decodeURI(search);
    //去掉问号
    search=search.slice(1);//"key=1&name=pp"
    //要干掉的字符串，返回一个数组
    var arr=search.split('&'); //['key=1','name=pp']
    var obj={};
    //遍历数组，把数组中的每一项放到
    arr.forEach(function(v,i){
        var key=v.split('=')[0];
        var value= v.split('=')[1];
        obj[key]=value;
    });
    return obj[k];
}

