<%@ page language="java" import="java.util.*,java.net.InetAddress"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>红云直播数据统计系统</title>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />

<link href="css/general.css" rel="stylesheet" type="text/css" />
<link href="css/count.css?<%=new Date().getTime()%>" rel="stylesheet"
	type="text/css" />
<link href="css/util.css?<%=new Date().getTime()%>" rel="stylesheet"
	type="text/css" />
<link href="css/log.css?<%=new Date().getTime()%>" rel="stylesheet"
	type="text/css" />
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

<script src="js/jquery-1.8.2.min.js" type="text/javascript"></script>
<script src="js/map.js" type="text/javascript"></script>
<script src="js/json2.js" type="text/javascript"></script>

<script type="text/javascript" src="Highcharts-4.0.3/js/highcharts.js"></script>
<script type="text/javascript"
	src="Highcharts-4.0.3/js/modules/exporting.js"></script>

<script src="js/util.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>
<script src="js/count.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>
<script src="js/viewModel.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>
<script src="js/SortTable.js" type="text/javascript"></script>

<!-- <script src="js/province.js" type="text/javascript"></script> -->

<!-- 字典表 -->
<script src="js/dictionary_tab.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>
<!-- 挂断原因字典表 -->
<script src="js/disconnectedReason_tab.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>
<!-- 日历插件 -->
<script src="My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>

<script
	src="js/callerdetail/diagnose_count.js?<%=new Date().getTime()%>"
	type="text/javascript"></script>

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
			document.getElementById("isp").options[i + 2] = new Option(
					isps[i], isps[i]);
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

<script type="text/javascript">
function fill_os(os){
	document.getElementById("os").value = os;
}
</script>


<!-- <script type="text/javascript" charset="utf-8">
	$(function() {
		var ti = "2015-05-24 09:52:06";
		ti = ti.replace(/\s/g, "-");
	});

	$(function() {
		//获取所有的查询框
		var tabContainers = $('div.tabs > .tab-content >div');
		//隐藏所有的查询框，初始时显示第一个查询框
		tabContainers.hide().filter(':first').show();

		$('div.tabs ul a').click(
				function() {
					//显示单个标签下的查询框
					$('.subbtn').removeClass('subbtn1');
					//单独标签显示时，宽度自适应
					$('#second > table,#third > table,#forth > table').removeClass('newTable');
					tabContainers.hide();//隐藏所有查询框
					tabContainers.filter(this.hash).show();//显示当前标签的查询框
					//将ul下所有标签的类名移除
					$('div.tabs ul a').removeClass('selected');
					//为当前点击的标签设置类名
					$(this).addClass('selected');
					return false;
				}).filter(':first').click();

		/*****************星号之间的部分逻辑复杂些，作用：点击“高级”按钮展开/合并时显示当前的单独查询框************************/
		var array = new Array();
		array[0] = "#first";
		array[1] = "#second";
		array[2] = "#third";
		array[3] = "#forth";

		var flag = 0;
		//var flag2 = 0;
		//单击“高级”按钮
		$('#highBut').click(
				function() {
					var num = 0;//num每次点击都要置零
					for ( var i = 0; i < array.length; i++) {
						if ($(array[i]).css('display') == 'block') {
							flag = i;//取得点击“高级”前哪一个标签处于显示状态
							//num++;//如果是在展开前判断，num肯定为1
						}
					}
					//if(num==1){
					//	flag2 = flag;
					//}
					$(array[flag]).hide();

					tabContainers.toggle();

					//当展开时，不显示单个查询标签的查询按钮
					if ($('.subbtn').hasClass('subbtn1')) {
						$('.subbtn').removeClass('subbtn1');
					} else {
						$('.subbtn').addClass('subbtn1');
					}

					//所有查询框div样式，点击高级前只显示一个，点击高级后显示所有
					//单独标签时，表格宽度定长，占据满屏
					//点击“高级”后，宽度根据内容自适应
					//因为第一个标签刚加载页面时就已经显示，所以只能用除了第一个标签以外的其它标签判断(不包括“高级”标签)
					if ($('#second > table').hasClass('newTable')) {
						$('#second > table,#third > table,#forth > table')
								.removeClass('newTable');
					} else {
						$('#second > table,#third > table,#forth > table')
								.addClass('newTable');
					}

					//复合查询的查询按钮事件及样式
					/*
					if($('.allSearchDiv').css('display')=='none'){
						$('.allSearchDiv').css({display:'block'});
					}else{
						$('.allSearchDiv').css({display:'none'});
					}
					 */
				});
	});
</script> -->
</head>
<body >
<div class="layer"></div>
<header class="page-header">
	<h1 class="col-md-offset-1">红云直播数据统计系统 <small>V1.0.2_20170419</small></h1>
</header>
<!-- <div class="page-header"><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;红云直播数据统计系统<small>&nbsp;V1.0.2_20170419</small></h1></div><br /><br /><br /> -->

<div>
	<!-- <center>
		<table width=100%>
			<tr>
				<td align="center" class = 'title'><br />
					<h1>
						<font style="color: RGB(51, 158, 53);">红云直播数据统计系统</font>
					</h1> <br />
				</td>
			</tr>
			<tr>
				<td> -->
					<div class="tabs">
						<div id="zero">
							<!-- 通用 -->
							<table id = "filter" class="box" width=100%>
								<tr>
									<td>&nbsp;&nbsp;开始时间：</td>
									<td><input type="text" class="Wdate" readonly="readonly"
										onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
										id="startTime" 
										value="1970-01-01 08:00:00" />
									</td>
									<td>&nbsp;&nbsp;结束时间：</td>
									<td><input type="text" class="Wdate" readonly="readonly"
										onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
										id="endTime" 
										value="1970-01-01 08:00:10" />
									</td>
									<td height=30px; >内容： <input type="text" id="aboutURL" value="多条以英文逗号隔开" 
									onfocus="if (value =='多条以英文逗号隔开'){value =''}" 
									onblur="if (value ==''){value='多条以英文逗号隔开'}" 
									class=text
									style="color:#999999;width:250px"/>
									</td>
									<td>
									&nbsp;&nbsp;省份： <select name="domain" id="domain">
       									<SCRIPT>creatprovince();</SCRIPT> 
									</select>
									</td>
									<td>
									&nbsp;&nbsp;运营商： <select name="isp" id="isp">
       									<SCRIPT>creatisp();</SCRIPT> 
									</select>
									</td>
									<!-- <td>&nbsp;&nbsp;播放类型：</td>
									<td>直播<input type="radio" name="playtyperadio" id="radioLive" value="1" checked/>
										点播<input type="radio" name="playtyperadio" id="radioDemand" value="3" />
										<input id="playType" type=hidden value="1"/>
									</td> -->
									<!-- <td class="subbtn" width=50px><input type="button"
										id="search" value="查询" class='button'/>
									</td> -->
									<td>播放器加载<input type="text" class=text id="totalCount" value="" readonly="readonly" style="width:40px"/>次
									</td>
									<!-- <td>&nbsp; <input type="radio" name="timeradio"
										id="radioFirst" value="30" />最近0.5小时 <input type="radio"
										name="timeradio" id="radioSecond" value="60" />最近1小时 <input
										type="radio" name="timeradio" id="radioThird" value="90" />最近1.5小时
										<input type="radio" name="timeradio" id="radioFourth"
										value="120" />最近2小时 <input type="radio" name="timeradio"
										id="radioFifth" value="10080" />一周以内 &nbsp;&nbsp;&nbsp;&nbsp;
									</td> -->
								</tr>
								<!-- <tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td style="color:red;">
										&nbsp;&nbsp;手动设置“开始时间”和“结束时间”，上方快捷按钮将失效，如需使用请重新点击</td>
								</tr> -->
							</table>
							<table id = "filter" class="box" width=100%>
								<tr>
									<td height=30px; >&nbsp;&nbsp;微频道： <input type="text" id="aboutBusinessID" value="" class=text
									style="color:#999999;width:250px"/>
									</td>
									<td>
									&nbsp;&nbsp;来源： <select name="openType" id="openType">
       									<SCRIPT>creatOpenType();</SCRIPT> 
									</select>
									</td>
									<td>
									&nbsp;&nbsp;用户名： <input type="text" id="userName" size="20" class=text />
									</td>
									<td>&nbsp;&nbsp;播放时长： <select id="durationSelect">
												<option value="gt">大于</option>
												<option value="lt">小于</option>
												<option value="eq">等于</option>
										</select> <input type="text" id="duration" size="20" class=text />(秒)
									</td>
									<td>&nbsp;&nbsp;出画面时长： <select id="firstPicDurationSelect">
											<option value="gt">大于</option>
											<option value="lt">小于</option>
											<option value="eq">等于</option>
										</select> <input type="text" id="firstPicDuration" size="20" class=text />(毫秒)
									</td>
									<td class="subbtn" width=50px><input type="button"
										id="search" value="查询" class='button'/>
									</td>
									
								</tr>
								
							</table>
						</div>
						
						<ul class="nav nav-tabs" id="navTab">
                			<li class="active"><a href="#first" data-toggle="tab">区域分布</a></li>
							<li><a href="#second" data-toggle="tab">操作系统分布</a></li>
							<li><a href="#third" data-toggle="tab">播放时长</a></li>
							<li><a href="#forth" data-toggle="tab">卡顿次数</a></li>
							<li><a href="#fifth" data-toggle="tab">出画面时间</a></li>
							<li><a href="#sixth" data-toggle="tab">移动终端型号</a></li>
							<li><a href="#seventh" data-toggle="tab">移动终端操作系统版本</a></li>
							<li><a href="#eighth" data-toggle="tab">SDK使用量</a></li>
							<li><a href="#ninth" data-toggle="tab">浏览器类型</a></li>
							<li><a href="#tenth" data-toggle="tab">用户进入/离开/在线情况</a></li>
							<li><a href="#twelveth" data-toggle="tab">打开方式</a></li>
            			</ul>

						<!-- <ul class="tabNavigation">
							<li><a href="#first">区域分布</a></li>
							<li><a href="#second">操作系统分布</a></li>
							<li><a href="#third">播放时长</a></li>
							<li><a href="#forth">卡顿次数</a></li>
							<li><a href="#fifth">出画面时间</a></li>
							<li><a href="#sixth">移动终端型号</a></li>
							<li><a href="#seventh">移动终端操作系统版本</a></li>
							<li><a href="#eighth">SDK使用量</a></li>
							<li><a href="#ninth">浏览器类型</a></li>
							<li><a href="#tenth">用户进入/离开/在线情况</a></li>
							<li><a href="#eleventh">在线用户曲线</a></li>
							<li><a href="#twelveth">打开方式</a></li>
							<li><a href="sixth">错误类型</a>
							</li>
						</ul> -->
						<div id="datastate" style='text-align: center;'></div>
						<div class="tab-content">
							
							<div id="first" class="tab-pane active">
								<!-- 地区分布-->
								<div class="box_table">
								<font style="font-size:16px;text-align: center;">地区分布表</font> <br />
								<div id="province_Content">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								<div id="province_tip">
									<br /> 注：省、市、自治区和特别行政区均根据用户IP地址查阅纯真IP地址库得出。
								</div>
								</div>
								
								<div class="box_gragh">
								<!-- <font style="font-size:16px;text-align: center;">地区分布图</font> <br /> -->
								<div id="province_container"  >
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
							</div>
							
							<div id="second" class="tab-pane">
								<!-- 操作系统分布-->
								<div class="box_table">
								<font style="font-size:16px;text-align: center;">操作系统分布表</font> <br />
								<div id="osType_Content">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								<div id="deviceType_tip">
									<!-- <br />  -->
								</div>
								</div>
								
								<div class="box_gragh">
								<!-- <font style="font-size:16px;text-align: center;">操作系统分布图</font> <br /> -->
								<div id="osType_container" class=gragh >
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
							</div>
							
							<div id="third" class="tab-pane">
								<!-- 播放时长-->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">播放时长分布表</font> <br />
									<div id="duration_Content">
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
									<div id="duration_tip">
									</div>
								</div>
								<div class="box_gragh">
									<div id="duration_container"  class=gragh>
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
								</div>	
								<div class="box_user_table">
								<div>
									<input type=button id=showTopNUser value="播放时长Top用户列表"/>&nbsp;&nbsp;("-1"表示没有汇报)
								</div>
								<div id="duration_user">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
							</div>
							<div id="forth" class="tab-pane">
								<!-- 卡顿次数-->
								<!-- <div class="hightitle">卡顿次数</div> -->
								
								<div class="box_table">
								<font style="font-size:16px;text-align: center;">卡顿次数分布表</font> <br />
								<div id="lock_Content">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								<div id="lock_tip">
									<br /> 注：<br /> 此处的卡顿次数为用户观看一次直播的总卡顿次数。<br />
									计算平均卡顿次数时，将该时间段内卡顿次数相加，除以播放次数。<br />
									此处将播放失败次数和卡顿次数分别统计，是假定一次播放过程中，播放失败与卡顿次数不冲突，例如用户拖动造成播放失败，但此前可能也上报了卡顿次数。
									<br />绘制的饼图不包含播放失败情况，只统计卡顿情况。
								</div>
								</div>
								
								<div class="box_gragh">
								<!-- <font style="font-size:16px;text-align: center;">卡顿次数分布图</font> <br /> -->
								<div id="lock_container" class=gragh>
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
								
								<div class="box_user_table" class="tab-pane">
								可以点击饼图中的某块区域查看具体用户,"-1"表示没有汇报<br />
								<div id="lock_user">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
							</div>
							
							<div id="fifth" class="tab-pane">
								<!-- 出画面时间 -->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">出画面时间分布表</font> <br />
									<div id="pic_Content">
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
									<div id="pic_tip">
										<br /> 注：<br />
										<br /> 一次播放过程可能有多次拖动，所以一次播放会上报多条出画面时间数据。<br />
										计算平均出画面时间时，将所有出画面时间相加，除以上报次数，而不是播放次数。
									</div>
								</div>
								<div class="box_gragh">
									<div id="pic_container"  class=gragh>
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
								</div>	
								<div class="box_user_table">
								可以点击饼图中的某块区域查看具体用户,"-1"表示没有汇报<br />
								<div id="first_pic_duration_user">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>
							</div>
							
							<div id="sixth" class="tab-pane">
								<!-- 移动终端型号 -->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">移动终端型号分布表</font> <br />
									<div id="deviceName_Content">
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
									<div id="deviceName_tip">
										<!-- <br />  -->
									</div>
								</div>
								
								<div class="box_gragh">
								<!-- <font style="font-size:16px;text-align: center;">移动终端型号分布图</font> <br /> -->
									<div id="deviceName_container"  class=gragh>
										<%--<h1>查询内容显示在此</h1>--%>
									</div>
								</div>								
							</div>
							
							<div id="seventh" class="tab-pane">
								<!-- 移动终端操作系统版本 -->
								<div class="box_table">
								<font style="font-size:16px;text-align: center;">移动终端操作系统版本分布表</font> &nbsp;&nbsp;
								<%--<h1>针对操作系统的过滤条件</h1>--%>
									<input type="button" id="all" value="ALL" class='subbutton' onclick="fill_os(this.value)" />
									<input type="button" id="Android" value="Android" class='subbutton' onclick="fill_os(this.value)"/>
									<input type="button" id="iOS" value="iOS" class='subbutton' onclick="fill_os(this.value)"/>
									<input type="button" id="Windows" value="Windows" class='subbutton' onclick="fill_os(this.value)"/>
									<input type="button" id="Mac" value="Mac" class='subbutton'  onclick="fill_os(this.value)"/>
									<input type="hidden" id="os_hide" value="" />
								<br /><br />
								<div id="os_Content">
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								<div id="os_tip">
									<!-- <br />  -->
								</div>
								</div>
								
								<div class="box_gragh">
								<!-- <font style="font-size:16px;text-align: center;">移动终端操作系统版本分布图</font> <br /> -->
								<div id="os_container" class=gragh >
									<%--<h1>查询内容显示在此</h1>--%>
								</div>
								</div>	
							
							</div>
							
							<div id="eighth" class="tab-pane">
								<!-- SDK -->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">SDK使用量分布表</font> <br />
									<div id="sdk_Content">
									</div>
									<div id="sdk_tip">
										<!-- <br />  -->
									</div>
								</div>
								
								<div class="box_gragh">
									<div id="sdk_container"  class=gragh>
									</div>
								</div>								
							</div>
							
							<div id="ninth" class="tab-pane">
								<!-- BrowserVersion -->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">浏览器类型分布表</font> <br />
									<div id="browser_Content">
									</div>
									<div id="browser_tip">
									</div>
								</div>
								
								<div class="box_gragh">
									<div id="browser_container"  class=gragh>
									</div>
								</div>								
							</div>
							
							<div id="tenth" class="tab-pane">
								<!-- userComeLeave -->
								<div class="box_gragh_full">
									<div id="userCL_container"  class=gragh_full>
									</div>
								</div>	
								<div id="userCL_tip">
								</div>							
							</div>
							
							<!-- <div id="eleventh">
								userOnline
								<div class="box_gragh_full">
									<div id="userOnline_container"  class=gragh_full>
									</div>
								</div>	
								<div id="userOnline_tip">
								</div>							
							</div> -->
							
							<div id="twelveth" class="tab-pane">
								<!-- openType -->
								<div class="box_table">
									<font style="font-size:16px;text-align: center;">打开方式分布表</font> <br />
									<div id="openType_Content">
									</div>
									<div id="openType_tip">
									</div>
								</div>
								
								<div class="box_gragh">
									<div id="openType_container"  class=gragh>
									</div>
								</div>								
							</div>
						</div>

					</div>
					
				<!-- </td>
			</tr>

		</table>
		<br />
		<div id="datastate">
		<font style="font-size:22px;text-align: center;">友情提示：为保证最佳页面效果，请使用Firefox(火狐浏览器)</font>
		<img style="width:39px;height:50px;" src="images/firefox.jpg"></img><br />
		<span style="font-family: cursive;">Copyright&nbsp;&copy;&nbsp;2016【Butel】&nbsp;Version:1.0.0.20161012_beta</span>

		<div
			style="line-height: 30px;background-color:silver;width:380px;font-variant:small-caps;">
			<a href="http://127.0.0.1:8080/live/count.jsp" target="_blank">【红云直播日志查询系统】</a>
		</div>
		</div>
	</center> -->
	</div>
	
</body>
</html>
