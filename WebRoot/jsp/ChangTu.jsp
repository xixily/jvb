<%@ page language="java" import="java.util.*" pageEncoding="utf-8"
	contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>一起拼车吧</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="bootstrap-3.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="data:text/css;charset=utf-8," data-href="bootstrap-3.3.5/dist/css/bootstrap-theme.min.css" rel="stylesheet" id="bs-theme-stylesheet">
<link href="bootstrap-3.3.5/docs/assets/css/docs.min.css" rel="stylesheet">

<script src="bootstrap-3.3.5/js/vendor/jquery.min.js"></script>
<script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>

</head>

<!-- <body>
	<nav class="navbar navbar-default">
	<div class="container-fluid">
		Brand and toggle get grouped for better mobile display
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
				aria-expanded="false">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">一起拼车吧</a>
		</div>

		Collect the nav links, forms, and other content for toggling
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">长途拼车 <span class="sr-only">(current)</span></a></li>
				<li><a href="#">短程拼车</a></li>
				<li><a href="#">发布信息</a></li>
			</ul>
			<form class="navbar-form navbar-left" role="search" style="hidden:true">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
				</div>
				<button type="submit" class="btn btn-default">查找</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">注册/登陆</a></li>
				<li><a href="#">退出</a></li>
			</ul>
		</div>
		/.navbar-collapse
	</div>
	/.container-fluid </nav>
</body> -->

<body>

    <div class="container">
      <!--顶部页面 -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">一起拼车吧</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">长途拼车</a></li>
              <li><a href="#">短程拼车</a></li>
              <li><a href="#">发布拼车信息</a></li>
            <!--   <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li class="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li> -->
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <!--   <li class="active"><a href="./">Default <span class="sr-only">(current)</span></a></li> -->
              <li><a href="../navbar-static-top/">登陆/注册</a></li>
              <li><a href="../navbar-fixed-top/">AboutUs</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
      <!-- 查询框 -->
     	 <form class="form-inline">
		  <div class="form-group">
   			 <label for="exampleInputName2">出发地：</label>
   			 <input type="text" class="form-control" id="exampleInputName2" placeholder="南昌">
  		</div>
  		<div class="form-group">
  		  <label for="exampleInputEmail2">目的地：</label>
    		<input type="email" class="form-control" id="exampleInputEmail2" placeholder="北京">
 		 </div>
  		<div class="form-group">
  		  <label for="exampleInputEmail2">时间：</label>
    		<input type="email" class="form-control" id="exampleInputEmail2" placeholder="2015-03-01">
 		 </div>
  		<button type="submit" class="btn btn-default">查询</button>
		</form>
		
		<!--main.left地图  -->
		<div style="width:28%;float:left;margin-left:-10px;margin-top:10px;overflow:hidden;">
			<a href="#"><img src="images/ditu.png" alt="..." class="img-rounded"></a>
			<div style="width:98%;margin:0 auto; ">
			<ul class="list-group">
			  <li class="list-group-item">Cras justo odio</li>
			  <li class="list-group-item">Dapibus ac facilisis in</li>
			  <li class="list-group-item">Morbi leo risus</li>
			  <li class="list-group-item">Porta ac consectetur ac</li>
			  <li class="list-group-item">Vestibulum at eros</li>
			</ul>
			</div>
		</div>
		
		<!-- main.right面板 信息列表 -->
		<div style="width:70%;float:right">
			<!-- <div class="panel panel-default">
			<div class="panel-heading">Panel heading without title</div>
			<div class="panel-body">Panel content</div>
			</div> -->
			<div class="panel panel-default">
			<div class="panel-heading">
			<h3 class="panel-title">最新拼车信息</h3>
			</div>
			
			
			<div class="panel-body" role="navigation">
			
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">类型</a></li>
			  <li role="presentation"><a style="width:130px">出发日期</a></li>
			  <li role="presentation"><a style="width:70px">费用</a></li>
			  <li role="presentation"><a style="width:90px">车型</a></li>
			  <li role="presentation"><a style="width:90px">出发城市</a></li>
			  <li role="presentation"><a style="width:90px">目的城市</a></li>
			  <li role="presentation"><a style="width:110px">操作</a></li>
			</ul>
			
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
		 	 <ul class="nav nav-tabs">
			  <li role="presentation" ><a style="width:80px">轿车</a></li>
			  <li role="presentation"><a style="width:130px">10-30 早上</a></li>
			  <li role="presentation" ><a style="width:70px">150</a></li>
			  <li role="presentation"><a style="width:90px">轿车</a></li>
			  <li role="presentation"><a style="width:90px">成都</a></li>
			  <li role="presentation"><a style="width:90px">宜宾</a></li>
			  <li role="presentation"><a style="width:110px" href="#">申请加入</a></li>
			</ul>
			
			</div>
			</div>
			
			<div align="right">
			<nav>
  				<ul class="pagination">
    				<li>
     					 <a href="#" aria-label="Previous">
       					 <span aria-hidden="true">&laquo;</span>
      					</a>
   					 </li>
   					<li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
    				<li><a href="#">2</a></li>
    				<li><a href="#">3</a></li>
    				<li><a href="#">4</a></li>
    				<li><a href="#">5</a></li>
    				<li>
     				 <a href="#" aria-label="Next">
       					 <span aria-hidden="true">&raquo;</span>
      				</a>
    				</li>
  				</ul>
			</nav>
			</div>
			
		</div>
		<div style=" clear: both"></div>
		<!--<jsp:include page="Bottom.jsp" flush="true"></jsp:include> -->
		<div align="right">
		<span align="right" style="margin-right:-10px">© 2015-2016 <a href="#">一起拼车吧</a> &nbsp; 江西师范大学软件学院</span>
		</div>
   	  <!--   内容部分 
        <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
        <p>
          <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs »</a>
        </p> -->
        
      </div>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
 
  

</body>

</html>
