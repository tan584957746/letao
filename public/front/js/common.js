/**
 * Created by Administrator on 2019/9/22 0022.
 */
//��ʼ���������
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    indicators: false
});
//��ʼ��ͼƬ�ֲ�
var gallery = mui('.mui-slider');
gallery.slider({
    interval:5000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
});

//������ַ��
function getSearch(k){
    //��ȡ��ַ���Ĳ���
    var search=location.search; //"?key=1&name=pp"
    search=decodeURI(search);
    //ȥ���ʺ�
    search=search.slice(1);//"key=1&name=pp"
    //Ҫ�ɵ����ַ���������һ������
    var arr=search.split('&'); //['key=1','name=pp']
    var obj={};
    //�������飬�������е�ÿһ��ŵ�
    arr.forEach(function(v,i){
        var key=v.split('=')[0];
        var value= v.split('=')[1];
        obj[key]=value;
    });
    return obj[k];
}

