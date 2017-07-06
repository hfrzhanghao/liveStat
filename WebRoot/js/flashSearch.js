/**
 *falsh查询页面flashSearch.jsp的JS文件 
 */

var flashSearchData;//存放查询出的flash信息的全局变量
var flashSearchDataMacLength;//查询出的flash信息包含多少个mac
var macPageSize = 15;//每页显示多少个MAC记录
var guidPageSize = 10;//每次展示一个mac下guid的个数

var sdkSearchData;//存放查询出的sdk信息的全局变量
var sdkSearchDataMacLength;//查询出的sdk信息包含多少个mac
var uidPageSize = 3;//每次展示一个mac下uid的个数

$(document).ready(function(){
	/*************************************************/
	//刷新页面时设置半小时的单选按钮被选中，并设置默认查询半小时以内的记录
	$("#radioFirstFlash").attr("checked","checked");
	setTimeFlash(30);
	
	//单击选择时间的单选按钮事件
	$(":radio[name='timeradioFlash']").click(function(){
		var minute = $(":radio[name='timeradioFlash'][checked]").val();
		setTimeFlash(minute);
	});
	
	//点击按钮，选择是按Flash非话务查询还是按SDK非话务查询
	$("#sdkSearch").hide();
	$(":radio[id='radioFalsh']").attr("checked","checked");
	$(":radio[name='flash_sdk']").click(function(){
		var radios = $(":radio[name='flash_sdk'][checked]").val();
		if(radios=="flash"){
			$("#flashSearch").show();//显示flash的查询框
			$("#sdkSearch").hide();//隐藏sdk的查询框
		}
		if(radios=="sdk"){
			$("#flashSearch").hide();//隐藏flash的查询框
			$("#sdkSearch").show();//显示sdk的查询框
		}
	});
	
});

/**
 * 验证前台两个日期之间不能超过1天
 * @return {Boolean}
 */
function checkTimeFlash(){
	var date1 = $("#startTimeFlash").val();
	var date2 = $("#endTimeFlash").val();
	var tmp = date1.split(" ")[0].split("-");
	var d1 = new Date(tmp[0],tmp[1]-1,tmp[2]);
	
	tmp = date2.split(" ")[0].split("-");
	var d2 = new Date(tmp[0],tmp[1]-1,tmp[2]);
	if((d2.getTime()-d1.getTime())>7*24*60*60*1000){
		alert("只能查询相隔一周之内的数据哦！");
		return false;
	}
	if(d1>d2){
		alert('开始时间不能大于结束时间');
		return false;
	}
	return true;
}
/**
 * 当点击“查询”按钮时，触发时间框时间
 * 如果有单选按钮被选中，则根据单选按钮自动调整时间，
 * 如果没有单选按钮被选中，则不调整时间，时间按照时间文本域中的时间计算
 */
function resetTimeFlash(){
	$(":radio[name='timeradioFlash']").each(function(){
		var id= $(this).attr("id");
		//只要有单选按钮被选中，即按此单选按钮规定的时间设置时间
		if($("#"+id).attr("checked")=="checked"){
			var minute = $("#"+id).val();;
			setTimeFlash(minute);
   		}
	});
}

/**
 * 当手动为时间文本域设置时间时，取消所有时间单选按钮的选择状态，使其不被选择
 */
function removeRadioFlash(){
	$(":radio[name='timeradioFlash']").removeAttr("checked");
}

/**
 * flash查询按钮 根据mac/guid/appkey/错误号/昵称查询，flash非话务查询用
 */
$("#flashSearchSubmit").live("click", function() {
	if(checkTimeFlash()==true){
		resetTimeFlash();
		flashSearchSubmit();
	}
});
/**
 * sdk查询按钮　根据mac/uid查询，sdk非话务查询用 
 */
$("#sdkSearchSubmit").live("click", function() {
	//if(checkTimeFlash()==true){
		resetTimeFlash();
		sdkSearchSubmit();
	//}
});

/**
 * flash重置按钮
 */
$(".flashSelectReset").live("click", function() {
	$("#radioFirstFlash").attr("checked","checked");
	setTimeFlash(30);//默认查询半小时以内
});
/**
 * sdk重置按钮
 */
$(".sdkSelectReset").live("click", function() {
	$("#radioFirstFlash").attr("checked","checked");
	setTimeFlash(30);//默认查询半小时以内
});

/**
 * flash点击“查询”按钮的效果
 */
function flashSearchSubmit() {
	//页面条件会更换，每次都是重新读取时间
	startTimeFlash = $("#startTimeFlash").val();//开始时间
	endTimeFlash = $("#endTimeFlash").val();//结束时间
	
	var mac = $("#mac").val().trim();//mac
	var guid = $("#guid").val().trim();//guid
	var appkey = $("#appkey").val().trim();//appkey
	var errorCode = $("#errorCode").val().trim();//错误号
	var nickname = $("#nickname").val().trim();//昵称

	$.ajax({
		type : "post",
		url : "search.flashSearch.action",
		dataType : "json",
		data : "startTime=" + startTimeFlash + 
				"&endTime=" + endTimeFlash +
				"&mac="+mac+
				"&guid="+guid+
				"&appkey="+appkey+
				"&errorCode="+errorCode+
				"&nickname="+nickname,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//console.info("内容："+JSON.stringify(data));
			var fd = "{\"result\":0,\"pageSize\":0,\"currPage\":0,\"object\":{\"mac1\":[{\"guid\":\"guid11\",\"appkey\":\"appkey11\"},{\"guid\":\"guid12\",\"appkey\":\"appkey12\"},{\"guid\":\"guid13\",\"appkey\":\"appkey13\"},{\"guid\":\"guid14\",\"appkey\":\"appkey14\"},{\"guid\":\"guid15\",\"appkey\":\"appkey15\"}],\"mac2\":[{\"guid\":\"guid21\",\"appkey\":\"appkey21\"},{\"guid\":\"guid22\",\"appkey\":\"appkey22\"},{\"guid\":\"guid23\",\"appkey\":\"appkey23\"},{\"guid\":\"guid24\",\"appkey\":\"appkey24\"},{\"guid\":\"guid25\",\"appkey\":\"appkey25\"},{\"guid\":\"guid26\",\"appkey\":\"appkey26\"}],\"mac3\":[{\"guid\":\"guidvalue2\",\"appkey\":\"appvalue\"},{\"guid\":\"guidvalue1\",\"appkey\":\"appvalue\",\"loginTime\":\"2015-04-30-20:14:02:862\",\"logoutTime\":\"2015-04-30-21:14:02:862\",\"loginResult\":\"errcode_描述\",\"logoutResult\":\"1_很失败\"}],\"mac4\":[{\"guid\":\"guidvalue3\",\"appkey\":\"appvalue\"},{\"guid\":\"guidvalue2\",\"appkey\":\"appvalue\"}],\"mac5\":[{\"guid\":\"guidvalue1\",\"appkey\":\"appvalue\",\"loginTime\":\"2015-04-30-20:14:02:862\",\"loginResult\":\"0_一切正常\"}]}}";
			var fds = JSON.parse(fd);
			
			//将从接口获得的数据赋值给全局变量flashSearchData
			toDataFlashSearchData(data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				//var returnUrl = window.location.href;
				//window.location.href = "login.jsp?returnUrl="+returnUrl;
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * sdk点击“查询”按钮的效果
 */
function sdkSearchSubmit() {
	//页面条件会更换，每次都是重新读取时间
	startTimeFlash = $("#startTimeFlash").val();//开始时间
	endTimeFlash = $("#endTimeFlash").val();//结束时间
	
	var sdkmac = $("#sdkmac").val().trim();//mac
	var uid = $("#uid").val().trim();//guid

	$.ajax({
		type : "post",
		url : "nocall.sdkInfoSearch.action",
		dataType : "json",
		data : "startTime=" + startTimeFlash + 
				"&endTime=" + endTimeFlash +
				"&sdkmac="+sdkmac+
				"&uid="+uid,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//console.info("内容："+JSON.stringify(data));
			var fd = "{\"result\":0,\"pageSize\":0,\"currPage\":0,\"object\":{\"mac1\":[{\"guid\":\"guid11\",\"appkey\":\"appkey11\"},{\"guid\":\"guid12\",\"appkey\":\"appkey12\"},{\"guid\":\"guid13\",\"appkey\":\"appkey13\"},{\"guid\":\"guid14\",\"appkey\":\"appkey14\"},{\"guid\":\"guid15\",\"appkey\":\"appkey15\"}],\"mac2\":[{\"guid\":\"guid21\",\"appkey\":\"appkey21\"},{\"guid\":\"guid22\",\"appkey\":\"appkey22\"},{\"guid\":\"guid23\",\"appkey\":\"appkey23\"},{\"guid\":\"guid24\",\"appkey\":\"appkey24\"},{\"guid\":\"guid25\",\"appkey\":\"appkey25\"},{\"guid\":\"guid26\",\"appkey\":\"appkey26\"}],\"mac3\":[{\"guid\":\"guidvalue2\",\"appkey\":\"appvalue\"},{\"guid\":\"guidvalue1\",\"appkey\":\"appvalue\",\"loginTime\":\"2015-04-30-20:14:02:862\",\"logoutTime\":\"2015-04-30-21:14:02:862\",\"loginResult\":\"errcode_描述\",\"logoutResult\":\"1_很失败\"}],\"mac4\":[{\"guid\":\"guidvalue3\",\"appkey\":\"appvalue\"},{\"guid\":\"guidvalue2\",\"appkey\":\"appvalue\"}],\"mac5\":[{\"guid\":\"guidvalue1\",\"appkey\":\"appvalue\",\"loginTime\":\"2015-04-30-20:14:02:862\",\"loginResult\":\"0_一切正常\"}]}}";
			var fds = JSON.parse(fd);
			
			//将从接口获得的数据赋值给全局变量flashSearchData
			toDataSDKSearchData(data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				//var returnUrl = window.location.href;
				//window.location.href = "login.jsp?returnUrl="+returnUrl;
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 将从接口获得的数据赋值给全局变量flashSearchData
 * 获取查询出的flash信息包含多少个mac，将其个数赋值给全局变量flashSearchDataMacLength
 * @param {} data
 */
function toDataFlashSearchData(data){
	//将从接口获得的数据赋值给全局变量flashSearchData
	flashSearchData = data;
	
	var length = 0;
	var result = data.result;
	if(result===0){
		var object = data.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				length ++;
			}
		}
	}
	//获取查询出的flash信息包含多少个mac，赋值给全局变量flashSearchDataMacLength
	flashSearchDataMacLength = length;
	
	//每次点击“下一页”，mac显示的记录条数
	var nextPage = macPageSize;
	//在页面上显示mac数据
	showdataFlash(nextPage);
}
/**
 * 将从接口获得的数据赋值给全局变量sdkSearchData
 * 获取查询出的sdk信息包含多少个mac，将其个数赋值给全局变量sdkSearchDataMacLength
 * @param {} data
 */
function toDataSDKSearchData(data){
	//将从接口获得的数据赋值给全局变量sdkSearchData
	sdkSearchData = data;
	
	var length = 0;
	var result = data.result;
	if(result===0){
		var object = data.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				length ++;
			}
		}
	}
	//获取查询出的flash信息包含多少个mac，赋值给全局变量flashSearchDataMacLength
	sdkSearchDataMacLength = length;
	
	//每次点击“下一页”，mac显示的记录条数
	var nextPage = macPageSize;
	//在页面上显示mac数据
	showdataSDK(nextPage);
}

//分页展示flash的mac，递归循环时用
var funcName = "showdataFlash";
//分页展示sdk的mac，递归循环时用
var funcName = "showdataSDK";
/**
 * 显示flash的mac的查询结果
 */
function showdataFlash(nextPage) {
	var html = "";
	var result ;
	result = flashSearchData.result;
	
	var resNum = -1;//目前循环到的mac下标
	
	html += "<table class='detailTable'><tr><th>根据您设置的条件，查询结果如下</th></tr>";
	if(result===0){
		var object = flashSearchData.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				resNum++;
				//显示mac分页用
				if(resNum>=(nextPage-macPageSize)&&resNum<nextPage){
					html += "<tr>" +
								"<td>MAC地址：" +
									mackey +									
									"<span id='up"+mackey+"' nick="+mackey+" class='macUpDown'><font style='color:#35A368;'>&nbsp;&nbsp;&nbsp;&nbsp;<b>OPEN</b></font></span>" +
									"<span id='down"+mackey+"' nick="+mackey+" class='macUpDown' style='display:none;'><font style='color:#FD042E;'>&nbsp;&nbsp;&nbsp;&nbsp;<b>CLOSE</b></font></span>" +
									"<div id='guid"+mackey+"' style='display:none;'>" +
							         "</div>" +
								"</td>" +
							"</tr>";
				}
			}
		}
	}
	html += "</table>";
	//mac总记录数不足一页或正好满一页
	if(nextPage==macPageSize&&nextPage>=flashSearchDataMacLength){
		html += "已经没有更多记录要显示了哟";
	}else{//mac总记录数多于一页
		if(nextPage==macPageSize){//首页
			nextPage += macPageSize;
			html += "<a onclick="+funcName+"("+nextPage+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(Math.ceil(flashSearchDataMacLength/macPageSize))*macPageSize+")>尾页</a>";
		}else if(nextPage<flashSearchDataMacLength){
			html += "<a onclick="+funcName+"("+macPageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(nextPage-macPageSize)+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(nextPage+macPageSize)+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(Math.ceil(flashSearchDataMacLength/macPageSize))*macPageSize+")>尾页</a>";
		}else if(nextPage>=flashSearchDataMacLength){
			nextPage -= macPageSize;
			html += "<a onclick="+funcName+"("+macPageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+nextPage+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "已经没有更多记录要显示了哟";
		}
	}
	html += "&nbsp;&nbsp;&nbsp;&nbsp;为您找到约"+flashSearchDataMacLength+"条相关结果";
	$('#selectcontentFlash_SDK').html(html);
	showGuid(1,guidPageSize);
}
/**
 * 显示sdk的mac的查询结果
 */
function showdataSDK(nextPage) {
	var html = "";
	var result ;
	result = sdkSearchData.result;
	
	var resNum = -1;//目前循环到的mac下标
	
	html += "<table class='detailTable'><tr><th>根据您设置的条件，查询结果如下</th></tr>";
	if(result===0){
		var object = sdkSearchData.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				resNum++;
				//显示mac分页用
				if(resNum>=(nextPage-macPageSize)&&resNum<nextPage){
					html += "<tr>" +
								"<td>MAC地址：" +
									mackey +									
									"<span id='up"+mackey+"' nick="+mackey+" class='macUpDown'><font style='color:#35A368;'>&nbsp;&nbsp;&nbsp;&nbsp;<b>OPEN</b></font></span>" +
									"<span id='down"+mackey+"' nick="+mackey+" class='macUpDown' style='display:none;'><font style='color:#FD042E;'>&nbsp;&nbsp;&nbsp;&nbsp;<b>CLOSE</b></font></span>" +
									"<div id='uid"+mackey+"' style='display:none;'>" +
							         "</div>" +
								"</td>" +
							"</tr>";
				}
			}
		}
	}
	html += "</table>";
	//mac总记录数不足一页或正好满一页
	if(nextPage==macPageSize&&nextPage>=sdkSearchDataMacLength){
		html += "已经没有更多记录要显示了哟";
	}else{//mac总记录数多于一页
		if(nextPage==macPageSize){//首页
			nextPage += macPageSize;
			html += "<a onclick="+funcName+"("+nextPage+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(Math.ceil(sdkSearchDataMacLength/macPageSize))*macPageSize+")>尾页</a>";
		}else if(nextPage<sdkSearchDataMacLength){
			html += "<a onclick="+funcName+"("+macPageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(nextPage-macPageSize)+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(nextPage+macPageSize)+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+(Math.ceil(sdkSearchDataMacLength/macPageSize))*macPageSize+")>尾页</a>";
		}else if(nextPage>=sdkSearchDataMacLength){
			nextPage -= macPageSize;
			html += "<a onclick="+funcName+"("+macPageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "<a onclick="+funcName+"("+nextPage+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			html += "已经没有更多记录要显示了哟";
		}
	}
	html += "&nbsp;&nbsp;&nbsp;&nbsp;为您找到约"+sdkSearchDataMacLength+"条相关结果";
	$('#selectcontentFlash_SDK').html(html);
	showuid(1,uidPageSize);
}

/**
 * 显示mac下guid列表的内容
 * @param {} mackeys 在哪个mac下追加显示guid
 * @param {} guidPageSizes 每次追加显示guid的数量
 */
function showGuid(mackeys,guidPageSize){
	var result = flashSearchData.result;
	var html = "";
	
	var guid;//guid
	var appkey;//appkey
	
	var hasSameMac = false;//是否点击了“加载更多”，如果不是，显示所有mac下的guid，如果是，动态增加该mac下guid的显示数量
	if(result===0){
		var object = flashSearchData.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				if(mackey==mackeys){
					hasSameMac = true;//存在相同的
				}
			}
			
			if(!hasSameMac) {//首次页面加载时，加载全部mac下的部分guid
				for(var mackey in object){
					html = "";
					var mac = object[mackey];
					if(mac!=undefined&&mac!=null&&mac!==""){
						var guidNum = -1;
						html += "<table class='guidTable'><tr><th>GUID</th><th>AppKey</th><th>操作</th></tr>";
						for(var i=0;i<mac.length;i++){
							guidNum++;
							//控制显示的记录数
							if(guidNum<guidPageSize){
								var val = mac[i];
								if(val!=undefined&&val!=null&&val!==""){
									guid = val.guid;
									appkey = val.appkey;
									
									if(guid==undefined||guid==null||guid===""){guid="--";}
									if(appkey==undefined||appkey==null||appkey===""){appkey="--";}
									
									var randomNum = Math.random();
									
							html += "<tr id='"+mackey+""+guid+""+randomNum+"'>" +
										"<td>"+guid+"</td>" +
										"<td>"+appkey+"</td>" +
										"<td><a onclick=openFlashDialog('"+mackey+"','"+guid+"','"+randomNum+"') class='hehe'><font style='color:#359E33''>详情</font></a></td>" +
									"</tr>";
								}
							}else{
								break;
							}
						}
						if(guidPageSize<mac.length){
							html += "<tr><td colspan='3'><a onclick=showGuid('"+mackey+"','"+(guidNum+guidPageSize)+"')><font style='color:#359E33''>加载更多</font></a></td></tr>";
						}else{
							html += "<tr><td colspan='3'><font style='color:#359E33''>已经没有更多记录要显示了哟</font></td></tr>";
						}
					html += "</table>";
					$('#guid'+mackey).html(html);
					}
				}
			}else{//点击“加载更多”时，动态加载其中一个mac下的guid
				for(var mackey in object){
					if(mackey==mackeys){
						html = "";
						var mac = object[mackey];
						if(mac!=undefined&&mac!=null&&mac!==""){
							var guidNum = -1;
							html += "<table class='guidTable'><tr><th>GUID</th><th>AppKey</th><th>操作</th></tr>";
							for(var i=0;i<mac.length;i++){
								guidNum++;
								//控制显示的记录数
								if(guidNum<guidPageSize){
									var val = mac[i];
									if(val!=undefined&&val!=null&&val!==""){
										guid = val.guid;
										appkey = val.appkey;
										
										if(guid==undefined||guid==null||guid===""){guid="--";}
										if(appkey==undefined||appkey==null||appkey===""){appkey="--";}
										
										var randomNum = Math.random();
										
								html += "<tr id='"+mackey+""+guid+""+randomNum+"'>" +
										"<td>"+guid+"</td>" +
										"<td>"+appkey+"</td>" +
										"<td><a onclick=openFlashDialog('"+mackey+"','"+guid+"','"+randomNum+"')><font style='color:#359E33''>详情</font></a></td>" +
										"</tr>";
									}
								}else{
									break;
								}
							}
							if(guidPageSize<mac.length){
								html += "<tr><td colspan='3'><a onclick=showGuid('"+mackey+"','"+(guidNum+guidPageSize)+"')><font style='color:#359E33''>加载更多</font></a></td></tr>";
							}else{
								html += "<tr><td colspan='3'><font style='color:#359E33''>已经没有更多记录要显示了哟</font></td></tr>";
							}
						html += "</table>";
						$('#guid'+mackey).html(html);
						}
					}
				}
			}
		}
	}
}
/**
 * 显示mac下uid列表的内容
 * @param {} mackeys 在哪个mac下追加显示uid
 * @param {} uidPageSizes 每次追加显示uid的数量
 */
function showuid(mackeys,uidPageSize){
	var result = sdkSearchData.result;
	var html = "";
	
	var uid;//uid
	var logoutTime;//登出时间
	
	var hasSameMac = false;//是否点击了“加载更多”，如果不是，显示所有mac下的uid，如果是，动态增加该mac下uid的显示数量
	if(result===0){
		var object = sdkSearchData.object;
		if(object!=undefined&&object!=null&&object!==""){
			for(var mackey in object){
				if(mackey==mackeys){
					hasSameMac = true;//存在相同的
				}
			}
			
			if(!hasSameMac) {//首次页面加载时，加载全部mac下的部分uid
				for(var mackey in object){
					html = "";
					var mac = object[mackey];
					if(mac!=undefined&&mac!=null&&mac!==""){
						var uidNum = -1;
						html += "<table class='guidTable'><tr><th>视讯号</th><th>登出时间</th><th>操作</th></tr>";
						for(var i=0;i<mac.length;i++){
							uidNum++;
							//控制显示的记录数
							if(uidNum<uidPageSize){
								var val = mac[i];
								if(val!=undefined&&val!=null&&val!==""){
									uid = val.uid;
									logoutTime = val.logoutTime;
									
									if(uid==undefined||uid==null||uid===""){uid="--";}
									if(logoutTime==undefined||logoutTime==null||logoutTime===""){logoutTime="--";}
									
									var randomNum = Math.random();
									
							html += "<tr id='"+mackey+""+uid+""+randomNum+"'>" +
										"<td>"+uid+"</td>" +
										"<td>"+formatTime(logoutTime)+"</td>" +
										"<td><a onclick=openSDKDialog('"+mackey+"','"+uid+"','"+logoutTime+"','"+randomNum+"') class='hehe'><font style='color:#359E33''>详情</font></a></td>" +
									"</tr>";
								}
							}else{
								break;
							}
						}
						if(uidPageSize<mac.length){
							html += "<tr><td colspan='3'><a onclick=showuid('"+mackey+"','"+(uidNum+uidPageSize)+"')><font style='color:#359E33''>加载更多</font></a></td></tr>";
						}else{
							html += "<tr><td colspan='3'><font style='color:#359E33''>已经没有更多记录要显示了哟</font></td></tr>";
						}
					html += "</table>";
					$('#uid'+mackey).html(html);
					}
				}
			}else{//点击“加载更多”时，动态加载其中一个mac下的uid
				for(var mackey in object){
					if(mackey==mackeys){
						html = "";
						var mac = object[mackey];
						if(mac!=undefined&&mac!=null&&mac!==""){
							var uidNum = -1;
							html += "<table class='guidTable'><tr><th>视讯号</th><th>登出时间</th><th>操作</th></tr>";
							for(var i=0;i<mac.length;i++){
								uidNum++;
								//控制显示的记录数
								if(uidNum<uidPageSize){
									var val = mac[i];
									if(val!=undefined&&val!=null&&val!==""){
										uid = val.uid;
										logoutTime = val.logoutTime;
										if(uid==undefined||uid==null||uid===""){uid="--";}
										if(logoutTime==undefined||logoutTime==null||logoutTime===""){logoutTime="--";}
										var randomNum = Math.random();
										
								html += "<tr id='"+mackey+""+uid+""+randomNum+"'>" +
										"<td>"+uid+"</td>" +
										"<td>"+formatTime(logoutTime)+"</td>" +
										"<td><a onclick=openSDKDialog('"+mackey+"','"+uid+"','"+logoutTime+"','"+randomNum+"')><font style='color:#359E33''>详情</font></a></td>" +
										"</tr>";
									}
								}else{
									break;
								}
							}
							if(uidPageSize<mac.length){
								html += "<tr><td colspan='3'><a onclick=showuid('"+mackey+"','"+(uidNum+uidPageSize)+"')><font style='color:#359E33''>加载更多</font></a></td></tr>";
							}else{
								html += "<tr><td colspan='3'><font style='color:#359E33''>已经没有更多记录要显示了哟</font></td></tr>";
							}
						html += "</table>";
						$('#uid'+mackey).html(html);
						}
					}
				}
			}
		}
	}
}

//设置 打开/关闭mac表格的事件
//只所以这些代码要放在外面，不能放在循环里面，是因为必须先产生DOM，才能对DOM进行操作，否则不起作用
$('.macUpDown').live("click",function () {
	var nick = $(this).attr("nick");
	$('#guid'+nick).slideToggle("slow");	
	$('#uid'+nick).slideToggle("slow");	
	$('#up'+nick).toggle();
	$('#down'+nick).toggle();
});

/**
 * 点击mac与guid的“详情”时调用的方法
 * @param {} sid
 * @param {} flag
 */
function openFlashDialog(mackey,guid,randomNum) {
	//点击后行变色
	var k = document.getElementById(mackey+""+guid+""+randomNum);
	k.style.background="RGB(96,165,252)";
	
	//页面条件会更换，每次都是重新读取时间
	var startTimeFlash = $("#startTimeFlash").val();//开始时间
	var endTimeFlash = $("#endTimeFlash").val();//结束时间
	window.open("flashEventCallInfo.jsp?mac=" + mackey+"&guid="+guid+"&startTimeFlash="+startTimeFlash+"&endTimeFlash="+endTimeFlash);
	jQuery(this).target = "_blank";
}
/**
 * 点击mac与uid的“详情”时调用的方法
 * @param {} sid
 * @param {} flag
 */
function openSDKDialog(mackey,uid,logoutTime,randomNum) {
	//点击后行变色
	var k = document.getElementById(mackey+""+uid+""+randomNum);
	k.style.background="RGB(96,165,252)";
	window.open("sdkEventInfo.jsp?sdkmac=" + mackey+"&uid="+uid+"&logoutTime="+formatTime(logoutTime));
	jQuery(this).target = "_blank";
}

/**
 * 点击快捷按钮时，为时间文本域设置时间
 * @param {} flag
 */
function setTimeFlash(flag){
	$("#startTimeFlash").val(time(flag));
	$("#endTimeFlash").val(time(0));
}
