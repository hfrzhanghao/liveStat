<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>红云直播数据统计系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="css/bootstrap-datetimepicker.css" rel="stylesheet">
<link href="css/count.css" rel="stylesheet" type="text/css" />
<link href="css/jquery.mloading.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="images/logo.ico" type="image/x-icon">

<script src="js/jquery-2.1.1.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/count.js" type="text/javascript"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="Highcharts-4.0.3/js/highcharts.js"></script>
<script type="text/javascript"
	src="Highcharts-4.0.3/js/modules/exporting.js"></script>
<script type="text/javascript" src="js/jquery.mloading.js"></script>
<script type="text/javascript">
	function creatprovince(province) {
		var provinces = new Array("北京", "上海", "重庆", "安徽", "福建", "甘肃", "广东",
				"广西", "贵州", "海南", "河北", "黑龙江", "河南", "香港", "湖北", "湖南", "江苏",
				"江西", "吉林", "辽宁", "澳门", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西",
				"四川", "台湾", "天津", "新疆", "西藏", "云南", "浙江");
		document.getElementById("domain").options[0] = new Option("全部", "");
		for ( var i = 0; i < provinces.length; i++) {
			document.getElementById("domain").options[i + 1] = new Option(
					provinces[i], provinces[i]);
			if (document.getElementById("domain").options[i + 1].value == province) {
				document.getElementById("domain").selectedIndex = i + 1;
			}
		}
	}
	function creatisp(isp) {
		var isps = new Array("移动", "联通", "电信");
		document.getElementById("isp").options[0] = new Option("全部", "");
		document.getElementById("isp").options[1] = new Option("其他", "else");
		for ( var i = 0; i < isps.length; i++) {
			document.getElementById("isp").options[i + 2] = new Option(isps[i],
					isps[i]);
			if (document.getElementById("isp").options[i + 2].value == isp) {
				document.getElementById("isp").selectedIndex = i + 2;
			}
		}
	}
	function creatOpenType(openType) {
		var openTypes = new Array("wechat", "weibo", "browser", "app");
		document.getElementById("openType").options[0] = new Option("全部", "");
		for ( var i = 0; i < openTypes.length; i++) {
			document.getElementById("openType").options[i + 1] = new Option(
					openTypes[i], openTypes[i]);
			if (document.getElementById("openType").options[i + 1].value == openType) {
				document.getElementById("openType").selectedIndex = i + 1;
			}
		}
	}
</script>

</head>

<body>
	<div id="element"></div>
	<header class="page-header">
	<h1 class="col-md-offset-1">
		红云直播数据统计系统 <small>v1.0.2_20170424</small>
	</h1>
	</header>

	<div class="panel panel-default col-md-12">
		<div class="form-group col-md-2">
			<label for="startTime">开始时间</label> <input type="text"
				class="form-control time-picker" id="startTime"
				placeholder="请输入查询开始时间">
		</div>
		<div class="form-group col-md-2">
			<label for="endTime">结束时间</label> <input type="text"
				class="form-control time-picker" id="endTime"
				placeholder="请输入查询结束时间">
		</div>
		<div class="form-group col-md-4">
			<label for="aboutURL">内容id</label> <input type="text"
				class="form-control" id="aboutURL" placeholder="内容id（多个请以英文逗号分隔）">
		</div>
		<div class="form-group col-md-1">
			<label for="domain">省份</label> <select class="form-control"
				id="domain">
				<SCRIPT>
					creatprovince();
				</SCRIPT>
			</select>
		</div>
		<div class="form-group col-md-1">
			<label for="isp">运营商</label> <select class="form-control" id="isp">
				<SCRIPT>
					creatisp();
				</SCRIPT>
			</select>
		</div>
		<div class="form-group col-md-1">
			<label for="openType">来源</label> <select class="form-control"
				id="openType">
				<SCRIPT>
					creatOpenType();
				</SCRIPT>
			</select>
		</div>
		<div class="form-group col-md-1">
			<label for="userName">用户名</label> <input type="text"
				class="form-control" id="userName" placeholder="用户名">
		</div>
		<div class="form-group col-md-1">
			<label for="durationSelect">播放时长</label> <select class="form-control"
				id="durationSelect">
				<option value="gt">大于</option>
				<option value="lt">小于</option>
				<option value="eq">等于</option>
			</select>
		</div>
		<div class="form-group col-md-1">
			<label for="duration">&nbsp;</label>
			<div class="input-group">
				<input type="text" class="form-control" id="duration"> <span
					class="input-group-addon">s</span>
			</div>

		</div>
		<div class="form-group col-md-1">
			<label for="firstPicDurationSelect">出画面时长</label> <select
				class="form-control" id="firstPicDurationSelect">
				<option value="gt">大于</option>
				<option value="lt">小于</option>
				<option value="eq">等于</option>
			</select>
		</div>
		<div class="form-group col-md-1">
			<label for="firstPicDuration">&nbsp;</label>
			<div class="input-group">
				<input type="text" class="form-control" id="firstPicDuration">
				<span class="input-group-addon">ms</span>
			</div>

		</div>

		<div class="form-group col-md-4">
			<label for="aboutBusinessID">微频道</label> <input type="text"
				class="form-control" id="aboutBusinessID" placeholder="微频道">
		</div>
		
		<div class="form-group col-md-3">
			<label for="domainNameFilter">域名</label> <input type="text"
				class="form-control" id="domainNameFilter" placeholder="域名">
		</div>

		<div class="form-group col-md-1">
			<label for="search">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
			<button type="submit" id="search" class="btn btn-info">&nbsp;&nbsp;查询&nbsp;&nbsp;</button>
		</div>
	</div>


	<ul class="nav nav-tabs">
		<li class="active"><a href="#first" data-toggle="tab">区域分布</a>
		</li>
		<li><a href="#second" data-toggle="tab">操作系统分布</a>
		</li>
		<li><a href="#third" data-toggle="tab">播放时长</a>
		</li>
		<li><a href="#forth" data-toggle="tab">卡顿次数</a>
		</li>
		<li><a href="#fifth" data-toggle="tab">出画面时间</a>
		</li>
		<li><a href="#sixth" data-toggle="tab">移动终端型号</a>
		</li>
		<li><a href="#seventh" data-toggle="tab">移动终端操作系统版本</a>
		</li>
		<li><a href="#eighth" data-toggle="tab">SDK使用量</a>
		</li>
		<li><a href="#ninth" data-toggle="tab">浏览器类型</a>
		</li>
		<li><a href="#tenth" data-toggle="tab">用户进入/离开/在线情况</a>
		</li>
		<li><a href="#eleventh" data-toggle="tab">流量曲线</a>
		</li>
		<li><a href="#twelveth" data-toggle="tab">打开方式</a>
		</li>
	</ul>

	<div class="tab-content">
		<div id="first" class="tab-pane active">
			<!-- 地区分布-->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">地区分布表</h3>
					</div>
					<div id="province_Content"></div>
					<div id="province_tip" class="well">
						注：省、市、自治区和特别行政区均根据用户IP地址查阅纯真IP地址库得出。
						notComplete指该时间段内获取的数据不完整，导致读取不到地区信息。</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">地区分布占比</h3>
					</div>
					<div id="province_container" class="pie-gragh">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>
		</div>

		<div id="second" class="tab-pane">
			<!-- 操作系统分布-->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">操作系统分布表</h3>
					</div>
					<div id="osType_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="deviceType_tip"  class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到操作系统信息。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">操作系统占比</h3>
					</div>
					<div id="osType_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>
		</div>

		<div id="third" class="tab-pane">
			<!-- 播放时长-->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">播放时长分布表</h3>
					</div>
					<div id="duration_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="duration_tip">
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">播放时长占比</h3>
					</div>
					<div id="duration_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>
			<div class="panel panel-default col-md-12">
				<div>
					<input type=button id=showTopNUser value="播放时长Top用户列表"
						class="btn btn-info" />&nbsp;&nbsp;("-1"表示没有汇报)
				</div>
				<div id="duration_user">
					<%--<h1>查询内容显示在此</h1>--%>
				</div>
			</div>
		</div>
		<div id="forth" class="tab-pane">
			<!-- 卡顿次数-->
			<!-- <div class="hightitle">卡顿次数</div> -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">卡顿次数分布表</h3>
					</div>
					<div id="lock_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="lock_tip" class="well">
						注：<br />
						<br /> 此处的卡顿次数为用户观看一次直播的总卡顿次数。<br />
						计算平均卡顿次数时，将该时间段内卡顿次数相加，除以播放次数。<br />
						此处将播放失败次数和卡顿次数分别统计，是假定一次播放过程中，播放失败与卡顿次数不冲突，例如用户拖动造成播放失败，但此前可能也上报了卡顿次数。
						<br />绘制的饼图不包含播放失败情况，只统计卡顿情况。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">卡顿次数占比</h3>
					</div>
					<div id="lock_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>

			<div class="panel panel-default col-md-12">
				可以点击饼图中的某块区域查看具体用户,"-1"表示没有汇报<br />
				<div id="lock_user">
					<%--<h1>查询内容显示在此</h1>--%>
				</div>
			</div>
		</div>

		<div id="fifth" class="tab-pane">
			<!-- 出画面时间 -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">出画面时间分布表</h3>
					</div>
					<div id="pic_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="pic_tip" class="well">
						注：<br /> <br /> 一次播放过程可能有多次拖动，所以一次播放会上报多条出画面时间数据。<br />
						计算平均出画面时间时，将所有出画面时间相加，除以上报次数，而不是播放次数。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">出画面时间占比</h3>
					</div>
					<div id="pic_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>
			<div class="panel panel-default col-md-12">
				可以点击饼图中的某块区域查看具体用户,"-1"表示没有汇报<br />
				<div id="first_pic_duration_user">
					<%--<h1>查询内容显示在此</h1>--%>
				</div>
			</div>
		</div>

		<div id="sixth" class="tab-pane">
			<!-- 移动终端型号 -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">移动终端型号分布表</h3>
					</div>
					<div id="deviceName_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="deviceName_tip" class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到终端信息。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">移动终端型号占比</h3>
					</div>
					<div id="deviceName_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>
		</div>

		<div id="seventh" class="tab-pane">
			<!-- 移动终端操作系统版本 -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">移动终端操作系统版本分布表</h3>
					</div>
					&nbsp;&nbsp;
					<%--<h1>针对操作系统的过滤条件</h1>--%>
					<div class="panel panel-default" id="os-select">
						<input type="button" id="all" value="ALL" class='btn btn-info'
							onclick="fill_os(this.value)" /> <input type="button"
							id="Android" value="Android" class='btn btn-default'
							onclick="fill_os(this.value)" /> <input type="button" id="iOS"
							value="iOS" class='btn btn-default' onclick="fill_os(this.value)" />
						<input type="button" id="Windows" value="Windows"
							class='btn btn-default' onclick="fill_os(this.value)" /> <input
							type="button" id="Mac" value="Mac" class='btn btn-default'
							onclick="fill_os(this.value)" /> <input type="hidden"
							id="os_hide" value="" />
					</div>

					<div id="os_Content">
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
					<div id="os_tip" class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到终端操作系统信息。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">移动终端操作系统版本占比</h3>
					</div>
					<div id="os_container" class=pie-gragh>
						<%--<h1>查询内容显示在此</h1>--%>
					</div>
				</div>
			</div>

		</div>

		<div id="eighth" class="tab-pane">
			<!-- SDK -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">SDK使用量分布表</h3>
					</div>
					<div id="sdk_Content"></div>
					<div id="sdk_tip" class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到sdk信息。
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">SDK使用量占比</h3>
					</div>
					<div id="sdk_container" class=pie-gragh></div>
				</div>
			</div>
		</div>

		<div id="ninth" class="tab-pane">
			<!-- BrowserVersion -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">浏览器类型分布表</h3>
					</div>
					<div id="browser_Content"></div>
					<div id="browser_tip"class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到浏览器信息。</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">浏览器类型占比</h3>
					</div>
					<div id="browser_container" class=pie-gragh></div>
				</div>
			</div>
		</div>

		<div id="tenth" class="tab-pane">
			<!-- userComeLeave -->
			<div class="panel panel-default">
				<div id="userCL_container" class="curve-gragh"></div>
			</div>
			<!-- <div id="userCL_tip"></div> -->
		</div>
		
		<div id="eleventh" class="tab-pane" >
				
			<div class="panel panel-default" id="flow-select">
			
				<form class="form-inline">
    				<label for="flow">码率（MB）</label>
    				<input type="text" class="form-control" id="flow" placeholder="1">
  					<input type="button" class="btn btn-default" onclick="compute()" value="统计">
				</form>
			</div>
				
			<!-- flow -->
			<div class="panel panel-default">
				<div id="flow_container" class="curve-gragh"></div>
			</div>
			
		</div>

		<div id="twelveth" class="tab-pane">
			<!-- openType -->
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">打开方式分布表</h3>
					</div>
					<div id="openType_Content"></div>
					<div id="openType_tip"class="well">
						notComplete指该时间段内获取的数据不完整，导致读取不到打开方式。</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">打开方式占比</h3>
					</div>
					<div id="openType_container" class=pie-gragh></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
