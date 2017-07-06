/**
 * 此JS的作用是将查询出的话务结果进行展示
 * 使用位置：
 * count.jsp
 * flashInfo.jsp
 */

/**
 *显示错误查询结果
 * @param {} data
 * @param {} func
 */
function showDataError(data,func){
	var result = data.result;
	var list = data.items;
	var sid;
	var optime;
	var reason;
	var html = "";
	if (result ==0 &&list!=undefined&&list!=null&&list!="") {
		var length = list.length;
		     html += "<table width='100%' border='0' cellpadding='0' cellspacing='1' class='sortable' id='mytable2'>"+
						 "<tr class='head'>" +
								"<th scope='col' width='40px'>序号</th>" +
								"<th scope='col' width='170px'>时间</th>" +
								"<th scope='col' width='470px'>sid</th>" +
								"<th scope='col'>错误原因</th>" +
								"<th scope='col' width='40px'>操作</th>" +
						  "</tr>";
		$.each(list, function(i, val) {
					sid = val.sid;
					optime = val.optime;
					reason = val.reason;
					
					html += "<tr class='list'>" +
								"<th scope='row'>" + (i+1) +"</th>" +
								"<td title='" + optime + "'>" + optime +"</td>" +
								"<td title='" + sid + "'>" + sid+ "</td>" +
								"<td title='"+reason+"'>" + reason +"</td>" +
								"<td><a onclick=openErrorDataDialog('" + sid+"')><font style='color:#359E33''>详情</font></a></td>" +
							"</tr>";
				});
		html += "</table>";
		var pages = "";
		var pageSize = data.pageSize;
		
		var flag = length < pageSize;
		if(flag) {//此时查出的数据条数>=0，<pageSize
			if (data.currPage != 1) {
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage - 1) + ")>上一页</a>";
				pages += "&nbsp;尾页";
			}
		}else{
			if (data.currPage != 1) {
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage - 1) + ")>上一页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage + 1) + ")>下一页</a>";
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage + 1) + ")>下一页</a>";
			}
		}

		html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
				+ data.currPage + "页</div>";
		$("#selectcontent").html(html);

		sortables_init();

	} else {
		if (result == "2") {
			$("#selectcontent").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == "1"){
			$("#selectcontent").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == "10"){
			$("#selectcontent").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}

/**
 * 显示某条日志的详情，打印出其无格式的完整信息
 * @param {} sid
 */
function getData_errordata(sid) {
	$.ajax({
		type : "post",
		url : "errordataaction.errordata.action",// 此处连接action，获取数据
		dataType : "text",
		data : "sid=" + sid ,
		beforeSend : function() {
			//$(".layer").show();
		},
		complete : function() {
			//$(".layer").hide();
		},
		success : function(data) {
			if (data != null) {
				$("#contenterrordata").text(data);
			} 
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

var firstFlag;//用来处理按4850查询时查出的所有记录全是单边的，总记录数除以2以后与实际相差太大
var end = 0;//值为1时说明到了最后一页
/**
 * 显示查询结果 TODO
 * @param {} data 数据
 * @param {} func　函数名
 * @param {} mainid　页面上显示的位置
 */
function showdata(data, func, mainid) {
	//console.info("分页数据:"+data);

	//清空原数据
	$('#'+mainid).html("");
	
	var result = data.result;
	var list = data.items;
	var sid;
	var pageSize = data.pageSize;
	var currPage = data.currPage;
	var count;//符合查询条件的记录数
	var length ;
	var caller;//主叫端号码
	var called;//被叫端号码
	var starttimes;//呼叫开始时间
	var endtimes;//呼叫结束时间
	var durations;//通话时长
	var punchresult;//打洞结果
	var recvVideoLossr;//视频丢包率
	var recvAudioLossr;//音频丢包率
	var recvFecLossr;//fec纠错率
	var recvV_ADescription;//视频丢包率和音频丢包率的title描述
	var recvFecLossrDescription;//fec纠错率
	var eventType;//会话结原因
	var reporttypecaller;//主叫通话类型，1:未知,2:视频,3:音频
	var reporttypecalled;//被叫通话类型，1:未知,2:视频,3:音频
	var reporttype;//通话类型，此字段暂时不用
	var callerisFlash;//主叫是否Flash通话
	var calledisFlash;//被叫是否Flash通话
	
	var appkey;//通话的appkey
	
	
	
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		if(currPage==1){
			if(length==pageSize*2){
				firstFlag = true;
			}
		}
		var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"sortable\" id=\"mytable\">"
				+ "<tr class=\"head\">" +
						"<th scope=\"col\" width='40px'>序号</th>" +
						"<th scope=\"col\" width='155px'>主叫/被叫</th>" +
						"<th scope=\"col\" width='155px'>呼叫时间</th>" +
						"<th scope=\"col\" width='70px'>通话时长</th>" +
						"<th scope=\"col\" width='70px'>打洞结果</th>" +
						"<th scope=\"col\" width='135px'>丢包率(视频/音频)</th>" +
						//"<th scope=\"col\" width='100px'>fec纠错率(%)</th>" +
						"<th scope=\"col\" width='180px'>会话结束原因</th>" +
						"<th scope=\"col\" width='100px'>Flash通话</th>" +
						"<th scope=\"col\" width='125px'>通话类型</th>" +
						"<th scope=\"col\" colspan='3' width='125px'>操作</th>" +
				"</tr>";
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
				    //每次循环都要先置空
					recvV_ADescription = "";
					recvFecLossrDescription = "";
					
					sid = val.sid;
					
					caller = val.caller;//主叫端号码
					called = val.called;//被叫端号码
					starttimes = val.starttimes;//呼叫开始时间
					endtimes = val.endtimes;//呼叫结束时间
					durations = val.durations;//通话时长
					punchresult = val.punchresult;//打洞结果
					recvVideoLossr = val.recvVideoLossr;//视频丢包率
					recvAudioLossr = val.recvAudioLossr;//音频丢包率
					recvFecLossr = val.recvFecLossr;//fec纠错率
					eventType = val.eventType;//会话结原因
					reporttypecaller = val.reporttypecaller;//主叫通话类型，1:未知,2:视频,3:音频
					reporttypecalled = val.reporttypecalled;//被叫通话类型，1:未知,2:视频,3:音频
					
					reporttype = val.reporttype;//通话类型
					
					callerisFlash = val.callerisFlash;
					calledisFlash = val.calledisFlash;
					
					appkey = val.appkey;
					
					if(caller==undefined||caller==null||caller===""){
						caller = "--";
					}
					if(called==undefined||called==null||called===""){
						called = "--";
					}
					if(starttimes==undefined||starttimes==null||starttimes===""){
						starttimes = "--";
					}
					if(endtimes==undefined||endtimes==null||endtimes===""){
						endtimes = "--";
					}
					if(durations==undefined||durations==null||durations===""){
						durations = "--";
					}
					if(punchresult==undefined||punchresult==null||punchresult===""){
						punchresult = "--";
					}
					if(recvVideoLossr==undefined||recvVideoLossr==null||recvVideoLossr===""){
						recvVideoLossr = "--";
					}
					if(recvAudioLossr==undefined||recvAudioLossr==null||recvAudioLossr===""){
						recvAudioLossr = "--";
					}
					if(recvVideoLossr==-1&&recvAudioLossr==-1){
						recvV_ADescription = "没有上报数据或上报的数据格式不对";
					}
					if(recvVideoLossr==-1&&recvAudioLossr!=-1){
						recvV_ADescription = "视频丢包率没有上报数据或上报的数据格式不对";
					}
					if(recvVideoLossr!=-1&&recvAudioLossr==-1){
						recvV_ADescription = "音频丢包率没有上报数据或上报的数据格式不对";
					}
					if(recvV_ADescription===""){
						recvV_ADescription = recvVideoLossr+"/"+recvAudioLossr;
					}
					
					if(recvFecLossr==undefined||recvFecLossr==null||recvFecLossr===""){
						recvFecLossr = "--";
					}
					if(recvFecLossr==-1){
						recvFecLossrDescription = "没有上报数据或上报的数据格式不对";
					}
					if(recvFecLossrDescription===""){
						recvFecLossrDescription = recvFecLossr;
					}
					
					if(eventType==undefined||eventType==null||eventType===""){
						eventType = "--";
					}else{
						var desinfo = disconnectReason(eventType);
						if(desinfo==undefined||desinfo==null||desinfo===""){
							eventType = "无"+eventType+"的相关描述["+eventType+"]";
						}else{
							eventType = disconnectReason(eventType)+"["+eventType+"]";
						}
					}
					
					if(reporttype==undefined||reporttype==null||reporttype===""){
						reporttype = "--";
					}else{
						reporttype = showReportType(reporttype);
					}
					
					html += "<tr class=\"list\">" +
								"<th scope=\"row\">" + (i+1) +"</th>" +
								//主叫/被叫
								"<td title='"+ caller + "/"+called+"'>" + caller + "/"+called+"</td>" +
								//呼叫时间
								"<td title='" + starttimes + "'>" + starttimes + "</td>" +
								//通话时长
								"<td title='" + durations+"'>" + durations+"</td>" +
								//打洞结果
								"<td title='" + punchresult + "'>" + punchresult + "</td>" +
								//丢包率（视频/音频）
								"<td title='"+recvV_ADescription+"'>"+ recvVideoLossr+"/" + recvAudioLossr +"</td>" +
								//fec纠错率
								//"<td title='" + recvFecLossrDescription + "'>"+recvFecLossr+"</td>" +
								//会话结束原因
								"<td><span title='"+ eventType +"'>"+ eventType +"</span></td>" +
								//是否Flash通话
								"<td>" +
								"<span>";
								if(callerisFlash!=undefined&&callerisFlash!=null&&callerisFlash!==""){
									if(callerisFlash==true){
										html += "主:"+callerisFlash ;
									}
								}
								if(calledisFlash!=undefined&&calledisFlash!=null&&calledisFlash!==""){
									if(calledisFlash==true){
										html += "/被:"+calledisFlash ;
									}
								}
								if(appkey!=undefined&&appkey!=null&&appkey!==""){
									//html += "["+appkey+"]" ;
								}
						html += "</span>" +
								"</td>" +
								//通话类型
								"<td>" ;
								//主叫通话类型
								if(reporttypecaller!=undefined&&reporttypecaller!=null&&reporttypecaller!==""){
									if(reporttypecaller!=1){
										html += "主:"+showReportType(reporttypecaller);
									}
								}
								
								//被叫通话类型
								if(reporttypecalled!=undefined&&reporttypecalled!=null&&reporttypecalled!==""){
									if(reporttypecalled!=1){
										html += "/被:"+showReportType(reporttypecalled);
									}
								}
								
								html += "</td>" +
								//报告、日志、视图
								"<td><a onclick=openDialog('"+sid+"','callerreport') class='clickBackgroundColor1'><font style='color:#359E33''>报告</font>&nbsp;|</a></td>" +
								"<td><a onclick=openDialog('"+sid+"','log') class='clickBackgroundColor2'><font style='color:#359E33''>日志</font>&nbsp;|</a></td>" +
								"<td><a onclick=openDialog('"+sid+"','webRelay') class='clickBackgroundColor3'><font style='color:#359E33''>视图</font></a></td>" +
							"</tr>";
			}
					
				});
		html += "</table>";
		var pages = "";
		
		//用的是真分页，每次查询出多少条就显示多少条，显示的条数与pageSize不一样相等。
		//只要存在的数据够多，一定是length>=pageSize，只有最后一页会出现length<=pageSize的现象
		//所以当length==pageSize时，无法判断是不是到了尾页，但是如果length<pageSize，一定是到了尾页		
		//只要能执行到这里，length肯定大于0
		var flag = length < pageSize;
		
		if(flag) {//此时查出的数据条数>=0，<pageSize
			if (currPage != 1) {//处于最后一页
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage - 1) + ")>上一页</a>";
				pages += "&nbsp;尾页";
			}else{
				pages += "共1页";
			}
		}else{
			if (currPage != 1) {
				if(end==1){
					pages += "<a onclick=" + func + "(1)>首页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage - 1) + ")>上一页</a>";
					pages += "&nbsp;尾页";
					//将标志重置 
					end = 0;
				}else{
					pages += "<a onclick=" + func + "(1)>首页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage - 1) + ")>上一页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage + 1) + ")>下一页</a>";
				}
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage + 1) + ")>下一页</a>";
			}
		}

		html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
				+ currPage + "页";
		
		count = data.count;
		if(count!=undefined&&count!=null&&count!==""){
			if(flag&&currPage==1){//只有一页时，
				html += "&nbsp;&nbsp;共为您找到约"+length+"条相关结果";
				html += "<a onclick="+func+"(1,true,"+length+")>&nbsp;&nbsp;导出sid</a>";
			}else{
				if(firstFlag==true){
					html += "&nbsp;&nbsp;共为您找到约"+count*2+"条相关结果";
				}else{
					html += "&nbsp;&nbsp;共为您找到约"+count+"条相关结果";
				}
				html += "<a onclick="+func+"(1,true,"+count+")>&nbsp;&nbsp;导出sid</a>";
			}
		}		
				
		html += "</div>";
		
		$("#"+mainid).html(html);

		sortables_init();

	} else {
		//如果当前页不为1，说明是点击“下一页”查到的数据，此时要自动返回上一页
		//在未查到数据的情况下，如果当前页为1，说明是初始未查询到数据
		if (result == 2) {
			if(currPage>1){
				end = 1;
				eval(func+"("+(currPage - 1)+")");
			}else{
				$("#"+mainid).html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			}
		} else if(result == 1){
			$("#"+mainid).html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#"+mainid).html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}

//1、为正常数据查询界面添加了点击后行变色的功能；
$(document).ready(function(){
	//点击以下三个链接时，行都变色
	//报告
	$("#mytable a.clickBackgroundColor1").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor1").index(this))+1]).style.background="RGB(96,165,252)";
	});
	//日志
	$("#mytable a.clickBackgroundColor2").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor2").index(this))+1]).style.background="RGB(96,165,252)";
	});
	//视图
	$("#mytable a.clickBackgroundColor3").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor3").index(this))+1]).style.background="RGB(96,165,252)";
	});
});
//2、为错误数据查询界面添加了点击后行变色的功能；
$(document).ready(function(){
	//详情
	$("#mytable2 a").live("click",function(){
	  ($("#mytable2 tr")[($("#mytable2 a").index(this))+1]).style.background="RGB(96,165,252)";
	});
});

/**
 * 可变参数
 * 点击“报告”、“日志”、“视图”时调用的方法
 * @param {} sid
 * @param {} flag
 */
function openDialog() {
	//alert("行标:"+($("#mytable a.clickBackgroundColor").index(this)));
	// var width = 1100;
	// var height = 800;
	// paramers="dialogWidth:"+width+"px; dialogHeight:"+height+"px;
	// status:no;location:no;center:yes;dialogLeft:" +
	// ((window.screen.width-width)/2) + "px;dialogTop:" +
	// ((window.screen.height-height)/2) + "px;";
	// window.showModalDialog("detail.jsp?sid="+sid,"",paramers);
	// window.location.host="detail.jsp?sid="+sid;
	
	var sid =arguments[0]; 
	var flag = arguments[1];
	
	if(flag=='callerreport'){
		window.open("callerreport.jsp?sid="+sid);
	}else if(flag=='log'){
		var caller = arguments[2];
		var called = arguments[3];
		//var endtimes = arguments[4].replace(/\s/g,"-");
		var endtimes = arguments[4];
		//window.open("callDetail.jsp?sid="+sid+"&caller="+caller+"&called="+called+"&endtimes="+endtimes);
		window.open("callDetail.jsp?sid="+sid);
	}else if(flag=='webRelay'){
		window.open("webRelay/Main.html?sid=" + sid.substring(0,sid.lastIndexOf('_')));
	}
	
	jQuery(this).target = "_blank";
}

/**
 * 点击错误数据的“详情”
 * @param {} sid
 */
function openErrorDataDialog(sid) {
	window.open("errordata.jsp?sid=" + sid);
	jQuery(this).target = "_blank";
}

/**
 * 根据返回码确实是何种类型的通话
 * @param {} reportType
 * @return {}
 */
function showReportType(reportType){
	var map = new Map();
	map.put("1","未知");
	map.put("2","视");
	map.put("3","音");
	if(isNaN(reportType)==false){//判断是不是数字
		if(reportType!=undefined&&reportType!=null&&reportType!==""){
			return map.get(reportType);
		}
	}else{
		return "非数值类型，无法处理";
	}
}