<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
<title>聚玩吧拼车主页</title>
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
				<a href="index.html"> <img src="images/logo.png" alt=""/> </a>
			</div>
			<span class="menu"> <img src="images/icon.png" alt=""/></span>
			<div class="clear"> </div>
			<div class="navg">
				<ul class="res">
					<li><a class="active" href="index.html">主页</a></li>
					<li><a href="shortDistance.html">短程拼车</a></li>
					<li><a href="longDistance.html">长途拼车</a></li>
					<li><a href="releaseMessages.html">发布拼车信息</a></li>
					<li><a href="register.html">注册</a></li>
					<li><a href="contact.html">联系我们</a></li>
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
<!--banner start here-->
<div class="banner">
	<div class="container">
		<div class="banner-main">
			<h1>欢迎来到聚玩吧拼车主页</h1>
			<p>聚玩吧拼车是一个提供大家回家、旅游、上班等拼车网站，由于该系统初次开发，可能在各个方面做得都不是很足，希望使用者能在使用过程中遇到了什么不合适的地方，务必联系799123897@qq.com，我们将尽力去完善我们的系统</p>
		 <div class="bwn">
			<a href="#"> 捐献我们>>> </a>
		</div>
		</div>
	</div>
</div>
<!--banner end here-->
<!--below banner start here-->
<div class="section1">
	   <div class="col-md-4 below-coloum">
	   	<a href="#"> </a>
	   </div>
	   <div class="col-md-3 below-grace">
	   </div>	
	   <div class="col-md-5 below-side">
			<h2><a href="#">捐献我们>>> </a></h2>
			<p>聚玩吧拼车可以用来查地图。</p>
	   </div>	
  <div class="clearfix"> </div>
</div>
<div class="section2">
	 <div class="col-md-7 below-left">
	 	  <div class="below-top">
	 		    <h2>新用户注册</h2>
	 		    <form>
	 		    	
		 			<input type="text" value="输入你的邮箱..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '输入你的邮箱...';}"/>
		 			<input type="submit" value="Subscribe">
	 		   </form>
	 		   <p>快来加入我们把！</p>
	 	  </div>
	 	  <div class="below-bottom">
	 	  </div>
	 		<div class="clearfix"> </div>
	 </div>
	 <div class="col-md-5 below-right">
	 	<div class="bg">
	 	 	 <span class="face"><img src="images/f.png" alt=""/> 
	 	 	<p> 聚玩吧可以用来聊天！</p></span>
	 	 </div>
	 </div>
	 <div class="clearfix"> </div>
</div>
<!--below banner end here-->
<!--news end here-->
<div class="news">
      <div class="container">
		    <div class="news-main">
				<div class="news-top">
					<h3>让我们一起...</h3>
				</div>
				<div class="news-bottom">
					<div class="col-md-4 new-left">
					<div class="notch-b">
						<small class="brown">18</small>
					</div>
					 <div class="notch-b-h"> </div>
						<h3>八月</h3>
						<h4>聚玩吧</h4>
						<p>聚玩吧还可以用来查询火车票正晚点。</p>
					 <div class="button-b">
					   	   <a href="#">MORE</a>
					 </div>
				     <div class="clearfix"> </div>
					</div>
					<div class="col-md-4 new-left">
						<div class="notch">
						    <small>22</small>
					    </div>
					     <div class="notch-h"> </div>
						<h3>九月</h3>
						<h4>聚玩吧</h4>
						<p>聚玩吧拼车给你规划合理的出行路线。</p>
					    <div class="button">
					   	   <a href="#">MORE</a>
					   </div>
				     <div class="clearfix"> </div>
					</div>
					<div class="col-md-4 new-left">
						<div class="notch">
						   <small>28</small>
					    </div>
					    <div class="notch-h"> </div>
						<h3>十月</h3>
						<h4>聚玩吧</h4>
						<p>聚玩吧拼车也可以帮你找到一群志同道合的驴友！</p>
					   <div class="button">
					   	   <a href="#">MORE</a>
					   </div>
					 <div class="clearfix"> </div>
				   </div>
				     <div class="clearfix"> </div>
				</div>
				<div class="clearfix"> </div>
		    </div>
	  </div>
</div>
<!--/news end here-->
<!--footer start here-->
<div class="footer">
	<div class="container">
		<div class="footer-main">
			<div class="footer-navg">
				<ul>
					<li><a class="active" href="index.html">主页</a></li>
					<li><a href="shortDistance.html">短程拼车</a></li>
					<li><a href="longDistance.html">长途拼车</a></li>
					<li><a href="releaseMessages.html">发布拼车信息</a></li>
					<li><a href="register.html">注册</a></li>
					<li><a  href="contact.html">联系我们</a></li>
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