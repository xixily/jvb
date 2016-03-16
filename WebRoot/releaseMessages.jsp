<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
<base href="<%=basePath%>">
<title>聚玩吧拼车信息发布</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all">
<link href="css/style.css" rel="stylesheet" type="text/css" media="all"/>
<!--web-fonts-->
<link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
<!--js-->
<script src="js/jquery.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); }
</script>
<meta name="keywords" content="聚玩吧拼车是一个提供大家回家、旅游、上班等拼车网站，由于该系统初次开发，可能在各个方面做得都不是很足，希望使用者能在使用过程中遇到了什么不合适的地方，务必联系799123897@qq.com，我们将尽力去完善我们的系统" />
<!-- start-smoth-scrolling -->
<!-- 百度接口+密钥-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=vZcTBYRHstVPgGA2Kk4FbvbL"></script>
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
<script type="text/javascript" src="js/date/jedate.js"></script>
	<script type="text/javascript">
			jQuery(document).ready(function($) {
				$(".scroll").click(function(event){
					event.preventDefault();
					$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
				});
			});
	</script>
<!-- //end-smoth-scrolling -->
	<style type="text/css">
		.mes-input{
			width: 98%;
		}
		.mes-input .mrow{
			width: 66.7%;
			margin-bottom: 6px;
		}
		#l-map {
			height: 400px;
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
		.datep{ margin-bottom:40px;}
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
			<div class="clear"> </div>
			<div class="navg">
				<ul class="res">
					<li><a href="index.jsp">主页</a></li>
					<li><a href="shortDistance.jsp">短程拼车</a></li>
					<li><a href="longDistance.jsp">长途拼车</a></li>
					<li><a  class="active" href="releaseMessages.jsp">发布拼车信息</a></li>
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
				 <script>$( "span.menu").click(function() {
					 $(  "ul.res" ).slideToggle("slow", function() {
					 // Animation complete.
						 });
				 });
				 </script>
			</div>
		<div class="clearfix"> </div>
		</div>
	</div>
</div>
<!--heder end here-->
<!--contact start here-->
<div class="contact">
	<div class="container">

		<div class="contact-main">
			<h3>发布拼车信息！</h3>
		</div>
		<ul class="nav nav-tabs">
			<li role="presentation" class="active" onclick="$('.nav-tabs li').attr('class','...');$(this).attr('class','active');$('#m_title').text('短程拼车信息');"><a>短程拼车信息</a></li>
			<li role="presentation" onclick="$('.nav-tabs li').attr('class','...');$(this).attr('class','active');$('#m_title').text('长途拼车信息');"><a>长途拼车信息</a></li>
		</ul>
	</div>
</div>
<!--contact end here-->
<!--get touch start here-->
<div class="get" style="padding-top: 2px;">
	<div class="container">
		<div class="get-main">
			<div class="col-md-5 get-left">
				<h4>从地图上查找：</h4>
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
			<div class="col-md-7 get-right">
				<h3 id="m_title" style="text-align:center">短途途拼车信息</h3>
				<div class="mes-input">
					<div class="input-group">
						<span class="input-group-addon">
							<input type="radio" checked="true" name="userType" aria-label="..." value="passenger"><span style="margin-right:50px;">乘客</span>
							<input type="radio" name="userType" aria-label="..." value="driver" >车主
						</span>
					</div><!-- /input-group -->
					<p>起点：</p>
					<input class="mrow" type="text" value="输入起点..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
					<p>目的地：</p>
					<input class="mrow" type="text" value="输入目的地" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
					<p>出发时间：</p>
					<div>
						<p class="datep" style="display: none"><input class="datainp" id="indate" type="text" placeholder="只显示年月" value=""  readonly></p>
						<p class="datep"><input class="datainp" id="dateinfo" type="text" placeholder="请选择"  readonly></p>
					</div>
					<script type="text/javascript">
						//jeDate.skin('gray');
						jeDate({
							dateCell:"#indate",//isinitVal:true,
							format:"YYYY-MM",
							isTime:false, //isClear:false,
							minDate:"2015-10-19 00:00:00",
							maxDate:"2016-11-8 00:00:00"
						})
						jeDate({
							dateCell:"#dateinfo",
							format:"YYYY年MM月DD日 hh:mm:ss",
							isinitVal:true,
							isTime:true, //isClear:false,
							minDate:"2014-09-19 00:00:00",
							okfun:function(val){console.log(val)}
						})
					</script>
					<!--<input class="mrow" type="text" value="输入出发时间..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>-->
					<p>参加人数：</p>
					<input class="mrow" type="text" value="输入参加人数..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
					<p>可容纳人数：</p>
					<input class="mrow" type="text" value="输入可容纳人数..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
					<p>手机号码：</p>
					<input class="mrow" type="text" value="输入手机号码..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
					<div class="input-group">
						  <span class="input-group-addon">
							  <span style="text-align: left">汽车类型:</span>
							  <input type="radio" checked="true" name="carType" aria-label="..." value="jiaoChe" >轿车
							  <input type="radio" name="carType" aria-label="..." value="MPV" >MPV
							  <input type="radio" name="carType" aria-label="..." value="SUV" >SUV
							  <input type="radio" name="carType" aria-label="..." value="paoChe" >跑车
							  <input type="radio" name="carType" aria-label="..." value="keChe" >客车
							  <input type="radio" name="carType" aria-label="..." value="others" >其他
						  </span>
					</div><!-- /input-group -->
					<div class="input-group">
						  <span class="input-group-addon">
							  费用说明：<input type="radio" checked="true" name="feeType" aria-label="..." value="mianYi" onclick="$('#fee').css('display','none');$('#fee-tip').css('display','none')" >面议
							  <input type="radio" name="feeType" aria-label="..." value="yiKouJia" onclick="$('#fee').css('display','');$('#fee-tip').css('display','');" >一口价
							  <input id="fee" style="display: none" class="input-mini" type="number" min="0" name="fee" value="0" onkeyup="this.value=this.value.replace(/\D|\\./g,'')" onafterpaste="this.value=this.value.replace(/\D|\\./g,\'\')">
							  <span id="fee-tip" style="display: none">元/位</span>
					  </span>
					</div>
					<textarea class="form-control" rows="3"></textarea>
					<!-- <input type="text" class="form-control" placeholder="备注信息..."> -->
					<button type="button" class="btn btn-default btn-lg" style="margin-top: 12px;">
						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 发布
					</button>
					<!--<input type="submit" value="发布">-->
				</div>
			</div>
	</div>
</div>
<!--footer start here-->
<div class="footer">
	<div class="container">
		<div class="footer-main">
			<div class="footer-navg">
				<ul>
					<li><a href="index.jsp">主页</a></li>
					<li><a href="shortDistance.jsp">短程拼车</a></li>
					<li><a href="longDistance.jsp">长途拼车</a></li>
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
				<p>2016 &copy right by <a href="#"> dengxf@jxsd </a> </p>
			</div>
		<div class="clearfix"> </div>
		<script type="text/javascript">
			$(document).ready(function() {
			/*
			var defaults = {
				containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear'
				};
			*/
				$().UItoTop({ easingType: 'easeOutQuart' });
			});
		</script>
		<a href="#" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;"> </span></a>
		</div>
	</div>
</div>
<!--/footer end here-->
</body>
</html>
<script type="text/javascript" src="js/release_baidu.js" ></script>