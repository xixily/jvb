<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<title>聚玩吧</title>
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
<script type="text/javascript" src="js/login.js" charset="utf-8"></script>
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
					<li><a href="index.jsp">主页</a></li>
					<li><a href="shortDistance.jsp">短程拼车</a></li>
					<li><a href="longDistance.jsp">长途拼车</a></li>
					<li><a href="releaseMessages.jsp">发布拼车信息</a></li>
					<li><a href="register.jsp">注册</a></li>
					<li><a class="active" href="login.jsp">登录</a></li>
					<li><a href="contact.jsp">联系我们</a></li>
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
			<h3>登录</h3>
		</div>
	</div>
</div>
<!--contact end here-->
<!--get touch start here-->
<div class="get">
	<div class="container">
		<div class="row">
			<div class="col-md-4"></div>
			<div class="col-md-4">
				<form action="jsp/login.action">
					<div class="form-group">
						<label for="exampleInputEmail1">用户名：</label>
						<input name="user.userName" type="text" class="form-control" id="user" placeholder="以字母开头，例如a1234">
						<span class="userMessage"></span>
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">密码：</label>
						<input name="user.userPassword" type="password" class="form-control" id="password" placeholder="Password">
					</div>
					<input type="hidden" name="validateCode" value="test"/>
					<button type="submit" class="btn btn-default">登录</button>
				</form>
			</div>
			<div class="col-md-4"></div>
		</div>

	</div>
	
<!--footer start here-->
<div class="footer" style="margin-top:340px;">
	<div class="container">
		<div class="footer-main">
			<div class="footer-navg">
				<ul>
					<li><a href="index.jsp">主页</a></li>
					<li><a href="shortDistance.jsp">短程拼车</a></li>
					<li><a href="longDistance.jsp">长途拼车</a></li>
					<li><a href="releaseMessages.jsp">发布拼车信息</a></li>
					<li><a class="active" href="login.jsp">登录</a></li>
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