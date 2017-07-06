/**
 * 查询页面count.jsp的JS文件
 */
var startTime = $("#startTime").val();// 开始时间
var endTime = $("#endTime").val();// 结束时间
var os = $("#os").val();
var provincelist = new Array();//地区分布列表
var citylist = new Array();
var osTypelist = new Array();//设备分布列表
var durationlist = new Array();//播放时长分布列表
var lockCountlist = new Array();//卡顿次数分布列表
var picDurationlist = new Array();//出画面时间分布列表
var deviceNamelist = new Array();//终端机型分布列表
var oslist = new Array();//操作系统分布列表
var sdklist = new Array();//sdk分布列表
var browserlist = new Array();//浏览器分布列表
var userCLlist = new Array();
var userleavelist = new Array();
var useronlinelist = new Array();
var opentypelist = new Array();

var province_data;
var city_data;
var osType_data;
var duration_data;
var lockCount_data;
var picDuration_data;
var deviceName_data;
var os_data;
var sdk_data;
var browser_data;
var userCL_data;
var userleave_data;
var useronline_data;
var opentype_data;

$(document).ready(function() {
	$('#navTab a').click(function(e) {
	    e.preventDefault();
	    $(this).tab('show');
	});
	var now = new Date().getTime();
	
	var currentTime = formatDate(new Date(now));
	var startTime = formatDate(new Date(now - 30 * 60 * 1000));
	$("#endTime").val(currentTime);
	$("#startTime").val(startTime);
	
	$('.time-picker').datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        language : 'zh-CN',
        minuteStep : 2,
        bootcssVer:3
    });
	$("#element").mLoading({
	    text:"",//加载文字，默认值：加载中...
	    icon:"",//加载图标，默认值：一个小型的base64的gif图片
	    html:false,//设置加载内容是否是html格式，默认值是false
	    content:"",//忽略icon和text的值，直接在加载框中显示此值
	    mask:true//是否显示遮罩效果，默认显示
	}).mLoading("hide").css({
		"z-index":0
	});
	$("#search").click(function(e) {
		e.preventDefault();
		$("#datastate").html("");
		
		$("#province_Content").html("");
		$("#osType_Content").html("");
		$("#duration_Content").html("");
		$("#lock_Content").html("");
		$("#pic_Content").html("");
		$("#deviceName_Content").html("");
		$("#os_Content").html("");
		$("#sdk_Content").html("");
		$("#browser_Content").html("");
		$("#openType_Content").html("");
		
		$("#province_container").html("");
		$("#osType_container").html("");
		$("#duration_container").html("");
		$("#lock_container").html("");
		$("#pic_container").html("");
		$("#deviceName_container").html("");
		$("#os_container").html("");
		$("#sdk_container").html("");
		$("#browser_container").html("");
		$("#userCL_container").html("");
		$("#flow_container").html("");
		$("#userOnline_container").html("");
		$("#openType_container").html("");
		
		$("#lock_user").html("");
		$("#duration_user").html("");
		$("#first_pic_duration_user").html("");
		
		if (checkTime() == true) {
			showStat();
		}
	});
	$("#Android").click(function() {
		showTable(os_data, "os_Content","os","Android");
		showPie("os_container", oslist, "移动终端操作系统版本占比","Android");
	});
	$("#iOS").click(function() {
		showTable(os_data, "os_Content","os","iOS");
		showPie("os_container", oslist, "移动终端操作系统版本占比","iOS");
	});
	$("#Windows").click(function() {
		showTable(os_data, "os_Content","os","Windows");
		showPie("os_container", oslist, "移动终端操作系统版本占比","Windows");
	});
	$("#Mac").click(function() {
		showTable(os_data, "os_Content","os","Mac");
		showPie("os_container", oslist, "移动终端操作系统版本占比","Mac");
	});
	$("#all").click( function() {
		showTable(os_data, "os_Content","os");
		showPie("os_container", oslist, "移动终端操作系统版本占比");
	});

	$("input:hidden").bind("input propertychange",function(){
		//alert();//打印输入框字符长度
	});

	$("#showLockUser").click(function(){
		$("#lock_user").html("");
		showLockUser();
	});

	$("#showTopNUser").click(function(){
		$("#lock_user").html("");
		showTopNUser();
	});
	/** ********************************************** */
	/*// 刷新页面时设置半小时的单选按钮被选中，并设置默认查询半小时以内的记录
	$("#radioFirst").attr("checked", "checked");
	$("#radioLive").attr("checked", "checked");
	setTime(30);
	setPlayType("1");

	// 单击选择时间和播放类型的单选按钮事件
	$(":radio[name='timeradio']").click(function() {
		var minute = $(":radio[name='timeradio'][checked]").val();
		setTime(minute);
	});
	$(":radio[name='playtyperadio']").click(function() {
		var playType = $(":radio[name='playtyperadio'][checked]").val();
		setPlayType(playType);
	});

	function setTime(flag) {
		$("#startTime").val(time(flag));
		$("#endTime").val(time(0));
	}
	
	function setPlayType(flag) {
		$("#playType").val(flag);
	}

	// 初始加载时默认显示标识的一般查询，隐藏与APPKey查询相关的
	$(":radio[id='flag_ordinary']").attr("checked", "checked");
	$("#flag_ordinary_tr").show();// 显示按诊断结果查询
*/});

/**
 * 验证前台两个日期之间不能超过七天
 * @return {Boolean}
 */
function checkTime() {
	var date1 = $("#startTime").val();
	var date2 = $("#endTime").val();
	var tmp = date1.split(" ")[0].split("-");
	var d1 = new Date(tmp[0], tmp[1] - 1, tmp[2]);

	tmp = date2.split(" ")[0].split("-");
	var d2 = new Date(tmp[0], tmp[1] - 1, tmp[2]);
	if ((d2.getTime() - d1.getTime()) > 7 * 24 * 60 * 60 * 1000) {
		alert("只能查询相隔一周之内的数据哦！");
		return false;
	}
	if (d1 > d2) {
		alert('开始时间不能大于结束时间');
		return false;
	}
	return true;
}

function showLockUser(num){
	var startTime = dateToUTC($("#startTime").val());// 开始时间
	var endTime = dateToUTC($("#endTime").val());// 结束时间
	var playType = $("#playType").val();
	var url = $("#aboutURL").val();
	var domain = $("#domain").val();
	var isp = $("#isp").val();
	var openType = $("#openType").val();
	var businessID = $("#aboutBusinessID").val();
	var userName = $("#userName").val();
	var durationSelect = $("#durationSelect").val();
	var duration = $("#duration").val();
	var firstPicDurationSelect = $("#firstPicDurationSelect").val();
	var firstPicDuration = $("#firstPicDuration").val();
	var lockCount = num;
	$.ajax({
		type:"post",
		url : "search.getUserData.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime + "&playType=" + playType + "&url=" + url + "&domain=" + domain + "&isp=" + isp + "&lockCount=" + lockCount +"&service=showLockUser" + 
		"&openType=" + openType + "&businessID=" + businessID + "&userName=" + userName + "&durationSelect=" + durationSelect + "&duration=" + duration + 
		"&firstPicDurationSelect=" + firstPicDurationSelect + "&firstPicDuration=" + firstPicDuration,
		beforeSend : function() {
			$("#element").mLoading("show");
			$("#element").css({
				"z-index":1000
			});
			/*$(".layer").show();*/
		},
		complete : function() {
			$("#element").mLoading("hide");
			$("#element").css({
				"z-index":0
			});
			/*$(".layer").hide();*/
		},
		success : function(data) {
			if (data.result == 0) {
				//拆分数据
				lockCount_data = data.data;

				//以下展示表格
				showUser(lockCount_data,"lock_user","lockCount");
				
			} else {
				$("#datastate").html("此查询条件下无数据返回，请更换查询条件试试~~");
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function showFirstPicDurationUser(firstPicMin,firstPicMax){
	var startTime = dateToUTC($("#startTime").val());// 开始时间
	var endTime = dateToUTC($("#endTime").val());// 结束时间
	var playType = $("#playType").val();
	var url = $("#aboutURL").val();
	var domain = $("#domain").val();
	var isp = $("#isp").val();
	var openType = $("#openType").val();
	var businessID = $("#aboutBusinessID").val();
	var userName = $("#userName").val();
	var durationSelect = $("#durationSelect").val();
	var duration = $("#duration").val();
	var firstPicDurationSelect = $("#firstPicDurationSelect").val();
	var firstPicDuration = $("#firstPicDuration").val();
	var min = firstPicMin;
	var max = firstPicMax;
	$.ajax({
		type:"post",
		url : "search.getUserData.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime + "&playType=" + playType + "&url=" + url + "&domain=" + domain + "&isp=" + isp + "&firstPicMin=" + min + "&firstPicMax=" + max + "&service=showFirstPicDurationUser" + 
		"&openType=" + openType + "&businessID=" + businessID + "&userName=" + userName + "&durationSelect=" + durationSelect + "&duration=" + duration + 
		"&firstPicDurationSelect=" + firstPicDurationSelect + "&firstPicDuration=" + firstPicDuration,
		beforeSend : function() {
			$("#element").mLoading("show");
			$("#element").css({
				"z-index":1000
			});
		},
		complete : function() {
			$("#element").mLoading("hide");
			$("#element").css({
				"z-index":0
			});
		},
		success : function(data) {
			if (data.result == 0) {
				//拆分数据
				lockCount_data = data.data;
				//以下展示表格
				showUser(lockCount_data,"first_pic_duration_user","firstPicDurationUser");
			} else {
				$("#datastate").html("此查询条件下无数据返回，请更换查询条件试试~~");
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function showTopNUser(){
	var startTime = dateToUTC($("#startTime").val());// 开始时间
	var endTime = dateToUTC($("#endTime").val());// 结束时间
	var playType = $("#playType").val();
	var url = $("#aboutURL").val();
	var domain = $("#domain").val();
	var isp = $("#isp").val();
	var openType = $("#openType").val();
	var businessID = $("#aboutBusinessID").val();
	var userName = $("#userName").val();
	var durationSelect = $("#durationSelect").val();
	var duration = $("#duration").val();
	var firstPicDurationSelect = $("#firstPicDurationSelect").val();
	var firstPicDuration = $("#firstPicDuration").val();
	$.ajax({
		type:"post",
		url : "search.getUserData.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime + "&playType=" + playType + "&url=" + url + "&domain=" + domain + "&isp=" + isp + "&service=showTopNUser" + 
		"&openType=" + openType + "&businessID=" + businessID + "&userName=" + userName + "&durationSelect=" + durationSelect + "&duration=" + duration + 
		"&firstPicDurationSelect=" + firstPicDurationSelect + "&firstPicDuration=" + firstPicDuration,
		beforeSend : function() {
			$("#element").mLoading("show");
			$("#element").css({
				"z-index":1000
			});
			/*$(".layer").show();*/
		},
		complete : function() {
			$("#element").mLoading("hide");
			$("#element").css({
				"z-index":0
			});
			/*$(".layer").hide();*/
		},
		success : function(data) {
			if (data.result == 0) {
				//拆分数据
				lockCount_data = data.data;
				//以下展示表格
				showUser(lockCount_data,"duration_user","durationUser");
			} else {
				$("#datastate").html("此查询条件下无数据返回，请更换查询条件试试~~");
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 展示页面中的表格和饼图
 * 
 */
function showStat() {
	var startTime = dateToUTC($("#startTime").val());// 开始时间
	var endTime = dateToUTC($("#endTime").val());// 结束时间
	var playType = $("#playType").val();
	var url = $("#aboutURL").val();
	var domain = $("#domain").val();
	var isp = $("#isp").val();
	var openType = $("#openType").val();
	var businessID = $("#aboutBusinessID").val();
	var userName = $("#userName").val();
	var durationSelect = $("#durationSelect").val();
	var duration = $("#duration").val();
	var firstPicDurationSelect = $("#firstPicDurationSelect").val();
	var firstPicDuration = $("#firstPicDuration").val();
	$.ajax({
		type : "post",
		url : "search.getGraghData.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime + "&playType=" + playType + "&url=" + url + "&domain=" + domain + "&isp=" + isp + 
		"&openType=" + openType + "&businessID=" + businessID + "&userName=" + userName + "&durationSelect=" + durationSelect + "&duration=" + duration + 
		"&firstPicDurationSelect=" + firstPicDurationSelect + "&firstPicDuration=" + firstPicDuration,
		beforeSend : function() {
			$("#element").mLoading("show");
			$("#element").css({
				"z-index":1000
			});
		},
		complete : function() {
			$("#element").mLoading("hide");
			$("#element").css({
				"z-index":0
			});
		},
		success : function(data) {
			if (data.result == 0) {
				var totalCount = data.data.totalCount;
				$("#totalCount").val(totalCount);
				//拆分数据
				if(domain == "" || domain == null){
					province_data = data.data.province.rows;
				}else{
					province_data = data.data.city.rows;
				}
				
				osType_data = data.data.osType.rows;
				duration_data = data.data.duration.rows;
				lockCount_data = data.data.lockCount.rows;
				picDuration_data = data.data.firstPicDuration.rows;
				deviceName_data = data.data.deviceName.rows;
				os_data = data.data.osVersion.rows;
				sdk_data = data.data.playerSDK.rows;
				browser_data = data.data.browserVersion.rows;
				userCL_data = data.data.userCome.rows;
				userleave_data = data.data.userLeave.rows;
				useronline_data = data.data.userOnline.rows;
				opentype_data = data.data.openType.rows;
						
				//向饼图需要的数据列表中填充数据
				provincelist = fillList(province_data);
				osTypelist = fillList(osType_data);
				durationlist = fillList(duration_data);
				lockCountlist = fillList(lockCount_data);
				picDurationlist = fillList(picDuration_data);
				deviceNamelist = fillList(deviceName_data);
				oslist = fillList(os_data);
				sdklist = fillList(sdk_data);
				browserlist = fillList(browser_data);
				opentypelist = fillList(opentype_data);
				
				//向曲线图需要的数据列表中填充数据
				userCLlist = fillListWithDate(userCL_data);
				userleavelist = fillListWithDate(userleave_data);
				useronlinelist = fillListWithDate(useronline_data);

				//以下展示表格
				showTable(province_data, "province_Content","province");
				showTable(osType_data, "osType_Content","osType");
				showTable(duration_data, "duration_Content","duration");
				showTable(lockCount_data, "lock_Content","lockCount");
				showTable(picDuration_data, "pic_Content","picDuration");
				showTable(deviceName_data, "deviceName_Content","deviceName");
				showTable(os_data, "os_Content","os");
				showTable(sdk_data, "sdk_Content","sdk");
				showTable(browser_data, "browser_Content","browser");
				showTable(opentype_data, "openType_Content","openType1");
				
						
				//以下展示饼图
				showPie("province_container", provincelist, "地区占比");
				showPie("osType_container", osTypelist, "操作系统分布占比");
				showPie("duration_container", durationlist, "播放时长占比");
				showPie("lock_container", lockCountlist, "卡顿次数占比");
				showPie("pic_container", picDurationlist, "出画面时长占比");
				showPie("deviceName_container", deviceNamelist, "移动终端型号占比");
				showPie("os_container", oslist, "移动终端操作系统版本占比");
				showPie("sdk_container", sdklist, "SDK使用量占比");
				showPie("browser_container", browserlist, "浏览器版本占比");
				showPie("openType_container", opentypelist, "打开方式占比");
				
				//以下展示曲线
				showCurve1("userCL_container",userCLlist.concat(userleavelist).concat(useronlinelist),"用户进入/离开/在线曲线",3);
				showCurve2("flow_container",useronlinelist,"流量曲线",1);
				//showCurve2("userOnline_container",useronlinelist,"在线用户曲线",1);
				
			} else {
				$("#datastate").html("此查询条件下无数据返回，请更换查询条件试试~~");
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function showUser(list,mainid,id){
	var list = list;
	
	var tableStr = "<table id='userTab' class='table table-striped'>";
	tableStr = tableStr + "<thead><tr><th>用户名</th><th>打开方式</th><th>浏览器</th><th>开始时间</th><th>结束时间</th><th>微频道</th>" +
			"<th>一级行政单位</th><th>二级行政单位</th><th>卡顿次数</th><th>播放时长(s)</th><th>播放器SDK类型</th><th>设备型号</th><th>操作系统版本</th></tr></thead><tbody id=" + id + ">";
	
	for ( var i = 0; i< list.length; i++) {
		tableStr = tableStr + "<tr><td>" + list[i].userName + "</td>"
				+ "<td>" + list[i].openType
				+ "<td>" + list[i].browserVersion
				+ "<td>" + list[i].startTime
				+ "<td>" + list[i].endTime
				+ "<td>" + list[i].businessID
				+ "<td>" + list[i].province
				+ "<td>" + list[i].city
				+ "<td>" + list[i].lockCount
				+ "<td>" + list[i].duration/*
				+ "<td>" + list[i].first_pic_duration_avg*/
				+ "<td>" + list[i].playerSDKType
				+ "<td>" + list[i].deviceName
				+ "<td>" + list[i].osVersion
				+ "</td></tr>";
	}
		
	tableStr = tableStr + "</tbody></table>";
	$("#" + mainid).html(tableStr);
	// 将相邻两个相同的单元格合并
	/*mc('dataTab', 0, 0, 0);
	if(id == "deviceName" || id == "province" || id == "os" || id == "browser"){
		orderasc(1,id);
	}*/
}

/**
 * 展示页面左侧的表格
 * @param list 数据列表，格式：JSON数据
 * @param mainid 表格所在页面的div名称
 * 
 */
function showTable(list, mainid,id,filter) {
	var list = list;
	
	var tableStr = "<table id='dataTab' class='table table-striped'>";
	tableStr = tableStr + "<thead><tr><th>类别</th><th>累计次数</th></tr></thead><tbody id=" + id + ">";
	if(filter){
		for ( var key in list) {
			if(-1 != list[key].description.toLowerCase().indexOf(filter.toLowerCase())){
				tableStr = tableStr + "<tr><td>" + list[key].description + "</td>"
				+ "<td>" + list[key].cols[0].values.sample_number.value
				+ "</td></tr>";
			}
		}
	}else{
		for ( var key in list) {
			tableStr = tableStr + "<tr><td>" + list[key].description + "</td>"
					+ "<td>" + list[key].cols[0].values.sample_number.value
					+ "</td></tr>";
		}
	}
	
	tableStr = tableStr + "</tbody></table>";
	$("#" + mainid).html(tableStr);
	// 将相邻两个相同的单元格合并
	mc('dataTab', 0, 0, 0);
	if(id == "deviceName" || id == "province" || id == "osType" || id == "os" || id == "browser" || id == "openType1"){
		orderasc(1,id);
	}
}

function orderasc(flag,id) {
	var tbody = document.getElementById(id);
	var trs = tbody.children;
	for ( var i = 0; i < trs.length - 1; i++) {
		for ( var j = 0; j < trs.length - i - 1; j++) {
			var tr1 = trs[j];
			var tr2 = trs[j + 1];
			
			var td1i = parseInt(tr1.children[1].innerHTML, 10);
			var td2i = parseInt(tr2.children[1].innerHTML, 10);

			if (flag == 0) {
				if (td1i > td2i) {
					tbody.insertBefore(tr2, tr1);
				}
			} else {
				if (td1i < td2i) {
					tbody.insertBefore(tr2, tr1);
				}
			}
		}
	}
}

/**
 * 向饼图需要的数据列表中填充数据，这些数组为全局变量
 * @param sourceList 源数据，格式：JSON
 * @returns desList 绘制饼图需要的数据列表，格式：[["类别名1",次数],["类别名2",次数],["类别名3",次数],…]
 */
function fillList(sourceList){
	var list = sourceList;
	var desList = new Array();
	var count = 0;
	for ( var key in list) {
		if(key != "-2" && key != "-1"){
			desList[count] = [list[key].name,list[key].cols[0].values.sample_number.value ];
			count = count + 1;
		}
	}
	return desList;
}

function fillListWithDate(sourceList){
	var list = sourceList;
	var desList = new Array();
	var count = 0;
	for ( var key in list) {
		if(key != "-2" && key != "-1"){
			desList[count] = [parseInt(list[key].name) + 8 * 60 * 60000,list[key].cols[0].values.sample_number.value ];
			count = count + 1;
		}
	}
	return desList;
}

/**
 * 展示曲线1
 * @param data_list 数据列表，格式：[["类别名1",次数],["类别名2",次数],["类别名3",次数],…]
 * @param div_name 表格所在页面的div名称
 * @param title 曲线图大标题
 */
function showCurve1(div_name,data_list,title,totalGroup){
	var data = new Array();
	var size = 0;
	for(var i = 0; i < totalGroup; i++){
		data[i] = data_list.slice(size, size + data_list.length / totalGroup);
		size = size + data_list.length / totalGroup;
	}
	$('#' + div_name).highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: '人数'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%b. %e %H:%M:%S} {point.y} 人'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: '用户进入',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: data[0]
        },{
            name: '用户退出',
            data: data[1]
        },{
            name: '在线用户',
            data: data[2]
        }]
    });
}

function compute(){
	var bitRate = $("#flow").val();
	if(bitRate == null || bitRate == ""){
		bitRate = 1;
	}
	showCurve2("flow_container",useronlinelist,"流量曲线",bitRate);
}
/**
 * 展示曲线2
 * @param data_list 数据列表，格式：[["类别名1",次数],["类别名2",次数],["类别名3",次数],…]
 * @param div_name 表格所在页面的div名称
 * @param title 曲线图大标题
 */
function showCurve2(div_name,data_list,title,bitRate){
	if(bitRate == null){
		bitRate = 1;
	}
	var data_arr = [];
	for(var i = 0; i < data_list.length; i++){
		var newele = data_list[i].slice(0);
		data_arr[i] = newele;
	}
	for(var i = 0; i < data_arr.length; i++){
		data_arr[i][1] = data_arr[i][1] * bitRate;
	}
	$('#' + div_name).highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'MB'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y} MB'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: '流量曲线',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: data_arr
        }]
    });
}

/**
 * 展示页面右侧的饼图
 * @param data_list 数据列表，格式：[["类别名1",次数],["类别名2",次数],["类别名3",次数],…]
 * @param div_name 表格所在页面的div名称
 * @param title 饼图大标题
 * 
 */
function showPie(div_name,data_list,title,filter){
	var dataToBeShow = [];
	if(filter){
		for(var i = 0; i < data_list.length; i++){
			if(-1 != data_list[i].name.toLowerCase().indexOf(filter.toLowerCase())){
				dataToBeShow.push(data_list[i]);
			}
		}
	}else{
		dataToBeShow = data_list;
	}
	
	$('#' + div_name).highcharts({
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false
		},
		title : {
			text : null
		},
		tooltip : {
			pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : true,
					color : '#000000',
					connectorColor : '#000000',
					format : '<b>{point.name}</b>: {point.percentage:.1f} %'
				},
				events:{
					click: function(e){
						if(div_name == "lock_container"){
							$("#lock_user").html("");
							/*for(var i in e.point){
								alert(i + "------" + e.point[i]);
							}*/
							//alert(e.point.name);
							//alert(typeof e.point);
							showLockUser(e.point.name);
						}else if(div_name == "pic_container"){
							$("#first_pic_duration_user").html("");
							/*for(var i in e.point){
								alert(i + "------" + e.point[i]);
							}*/
							//alert(e.point.name);
							//alert(typeof e.point);
							//alert(e.point.x);
							showFirstPicDurationUser(e.point.name.split("-")[0],e.point.name.split("-")[1]);
						}
					}
				}
			}
		},
		series : [ {
			type : 'pie',
			name : '比例',
			data : dataToBeShow
		} ]
	});
}

/**
 * 点击快捷按钮时，为时间文本域设置时间
 * @param flag
 */
function setTime(flag) {
	$("#startTime").val(time(flag));
	$("#endTime").val(time(0));
}

/**
 * 对JSON数据中的list按关键字排序
 * @param list 数据列表，格式：JSON数据
 * @param rev 先序还是后续
 * 
 */
var sortBy = function(filed, rev, primer) {
	rev = (rev) ? -1 : 1;
	return function(a, b) {
		a = a[filed];
		b = b[filed];
		if (typeof (primer) != 'undefined') {
			a = primer(a);
			b = primer(b);
		}
		if (a < b) {
			return rev * -1;
		}
		if (a > b) {
			return rev * 1;
		}
		return 1;
	};
};

/**
 * 单元格合并：相邻单元格如果内容相同则合并
 * @param tableId 表格在HTML页面中的ID
 * @param startRow 起始行
 * @param endRow 终结行
 * @param col 单元格位置
 * 
 */
function mc(tableId, startRow, endRow, col) {
	var tb = document.getElementById(tableId);
	if (col >= tb.rows[0].cells.length) {
		return;
	}
	if (col == 0) {
		endRow = tb.rows.length - 1;
	}
	for ( var i = startRow; i < endRow; i++) {
		if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {
			tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);
			tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
			if (i == endRow - 1 && startRow != endRow) {
				mc(tableId, startRow, endRow, col + 1);
			}
		} else {
			mc(tableId, startRow, i + 0, col + 1);
			startRow = i + 1;
		}
	}
}

/**
 * 将以下格式的字符串转化为UTC时间(国际标准时间) 数据格式为“2015-1-14 14:32:45:165”
 * @param {}time 返回的是毫秒
 * 
 */
function dateToUTC(time) {
	var times = time;
	var year;// 年
	var month;// 月
	var day;// 日
	var hours;// 时
	var minutes;// 分
	var seconds;// 秒
	if (times != undefined && times != null && times !== "") {
		var timesArr01 = times.split(' ');
		if (timesArr01 != undefined && timesArr01 != null && timesArr01 !== "") {
			if (timesArr01[0] != undefined && timesArr01[0] != null
					&& timesArr01[0] !== "") {
				var timesArr01_01 = timesArr01[0].split('-');

				if (timesArr01_01 != undefined && timesArr01_01 != null
						&& timesArr01_01 !== "") {
					year = timesArr01_01[0];// 年
					month = timesArr01_01[1];// 月
					day = timesArr01_01[2];// 日
				}

			}
			if (timesArr01[1] != undefined && timesArr01[1] != null
					&& timesArr01[1] !== "") {
				var timesArr01_02 = timesArr01[1].split(':');
				if (timesArr01_02 != undefined && timesArr01_02 != null
						&& timesArr01_02 !== "") {
					hours = timesArr01_02[0];// 时
					minutes = timesArr01_02[1];// 分
					seconds = timesArr01_02[2];// 秒
				}

			}

			if (year != undefined && year != null && year !== ""
					&& month != undefined && month != null && month !== ""
					&& day != undefined && day != null && day !== ""
					&& hours != undefined && hours != null && hours !== ""
					&& minutes != undefined && minutes != null
					&& minutes !== "" && seconds != undefined
					&& seconds != null && seconds !== "") {
				return Date.UTC(year, (month - 1), day, hours, minutes, seconds) - 8*60*60*1000;
			}
		}
	}
}

/**
 * 数组去重
 * 
 */
Array.prototype.unique = function() {
	var res = [ this[0] ];
	for ( var i = 1; i < this.length; i++) {
		var repeat = false;
		for ( var j = 0; j < res.length; j++) {
			if (this[i] == res[j]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			res.push(this[i]);
		}
	}
	return res;
};

function sortTable(){
	alert();
}

function paiXu ()
{
    var tabNode = document.getElementsByTagName ("table")[0];
    var trs = tabNode.rows;
    var arr = new Array;
    for ( var x = 0; x < trs.length; x++)
    {
        arr.push (trs[x]);
    }
    sortt (arr);
    for ( var x = 0; x < arr.length; x++)
    {
        tabNode.tBodies[0].appendChild (arr[x]);
    }
}
 
function sortt (arr)
{
    for ( var x = 0; x < arr.length; x++)
    {
        for ( var y = x + 1; y < arr.length; y++)
        {
            if (parseInt (arr[x].cells[1].childNodes[0].nodeValue) <= parseInt (arr[y].cells[1].childNodes[0].nodeValue))
            {
                var tmp = arr[x];
                arr[x] = arr[y];
                arr[y] = tmp;
            }
        }
    }
}

function getNowFormatDate(minite) {
	var timestamp = new Date().getTime() + minite * 60 * 1000;
	var newDate = new Date();
	newDate.setTime(timestamp);
}

function   formatDate(now)   {     
    var   year=new Date().getFullYear();
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;     
} 