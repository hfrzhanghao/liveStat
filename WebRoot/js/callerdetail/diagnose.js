/**
 * 通话详情callDetail.jsp页面中“网络诊断”标签页面的JS效果 
 *包括“道路切换、浪涌等的视图”、“诊断过程数据”、“诊断结果修改”
 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#diagnose01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.diagnose_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.diagnose_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
		
var reportData;//保存查询出的话务报表		
/**
 * “诊断结果”标签页，主叫端数据，诊断结果修改及诊断过程数据
 * @param {} data
 */
function diagnoseView_zb(datas){
	
	reportData = datas;//保存查询出的话务报表	
	getCallInfo();//获取sid sTime eTime，供按标识查询使用diagnoseRetNew_zb和diagnoseRetNew_bz
	
	//1、将“带宽自适应调节的第一个图”在“网络诊断”上再显示一次，方便对比查看
	//调用highstock的视图
	//包含“道路切换、浪涌、设置最大带宽、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频”等视图，主叫端	
	if(pathSwitch_zbUTC!=undefined&&pathSwitch_zbUTC!=null&&pathSwitch_zbUTC!==""&&pathSwitch_zbUTC.length>0||
		audioOverFlow_zbUTC!=undefined&&audioOverFlow_zbUTC!=null&&audioOverFlow_zbUTC!==""&&audioOverFlow_zbUTC.length>0||
		//cur_device_info_cpu_bzUTC!=undefined&&cur_device_info_cpu_bzUTC!=null&&cur_device_info_cpu_bzUTC!==""&&cur_device_info_cpu_bzUTC.length>0||
		//cur_device_info_render_fr_bzUTC!=undefined&&cur_device_info_render_fr_bzUTC!=null&&cur_device_info_render_fr_bzUTC!==""&&cur_device_info_render_fr_bzUTC.length>0||
		set_max_bw_zbUTC!=undefined&&set_max_bw_zbUTC!=null&&set_max_bw_zbUTC!==""&&set_max_bw_zbUTC.length>0||
		cpu_zbUTC!=undefined&&cpu_zbUTC!=null&&cpu_zbUTC!==""&&cpu_zbUTC.length>0||
		cpu_bzUTC!=undefined&&cpu_bzUTC!=null&&cpu_bzUTC!==""&&cpu_bzUTC.length>0||
		signal_zbUTC!=undefined&&signal_zbUTC!=null&&signal_zbUTC!==""&&signal_zbUTC.length>0||
		signal_bzUTC!=undefined&&signal_bzUTC!=null&&signal_bzUTC!==""&&signal_bzUTC.length>0||
		dataArr071_zb!=undefined&&dataArr071_zb!=null&&dataArr071_zb!==""&&dataArr071_zb.length>0||
		decode_f_bzUTC!=undefined&&decode_f_bzUTC!=null&&decode_f_bzUTC!==""&&decode_f_bzUTC.length>0||
		a_null_lev_bzUTC!=undefined&&a_null_lev_bzUTC!=null&&a_null_lev_bzUTC!==""&&a_null_lev_bzUTC.length>0){
			console.info("执行了诊断结果上部第一个图，与带宽自适应顶部第一个图数据主叫端为同一个图");
			highstockView_zb01("diagnose_main1_zb01");
	}else{
		$("#diagnose_main1_zb01").html("未获取道路切换、浪涌、设置最大带宽、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频的相关数据信息，故无图形数据展示。");
	}
	
	//“诊断过程数据”主叫端视图
	diagnoseTab_zb(datas);
		
  	//最初诊断结果，主叫端
	diagnoseRetOld_zb(datas);
	
	//修改后的诊断结果，主叫端，上行
	diagnoseRetNew_zb_up();
	//修改后的诊断结果，主叫端，下行
	diagnoseRetNew_zb_down();
}

/**
 * “诊断结果”标签页，被叫端数据，诊断结果修改及诊断过程数据
 * @param {} data
 */
function diagnoseView_bz(datas){
	
	//1、将“带宽自适应调节的第一个图”在“网络诊断”上再显示一次，方便对比查看
	//包含“道路切换、浪涌、设置最大带宽、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频”等视图，被叫端	
	if(pathSwitch_bzUTC!=undefined&&pathSwitch_bzUTC!=null&&pathSwitch_bzUTC!==""&&pathSwitch_bzUTC.length>0||
		audioOverFlow_bzUTC!=undefined&&audioOverFlow_bzUTC!=null&&audioOverFlow_bzUTC!==""&&audioOverFlow_bzUTC.length>0||
		//cur_device_info_cpu_zbUTC!=undefined&&cur_device_info_cpu_zbUTC!=null&&cur_device_info_cpu_zbUTC!==""&&cur_device_info_cpu_zbUTC.length>0||
		//cur_device_info_render_fr_zbUTC!=undefined&&cur_device_info_render_fr_zbUTC!=null&&cur_device_info_render_fr_zbUTC!==""&&cur_device_info_render_fr_zbUTC.length>0||
		set_max_bw_bzUTC!=undefined&&set_max_bw_bzUTC!=null&&set_max_bw_bzUTC!==""&&set_max_bw_bzUTC.length>0||
		cpu_bzUTC!=undefined&&cpu_bzUTC!=null&&cpu_bzUTC!==""&&cpu_bzUTC.length>0||
		cpu_zbUTC!=undefined&&cpu_zbUTC!=null&&cpu_zbUTC!==""&&cpu_zbUTC.length>0||
		signal_bzUTC!=undefined&&signal_bzUTC!=null&&signal_bzUTC!==""&&signal_bzUTC.length>0||
		signal_zbUTC!=undefined&&signal_zbUTC!=null&&signal_zbUTC!==""&&signal_zbUTC.length>0||
		dataArr071_bz!=undefined&&dataArr071_bz!=null&&dataArr071_bz!==""&&dataArr071_bz.length>0||
		decode_f_zbUTC!=undefined&&decode_f_zbUTC!=null&&decode_f_zbUTC!==""&&decode_f_zbUTC.length>0||
		a_null_lev_zbUTC!=undefined&&a_null_lev_zbUTC!=null&&a_null_lev_zbUTC!==""&&a_null_lev_zbUTC.length>0){
			console.info("执行了诊断结果上部第一个图，与带宽自适应顶部第一个图数据被叫端为同一个图");
			highstockView_bz01("diagnose_main1_bz01");
	}else{
		$("#diagnose_main1_bz01").html("未获取道路切换、浪涌、设置最大带宽、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频的相关数据信息，故无图形数据展示。");
	}
	
	
	//“诊断过程数据”被叫端视图
	diagnoseTab_bz(datas);
	
  	//最初诊断结果，被叫端
	diagnoseRetOld_bz(datas);
	
	//修改后的诊断结果，被叫端，上行
	diagnoseRetNew_bz_up();
	//修改后的诊断结果，被叫端，下行
	diagnoseRetNew_bz_down();
}

/**
 * 诊断过程数据主叫端
 * @param {} datas
 */
function diagnoseTab_zb(datas){
	var html = "";
	var result = datas.result;
	
	var detect_target;//探测目标
	var target_type;//目标类型
	//探测参数
	var size;//探测大小
	var band;//探测带宽
	//探测结果
	var loss;//丢包率
	var delay;//延时
	var jitter;//抖动
	var band_result;//结果带宽
	var direction;//方向
	//探测时间
	var detect_time;//探测时间
	
	html += "<table class='detailTable'>" +
				"<caption><center><b>诊断过程数据</b></center></caption>" +
				"<tr>" +
					"<th rowspan='2'>序号</th>" +
					"<th rowspan='2'>探测目标</th>" +
					"<th rowspan='2'>目标类型</th>" +
					"<th colspan='2'>探测参数</th>" +
					"<th colspan='5'>探测结果</th>" +
					"<th rowspan='2'>探测时间</th>" +
				"</tr>" +
				"<tr>" +
					"<th>size(kbps)</th>" +
					"<th>band(kbps)</th>" +
					"<th>loss(%)</th>" +
					"<th>delay(ms)</th>" +
					"<th>jitter(ms)</th>" +
					"<th>band(kbps)</th>" +
					"<th>direction</th>" +
				"</tr>";
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var diagnose = call.diagnose;
					if(diagnose!=undefined&&diagnose!=null&&diagnose!==""&&(diagnose instanceof Array)&&diagnose.length>0){
						$.each(diagnose,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var varArr = splitString(val);
								if(varArr!=undefined&&varArr!=null&&varArr!==""&&(varArr instanceof Array)&&varArr.length>0){
									$.each(varArr,function(j,va){
										var vaArr = va.split("=");
										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
											if(vaArr[0]=="detect_target"){
												detect_target = vaArr[1];
											}
											if(vaArr[0]=="target_type"){
												target_type = vaArr[1];
											}
											if(vaArr[0]=="size"){
												size = vaArr[1];
											}
											if(vaArr[0]=="band"){
												band = vaArr[1];
											}
											if(vaArr[0]=="loss"){
												loss = vaArr[1];
											}
											if(vaArr[0]=="delay"){
												delay = vaArr[1];
											}
											if(vaArr[0]=="jitter"){
												jitter = vaArr[1];
											}
											if(vaArr[0]=="band_result"){
												band_result = vaArr[1];
											}
											if(vaArr[0]=="direction"){
												direction = vaArr[1];
											}
											if(vaArr[0]=="detect_time"){
												detect_time = vaArr[1];
											}
											
											if(detect_target==undefined||detect_target==null||detect_target===""){
												detect_target = "无";
											}
											if(target_type==undefined||target_type==null||target_type===""){
												target_type = "无";
											}
											if(size==undefined||size==null||size===""){
												size = "无";
											}
											if(band==undefined||band==null||band===""){
												band = "无";
											}
											if(loss==undefined||loss==null||loss===""){
												loss = "无";
											}
											if(delay==undefined||delay==null||delay===""){
												delay = "无";
											}
											if(jitter==undefined||jitter==null||jitter===""){
												jitter = "无";
											}
											if(band_result==undefined||band_result==null||band_result===""){
												band_result = "无";
											}
											if(direction==undefined||direction==null||direction===""){
												direction = "无";
											}
											if(detect_time==undefined||detect_time==null||detect_time===""){
												detect_time = "无";
											}
										}
									});
									html += "<tr>" +
											"<td>"+i+"</td>" +
											"<td>"+detect_target+"</td>" +
											"<td>"+target_type+"</td>" +
											"<td>"+size+"</td>" +
											"<td>"+band+"</td>" +
											"<td>"+loss+"</td>" +
											"<td>"+delay+"</td>" +
											"<td>"+jitter+"</td>" +
											"<td>"+band_result+"</td>" +
											"<td>"+direction+"</td>" +
											"<td>"+detect_time+"</td>" +
											"</tr>";
								}
							}
						});
					}
				}
			}
		}
	}else{
		html += "<tr><td colspan='11'>未获取相关数据</td></tr></table>";
	}
	$('#diagnose_main1_zb04').html(html);
}

/**
 * 诊断过程数据被叫端
 * @param {} datas
 */
function diagnoseTab_bz(datas){
	var html = "";
	var result = datas.result;
	
	var detect_target;//探测目标
	var target_type;//目标类型
	//探测参数
	var size;//探测大小
	var band;//探测带宽
	//探测结果
	var loss;//丢包率
	var delay;//延时
	var jitter;//抖动
	var band_result;//结果带宽
	var direction;//方向
	//探测时间
	var detect_time;//探测时间
	
	html += "<table class='detailTable'>" +
				"<caption><center><b>诊断过程数据</b></center></caption>" +
				"<tr>" +
					"<th rowspan='2'>序号</th>" +
					"<th rowspan='2'>探测目标</th>" +
					"<th rowspan='2'>目标类型</th>" +
					"<th colspan='2'>探测参数</th>" +
					"<th colspan='5'>探测结果</th>" +
					"<th rowspan='2'>探测时间</th>" +
				"</tr>" +
				"<tr>" +
					"<th>size(kbps)</th>" +
					"<th>band(kbps)</th>" +
					"<th>loss(%)</th>" +
					"<th>delay(ms)</th>" +
					"<th>jitter(ms)</th>" +
					"<th>band(kbps)</th>" +
					"<th>direction</th>" +
				"</tr>";
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var diagnose = call.diagnose;
					if(diagnose!=undefined&&diagnose!=null&&diagnose!==""&&(diagnose instanceof Array)&&diagnose.length>0){
						$.each(diagnose,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var varArr = splitString(val);
								if(varArr!=undefined&&varArr!=null&&varArr!==""&&(varArr instanceof Array)&&varArr.length>0){
									$.each(varArr,function(j,va){
										var vaArr = va.split("=");
										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
											if(vaArr[0]=="detect_target"){
												detect_target = vaArr[1];
											}
											if(vaArr[0]=="target_type"){
												target_type = vaArr[1];
											}
											if(vaArr[0]=="size"){
												size = vaArr[1];
											}
											if(vaArr[0]=="band"){
												band = vaArr[1];
											}
											if(vaArr[0]=="loss"){
												loss = vaArr[1];
											}
											if(vaArr[0]=="delay"){
												delay = vaArr[1];
											}
											if(vaArr[0]=="jitter"){
												jitter = vaArr[1];
											}
											if(vaArr[0]=="band_result"){
												band_result = vaArr[1];
											}
											if(vaArr[0]=="direction"){
												direction = vaArr[1];
											}
											if(vaArr[0]=="detect_time"){
												detect_time = vaArr[1];
											}
											
											if(detect_target==undefined||detect_target==null||detect_target===""){
												detect_target = "无";
											}
											if(target_type==undefined||target_type==null||target_type===""){
												target_type = "无";
											}
											if(size==undefined||size==null||size===""){
												size = "无";
											}
											if(band==undefined||band==null||band===""){
												band = "无";
											}
											if(loss==undefined||loss==null||loss===""){
												loss = "无";
											}
											if(delay==undefined||delay==null||delay===""){
												delay = "无";
											}
											if(jitter==undefined||jitter==null||jitter===""){
												jitter = "无";
											}
											if(band_result==undefined||band_result==null||band_result===""){
												band_result = "无";
											}
											if(direction==undefined||direction==null||direction===""){
												direction = "无";
											}
											if(detect_time==undefined||detect_time==null||detect_time===""){
												detect_time = "无";
											}
										}
									});
									html += "<tr>" +
											"<td>"+i+"</td>" +
											"<td>"+detect_target+"</td>" +
											"<td>"+target_type+"</td>" +
											"<td>"+size+"</td>" +
											"<td>"+band+"</td>" +
											"<td>"+loss+"</td>" +
											"<td>"+delay+"</td>" +
											"<td>"+jitter+"</td>" +
											"<td>"+band_result+"</td>" +
											"<td>"+direction+"</td>" +
											"<td>"+detect_time+"</td>" +
											"</tr>";
								}
							}
						});
					}
				}
			}
		}
	}else{
		html += "<tr><td colspan='11'>未获取相关数据</td></tr></table>";
	}
	$('#diagnose_main1_bz04').html(html);
}

/**
 * 最初诊断结果，主叫端
 * @param {} datas
 */
function diagnoseRetOld_zb(datas){
	var result;
	var htmlUp = "";
	var htmlDown = "";
	var diagnoseRetUp;
	var diagnoseRetDown;
	result = datas.result;
	if(result!=undefined&&result!=null&&result!==""){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var diagnose_result = call.diagnose_result;
					if(diagnose_result!=undefined&&diagnose_result!=null&&diagnose_result!==""){
						var diagnose_result_arr = splitString(diagnose_result);
						if(diagnose_result_arr!=undefined&&diagnose_result_arr!=null&&diagnose_result_arr!==""&&(diagnose_result_arr instanceof Array)&&diagnose_result_arr.length>0){
							$.each(diagnose_result_arr,function(i,val){
								var valArr = val.split("=");
								if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
									if(valArr[0]=="diagnoseRetUp"){
										diagnoseRetUp = valArr[1];
									}
									if(valArr[0]=="diagnoseRetDown"){
										diagnoseRetDown = valArr[1];
									}
								}
							});
						}
					}
				}
			}
		}
	}
	
	if(diagnoseRetUp==undefined||diagnoseRetUp==null||diagnoseRetUp===""){
		diagnoseRetUp = "无";
	}
	if(diagnoseRetDown==undefined||diagnoseRetDown==null||diagnoseRetDown===""){
		diagnoseRetDown = "无";
	}
	
	if(diagnoseRetUp!="无"){
		htmlUp += "<span style='font-size:25px;color:#0000FF;'>上行最初诊断结果："+diagnose_result_map.get(diagnoseRetUp)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;" ;
		$("#diagnose_result_zb_old_up").html(htmlUp);
	}else{
		$("#diagnose_result_zb_old_up").html("上行最初诊断结果：未获取");
	}
	if(diagnoseRetDown!="无"){
		htmlDown += "<span style='font-size:25px;color:#0000FF;'>下行最初诊断结果："+diagnose_result_map.get(diagnoseRetDown)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;" ;
		$("#diagnose_result_zb_old_down").html(htmlDown);
	}else{
		$("#diagnose_result_zb_old_down").html("下行最初诊断结果：未获取");
	}
	
}
/**
 * 最初诊断结果，被叫端
 * @param {} datas
 */
function diagnoseRetOld_bz(datas){
	var result;
	var htmlUp = "";
	var htmlDown = "";
	var diagnoseRetUp;
	var diagnoseRetDown;
	result = datas.result;
	if(result!=undefined&&result!=null&&result!==""){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var diagnose_result = call.diagnose_result;
					if(diagnose_result!=undefined&&diagnose_result!=null&&diagnose_result!==""){
						var diagnose_result_arr = splitString(diagnose_result);
						if(diagnose_result_arr!=undefined&&diagnose_result_arr!=null&&diagnose_result_arr!==""&&(diagnose_result_arr instanceof Array)&&diagnose_result_arr.length>0){
							$.each(diagnose_result_arr,function(i,val){
								var valArr = val.split("=");
								if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
									if(valArr[0]=="diagnoseRetUp"){
										diagnoseRetUp = valArr[1];
									}
									if(valArr[0]=="diagnoseRetDown"){
										diagnoseRetDown = valArr[1];
									}
								}
							});
						}
					}
				}
			}
		}
	}
	
	if(diagnoseRetUp==undefined||diagnoseRetUp==null||diagnoseRetUp===""){
		diagnoseRetUp = "无";
	}
	if(diagnoseRetDown==undefined||diagnoseRetDown==null||diagnoseRetDown===""){
		diagnoseRetDown = "无";
	}
	
	if(diagnoseRetUp!="无"){
		htmlUp += "<span style='font-size:25px;color:#0000FF;'>上行最初诊断结果："+diagnose_result_map.get(diagnoseRetUp)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;" ;
		$("#diagnose_result_bz_old_up").html(htmlUp);
	}else{
		$("#diagnose_result_bz_old_up").html("上行最初诊断结果：未获取");
	}
	
	if(diagnoseRetDown!="无"){
		htmlDown += "<span style='font-size:25px;color:#0000FF;'>下行最初诊断结果："+diagnose_result_map.get(diagnoseRetDown)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;" ;
		$("#diagnose_result_bz_old_down").html(htmlDown);
	}else{
		$("#diagnose_result_bz_old_down").html("下行最初诊断结果：未获取");
	}
}

/**
 * 点击“修改”按钮触发的效果，主叫端上行
 */
$("#update_diagnose_result_zb_up").live("click",function(){
	
	//修改诊断结果时使用的sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[2];
	//修改后的诊断结果值
	var diagnoseRet = $("#diagnose_result_value_zb_up").val();
	
	//当标志为1时，修改主叫或被叫的diagnoseRetUp参数
    //当标志为2时，修改主叫或被叫的diagnoseRetDown参数
	var diagnoseUpOrDown = 1;
	
	$.ajax({
			type : "post",
			url : "search.updateDiagnose.action",
			dataType : "json",
			data : "sid=" + sids + "&diagnoseRet=" + diagnoseRet + "&diagnoseUpOrDown="+diagnoseUpOrDown,
			beforeSend : function() {
				$(".layer").show();
			},
			complete : function() {
				$(".layer").hide();
			},
			success : function(data) {
				var result = data.result;
				if(result===0){
					alert("修改成功！");
					//修改后的诊断结果，主叫端
					diagnoseRetNew_zb_up();
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
});
/**
 * 点击“修改”按钮触发的效果，主叫端下行
 */
$("#update_diagnose_result_zb_down").live("click",function(){
	
	//修改诊断结果时使用的sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[2];
	//修改后的诊断结果值
	var diagnoseRet = $("#diagnose_result_value_zb_down").val();
	
	//当标志为1时，修改主叫或被叫的diagnoseRetUp参数
    //当标志为2时，修改主叫或被叫的diagnoseRetDown参数
	var diagnoseUpOrDown = 2;
	
	$.ajax({
			type : "post",
			url : "search.updateDiagnose.action",
			dataType : "json",
			data : "sid=" + sids + "&diagnoseRet=" + diagnoseRet + "&diagnoseUpOrDown="+diagnoseUpOrDown,
			beforeSend : function() {
				$(".layer").show();
			},
			complete : function() {
				$(".layer").hide();
			},
			success : function(data) {
				var result = data.result;
				if(result===0){
					alert("修改成功！");
					//修改后的诊断结果，主叫端
					diagnoseRetNew_zb_down();
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
});
/**
 * 点击“修改”按钮触发的效果，被叫端上行
 */
$("#update_diagnose_result_bz_up").live("click",function(){
	
	//修改诊断结果时使用的sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[3];
	//修改后的诊断结果值
	var diagnoseRet = $("#diagnose_result_value_bz_up").val();
	
	//当标志为1时，修改主叫或被叫的diagnoseRetUp参数
    //当标志为2时，修改主叫或被叫的diagnoseRetDown参数
	var diagnoseUpOrDown = 1;
	
	$.ajax({
			type : "post",
			url : "search.updateDiagnose.action",
			dataType : "json",
			data : "sid=" + sids + "&diagnoseRet=" + diagnoseRet + "&diagnoseUpOrDown="+diagnoseUpOrDown,
			beforeSend : function() {
				$(".layer").show();
			},
			complete : function() {
				$(".layer").hide();
			},
			success : function(data) {
				var result = data.result;
				if(result===0){
					alert("修改成功！");
					//修改后的诊断结果，被叫端
					diagnoseRetNew_bz_up();
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
});
/**
 * 点击“修改”按钮触发的效果，被叫端下行
 */
$("#update_diagnose_result_bz_down").live("click",function(){
	
	//修改诊断结果时使用的sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[3];
	//修改后的诊断结果值
	var diagnoseRet = $("#diagnose_result_value_bz_down").val();
	
	//当标志为1时，修改主叫或被叫的diagnoseRetUp参数
    //当标志为2时，修改主叫或被叫的diagnoseRetDown参数
	var diagnoseUpOrDown = 2;
	
	$.ajax({
			type : "post",
			url : "search.updateDiagnose.action",
			dataType : "json",
			data : "sid=" + sids + "&diagnoseRet=" + diagnoseRet + "&diagnoseUpOrDown="+diagnoseUpOrDown,
			beforeSend : function() {
				$(".layer").show();
			},
			complete : function() {
				$(".layer").hide();
			},
			success : function(data) {
				var result = data.result;
				if(result===0){
					alert("修改成功！");
					//修改后的诊断结果，被叫端
					diagnoseRetNew_bz_down();
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
});

/**
 *　修改后的诊断结果，从查询接口里取，主叫端上行
 */
function diagnoseRetNew_zb_up(){
	//单边查询时sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[2];
	var currPage = 1;//当前页
	var reportType = 1;//1:全部 2:视频 3:仅音频 4:Flash
	var pageSize = 25;//每页显示的记录数
	var callType;//查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	var call;//主叫或被叫的视讯号
	
	callType = 1;//查询类型  1:按主叫查询 2:按被叫查询 3:按主/被查询
	call = sid.split("_")[2];
	
	var diagnoseUpOrDown = 1;//全部0，上行1，下行2
	
	/**
	* @callType 查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	* @call 主叫或被叫的视讯号
	* @sid　会话id
	* @startTime 通话开始时间
	* @endTime 通过结束时间
	* @isCaller true:按主叫查询 false:按被叫查询
	* @currPage 当前页
	* @reportType 1:全部 2:视频 3:仅音频 4:Flash
	* @pageSize　每页显示的记录数
	*/
	$.ajax({
		type : "post",
		url : "search.aboutID.action",
		dataType : "json",
		data : "call=" + call + "&callType=" + callType + "&sid=" + sids+"&startTime=" + sTime + "&endTime=" + eTime
				+ "&diagnoseUpOrDown="+diagnoseUpOrDown+ "&currPage=" + currPage+"&reportType="+reportType+"&pageSize="+pageSize,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//局部刷新诊断结果的值
			var direction = "zb";
			showDiagnoseRet(data,direction,diagnoseUpOrDown);
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
 *　修改后的诊断结果，从查询接口里取，主叫端下行
 */
function diagnoseRetNew_zb_down(){
	//单边查询时sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[2];
	var currPage = 1;//当前页
	var reportType = 1;//1:全部 2:视频 3:仅音频 4:Flash
	var pageSize = 25;//每页显示的记录数
	var callType;//查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	var call;//主叫或被叫的视讯号
	
	callType = 1;//查询类型  1:按主叫查询 2:按被叫查询 3:按主/被查询
	call = sid.split("_")[2];
	
	var diagnoseUpOrDown = 2;//全部0，上行1，下行2
	
	/**
	* @callType 查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	* @call 主叫或被叫的视讯号
	* @sid　会话id
	* @startTime 通话开始时间
	* @endTime 通过结束时间
	* @isCaller true:按主叫查询 false:按被叫查询
	* @currPage 当前页
	* @reportType 1:全部 2:视频 3:仅音频 4:Flash
	* @pageSize　每页显示的记录数
	*/
	$.ajax({
		type : "post",
		url : "search.aboutID.action",
		dataType : "json",
		data : "call=" + call + "&callType=" + callType + "&sid=" + sids+"&startTime=" + sTime + "&endTime=" + eTime
				+ "&diagnoseUpOrDown="+diagnoseUpOrDown+ "&currPage=" + currPage+"&reportType="+reportType+"&pageSize="+pageSize,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//局部刷新诊断结果的值
			var direction = "zb";
			showDiagnoseRet(data,direction,diagnoseUpOrDown);
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
 *　修改后的诊断结果，从查询接口里取，被叫端上行
 */
function diagnoseRetNew_bz_up(){
	//单边查询时sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[3];
	var currPage = 1;//当前页
	var reportType = 1;//1:全部 2:视频 3:仅音频 4:Flash
	var pageSize = 25;//每页显示的记录数
	var callType;//查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	var call;//主叫或被叫的视讯号
	
	callType = 2;//查询类型  1:按主叫查询 2:按被叫查询 3:按主/被查询
	call = sid.split("_")[3];
	
	var diagnoseUpOrDown = 1;//全部0，上行1，下行2
	
	/**
	* @callType 查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	* @call 主叫或被叫的视讯号
	* @sid　会话id
	* @startTime 通话开始时间
	* @endTime 通过结束时间
	* @isCaller true:按主叫查询 false:按被叫查询
	* @currPage 当前页
	* @reportType 1:全部 2:视频 3:仅音频 4:Flash
	* @pageSize　每页显示的记录数
	*/
	$.ajax({
		type : "post",
		url : "search.aboutID.action",
		dataType : "json",
		data : "call=" + call + "&callType=" + callType + "&sid=" + sids+"&startTime=" + sTime + "&endTime=" + eTime
				+ "&diagnoseUpOrDown="+diagnoseUpOrDown+ "&currPage=" + currPage+"&reportType="+reportType+"&pageSize="+pageSize,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//局部刷新诊断结果的值
			var direction = "bz";
			showDiagnoseRet(data,direction,diagnoseUpOrDown);
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
 *　修改后的诊断结果，从查询接口里取，被叫端下行
 */
function diagnoseRetNew_bz_down(){
	//单边查询时sid为六段，最后一段为主/被叫的视讯号
	var sids = sid+"_"+sid.split("_")[3];
	var currPage = 1;//当前页
	var reportType = 1;//1:全部 2:视频 3:仅音频 4:Flash
	var pageSize = 25;//每页显示的记录数
	var callType;//查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	var call;//主叫或被叫的视讯号
	
	callType = 2;//查询类型  1:按主叫查询 2:按被叫查询 3:按主/被查询
	call = sid.split("_")[3];
	
	var diagnoseUpOrDown = 2;//全部0，上行1，下行2
	
	/**
	* @callType 查询类型 1:按主叫查询 2:按被叫查询 3:按主/被查询
	* @call 主叫或被叫的视讯号
	* @sid　会话id
	* @startTime 通话开始时间
	* @endTime 通过结束时间
	* @isCaller true:按主叫查询 false:按被叫查询
	* @currPage 当前页
	* @reportType 1:全部 2:视频 3:仅音频 4:Flash
	* @pageSize　每页显示的记录数
	*/
	$.ajax({
		type : "post",
		url : "search.aboutID.action",
		dataType : "json",
		data : "call=" + call + "&callType=" + callType + "&sid=" + sids+"&startTime=" + sTime + "&endTime=" + eTime
				+ "&diagnoseUpOrDown="+diagnoseUpOrDown+ "&currPage=" + currPage+"&reportType="+reportType+"&pageSize="+pageSize,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			//局部刷新诊断结果的值
			var direction = "bz";
			showDiagnoseRet(data,direction,diagnoseUpOrDown);
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
 * 根据sid按标识查询后局部刷新诊断结果
 * @param {} data
 * @param {} direction
 */
function showDiagnoseRet(data,direction,diagnoseUpOrDown){
	var htmlUp = "";
	var htmlDown = "";
	var result;
	result = data.result;
	if(result===0){
		var items = data.items;
		if(items!=undefined&&items!=null&&items!==""&&(items instanceof Array)&&items.length==1){
			$.each(items,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var diagnoseRetUp = val.diagnoseRetUp; 
					if(diagnoseRetUp!=undefined&&diagnoseRetUp!=null&&diagnoseRetUp!==""){
						var repair = diagnose_result_map.get(diagnoseRetUp);
						if(repair==undefined||repair==null||repair===""){
							repair = "未获取";
						}
						htmlUp += "<span style='font-size:20px;color:#FF0000;'>修改后的诊断结果："+repair+"</span>&nbsp;&nbsp;&nbsp;&nbsp;";
						if(direction=="zb"){
							if(diagnoseUpOrDown==1){//上行
								$("#diagnose_result_zb_new_up").html(htmlUp);
							}
						}else if(direction=="bz"){
							if(diagnoseUpOrDown==1){//上行
								$("#diagnose_result_bz_new_up").html(htmlUp);
							}
						}
					}
					var diagnoseRetDown = val.diagnoseRetDown; 
					if(diagnoseRetDown!=undefined&&diagnoseRetDown!=null&&diagnoseRetDown!==""){
						var repair = diagnose_result_map.get(diagnoseRetDown);
						if(repair==undefined||repair==null||repair===""){
							repair = "未获取";
						}
						htmlDown += "<span style='font-size:20px;color:#FF0000;'>修改后的诊断结果："+repair+"</span>&nbsp;&nbsp;&nbsp;&nbsp;";
						if(direction=="zb"){
							if(diagnoseUpOrDown==2){//下行
								$("#diagnose_result_zb_new_down").html(htmlDown);
							}
						}else if(direction=="bz"){
							if(diagnoseUpOrDown==2){//下行
								$("#diagnose_result_bz_new_down").html(htmlDown);
							}
						}
					}
				}
			});
		}
	}
}

var sid;//会话id
var sTime;//通话开始时间
var eTime;//通话结束时间
/**
 * 获取sid sTime eTime，供按标识查询使用diagnoseRetNew_zb和diagnoseRetNew_bz
 */
function getCallInfo(){
	if(reportData!=undefined&&reportData!=null&&reportData!==""){
		var result = reportData.result;
		if(result===0){
			var data = reportData.data;
			if(data!=undefined&&data!=null&&data!==""){
				var caller = data.caller;
				if(caller!=undefined&&caller!=null&&caller!==""){
					var call = caller.call;
					if(call!=undefined&&call!=null&&call!==""){
						var total = call.total;
						if(total!=undefined&&total!=null&&total!==""){
							var summary = total.summary;
							if(summary!=undefined&&summary!=null&&summary!==""){
								var starttime = summary.starttime;//格式为2015-09-10-14:04:14:054
								sid = summary.sid;
								var durationMills = summary.durationMills;
								if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
									//获取2015-09-10-14:04:14:054对应的毫秒值
									var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
									if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
										//返回的数据格式为2015-09-10 14:04:32，不带毫秒
										sTime = longTimeToDateNoMillisecond(startTimeMillisecond);
										//使用通话开始时间加通话时长得到通话结束时间，返回的数据格式为2015-09-10 14:04:32
										eTime = longTimeToDateNoMillisecond(startTimeMillisecond+durationMills);
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
												var starttime = summary.starttime;//格式为2015-09-10-14:04:14:054
												sid = summary.sid;
												var durationMills = summary.durationMills;
												if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
													//获取2015-09-10-14:04:14:054对应的毫秒值
													var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
													if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
														//返回的数据格式为2015-09-10 14:04:32，不带毫秒
														sTime = longTimeToDateNoMillisecond(startTimeMillisecond);
														//使用通话开始时间加通话时长得到通话结束时间，返回的数据格式为2015-09-10 14:04:32
														eTime = longTimeToDateNoMillisecond(startTimeMillisecond+durationMills);
													}
												}
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
											var starttime = summary.starttime;//格式为2015-09-10-14:04:14:054
											sid = summary.sid;
											var durationMills = summary.durationMills;
											if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
												//获取2015-09-10-14:04:14:054对应的毫秒值
												var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
												if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
													//返回的数据格式为2015-09-10 14:04:32，不带毫秒
													sTime = longTimeToDateNoMillisecond(startTimeMillisecond);
													//使用通话开始时间加通话时长得到通话结束时间，返回的数据格式为2015-09-10 14:04:32
													eTime = longTimeToDateNoMillisecond(startTimeMillisecond+durationMills);
												}
											}
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
										var starttime = summary.starttime;//格式为2015-09-10-14:04:14:054
										sid = summary.sid;
										var durationMills = summary.durationMills;
										if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
											//获取2015-09-10-14:04:14:054对应的毫秒值
											var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
											if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
												//返回的数据格式为2015-09-10 14:04:32，不带毫秒
												sTime = longTimeToDateNoMillisecond(startTimeMillisecond);
												//使用通话开始时间加通话时长得到通话结束时间，返回的数据格式为2015-09-10 14:04:32
												eTime = longTimeToDateNoMillisecond(startTimeMillisecond+durationMills);
											}
										}
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
									var starttime = summary.starttime;//格式为2015-09-10-14:04:14:054
									sid = summary.sid;
									var durationMills = summary.durationMills;
									if(starttime!=undefined&&starttime!=null&&starttime!==""&&durationMills!=undefined&&durationMills!=null&&durationMills!==""){
										//获取2015-09-10-14:04:14:054对应的毫秒值
										var startTimeMillisecond = splitTime(formatTime(starttime)).getTime();
										if(startTimeMillisecond!=undefined&&startTimeMillisecond!=null&&startTimeMillisecond!==""){
											//返回的数据格式为2015-09-10 14:04:32，不带毫秒
											sTime = longTimeToDateNoMillisecond(startTimeMillisecond);
											//使用通话开始时间加通话时长得到通话结束时间，返回的数据格式为2015-09-10 14:04:32
											eTime = longTimeToDateNoMillisecond(startTimeMillisecond+durationMills);
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
}

