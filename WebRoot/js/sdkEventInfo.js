/**
 * sdkEventInfo.jsp的JS文件
 */
 $(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#macuidEventInfoDiv > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.macuidEvent_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.macuidEvent_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		
					
		//点击“通话详情/客户端日志/主叫端”
		$("#clientlog_zb_li").click(function(){
			cursor_span_target = "cursor_span_zb";//游标要存在的位置
			cursor_info_target = "cursor_info_zb";//点击游标时，提示信息展示的位置
			sdkSummary_div_target = "sdkSummary_div_zb";//sdk概要信息展示的位置
			warning_div_target = "warning_div_zb";//警告信息展示的位置
			serverLog_div_target = "serverLog_div_zb";//服务器日志下载列表的展示位置
			sdkInfoList_div_target = "sdkInfoList_div_zb";//点击sdk概要信息某一部分，该部分对应的日志列表信息展示的位置
			//点击时执行，只执行一次
			if(!cursor_zb){
				var isCallCount = true;//是否需要返回每两个时间点之间的通话个数，默认是false(不返回)
				//用带游标的线展示启动、登录及每次登录的通话个数，在这里调用时，mac为空，故第一个参数为空，接口会通过视讯号进行反查
				if(logoutTimeSDK!="no"){//如果话务报告里不存在开始时间和通话时长，就无法为logoutTimeSDK赋值，此时就不触发事件
					console.info("macSdk_caller:"+macSdk_caller);
					lastStartToNowLoginPoint(macSdk_caller,uidSDK_zb,logoutTimeSDK,isCallCount);
				}
			}
			cursor_zb = true;
		});
		
		//点击“通话详情/客户端日志/被叫端”
		$("#clientlog_bz_li").click(function(){
			cursor_span_target = "cursor_span_bz";
			cursor_info_target = "cursor_info_bz";//点击游标时，提示信息展示的位置
			sdkSummary_div_target = "sdkSummary_div_bz";//sdk概要信息展示的位置
			warning_div_target = "warning_div_bz";//警告信息展示的位置
			serverLog_div_target = "serverLog_div_bz";//服务器日志下载列表的展示位置
			sdkInfoList_div_target = "sdkInfoList_div_bz";//点击sdk概要信息某一部分，该部分对应的日志列表信息展示的位置
			//点击时执行，只执行一次
			if(!cursor_bz){
				var isCallCount = true;//是否需要返回每两个时间点之间的通话个数，默认是false(不返回)
				//用带游标的线展示启动、登录及每次登录的通话个数，在这里调用时，mac为空，故第一个参数为空，接口会通过视讯号进行反查
				if(logoutTimeSDK!="no"){//如果话务报告里不存在开始时间和通话时长，就无法为logoutTimeSDK赋值，此时就不触发事件
					console.info("macSdk_called:"+macSdk_called);
					lastStartToNowLoginPoint(macSdk_called,uidSDK_bz,logoutTimeSDK,isCallCount);
				}
			}
			cursor_bz = true;
		});
	});
	
var startTimeSDK;//全局变量，每次移动游标都会变化
var logoutTimeSDK = "no";//全局变量，固定不变，登出时间
var macSDK;//全局变量，固定不变
var uidSDK;//全局变量，非话务查询页面的视讯号
var uidSDK_zb;//全局变量，主叫视讯号
var uidSDK_bz;//全局变量，被叫视讯号

var cursor_zb = false;//“通话详情/客户端日志/主叫端”是否被点击过
var cursor_bz = false;//“通话详情/客户端日志/被叫端”是否被点击过

var cursor_span_target;//游标要存在的位置，有三处，点不同的标签都在变化
var cursor_info_target;//点击游标时，提示信息展示的位置，有三处，点不同的标签都在变化
var sdkSummary_div_target;//sdk概要信息展示的位置，有三处，点不同的标签都在变化
var warning_div_target;//警告信息展示的位置，有三处，点不同的标签都在变化
var serverLog_div_target;//服务器日志下载列表的展示位置，有三处，点不同的标签都在变化
var sdkInfoList_div_target;//点击sdk概要信息某一部分，该部分对应的日志列表信息展示的位置，有三处，点不同的标签都在变化

/**
 * 获取该通话务的通话结束时间，返回的数据格式为2015-09-10 14:04:32 
 * @param {} data
 */
function getCallEndTime(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							var starttime = summary.starttime;
							var durationMills = summary.durationMills;
							if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
								//获取2015-09-10-14:04:14:054对应的毫秒值
								var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
								if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
									//使用通话开始时间加通话时长得到通话结束时间，作为登出时间
									logoutTimeSDK = longTimeToDate(startTimeMillisecond+durationMills);
								}
							}
						}
					}
				}
			}else{
				var called = data.called;
				if(called!=undefined&&called!=null&&called!==""){
					var call = called.call;
					if(call!=undefined&&call!=null&&call!==""){
						var total = call.total;
						if(total!=undefined&&total!=null&&total!==""){
							var summary = total.summary;
							if(summary!=undefined&&summary!=null&&summary!==""){
								var starttime = summary.starttime;
								var durationMills = summary.durationMills;
								if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
									//获取2015-09-10-14:04:14:054对应的毫秒值
									var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
									if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
										//使用通话开始时间加通话时长得到通话结束时间，作为登出时间
										logoutTimeSDK = longTimeToDate(startTimeMillisecond+durationMills);
									}
								}
							}
						}
					}
				}
			}
		}
	}
}


/**
 * 通话详情页面
 * 设置视讯号
 * 设置登出时间
 */
function obtainDurationMills(uid,flag){
	if(flag=="caller"){
		uidSDK_zb = uid;//设置主叫视讯号
	}
	if(flag=="called"){
		uidSDK_bz = uid;//设置被叫视讯号
	}
	
	//logoutTimeSDK = endtimes;//设置登出时间
}

/**
 * 非话务页面用，sdkEventInfo.jsp
 * 页面打开时即调用，获取游标信息
 * @param {} sdkmac 设备mac
 * @param {} uid 视讯号
 * @param {} logoutTime 登出时间
 * @param {} isCallCount 是否需要返回每两个时间点之间的通话个数，默认是false(不返回)
 */
function startNoCall(sdkmac,uid,logoutTime,isCallCount){
	cursor_span_target = "cursor_span";
	cursor_info_target = "cursor_info";//点击游标时，提示信息展示的位置
	sdkSummary_div_target = "sdkSummary_div";//sdk概要信息展示的位置
	warning_div_target = "warning_div";//警告信息展示的位置
	serverLog_div_target = "serverLog_div";//服务器日志下载列表的展示位置
	sdkInfoList_div_target = "sdkInfoList_div";//点击sdk概要信息某一部分，该部分对应的日志列表信息展示的位置
	lastStartToNowLoginPoint(sdkmac,uid,logoutTime,isCallCount);
}
		
/**
 * 用带游标的线展示启动、登录及每次登录的通话个数
 * @param {} sdkmac 视讯号登录设备的MAC
 * @param {} uid 视讯号
 * @param {} logoutTime 本次通话的登出时间
 * @param {} isCallCount 是否需要返回每两个时间点之间的通话个数，默认是false(不返回)
 */
function lastStartToNowLoginPoint(sdkmac,uid,logoutTime,isCallCount){
	//无论是哪一个部分执行，都会将其参数传到这个方法，所以在此为全局变量赋值，但是mac不能在这里赋值，因为在通话详情中是没有mac的,
	//mac需要通过uid反查，在返回的游标数据中，其全局变量macSDK在handlelastStartToNowLoginPoint方法中赋值
	uidSDK = uid;//设置全局变量，用在点击SDK概要信息某一部分后的展示
	logoutTimeSDK = logoutTime;//设置全局变量，保存登出时间
	$.ajax({
		type : "post",
		url : "nocall.lastStartToNowLoginPoint.action",
		dataType : "json",
		data : "sdkmac=" + sdkmac + 
				"&uid=" + uid +
				"&endTime="+logoutTime+//将登出时间赋值给endTime
				"&isCallCount="+isCallCount,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			console.info("游标信息："+JSON.stringify(data));
			//处理获取的数据
			handlelastStartToNowLoginPoint(data,sdkmac);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * 处理游标的数据
 * 数据格式为{"result":0,"data":{"point":[0,1436634332000,1436644332000,1436654332000,1436664332000,1436674332000],"count":[[0,2],[1,0],[2,0],[3,0],[4,0]]}}
 * @param {} datas
 */
function handlelastStartToNowLoginPoint(datas,sdkmac1){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var sdkmac;
			if(sdkmac1==undefined||sdkmac1==null||sdkmac1===""){//如果传输的sdkmac为空，则从接口返回的数据中获取sdkmac
				sdkmac = data.sdkmac;
			}else{//如果传输的sdkmac有值，则使用此值
				sdkmac = sdkmac1;
			}
			macSDK = sdkmac;//为全局变量设备mac赋值
			
			var point = data.point;
			if(point!=undefined&&point!=null&&point!==""&&(point instanceof Array)&&(point.length>1)){
				var pointSwf = $("#"+cursor_span_target);
				pointSwf.html("<div style='margin:5px;color:#5B5B5B;'>" +
						"第一个黑点为本视讯号所用设备的最近一次开机时间，最后一个黑点为本视讯号最近一次通话的登出时间，" +
						"中间的黑点为本视讯号在同一设备上处于第一个黑点和最后一个黑点之间的历次登录时间，白圈为其所处两个黑点之间的话务量。<br/>" +
						"从最近一次开机到"+logoutTimeSDK+"之间的登录及话务信息</div>");
				pointSwf.append("<embed src='js/point.swf' allowFullScreen='true' quality='high' width='1185' height='30' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' allowfullscreen: 'true', wmode:'opaque', flashVars='vars="+ JSON.stringify(data) +"'></embed>");
				
				var length = point.length;
				if(length>1){
					var startTime = point[length-2];
					var endTime = point[length-1];
					
					if(startTime===0){
						startTime = (endTime - 3600);
					}
					
					startTime = longTimeToDate(startTime);
					endTime = longTimeToDate(endTime);
					
					//页面刚加载时为全局变量设置值
					startTimeSDK = startTime;
					
					//页面初始加载时，展示默认加载的信息
					//展示SDK四部分的概要信息
	    			sdkInfoStatistics(startTime,endTime,sdkmac);
	    			//展示警告信息
	    			warningInfo(startTime,endTime,sdkmac);
				}
			}
		}
	}
}

/**
 * 点击游标上点，获取两个登录点之间的信息
 * 此方法属于swf文件内部自动调用
 * @param {} callNum
 * @param {} leftTime
 * @param {} rightTime
 */
function showPointInfo(callNum,leftTime,rightTime){
	var showdata = $("#"+cursor_info_target);
	var html = "";
	html += "【"+longTimeToDate(leftTime)+"-"+longTimeToDate(rightTime)+"】话务数量："+callNum;
	showdata.html(html);
}
	
/**
 * 拖动游标，获取某个登录点的时间
 * 此方法属于swf文件内部自动调用
 * @param {} time
 */
function showBlackInfo(time){
	var showdata = $("#"+cursor_info_target);
	var html = "";
	html += "读取【"+longTimeToDate(time)+"-"+logoutTimeSDK+"】的所有事件";
	showdata.html(html);
	
	//为全局变量设置值
	startTimeSDK = longTimeToDate(time);
	
	//拖动游标时，根据动态变化的开始时间参数，调用以下方法加载数据
	//每次拖动游标时，都是先清空日志列表的数据，当点击SDK几部分的概要信息中的一个时，再加载与之对应的日志列表
	$("#"+sdkInfoList_div_target).html("");
	//获取SDK四部分的概要信息
	sdkInfoStatistics(longTimeToDate(time),logoutTimeSDK,macSDK);
	
	//获取警告信息
	warningInfo(longTimeToDate(time),logoutTimeSDK,macSDK);
	
}

/**
 * 获取SDK四部分的概要信息
 * @param {} sdkStartTime
 * @param {} logoutTime
 * @param {} sdkmac
 */
function sdkInfoStatistics(startTime,endTime,sdkmac){
	$.ajax({
		type : "post",
		url : "nocall.sdkInfoStatistics.action",
		dataType : "json",
		data : "startTime=" + startTime + 
			   "&endTime=" + endTime +//将登出时间赋值给endTime
			   "&sdkmac=" + sdkmac,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			sdkInfoStatistics_view(data);
			console.info("SDK四部分的概要信息："+JSON.stringify(data));
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 在页面上展示SDK四部分的概要信息
 * 数据格式{"result":0,"data":{"count":{"relay":{"E":1},"rc":{"E":2,"W":1}}}}
 */
function sdkInfoStatistics_view(datas){
	var html = "";
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var count = data.count;
			if(count!=undefined&&count!=null&&count!==""){
				html += "<div class='sdkTitle' onclick=sdkInfoStatistics_click('')>客户端</div>";
				
				$.each(count,function(key){
					var keyData = count[key];
					if(keyData!=undefined&&keyData!=null&&keyData!==""){
						//随机数，防止ID重复
						var randNum = Math.random().toString().split(".")[1];
						
						html += "<div class='oneOfSDK' id='"+encodeURIComponent(key+"_"+randNum)+"' onclick=sdkInfoStatistics_click('"+encodeURIComponent(key+"_"+randNum)+"')>"+
								key+"：<br/>";
							$.each(keyData,function(k){
								if(k!=undefined&&k!=null&&k!==""){
									html += "&nbsp;&nbsp;&nbsp;&nbsp;"+k+"：";
									var kData = keyData[k];
									if(kData!=undefined&&kData!=null&&kData!==""){
										html += kData+"&nbsp;&nbsp;&nbsp;&nbsp;";
									}
								}
						});
						html += "</div>";
					}
					
				});
				html += "<div style='clear:both;'>" +
						"注：<br/>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;点击“客户端”查看所有模块的日志信息，点击各个模块查看与点击模块对应的日志信息；<br/>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;E：错误数　W：警告数　M：信息数。" +
						"</div>";
				$("#"+sdkSummary_div_target).html(html);
			}else{
				html += "<div class='sdkTitle'>客户端相关信息</div>";
				$("#"+sdkSummary_div_target).html(html+"在此时间域内无相关数据");
			}
		}else{
			html += "<div class='sdkTitle'>客户端相关信息</div>";
			$("#"+sdkSummary_div_target).html(html+"在此时间域内无相关数据");
		}
	}else{
		html += "<div class='sdkTitle'>客户端相关信息</div>";
		$("#"+sdkSummary_div_target).html(html+"在此时间域内无相关数据");
	}
}
	
/**
 * 点击SDK某一部分，得出其日志信息
 */
function sdkInfoStatistics_click(types){
	var type;
	if(types!=undefined&&types!=null&&types!==""){
		var typeArr = types.split("_");
		if(typeArr!=undefined&&typeArr!=null&&typeArr!==""&&(typeArr instanceof Array)&&(typeArr.length==2)){
			type = typeArr[0];
		}
	}else if(types===""){
		type = "all";
	}
	
	//点击后，将所有的div的样式置为初始样式
	$('#'+sdkSummary_div_target+' > div').not(':first').css({background:"#6BB7BD",border:"thin solid RGB(37,160,241)"});
	//设置当前点击的div的样式
	$("#"+types).css({border:"2px solid #FF0000"});
	
	$.ajax({
		type : "post",
		url : "nocall.sdkInfoList.action",
		dataType : "json",
		data : "startTime=" + startTimeSDK + 
			   "&endTime=" + logoutTimeSDK +//将登出时间赋值给endTime
			   "&sdkmac=" + macSDK +
			   "&type=" + type,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			sdkInfoList_view(data,type,startTimeSDK,logoutTimeSDK);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
			
}

/**
 * 点击SDK的几部分概要信息时，显示与某一被点击部分相对应的客户端日志信息
 * @param {} datas
 */
function sdkInfoList_view(datas,type,startTimeSDK,logoutTimeSDK){
	var result = datas.result;
	var html = "";
	var mac;
	var uid;
	var modelName;
	var level;
	var time;
	var content;
	html += "<div class='sdkTitle'>"+type+"日志信息列表</div>";
	html += "<table class='detailTable'>" +
				"<caption>设备ID："+macSDK+"&nbsp;&nbsp;视讯号："+uidSDK+"</caption>" +
				"<thead>" +
					"<tr>" +
						"<td>" +
							"<input type='checkbox' class='all' onclick='checkAll(0)'/>全选" +
						"</td>" +
						"<td colspan='4'>" +
							"<input type='button' value='查看对应的服务器日志' onclick='downServerLog()'/>" +
							"&nbsp;&nbsp;开始时间：<input type='text' class='Wdate' readonly='readonly' onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})' id='startTimeSDKinput' value='1970-01-01 08:00:00'/>"+
							"&nbsp;&nbsp;结束时间：<input type='text' class='Wdate' readonly='readonly' onfocus='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\"})' id='endTimeSDKinput' value='1970-01-01 08:00:00'/>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<th width='40'>选择</th>" +
						"<th width='40'>所属模块</th>" +
						"<th width='40'>日志级别</th>" +
						"<th width='140'>时间</th>" +
						"<th>客户端日志内容[<a onclick=downClientLog('"+type+"','"+stringToDate(startTimeSDK).getTime()+"','"+stringToDate(logoutTimeSDK).getTime()+"')>下载全部客户端日志</a>]</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>" ;
	
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var sdkEvent = data.sdkEvent;
			if(sdkEvent!=undefined&&sdkEvent!=null&&sdkEvent!==""&&(sdkEvent instanceof Array)&&sdkEvent.length>0){
				$.each(sdkEvent,function(i,val){
					if(val!=undefined&&val!=null&&val!==""){
						var valArr = splitString(val);
						
						var valMap = new Map();
						if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)){
							$.each(valArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									var vaArr = va.split("=");
										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)){
											valMap.put(vaArr[0],vaArr[1]);
											mac = valMap.get('mac');
											uid = valMap.get('uid');
											modelName = valMap.get('modelname');//返回的数据字段名不是驼峰规则
											level = valMap.get('level');
											time = valMap.get('time');
											content = valMap.get('content');
										}
								}
							});
						}
						
						var fileType;
						var ipAndPort;
						var clientId;
						if(content!=undefined&&content!=null&&content!==""){
							var contents = (content);
							var contentsArr = contents.split("--");
							if(contentsArr!=undefined&&contentsArr!=null&&contentsArr!==""&&(contentsArr instanceof Array)){
								var cons = contentsArr[0];
								var consArr = cons.split(":");
								if(consArr!=undefined&&consArr!=null&&consArr!==""&&(consArr instanceof Array)){
									fileType = consArr[0];
									ipAndPort = consArr[1]+":"+consArr[2];
									clientId = consArr[3];
								}
							}
						}
						
						if(fileType==undefined||fileType==null||fileType===""){
							fileType = "无";
						}
						if(ipAndPort==undefined||ipAndPort==null||ipAndPort===""){
							ipAndPort = "无";
						}
						if(clientId==undefined||clientId==null||clientId===""){
							clientId = "无";
						}
						
					//显示内容列表
						if(level=="E"){//错误
				html += "<tr style='background-color:#DF5449;color:yellow;'>" ;//红底黄字
						}else if(level=="W"){//警告
				html += "<tr style='background-color:#FFE733;'>" ;//黄底
						}else if(level=="M"){//信息
				html += "<tr>" ;
						}
						
				html += "<td><input type='checkbox' class='checks' fileTime='"+time+"' clientId='"+clientId+"' fileType='"+fileType+"' ipAndPort='"+ipAndPort+"'></td>" +
						"<td>"+modelName+"</td>" +
						"<td>"+level+"</td>" +
						"<td>"+time+"</td>" +
						"<td>" +val+"</td>" +
					"</tr>" ;
					
					}
				});
			}
		}
	}
		html += "</tbody>" +
			"</table>";
	//alert("startTimeSDK:"+startTimeSDK);
	//alert("startTimeSDK:"+startTimeSDK.substring(0,startTimeSDK.lastIndexOf(":")));
	//alert("logoutTimeSDK:"+logoutTimeSDK);
	//alert("logoutTimeSDK:"+logoutTimeSDK.substring(0,logoutTimeSDK.lastIndexOf(":")));
	$("#"+sdkInfoList_div_target).html(html);
	$("#startTimeSDKinput").attr({value:startTimeSDK.substring(0,startTimeSDK.lastIndexOf(":"))});
	$("#endTimeSDKinput").attr({value:logoutTimeSDK.substring(0,logoutTimeSDK.lastIndexOf(":"))});
}

/**sdkEventInfo.jsp页面用
 * 完成checkbox的全选动作
 * @param {} index
 */
function checkAll(index){
	var allNode = $(".all")[index];
	var checks = $(".checks");
	for(var x=0;x<checks.length;x++){
		checks[x].checked = allNode.checked;
	}
}

/**
 * 下载客户端日志
 * @param {} type 下载哪一个模块的日志
 * @param {} startTimeSDK　开始时间
 * @param {} logoutTimeSDK　结束时间
 * @param {} macSDK　设备的mac地址
 */
function downClientLog(type,startTimeSDK,logoutTimeSDK){
	location.href = "download.downloadClientLogFile.action?startTime="+startTimeSDK+"&endTime="+logoutTimeSDK+"&sdkmac=" + macSDK +"&type=" + type;
}


/**
 * 下载服务器端日志
 * @param {} content
 * @param {} time
 */
function downServerLog(){	
	var fileTypeArr = new Array();
	var startTimeSDKArr = new Array();
	var endTimeSDKArr = new Array();
	var ipAndPortArr = new Array();
	var clientIdArr = new Array();
	var index = 0;
	var checks = $(".checks");
	var info = "";
	$.each(checks,function(i,val){
		var fileType = $(val).attr("fileType");
		var ipAndPort = $(val).attr("ipAndPort");
		var clientId = $(val).attr("clientId");
		
		if(checks[i].checked){
			fileTypeArr[index] = fileType;
			startTimeSDKArr[index] = $("#startTimeSDKinput").val();
			endTimeSDKArr[index] = $("#endTimeSDKinput").val();
			ipAndPortArr[index] = ipAndPort;
			clientIdArr[index] = clientId;
			index++;
		}
	});
	
	if(fileTypeArr==""){
		alert("请选择相应的客户端日志");
		return false;
	}
	
	$.ajax({
		type : "post",
		url : "download.downloadServerLogFile.action",
		dataType : "json",
		data : "startTime="+startTimeSDKArr+
				"&endTime="+endTimeSDKArr+
				"&fileType="+fileTypeArr+
				"&ipAndPort="+ipAndPortArr+
				"&clientId="+clientIdArr,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			var html = "";
			html += "根据下面复选框的选择，为您找到的与之对应的服务器端日志列表如下<br/>";
			html += "<table class='detailTable'>" +
						"<tr>" +
							"<td colspan='4'>搜索关键字：getPath:<br/>&nbsp;&nbsp;" +
						"</tr>" +
						"<tr>" +
							"<th width='50'>所属模块</th>" +
							"<th width='150'>服务器信息</th>" +
							"<th width='50'>ID</th>" +
							"<th>服务器日志内容</th>" +
						"</tr>";
			//{"result":0,"object":["http://10.130.36.195:8080/ftpContent/0-@-1395197289504-@-50b655139c3a6b0ce7b8c028ac1c927a-@-http接口.txt.gz"]}
			var result = data.result;
			if(result===0){
				var object = data.object;
				var fileType;//所属模块
				var ipPort;
				var fileContext;//服务器日志正文
				var clientId;
				if(object!=undefined&&object!=null&&object!==""&&(object instanceof Array)&&object.length>0){
					$.each(object,function(i,val){
						fileType = val.fileType;//所属模块
						ipPort = val.ipAndPort;
						clientId = val.clientId;
						fileContext = val.fileName;//服务器日志正文
						
						html += "<tr>" +
								"<td>"+fileType+"</td>" +
								"<td>"+ipPort+"</td>" +
								"<td>"+clientId+"</td>" +
								"<td>"+fileContext+"</td>" +
								"</tr>";
					});
				}
			}
			html += "<tr><td colspan='4'>未找到符合条件的服务器日志。</td></tr>";
			html += "</table>";
			$("#"+serverLog_div_target).html(html);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
	
}

/**
 * 获取警告信息
 * @param {} sdkStartTime
 * @param {} logoutTime
 * @param {} sdkmac
 */
function warningInfo(startTime,endTime,sdkmac){
	$.ajax({
		type : "post",
		url : "nocall.warningInfo.action",
		dataType : "json",
		data : "startTime=" + startTime + 
			   "&endTime=" + endTime +//将登出时间赋值给endTime
			   "&sdkmac=" + sdkmac,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			warningInfo_view(data);
			console.info("展示警告信息："+JSON.stringify(data));
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 在页面上展示警告信息
 * @param {} datas
 */
function warningInfo_view(datas){
	var html = "";
	var result = datas.result;
	var type;
	var level;
	var content;
	var time;
	html += "<div class='sdkTitle'>报警信息索引表</div>";
	html += "<table class='detailTable'>" +
				"<caption><center>报警信息</center></caption>" +
				"<thead>" +
					"<tr>" +
						"<th>类型</th>" +
						"<th>级别</th>" +
						"<th>内容</th>" +
						"<th>时间</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>" ;
	
	if(result===0){
		var items = datas.items;
		if(items!=undefined&&items!=null&&items!==""&&(items instanceof Array)&&items.length>0){
			$.each(items,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					type = val.type;
					level = val.level;
					content = val.content;
					time = val.time;
					if(type==undefined||type==null||type===""){
						type = "无";
					}
					if(level==undefined||level==null||level===""){
						level = "无";
					}
					if(content==undefined||content==null||content===""){
						content = "无";
					}
					
					if(time!=undefined&&time!=null&&time!==""){
						time = longTimeToDate(stringToNumber(time));
					}
					
					if(time==undefined||time==null||time===""){
						time = "无";
					}
					
			html += "<tr>" +
						"<td>"+type+"</td>" +
						"<td>"+level+"</td>" +
						"<td>"+content+"</td>" +
						"<td>"+time+"</td>" +
					"</tr>";
					
					
				}
			});
		}else{
			html += "<tr><td colspan='4'>在此时间域内无相关数据</td></tr>";
		}
	}else{
		html += "<tr><td colspan='4'>在此时间域内无相关数据</td></tr>";
	}
		html += "</tbody>" +
			"</table>";
	$("#"+warning_div_target).html(html);
}