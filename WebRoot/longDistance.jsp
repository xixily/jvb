<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
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
                <a href="index.jsp"> <img src="images/logo.png" alt=""/> </a>
            </div>
            <span class="menu"> <img src="images/icon.png" alt=""/></span>

            <div class="clear"></div>
            <div class="navg">
                <ul class="res">
                    <li><a href="index.jsp">主页</a></li>
                    <li><a href="shortDistance.jsp">短程拼车</a></li>
                    <li><a class="active" href="longDistance.jsp">长途拼车</a></li>
                    <li><a href="releaseMessages.jsp">发布拼车信息</a></li>
                    <%
						if(session.getAttribute("user")==null){
					%>
					<li><a href="register.jsp">注册</a></li>
					<li><a href="login.jsp">登录</a></li>
					<%} else{ %>
					<li><a href="myInfomation.jsp">我的信息</a></li>
					<% } %>
                    <li><a href="contact.jsp">联系我们</a></li>
                </ul>
                	<div style="text-align: right;margin-top: 6px;">
					<span>${user.nickName}，欢迎您</span>
					</div>
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
                    <li><a href="index.jsp">主页</a></li>
                    <li><a href="shortDistance.jsp">短程拼车</a></li>
                    <li><a class="active" href="longDistance.jsp">长途拼车</a></li>
                    <li><a href="releaseMessages.jsp">发布拼车信息</a></li>
                    <%
						if(session.getAttribute("user")==null){
					%>
					<li><a href="register.jsp">注册</a></li>
					<li><a href="login.jsp">登录</a></li>
					<%} else{ %>
					<li><a href="myInfomation.jsp">我的信息</a></li>
					<% } %>
                    <li><a href="contact.jsp">联系我们</a></li>
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
<script type="text/javascript" src="js/long_baidu.js"></script>