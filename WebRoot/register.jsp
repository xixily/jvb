<!--Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/-->

<!DOCTYPE html>
<html>
<head>
<title>My Charity A Charity  category Flat bootstrap Responsive  Website Template| Contact :: w3layouts</title>
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
					<li><a href="index.html">主页</a></li>
					<li><a href="shortDistance.html">短程拼车</a></li>
					<li><a href="longDistance.html">长途拼车</a></li>
					<li><a href="releaseMessages.html">发布拼车信息</a></li>
					<!--<li><a href="about.html">关于我们</a></li>-->
					<!--<li><a href="projects.html">项目</a></li>-->
					<!--<li><a href="blog.html">博客</a></li>-->
					<!--<li><a href="events.html">事件</a></li>-->
					<!--<li><a href="gallery.html">画廊</a></li>-->
					<li><a  class="active" href="register.html">注册</a></li>
					<li><a href="contact.html">联系我们</a></li>
				</ul>
				 <script>
					 $(document).ready(function(){
						 var sub = false;
						 $("button").click(function(){
							 if(sub){
								 $.ajax({
									 type: "GET",
									 url: sendUrl,
									 async: true,
									 data: command,
									 timeout: 30000,
									 dataType: "jsonp",
									 jsonp: "callback",
									 success: function (data, status) {
										 if (typeof callback == "function") {
											 callback(data);
										 }
										 if (data && !data.Succeed && data.SessionTimeout == 1) {
											 alert("会话已经失效，请您重新登录");
											 window.location.href = "./";
											 return;
										 }
									 },
									 error: function (xhr, status, error) {
										 if (errorCallback && (typeof errorCallback == "function")) {
											 errorCallback(xhr, status, error);
										 } else {
											 if (xhr.statusText != 'success') {
												 $().toastmessage('showErrorToast', '请求超时或网络问题,' + status || error);
											 }
										 }
									 }
								 });
							 }else{
								 alert("请检查您输入的信息！");
								return;
							 }

//							 if(/^[a-zA-Z]\d+$/.test($("#user").val())){
//								 $(".userMessage").text("y").css("color","green");
//							 }else{
//								 console.log("请正确输入的用户名格式：字母+数字（a123）");
//							 }
//							 if($("#password").val() === $("#checkedPassword").val()){
//								 $(".passwordMessage").text("密码正确").css("color","green");
//							 }else{
//								 $(".passwordMessage").text("两次输入密码不同，请重新输入！").css("color","red");
//							 }
						 })
						 $("#user").blur(function(){
							 console.log($("#user").val());
							 $(".userMessage").text("");
							 if(/^[a-zA-Z]\d+$/.test($("#user").val())){
								 $.ajax()
								 $(".userMessage").text("用户名可用！").css("color","green");
							 }else{
								 $(".userMessage").text("请正确输入的用户名格式：字母+数字（a123）").css("color","red");
							 }
						 })
						 $("#checkedPassword").blur(function(){
									 $(".passwordMessage").text();
									 if($("#password").val() === $("#checkedPassword").val()){
										 $(".passwordMessage").text("密码正确").css("color","green");
									 }else{
										 $(".passwordMessage").text("两次输入密码不一致，请重新输入！").css("color","red");
									 }
								 }
						 )
						 $("#exampleInputEmail1").blur(function(){
							 if($(this).val()===''){
								 $('.mailMessage').text("");
								 return;
							 }
							 if( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())){
								 $('.mailMessage').text("邮箱正确").css("color","green");
							 }else{
								 $('.mailMessage').text("请检查您的邮箱格式!").css("color","red");
							 }
						 })


					 $( "span.menu").click(function() {
						 $(  "ul.res" ).slideToggle("slow", function() {
						 // Animation complete.
							 });
					 });
					 })
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


			  <!--<h3>输入你的信息：</h3>-->
			  <!--<div class="col-md-4 get-left">-->
			  	 <!--<p>用户名：</p>-->
			  	 <!--<input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>-->
			  	 <!--<p>密码：</p>-->
			  	 <!--<input type="password" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>-->
			  	 <!--<p>再次输入密码：</p>-->
			  	 <!--<input type="password" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>-->
			  	 <!--<p>邮箱：</p>-->
			  	 <!--<input type="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/>-->
			  	 <!--<input type="submit" value="Send">-->
			  <!--</div>-->
			  <!--<div class="col-md-6 get-right">-->
			  	<!--<h4>Message</h4>-->
			  	<!--<textarea   onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"/> </textarea>-->
			  	<!--<h3>Contact us</h3>-->
					<!--<p>Address : Richard McClintock</p>-->
					<!--<p>New Street : Letraset sheets</p>-->
					<!--<p>ph : 0000-0000-000</p>	-->
		 	  <!--</div>-->
		 	<!--<div class="clearfix"> </div>	-->
		</div>
	</div>
</div>
<!--<div class="map">-->
	<!--<div class="container">-->
		 <!--<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387144.007583421!2d-73.97800349999999!3d40.7056308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1415253431785"  frameborder="0" style="border:0"></iframe>-->
	<!--</div>-->
<!--</div>-->
<!--get touch end here-->
<!--footer start here-->
<div class="footer">
	<div class="container">
		<div class="footer-main">
			<div class="footer-navg">
				<ul>
					<li><a href="index.html">主页</a></li>
					<li><a href="shortDistance.html">短程拼车</a></li>
					<li><a href="longDistance.html">长途拼车</a></li>
					<li><a href="releaseMessages.html">发布拼车信息</a></li>
					<!--<li><a href="about.html">关于我们</a></li>-->
					<!--<li><a href="projects.html">项目</a></li>-->
					<!--<li><a href="blog.html">博客</a></li>-->
					<!--<li><a href="events.html">事件</a></li>-->
					<!--<li><a href="gallery.html">画廊</a></li>-->
					<li><a class="active" href="register.html">注册</a></li>
					<li><a href="contact.html">联系我们</a></li>
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