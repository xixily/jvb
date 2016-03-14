<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
<title>聚玩吧-联系我们</title>
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
	<script type="text/javascript">
			jQuery(document).ready(function($) {
				$(".scroll").click(function(event){		
					event.preventDefault();
					$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
				});
			});
	</script>
<!-- //end-smoth-scrolling -->
</head>
<body>
<!--header start here-->
<div class="mothergrid">
	<div class="container">
		<div class="header">
			<div class="logo">
				<a href="index.jsp"> <img src="images/logo1.png" alt=""/> </a>
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
					<li><a class="active" href="contact.jsp">联系我们</a></li>
				</ul>
				 <script>
			                                                      $( "span.menu").click(function() {
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
			<h3>联系我们</h3>
			<p>聚玩吧拼车是一个提供大家回家、旅游、上班等拼车网站，由于该系统初次开发，可能在各个方面做得都不是很足，希望使用者能在使用过程中遇到了什么不合适的地方，务必联系799123897@qq.com，我们将尽力去完善我们的系统</p>
		</div>
	</div>
</div>
<!--contact end here-->
<!--get touch start here-->
<div class="get">
	<div class="container">
		<div class="get-main">
			  <h3>与我们联系</h3>
			  <div class="col-md-6 get-left">
			  	 <p>姓名</p>
			  	 <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
			  	 <p>Email</p>
			  	 <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
			  	 <p>电话</p>
			  	 <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
			  	 <p>个人网站</p>
			  	 <input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>
			  	 <input type="submit" value="发送">
			  </div>
			  <div class="col-md-6 get-right">
			  	<h4>您要说的话：</h4>
			  	<textarea   onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/> </textarea>
			  	<h3>联系我们</h3>
					<p>地址 : 江西师范大学6#S412</p>
					<p>街道 : 江西省南昌市紫阳大道99号</p>
					<p>电话 : 177-4454-3034</p>
		 	  </div>
		 	<div class="clearfix"> </div>	
		</div>
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
					<li><a href="register.jsp">注册</a></li>
					<li><a class="active" href="contact.jsp">联系我们</a></li>
				</ul>
			</div>
			<div class="footer-top">
				<div class="col-md-4 footer-left">
					<h3>FOLLOW US</h3>
				<ul>
					<li><a href="#"><span class="a"> </span></a></li>
					<li><a href="#"><span class="b"> </span></a></li>
					<li><a href="#"><span class="c"> </span></a></li>
				</ul>
				</div>
				<div class="col-md-4 footer-middle">
					<h3>NEWS LETTER</h3>
					<input type="text" value="Enter your email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Enter your email';}"/>
					<input type="submit" value="Subscribe">
				</div>
				<div class="col-md-4 footer-right">
					<h3>Contact us</h3>
					<p>Address : Richard McClintock</p>
					<p>New Street : Letraset sheets</p>
					<p>ph : 5240-2948-600</p>
				</div>
			<div class="clearfix"> </div>
			</div>
			<div class="footer-bottom">
				<p>2014 &copy Template by <a href="http://w3layouts.com/"> W3layouts </a> </p>
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