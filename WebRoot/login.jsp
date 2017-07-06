<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>红云直播数据统计系统_登录</title>
	<link href="css/general.css" rel="stylesheet" type="text/css" />
	<link rel="shortcut icon" href="images/logo.ico" type="image/x-icon"/>
	<script src="js/jquery-1.8.2.min.js" type="text/javascript"></script>
	<script src="js/util.js?<%=new Date().getTime()%>" type="text/javascript"></script>
	<script src="js/login.js?<%=new Date().getTime()%>" type="text/javascript"></script>
</head>

<body style="background:url(images/bg.jpg);">
	<div id="loginFrame">
	  <div class="login">
	    <ul class="title">
	     <li>红云直播数据统计系统</li>
	    </ul>
	   <div class="midCont">
	      <input type="hidden" id="returnUrl" value="${param.returnUrl}"/>
	      <ul>
	       <li><input class="loginInput" id="username" type="text" value="admin" name="" /></li>
	       <li><input class="loginInput" id="userpwd" type="password" value="654654" name="" /></li>      
	      </ul>
	      <span style="display: none; color:#f00; width:404px; margin:0px auto; height:10px;text-align:center line-height:20px;" class="error_msg" id="error_msg" ></span>
	      <p><input type="button" id="btlogin" value="登录"/></p>
	   </div>
	   <img class="bottomImg" src="images/loginBottom.gif" />
	  </div>
	</div>
</body>
</html>	