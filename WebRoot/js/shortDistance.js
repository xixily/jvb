/**
 * Created by Administrator on 2016/3/7.
 */

// �ٶȵ�ͼAPI����
function G(id) {
    return document.getElementById(id);
}

var map = new BMap.Map("l-map");
map.centerAndZoom("����", 12);                   // ��ʼ����ͼ,���ó��к͵�ͼ����
map.enableScrollWheelZoom();

var transit = new BMap.DrivingRoute(map, {
    renderOptions: {
        map: map,
        panel: "r-result1",
        enableDragging: true //���յ�ɽ�����ק
    },
});
transit.search("����", "κ����");


var size = new BMap.Size(10, 20);//���ó����л�
map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: size,
    // �л�����֮���¼�
    // onChangeBefore: function(){
    //    alert('before');
    // },
    // �л�����֮���¼�
    // onChangeAfter:function(){
    //   alert('after');
    // }
}));

var ac = new BMap.Autocomplete(    //����һ���Զ���ɵĶ���
    {
        "input": "short-suggestId"
        , "location": map
    });
var ac2 = new BMap.Autocomplete(    //����һ���Զ���ɵĶ���
    {
        "input": "short-suggestId2"
        , "location": map
    });
ac.addEventListener("onhighlight", function (e) {  //�����������б��ϵ��¼�
    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});
ac2.addEventListener("onhighlight", function (e) {  //�����������б��ϵ��¼�
    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function (e) {    //����������б����¼�
    var _value = e.item.value;
    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace();
});

var myValue2;
ac2.addEventListener("onconfirm", function (e) {    //����������б����¼�
    var _value = e.item.value;
    myValue2 = _value.province + _value.city + _value.district + _value.street + _value.business;
    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue2;
    setPlace2();
});

function setPlace() {
    map.clearOverlays();    //�����ͼ�����и�����
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //��ȡ��һ�����������Ľ��
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //��ӱ�ע
    }

    var local = new BMap.LocalSearch(map, { //��������
        onSearchComplete: myFun
    });
    local.search(myValue);
}
function setPlace2() {
    map.clearOverlays();    //�����ͼ�����и�����
    function myFun() {
        var pp = local.getResults().getPoi(0).point;    //��ȡ��һ�����������Ľ��
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //��ӱ�ע
    }

    var local = new BMap.LocalSearch(map, { //��������
        onSearchComplete: myFun
    });
    local.search(myValue2);
}
