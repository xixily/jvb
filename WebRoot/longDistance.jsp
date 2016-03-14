<!--Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/-->

<!DOCTYPE html>
<html>
<head>
    <title>聚玩吧长途拼车</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all">
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all"/>
    <!--web-fonts-->
    <link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
    <!--js-->
    <script src="js/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="application/x-javascript"> addEventListener("load", function () {
        setTimeout(hideURLbar, 0);
    }, false);
    function hideURLbar() {
        window.scrollTo(0, 1);
    }
    </script>
    <meta name="keywords"
          content="My Charity Responsive web template, Bootstrap Web Templates, Flat Web Templates, AndriodCompatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design"/>
    <!-- start-smoth-scrolling -->
    <!-- 百度接口+密钥-->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=vZcTBYRHstVPgGA2Kk4FbvbL"></script>
    <script type="text/javascript" src="js/move-top.js"></script>
    <script type="text/javascript" src="js/easing.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            $(".scroll").click(function (event) {
                event.preventDefault();
                $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
            });
        });
    </script>
    <style type="text/css">
        #l-map {
            height: 450px;
            width: 98%;
        }

        #r-result {
            width: 100%;
            margin: 6px 0;
        }

        #r-result1 {
            width: 100%;
            height: 200px;
            overflow: auto;
        }
    </style>
</head>
<body>
<!--header start here-->
<div class="mothergrid">
    <div class="container">
        <div class="header">
            <div class="logo">
                <a href="index.html"> <img src="images/logo.png" alt=""/> </a>
            </div>
            <span class="menu"> <img src="images/icon.png" alt=""/></span>

            <div class="clear"></div>
            <div class="navg">
                <ul class="res">
                    <li><a href="index.html">主页</a></li>
                    <li><a href="shortDistance.html">短程拼车</a></li>
                    <li><a class="active" href="longDistance.html">长途拼车</a></li>
                    <li><a href="releaseMessages.html">发布拼车信息</a></li>
                    <!--<li><a href="about.html">关于我们</a></li>-->
                    <!--<li><a href="projects.html">项目</a></li>-->
                    <!--<li><a href="blog.html">博客</a></li>-->
                    <!--<li><a href="events.html">事件</a></li>-->
                    <!--<li><a href="gallery.html">画廊</a></li>-->
                    <li><a href="register.html">注册</a></li>
                    <li><a href="contact.html">联系我们</a></li>
                </ul>
                <script>
                    $("span.menu").click(function () {
                        $("ul.res").slideToggle("slow", function () {
                            // Animation complete.
                        });
                    });
                </script>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<div class="blog">
    <div class="container">
        <div class="blog-main">
            <div class="blog-top">
                <!--<h3> 长途拼车</h3>-->
            </div>
            <div class="col-md-5 get-left">
                <span style="display: block;font-size: 24px;color: #9B242D">&nbsp;</span>
                <div id="l-map"></div>
                <div id="r-result">
                    <!--请输入要查询的城市:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /><br/>-->
                    起点：&nbsp;&nbsp;&nbsp; <input type="text" value="输入起点.." id="short-suggestId"><br>
                    目的地：<input type="text" value="输入目的地.." id="short-suggestId2">
                    <input id="short-find" type="submit" value="查找">
                </div>
                <div id="r-result1"></div>
                <div id="searchResultPanel"
                     style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                <div>
                    <span id="start-city" style="display: none"></span>
                    <span id="end-city" style="display: none"></span>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="col-md-7 blog-right" style="padding-left: 12px;">
                <span style="display: block;font-size: 24px;text-align: center;color: #9B242D">长途拼车信息</span>
                <ul class="blog-rig-list">
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">类型</td>
                                <td style="width:20%">出发日期</td>
                                <td style="width:10%">费用</td>
                                <td style="width:10%">车型</td>
                                <td style="width:20%">出发城市</td>
                                <td style="width:20%">目地城市</td>
                                <td style="width:10%"><a href="#">操作</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">车主</td>
                                <td style="width:20%">2016/01/02</td>
                                <td style="width:10%">20<span>元</span></td>
                                <td style="width:10%">轿车</td>
                                <td style="width:20%">草房</td>
                                <td style="width:20%">中关村</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">车主</td>
                                <td style="width:20%">2016/01/02</td>
                                <td style="width:10%">20<span>元</span></td>
                                <td style="width:10%">轿车</td>
                                <td style="width:20%">草房</td>
                                <td style="width:20%">中关村</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">车主</td>
                                <td style="width:20%">2016/01/02</td>
                                <td style="width:10%">20<span>元</span></td>
                                <td style="width:10%">轿车</td>
                                <td style="width:20%">草房</td>
                                <td style="width:20%">中关村</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">车主</td>
                                <td style="width:20%">2016/01/02</td>
                                <td style="width:10%">20<span>元</span></td>
                                <td style="width:10%">轿车</td>
                                <td style="width:20%">草房</td>
                                <td style="width:20%">中关村</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">车主</td>
                                <td style="width:20%">2016/01/02</td>
                                <td style="width:10%">20<span>元</span></td>
                                <td style="width:10%">车型</td>
                                <td style="width:20%">昌平</td>
                                <td style="width:20%">北京大学</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">类型</td>
                                <td style="width:20%">2016/03/08</td>
                                <td style="width:10%">30<span>元</span></td>
                                <td style="width:10%">SUV</td>
                                <td style="width:20%">四季青</td>
                                <td style="width:20%">东四</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">类型</td>
                                <td style="width:20%">2016/03/08</td>
                                <td style="width:10%">30<span>元</span></td>
                                <td style="width:10%">SUV</td>
                                <td style="width:20%">四季青</td>
                                <td style="width:20%">东四</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">类型</td>
                                <td style="width:20%">2016/03/08</td>
                                <td style="width:10%">30<span>元</span></td>
                                <td style="width:10%">SUV</td>
                                <td style="width:20%">四季青</td>
                                <td style="width:20%">东四</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <li>
                        <table style="width:98%;">
                            <tbody>
                            <tr>
                                <td style="width:10%">类型</td>
                                <td style="width:20%">2016/03/08</td>
                                <td style="width:10%">30<span>元</span></td>
                                <td style="width:10%">SUV</td>
                                <td style="width:20%">四季青</td>
                                <td style="width:20%">东四</td>
                                <td style="width:10%"><a href="#">申请</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </li>
                    <!--<li><a href="#">CATEGORY 2</a></li>-->
                    <!--<li><a href="#">CATEGORY 3</a></li>-->
                    <!--<li><a href="#">CATEGORY 4</a></li>-->
                    <!--<li><a href="#">CATEGORY 5</a></li>-->
                    <li>拼车信息查询，查询</li>
                </ul>

                <div class="pag-nations" style="margin-top: 15px;margin-left: 12px;">
                    <ul class="p_n-list">
                        <li><a href="#">Prev</a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <!--<li><a href="#">6</a></li>-->
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!--blog end here-->
<!--footer start here-->
<div class="footer">
    <div class="container">
        <div class="footer-main">
            <div class="footer-navg">
                <ul>
                    <li><a href="index.html">主页</a></li>
                    <li><a href="shortDistance.html">短程拼车</a></li>
                    <li><a class="active" href="longDistance.html">长途拼车</a></li>
                    <li><a href="releaseMessages.html">发布拼车信息</a></li>
                    <!--<li><a href="about.html">关于我们</a></li>-->
                    <!--<li><a href="projects.html">项目</a></li>-->
                    <!--<li><a href="blog.html">博客</a></li>-->
                    <!--<li><a href="events.html">事件</a></li>-->
                    <!--<li><a href="gallery.html">画廊</a></li>-->
                    <li><a href="register.html">注册</a></li>
                    <li><a href="contact.html">联系我们</a></li>
                </ul>
            </div>
            <div class="footer-bottom">
                <p>2016 &copy right by <a href="#"> dengxf@jxsd </a></p>
            </div>
            <div class="clearfix"></div>
            <script type="text/javascript">
                $(document).ready(function () {
                    /*
                     var defaults = {
                     containerID: 'toTop', // fading element id
                     containerHoverID: 'toTopHover', // fading element hover id
                     scrollSpeed: 1200,
                     easingType: 'linear'
                     };
                     */

                    $().UItoTop({easingType: 'easeOutQuart'});

                });
            </script>
            <a href="#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>
        </div>
    </div>
</div>
<!--/footer end here-->
</body>
</html>
<script type="text/javascript">
    // 百度地图API功能
    function G(id) {
        return document.getElementById(id);
    }

    var map = new BMap.Map("l-map");
    map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。
    map.enableScrollWheelZoom();

    var transit = new BMap.DrivingRoute(map, {
        renderOptions: {
            map: map,
            panel: "r-result1",
            enableDragging: true //起终点可进行拖拽
        },
    });
    transit.search("西单", "魏公村");


    var size = new BMap.Size(10, 20);//设置城市切换
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
    }));

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "short-suggestId"
                , "location": map
            });
    var ac2 = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "short-suggestId2"
                , "location": map
            });
    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
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
    ac2.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
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
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();
    });

    var myValue2;
    ac2.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue2 = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue2;
        setPlace2();
    });

    function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
    function setPlace2() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue2);
    }
    G("short-suggestId2").addEventListener("blur", function (e) {
        var start = G("short-suggestId").value;
        var end = G("short-suggestId2").value;
        if (start && end) {
            transit.search(start, end);
        } else {
            console.log("false...")
            console.log("start" + start);
            console.log("end" + end);
        }
    })
</script>