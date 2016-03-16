<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<title>注册聚玩吧拼车</title>
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
<meta name="keywords" content="My Charity Responsive web template, Bootstrap Web Templates, Flat Web Templates, AndriodCompatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<!-- start-smoth-scrolling -->
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
<script type="text/javascript" src="js/register.js"></script>
<!-- //end-smoth-scrolling -->
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
						<ul>
					<li><a href="index.jsp">主页</a></li>
					<li><a href="shortDistance.jsp">短程拼车</a></li>
					<li><a href="longDistance.jsp">长途拼车</a></li>
					<li><a href="releaseMessages.jsp">发布拼车信息</a></li>
					<li><a class="active" href="register.jsp">注册</a></li>
					<li><a href="login.jsp">登录</a></li>
					<li><a href="contact.jsp">联系我们</a></li>
				</ul>
				</ul>
				<div style="text-align: right;margin-top: 6px;">
					<span>${user.nickName}，欢迎您</span>
					</div>
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
			<h3>欢迎注册聚玩吧！</h3>
			<p>聚玩吧拼车是一个提供大家回家、旅游、上班等拼车网站，由于该系统初次开发，可能在各个方面做得都不是很足，希望使用者能在使用过程中遇到了什么不合适的地方，务必联系799123897@qq.com，我们将尽力去完善我们的系统</p>
		</div>
	</div>
</div>
<!--contact end here-->
<!--get touch start here-->
<div class="get">
	<div class="container center-block">
		<div class="get-main">
			<div class="col-md-8 get-main">
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">用户名：</label>
						<input type="email" class="form-control" id="user" placeholder="以字母开头，例如a1234">
						<span class="userMessage"></span>
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">密码：</label>
						<input type="password" class="form-control" id="password" placeholder="Password">
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">再次输入密码：</label>
						<input type="password" class="form-control" id="checkedPassword" placeholder="Password">
						<span class="passwordMessage"></span>
					</div>
					<div class="form-group">
						<label for="exampleInputEmail1">邮箱：</label>
						<input type="email" class="form-control" id="exampleInputEmail1" placeholder="电子邮箱，例如abc@163.com">
						<span class="mailMessage"></span>
					</div>
					<button type="submit" class="btn btn-default">注册</button>
				</form>
				</div>
		</div>
	</div>
</div>
<div class="map">
	<div class="container">
	</div>
</div>
<!--get touch end here-->
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
					<li><a class="active" href="register.jsp">注册</a></li>
					<li><a href="login.jsp">登录</a></li>
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