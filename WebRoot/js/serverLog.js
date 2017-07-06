/*
 * serverLog.jsp使用的JS文件
 */

/**
 * 根据查询条件获取对应的服务器日志信息
 */
function serverLog(startTimeSDKArr,endTimeSDKArr,fileTypeArr,ipAndPortArr,clientIdArr){
	
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
			var result;
			result = data.result;
			if(result==1){
				alert(data.ret_info);
				return false;
			}else{
				showServerLog(data);
			}
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
 * 显示服务器日志列表信息
 * flash_sdk_Search.jsp对服务器日志查询后显示内容时使用
 * @param datas
 */
function showServerLog(datas) {
	var result = datas.result;
	
	var id;//数据库生成的文件ID
	var fileType;// 所属模块
	var fileName;// 服务器日志正文
	var fileContent;//二级目录	
	var fileTimeBegin;//开始时间
	var fileTimeEnd;//结束时间
	var ipAndPort;//地址
	var clientId;//服务器ID
	var html = "";
	
	if (result == 0) {
		var object = datas.object;
		if(object!=undefined&&object!=null&&object!==""&& (object instanceof Array) && object.length > 0){
			html += "<table class='detailTable'>" +
					"<caption><h3>服务器日志信息</h3></caption>" +
					"<tr>" +
						"<td colspan='4'>搜索关键字：getPath:<br/>&nbsp;&nbsp;" +
					"</tr>" +
					"<tr>" +
						"<th width='50'>所属模块</th>" +
						"<th width='150'>服务器信息</th>" +
						"<th width='50'>ID</th>" +
						"<th>服务器日志内容</th>" +
								"</td>" +
					"</tr>";
				$.each(object, function(i, val) {
					fileType = val.fileType;
					ipPort = val.ipAndPort;
					fileContext = val.fileName;
					clientId = val.clientId;
	
					html += "<tr>" +
								"<td>" + fileType + "</td>" +
								"<td>" + ipPort + "</td>" +
								"<td>" + clientId + "</td>" +
								"<td>" + fileContext + "</td>" +
							"</tr>";
				});
			
			html += "</table>";
			$(".serverLog").html(html);
		}
	}
}