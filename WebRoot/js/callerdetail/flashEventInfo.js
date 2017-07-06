/*通话详情callDetail.jsp页面中“Flash事件”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#flashEventInfo01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.flashEventInfo_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.flashEventInfo_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * 提取出mac、guid、通话开始时间startTime、通话时长durationMills
 * @param {} datas
 */
function gainMac_Guid(datas){
	var result = datas.result;
	var mac ;
	var guid ;
	var startTime ;//通话开始时间，用来反查时确定时间范围用，以免查询整个数据库
	var durationMills;//通话时长，毫秒
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				mac = "";
				guid = "";
				startTime = "";//通话时间，用来反查时确定时间范围用，以免查询整个数据库
				durationMills = "";//通话时长，毫秒
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							startTime = summary.starttime;
							durationMills = summary.durationMills;
						}
					}
					
					var flashmarkToCallInfo = call.flashmarkToCallInfo;
					if(flashmarkToCallInfo!=undefined&&flashmarkToCallInfo!=null&&flashmarkToCallInfo!==""){
						var flashmarkToCallInfo_arr = new Array();
						var flashmarkToCallInfo_map = new Map();
						flashmarkToCallInfo_arr = flashmarkToCallInfo.split(" ");
						if(flashmarkToCallInfo_arr!=undefined&&flashmarkToCallInfo_arr!=null&&flashmarkToCallInfo_arr!==""){
							$.each(flashmarkToCallInfo_arr,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var varArr = new Array();
									valArr = val.split("=");
									flashmarkToCallInfo_map.put(valArr[0],valArr[1]);
								}
							});
						}
						
						if(flashmarkToCallInfo_map!=undefined&&flashmarkToCallInfo_map!=null&&flashmarkToCallInfo_map!==""){
							mac = flashmarkToCallInfo_map.get("mac");
							guid = flashmarkToCallInfo_map.get("guid");
						}
					}
				}
				if(startTime==undefined||startTime==null||startTime===""){startTime="--";}
				if(durationMills==undefined||durationMills==null||durationMills===""){durationMills="--";}
				if(mac==undefined||mac==null||mac===""){mac="--";}
				if(guid==undefined||guid==null||guid===""){guid="--";}
				
				if(mac!="--"&&guid!="--"&&startTime!="--"&&durationMills!="--"){
					//startTime的格式为2015-05-13-17:13:50:430
					macGuidEventInfo_callDetail(mac,guid,startTime,durationMills,"flashEventInfo_zb");//调用接口，获取由mac和guid绑定的环境与事件信息
				}
			}
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				mac = "";
				guid = "";
				startTime = "";//通话时间，用来反查时确定时间范围用，以免查询整个数据库
				durationMills = "";//通话时长，毫秒
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							startTime = summary.starttime;
							durationMills = summary.durationMills;
						}
					}
					
					var flashmarkToCallInfo = call.flashmarkToCallInfo;
					if(flashmarkToCallInfo!=undefined&&flashmarkToCallInfo!=null&&flashmarkToCallInfo!==""){
						var flashmarkToCallInfo_arr = new Array();
						var flashmarkToCallInfo_map = new Map();
						flashmarkToCallInfo_arr = flashmarkToCallInfo.split(" ");
						if(flashmarkToCallInfo_arr!=undefined&&flashmarkToCallInfo_arr!=null&&flashmarkToCallInfo_arr!==""){
							$.each(flashmarkToCallInfo_arr,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var varArr = new Array();
									valArr = val.split("=");
									flashmarkToCallInfo_map.put(valArr[0],valArr[1]);
								}
							});
						}
						
						if(flashmarkToCallInfo_map!=undefined&&flashmarkToCallInfo_map!=null&&flashmarkToCallInfo_map!==""){
							mac = flashmarkToCallInfo_map.get("mac");
							guid = flashmarkToCallInfo_map.get("guid");
						}
					}
				}
				if(startTime==undefined||startTime==null||startTime===""){startTime="--";}
				if(durationMills==undefined||durationMills==null||durationMills===""){durationMills="--";}
				if(mac==undefined||mac==null||mac===""){mac="--";}
				if(guid==undefined||guid==null||guid===""){guid="--";}//TODO

				if(mac!="--"&&guid!="--"&&startTime!="--"&&durationMills!="--"){
					//startTime的格式为2015-05-13-17:13:50:430
					macGuidEventInfo_callDetail(mac,guid,startTime,durationMills,"flashEventInfo_bz");//调用接口，获取由mac和guid绑定的环境与事件信息
				}
			}
		}
	}
}

 /**
  * 调用接口，获取由mac和guid绑定的环境与事件信息
  * @param {} macs mac地址
  * @param {} guids　guid
  * @param {} startTime　 一通话务的开始时间
  * @param {} durationMills　 通话时长，毫秒
  * @param {} toPostion 要显示到页面上的位置
  */
function macGuidEventInfo_callDetail(macs,guids,startTime,durationMills,toPosition){
	//startTime的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符
	var startTimes;
	startTimes = formatTime(startTime);
	$.ajax({
		type : "post",
		url : "search.macGuidEventInfo.action",
		dataType : "json",
		data : "mac=" + macs + "&guid=" + guids +"&startTime=" +startTimes,
		beforeSend : function() {
		},
		complete : function() {
		},
		success : function(data) {
			//调用视图，进行展现
			//此处的startTime不需要作处理，继续使用2015-05-13-17:13:50:430的格式
			macGuidEventInfoView_callDetail(data,startTime,durationMills,toPosition,macs,guids);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
    });
}


/**
 * 将由mac和guid绑定的事件信息显示到页面上
 * 数据展示时，按数据流向展示，所以两端汇报的数据会展示到一块
 * 本方法对主叫端汇报的数据作分拆处理，
 * 主叫-->被叫方向的数据放在主叫-->被叫标签页上
 * 被叫-->主叫方向的数据放在被叫-->主叫标签页上
 * @param {} data
 */
function macGuidEventInfoView_callDetail(datas,startTime,durationMills,toPosition,macs,guids){
	var result ;
	var html = "";
	
	/**
	 * flash登录信息
	 */
	var out_ip;//外网IP
	var appkey;//AppKey
	var anony;//是否匿名登录，1:是 0:否
	var real_login_num;//实际登录视频号
	var login_time;//登录时间格式：2015-05-11-11:53:07:009
	var main_gateway_addr;//主选网关地址
	var back_gateway_addr;//备选网关地址
	var connect_gateway_addr;//连接上网关地址
	var gateway_rc_addr;//网关路由地址
	var main_gateway_err_msg;//如果登录备选地址成功，返回主选地址失败原因
	
	/**
	 * flash运行环境
	 */
	var flash_version;//Flash版本
	var b_type;//浏览器类型
	var b_version;//浏览器版本
	var b_kernel;//浏览器内核
	var camera_model;//摄像头型号
	var micro_model;//麦克风型号
	
	/**
	 * WebSDK工作参数
	 */
	//WebSDK信息
	var f_version;//WebSDK版本号
	var width;//宽单位：像素，嵌入到页面中的控件的宽
	var height;//高单位：像素，嵌入到页面中的控件的高
	var bt_show;//是否显示标准按钮 ，1:是 0:否
	var show_model;//显示模式 DIV（应用可控制）/中心显示
	
	//音频参数
	var a_bit;//码流
	var a_code_type;//编码格式
	var a_fps;//帧率，固定50
	var a_sample_lev;//采样率 
	var a_frame_2in1;//是否音频帧2合1，1:是 0:否
	var a_mute_test;//是否静音检测，1:是 0:否
	var a_echo_line_len;//回音线长度
	var a_linear_handler;//声音是否非线性处理，1:是 0:否
	
	//视频参数
	var v_bit;//码流
	var v_fps;//帧率
	var v_res;//分辨率
	var v_qua;//质量
	var v_gop;//GOP，主帧间隔
	var v_code_lev;//编码等级
	
	/**
	 * RtmpServer工作参数
	 */
	var g_version;//RtmpServer版本号
	
	/**
	 * 呼叫过程事件
	 */
	var uid;//对方视讯号
	var media_type;//媒体类型
	var nickname;//昵称
	var cad;//随路信令
	var que_waiting_time;//排队等候时间
	var queue_num;//呼出电话的排队位置
	var result;//结果
	
	
	/**
	 * 登出信息
	 */
	var logout_time;//登出时间
	
	var time ;//LogReceiver为日志打的时间戳
	
	html += "<div class='flashEventCallTitleDiv'>" +
			//flash登录信息
			"<table class='detailTable'>" +
				"<caption><span class='flashEventTitleCssWebSDK'>┅┅┅┅┅由mac："+macs+"和guid："+guids+"汇报的事件如下┅┅┅┅┅</span></caption>" +
			"</table>" +
			"</div>";
	
	result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var flash_event = data.flashEvent;
			if(flash_event!=undefined&&flash_event!=null&&flash_event!==""){
				
				//将每条记录的时间存入map，用来进行话务的时间标注，此功能只用在话务反查时。
				//在flash_sdk_Search.jsp页面通过点击“详情”时，只显示所有的事件信息，在后台已经排好序了，依次显示即可，不标注话务信息，因为没有话务
				var flashEventTimeMap = new Map();
				
				var flash_event_length = flash_event.length;
				
				var lengthFlag = 0;
				//汇报的所有事件中是不是存在时间大于通话开始时间的
				var startTimeLessFlag = false;
				
				//汇报的所有事件中是不是存在时间大于通话结束时间的
				var endTimeLessFlag = false;
				
				
				//第一次循环，判断通话开始时间和通话结束时间是不是在所有事件时间的内部
				$.each(flash_event,function(i,val){
					if(val!=undefined&&val!=null&&val!==""){
						var flash_eventArr = new Array();
						var flash_eventMap = new Map();
						flash_eventArr = splitString(val);
						
						if(flash_eventArr!=undefined&&flash_eventArr!=null&&flash_eventArr!==""&&flash_eventArr instanceof Array){
							$.each(flash_eventArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									var vaArr = new Array();
									vaArr = va.split("=");
									if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
										flash_eventMap.put(vaArr[0],vaArr[1]);
									}
								}
							});
						}
						
						if(flash_eventMap!=undefined&&flash_eventMap!=null&&flash_eventMap!==""){
							time = flash_eventMap.get("time");//LogReceiver为日志打的时间戳
							if(time==undefined||time==null||time===""){time="无";}
							
							if(time!="无"){
								if(startTime!==0&&startTime!=="0"){//非话务反查时，传的startTime为0
									//标注通话开始处
									//转化为毫秒，相比较
									var startTimeTemp = splitTime(formatTime(startTime)).getTime();
									var timeTemp = splitTime(formatTime(time)).getTime();
									
									if(startTimeTemp<timeTemp){
										startTimeLessFlag = true;//存在时间大于开始时间的事件
									}
									
									//计算通话结束时间
									var endTime = startTimeTemp+durationMills;
									if(endTime<timeTemp){
										endTimeLessFlag = true;//存在时间大于开始时间的事件
									}
								}
							}
						}
					}
				});
				
				//循环展示所有的事件
				$.each(flash_event,function(i,val){
					lengthFlag++;
					if(val!=undefined&&val!=null&&val!==""){
						var flash_eventArr = new Array();
						var flash_eventMap = new Map();
						flash_eventArr = splitString(val);
						
						if(flash_eventArr!=undefined&&flash_eventArr!=null&&flash_eventArr!==""&&flash_eventArr instanceof Array){
							$.each(flash_eventArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									var vaArr = new Array();
									vaArr = va.split("=");
									if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
										flash_eventMap.put(vaArr[0],vaArr[1]);
									}
								}
							});
						}
						if(flash_eventMap!=undefined&&flash_eventMap!=null&&flash_eventMap!==""){
							var event_type = flash_eventMap.get("eventtype");
							var sub_type = flash_eventMap.get("sub_type");
							time = flash_eventMap.get("time");//LogReceiver为日志打的时间戳
							if(time==undefined||time==null||time===""){time="无";}
							flashEventTimeMap.put("time"+i,time);
							
							//存在时间大于开始时间的事件
							if(startTimeLessFlag){
								//上一条记录的时间
								var timeBefore = flashEventTimeMap.get("time"+(i-1));
								if(timeBefore!=undefined&&timeBefore!=null&&timeBefore!==""){
									if(startTime!==0&&startTime!=="0"){//非话务反查时，传的startTime为0
										//转化为毫秒，相比较
										var startTimeTemp = splitTime(formatTime(startTime)).getTime();
										var timeBeforeTemp = splitTime(formatTime(timeBefore)).getTime();
										var timeTemp = splitTime(formatTime(time)).getTime();
										
										if(startTimeTemp>=timeBeforeTemp&&startTimeTemp<timeTemp){
											html += "<div class='flashEventCallTitleDiv'>" +
											//通话开始标注点
											"<table class='detailTable'>" +
												"<tr>" +
													"<td style='color:#FF0000;font-weight:bold;font-size:14px;'>&nbsp;&nbsp;★通话开始&nbsp;&nbsp;"+formatTime(startTime)+"</td>" +
												"</tr>" +
											"</table>" +
											"</div>";
										}
									}
								}
							}
							//存在时间大于结束时间的事件
							if(endTimeLessFlag){
								//上一条记录的时间
								var timeBefore = flashEventTimeMap.get("time"+(i-1));
								if(timeBefore!=undefined&&timeBefore!=null&&timeBefore!==""){
									if(startTime!==0&&startTime!=="0"){//非话务反查时，传的startTime为0
										
										//转化为毫秒，相比较
										var startTimeTemp = splitTime(formatTime(startTime)).getTime();
										var timeBeforeTemp = splitTime(formatTime(timeBefore)).getTime();
										var timeTemp = splitTime(formatTime(time)).getTime();
										
										//计算通话结束时间
										var endTime = startTimeTemp+durationMills;
										
										if(endTime>=timeBeforeTemp&&endTime<timeTemp){
											html += "<div class='flashEventCallTitleDiv'>" +
											//通话结束标注点
											"<table class='detailTable'>" +
												"<tr>" +
													"<td style='color:#FF0000;font-weight:bold;font-size:14px;'>&nbsp;&nbsp;★通话结束&nbsp;&nbsp;"+timeBeforeAfter(startTime,durationMills)+"</td>" +
												"</tr>" +
											"</table>" +
											"</div>";
										}
									}
								}
							}
							
							//登录信息
							if(event_type=="event_login"&&sub_type=="f_login"){
								out_ip = flash_eventMap.get("out_ip");//外网IP
								appkey = flash_eventMap.get("appkey");//AppKey
								anony = flash_eventMap.get("anony");//是否匿名登录，1:是 0:否
								real_login_num = flash_eventMap.get("real_login_num");//实际登录视频号
								login_time = flash_eventMap.get("login_time");//登录时间格式：2015-05-11-11:53:07:009
								main_gateway_addr = flash_eventMap.get("main_gateway_addr");//主选网关地址
								back_gateway_addr = flash_eventMap.get("back_gateway_addr");//备选网关地址
								connect_gateway_addr = flash_eventMap.get("connect_gateway_addr");//连接上网关地址
								gateway_rc_addr = flash_eventMap.get("gateway_rc_addr");//网关路由地址
								main_gateway_err_msg = flash_eventMap.get("main_gateway_err_msg");//如果登录备选地址成功，返回主选地址失败原因
								//空值校验
								if(out_ip==undefined||out_ip==null||out_ip===""){out_ip="无";}
								if(appkey==undefined||appkey==null||appkey===""){appkey="无";}
								if(anony==undefined||anony==null||anony===""){anony="无";}
								if(real_login_num==undefined||real_login_num==null||real_login_num===""){real_login_num="无";}
								if(login_time==undefined||login_time==null||login_time===""){login_time="无";}
								if(main_gateway_addr==undefined||main_gateway_addr==null||main_gateway_addr===""){main_gateway_addr="无";}
								if(back_gateway_addr==undefined||back_gateway_addr==null||back_gateway_addr===""){back_gateway_addr="无";}
								if(connect_gateway_addr==undefined||connect_gateway_addr==null||connect_gateway_addr===""){connect_gateway_addr="无";}
								if(gateway_rc_addr==undefined||gateway_rc_addr==null||gateway_rc_addr===""){gateway_rc_addr="无";}
								if(main_gateway_err_msg==undefined||main_gateway_err_msg==null||main_gateway_err_msg===""){main_gateway_err_msg="无";}
								
								//是否匿名登录，1:是 0:否
								if(anony!="无"){
									if(anony==1){
										anony = "是";
									}else if(anony==0){
										anony = "否";
									}
								}
								
								html += "<div class='flashEventCallTitleDiv'>" +
										//flash登录信息
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报Flash登录信息&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<th>外网IP</th>" +
												"<th>AppKey</th>" +
												"<th>是否匿名登录</th>" +
												"<th>实际登录视频号</th>" +
												"<th>登录时间</th>" +
												"<th>主选网关地址</th>" +
												"<th>备选网关地址</th>" +
												"<th>连接上网关地址</th>" +
												"<th>网关路由地址</th>" +
												"<th>登录备选地址成功，主选地址失败原因</th>" +
											"</tr>" +
											"<tr>" +
												"<td id='callDetail_out_ip_"+i+"'>"+out_ip+"<br/></td>" +
												"<td>"+appkey+"</td>" +
												"<td>"+anony+"</td>" +
												"<td>"+real_login_num+"</td>" +
												"<td>"+login_time+"</td>" +
												"<td id='callDetail_main_gateway_addr_"+i+"'>"+main_gateway_addr+"<br/></td>" +
												"<td id='callDetail_back_gateway_addr_"+i+"'>"+back_gateway_addr+"<br/></td>" +
												"<td id='callDetail_connect_gateway_addr_"+i+"'>"+connect_gateway_addr+"<br/></td>" +
												"<td>"+gateway_rc_addr+"</td>" +
												"<td>"+main_gateway_err_msg+"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
										
										//调用淘宝接口，获取与IP相关的地域、运营商等信息
										if(out_ip!="无"&&out_ip!="null"){
											var out_ip_arr = out_ip.split(':');
											if(out_ip_arr!=undefined&&out_ip_arr!=null&&out_ip_arr!==""&&out_ip_arr.length>0){
												var ip = out_ip_arr[0];
												if(ip!=undefined&&ip!=null&&ip!==""){
													if(isIP(ip)){
														getIp(ip,'callDetail_out_ip_'+i);
													}
												}
											}
										}
										//调用淘宝接口，获取与IP相关的地域、运营商等信息
										if(main_gateway_addr!="无"&&main_gateway_addr!="null"){
											var main_gateway_addr_arr = main_gateway_addr.split(":");
											if(main_gateway_addr_arr!=undefined&&main_gateway_addr_arr!=null&&main_gateway_addr_arr!==""&&main_gateway_addr_arr.length>0){
												var ip = main_gateway_addr_arr[0];
												if(ip!=undefined&&ip!=null&&ip!==""){
													if(isIP(ip)){
														getIp(ip,'callDetail_main_gateway_addr_'+i);
													}
												}
											}
										}
										//调用淘宝接口，获取与IP相关的地域、运营商等信息
										if(back_gateway_addr!="无"&&back_gateway_addr!="null"){
											var back_gateway_addr_arr = back_gateway_addr.split(":");
											if(back_gateway_addr_arr!=undefined&&back_gateway_addr_arr!=null&&back_gateway_addr_arr!==""&&back_gateway_addr_arr.length>0){
												var ip = back_gateway_addr_arr[0];
												if(ip!=undefined&&ip!=null&&ip!==""){
													if(isIP(ip)){
														getIp(ip,'callDetail_back_gateway_addr_'+i);
													}
												}
											}
										}
										//调用淘宝接口，获取与IP相关的地域、运营商等信息
										if(connect_gateway_addr!="无"&&connect_gateway_addr!="null"){
											var connect_gateway_addr_arr = connect_gateway_addr.split(":");
											if(connect_gateway_addr_arr!=undefined&&connect_gateway_addr_arr!=null&&connect_gateway_addr_arr!==""&&connect_gateway_addr_arr.length>0){
												var ip = connect_gateway_addr_arr[0];
												if(ip!=undefined&&ip!=null&&ip!==""){
													if(isIP(ip)){
														getIp(ip,'callDetail_connect_gateway_addr_'+i);
													}
												}
											}
										}
							}
							
							//Flash运行环境信息
							if(event_type=="event_login"&&sub_type=="f_env"){
								flash_version = flash_eventMap.get("flash_version");//Flash版本
								b_type = flash_eventMap.get("b_type");//浏览器类型
								b_version = flash_eventMap.get("b_version");//浏览器版本
								b_kernel = flash_eventMap.get("b_kernel");//浏览器内核
								camera_model = flash_eventMap.get("camera_model");//摄像头型号
								micro_model = flash_eventMap.get("micro_model");//麦克风型号
								//空值校验
								if(flash_version==undefined||flash_version==null||flash_version===""){flash_version="无";}
								if(b_type==undefined||b_type==null||b_type===""){b_type="无";}
								if(b_version==undefined||b_version==null||b_version===""){b_version="无";}
								if(b_kernel==undefined||b_kernel==null||b_kernel===""){b_kernel="无";}
								if(camera_model==undefined||camera_model==null||camera_model===""){camera_model="无";}
								if(micro_model==undefined||micro_model==null||micro_model===""){micro_model="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										//flash运行环境
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报Flash运行环境&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"Flash运行环境信息&nbsp;&nbsp;" +
												"sub_type=f_env&nbsp;&nbsp;" +
												"Flash版本："+flash_version+"&nbsp;▲&nbsp;" +
												"浏览器类型："+b_type+"&nbsp;▲&nbsp;" +
												"浏览器版本："+b_version+"&nbsp;▲&nbsp;" +
												"浏览器内核："+b_kernel+"&nbsp;▲&nbsp;" +
												"摄像头型号："+camera_model+"&nbsp;▲&nbsp;" +
												"麦克风型号："+micro_model+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//WebSDK工作参数
							if(event_type=="event_login"&&sub_type=="f_para"){
								//WebSDK信息
								f_version = flash_eventMap.get("f_version");//WebSDK版本号
								width = flash_eventMap.get("width");//宽单位：像素，嵌入到页面中的控件的宽
								height = flash_eventMap.get("height");//高单位：像素，嵌入到页面中的控件的高
								bt_show = flash_eventMap.get("bt_show");//是否显示标准按钮 ，1:是 0:否
								show_model = flash_eventMap.get("show_model");//显示模式 DIV（应用可控制）/中心显示
								
								//音频参数
								a_bit = flash_eventMap.get("a_bit");//码流
								a_code_type = flash_eventMap.get("a_code_type");//编码格式
								a_fps = flash_eventMap.get("a_fps");//帧率，固定50
								a_sample_lev = flash_eventMap.get("a_sample_lev");//采样率 
								a_frame_2in1 = flash_eventMap.get("a_frame_2in1");//是否音频帧2合1，1:是 0:否
								a_mute_test = flash_eventMap.get("a_mute_test");//是否静音检测，1:是 0:否
								a_echo_line_len = flash_eventMap.get("a_echo_line_len");//回音线长度
								a_linear_handler = flash_eventMap.get("a_linear_handler");//声音是否非线性处理，1:是 0:否
								
								//视频参数
								v_bit = flash_eventMap.get("v_bit");//码流
								v_fps = flash_eventMap.get("v_fps");//帧率
								v_res = flash_eventMap.get("v_res");//分辨率
								v_qua = flash_eventMap.get("v_qua");//质量
								v_gop = flash_eventMap.get("v_gop");//GOP，主帧间隔
								v_code_lev = flash_eventMap.get("v_code_lev");//编码等级
								
								//空值校验
								if(f_version==undefined||f_version==null||f_version===""){f_version="无";}
								if(width==undefined||width==null||width===""){width="无";}
								if(height==undefined||height==null||height===""){height="无";}
								if(bt_show==undefined||bt_show==null||bt_show===""){bt_show="无";}
								if(show_model==undefined||show_model==null||show_model===""){show_model="无";}
								
								if(a_bit==undefined||a_bit==null||a_bit===""){a_bit="无";}
								if(a_code_type==undefined||a_code_type==null||a_code_type===""){a_code_type="无";}
								if(a_fps==undefined||a_fps==null||a_fps===""){a_fps="无";}
								if(a_sample_lev==undefined||a_sample_lev==null||a_sample_lev===""){a_sample_lev="无";}
								if(a_frame_2in1==undefined||a_frame_2in1==null||a_frame_2in1===""){a_frame_2in1="无";}
								if(a_mute_test==undefined||a_mute_test==null||a_mute_test===""){a_mute_test="无";}
								if(a_echo_line_len==undefined||a_echo_line_len==null||a_echo_line_len===""){a_echo_line_len="无";}
								if(a_linear_handler==undefined||a_linear_handler==null||a_linear_handler===""){a_linear_handler="无";}
								
								if(v_bit==undefined||v_bit==null||v_bit===""){v_bit="无";}
								if(v_fps==undefined||v_fps==null||v_fps===""){v_fps="无";}
								if(v_res==undefined||v_res==null||v_res===""){v_res="无";}
								if(v_qua==undefined||v_qua==null||v_qua===""){v_qua="无";}
								if(v_gop==undefined||v_gop==null||v_gop===""){v_gop="无";}
								if(v_code_lev==undefined||v_code_lev==null||v_code_lev===""){v_code_lev="无";}
								
								//是否显示标准按钮 ，1:是 0:否
								if(bt_show!="无"){
									if(bt_show==1){
										bt_show = "是";
									}else if(bt_show==0){
										bt_show = "否";
									}
								}
								//是否音频帧2合1，1:是 0:否
								if(a_frame_2in1!="无"){
									if(a_frame_2in1==1){
										a_frame_2in1 = "是";
									}else if(a_frame_2in1==0){
										a_frame_2in1 = "否";
									}
								}
								
								//是否静音检测，1:是 0:否
								if(a_mute_test!="无"){
									if(a_mute_test==1){
										a_mute_test = "是";
									}else if(a_mute_test==0){
										a_mute_test = "否";
									}
								}
								
								//声音是否非线性处理，1:是 0:否
								if(a_linear_handler!="无"){
									if(a_linear_handler==1){
										a_linear_handler = "是";
									}else if(a_linear_handler==0){
										a_linear_handler = "否";
									}
								}
								
								html += "<div class='flashEventCallTitleDiv'>" +
										//WebSDK工作参数
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报Flash工作参数&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<th colspan='5'>WebSDK信息</th>" +
												"<th colspan='8'>音频参数</th>" +
												"<th colspan='6'>视频参数</th>" +
											"</tr>" +
											"<tr>" +
												"<th>WebSDK版本号</th>" +
												"<th>宽(px)</th>" +
												"<th>高(px)</th>" +
												"<th>是否显示标准按钮</th>" +
												"<th>显示模式</th>" +
												
												"<th>码流</th>" +
												"<th>编码格式</th>" +
												"<th>帧率</th>" +
												"<th>采样率</th>" +
												"<th>是否音频帧2合1</th>" +
												"<th>是否静音检测</th>" +
												"<th>回音线长度</th>" +
												"<th>声音是否非线性处理</th>" +
												
												"<th>码流</th>" +
												"<th>帧率</th>" +
												"<th>分辨率</th>" +
												"<th>质量</th>" +
												"<th>GOP(主帧间隔)</th>" +
												"<th>编码等级</th>" +
											"</tr>" +
											"<tr>" +
												"<td>"+f_version+"</td>" +
												"<td>"+width+"</td>" +
												"<td>"+height+"</td>" +
												"<td>"+bt_show+"</td>" +
												"<td>"+show_model+"</td>" +
												
												"<td>"+a_bit+"</td>" +
												"<td>"+a_code_type+"</td>" +
												"<td>"+a_fps+"</td>" +
												"<td>"+a_sample_lev+"</td>" +
												"<td>"+a_frame_2in1+"</td>" +
												"<td>"+a_mute_test+"</td>" +
												"<td>"+a_echo_line_len+"</td>" +
												"<td>"+a_linear_handler+"</td>" +
												
												"<td>"+v_bit+"</td>" +
												"<td>"+v_fps+"</td>" +
												"<td>"+v_res+"</td>" +
												"<td>"+v_qua+"</td>" +
												"<td>"+v_gop+"</td>" +
												"<td>"+v_code_lev+"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//RtmpServer工作参数
							if(event_type=="event_login"&&sub_type=="g_para"){
								g_version = flash_eventMap.get("g_version");//RtmpServer版本号
								if(g_version==undefined||g_version==null||g_version===""){g_version="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报RtmpServer工作参数&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"RtmpServer工作参数&nbsp;&nbsp;" +
												"sub_type=g_para&nbsp;&nbsp;" +
												"RtmpServer版本号："+g_version+"" +
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							
							//呼叫过程事件makeCall，WebSDK汇报
							if(event_type=="makeCall"&&sub_type=="f_a_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								que_waiting_time = flash_eventMap.get("que_waiting_time");//排队等候时间
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								if(que_waiting_time==undefined||que_waiting_time==null||que_waiting_time===""){que_waiting_time="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报makeCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad+"&nbsp;&nbsp;" +
												"排队等候时间："+que_waiting_time;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="makeCall"&&sub_type=="f_g_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								que_waiting_time = flash_eventMap.get("que_waiting_time");//排队等候时间
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								if(que_waiting_time==undefined||que_waiting_time==null||que_waiting_time===""){que_waiting_time="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报makeCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad+"&nbsp;&nbsp;" +
												"排队等候时间："+que_waiting_time;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件onNewCall，WebSDK汇报
							if(event_type=="onNewCall"&&sub_type=="f_g_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报onNewCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="onNewCall"&&sub_type=="f_a_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报onNewCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_a_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件answerCall，WebSDK汇报
							if(event_type=="answerCall"&&sub_type=="f_a_l"){
								media_type = flash_eventMap.get("media_type");//媒体类型
								result = flash_eventMap.get("result");//结果
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报answerCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="answerCall"&&sub_type=="f_g_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报answerCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"对方视讯号："+uid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件reject，WebSDK汇报
							if(event_type=="reject"&&sub_type=="f_a_l"){
								media_type = flash_eventMap.get("media_type");//对方视讯号
								result = flash_eventMap.get("result");//结果
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报reject事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="reject"&&sub_type=="f_g_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报reject事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"对方视讯号："+uid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件onConnect，WebSDK汇报
							if(event_type=="onConnect"&&sub_type=="f_g_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报onConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="onConnect"&&sub_type=="f_a_r"){
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报onConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_a_r&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件onDisConnect，WebSDK汇报
							if(event_type=="onDisConnect"&&sub_type=="f_g_l"){
								sid = flash_eventMap.get("sid");//会话ID
								uid = flash_eventMap.get("uid");//对方视讯号
								result = flash_eventMap.get("result");//结果
								if(sid==undefined||sid==null||sid===""){sid="无";}
								if(uid==undefined||uid==null||uid===""){uid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报onDisConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"会话ID："+sid+"&nbsp;&nbsp;" +
												"对方视讯号："+uid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							
							//呼叫过程事件queue_makeCall，WebSDK汇报
							if(event_type=="queue_makeCall"&&sub_type=="f_g_l"){
								queue_num = flash_eventMap.get("queue_num");//呼出电话的排队位置
								result = flash_eventMap.get("result");//结果
								if(queue_num==undefined||queue_num==null||queue_num===""){queue_num="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报queue_makeCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"呼出电话的排队位置："+queue_num;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//排队，WebSDK汇报
							if(event_type=="queue_getacd"&&sub_type=="f_g_l"){
								queue_num = flash_eventMap.get("queue_num");//占用坐席的排队位置
								result = flash_eventMap.get("result");//结果
								if(queue_num==undefined||queue_num==null||queue_num===""){queue_num="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报queue_getacd事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"排队&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"占用坐席的排队位置："+queue_num;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件makeCall，RtmpServer汇报
							if(event_type=="makeCall"&&sub_type=="g_f_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								que_waiting_time = flash_eventMap.get("que_waiting_time");//排队等候时间
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								if(que_waiting_time==undefined||que_waiting_time==null||que_waiting_time===""){que_waiting_time="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报makeCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad+"&nbsp;&nbsp;" +
												"排队等候时间："+que_waiting_time;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="makeCall"&&sub_type=="g_c_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								que_waiting_time = flash_eventMap.get("que_waiting_time");//排队等候时间
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								if(que_waiting_time==undefined||que_waiting_time==null||que_waiting_time===""){que_waiting_time="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报makeCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad+"&nbsp;&nbsp;" +
												"排队等候时间："+que_waiting_time;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//呼叫过程事件onNewCall，RtmpServer汇报
							if(event_type=="onNewCall"&&sub_type=="g_c_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报onNewCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="onNewCall"&&sub_type=="g_f_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								nickname = flash_eventMap.get("nickname");//昵称
								cad = flash_eventMap.get("cad");//随路信令
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								if(nickname==undefined||nickname==null||nickname===""){nickname="无";}
								if(cad==undefined||cad==null||cad===""){cad="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报onNewCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type+"&nbsp;&nbsp;" +
												"昵称："+nickname+"&nbsp;&nbsp;" +
												"随路信令："+cad;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//呼叫过程事件answerCall，RtmpServer汇报
							if(event_type=="answerCall"&&sub_type=="g_f_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报answerCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="answerCall"&&sub_type=="g_c_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报answerCall事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件reject，RtmpServer汇报
							if(event_type=="reject"&&sub_type=="g_f_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报reject事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="reject"&&sub_type=="g_c_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								media_type = flash_eventMap.get("media_type");//媒体类型
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(media_type==undefined||media_type==null||media_type===""){media_type="无";}else{media_type = flash_map.get(media_type);}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报reject事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"媒体类型："+media_type;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							
							//呼叫过程事件onConnect，RtmpServer汇报
							if(event_type=="onConnect"&&sub_type=="g_c_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer收到ConnectSDK汇报的onConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="onConnect"&&sub_type=="g_f_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报onConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//呼叫过程事件onDisConnect，RtmpServer汇报
							if(event_type=="onDisConnect"&&sub_type=="g_c_l"){
								uid = flash_eventMap.get("uid");//对方视讯号
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer收到ConnectSDK汇报的onDisConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_c_l&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="onDisConnect"&&sub_type=="g_f_r"){
								uid = flash_eventMap.get("uid");//对方视讯号
								sid = flash_eventMap.get("sid");//会话ID
								result = flash_eventMap.get("result");//结果
								if(uid==undefined||uid==null||uid===""){uid="无";}
								if(sid==undefined||sid==null||sid===""){sid="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报onDisConnect事件&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"呼叫过程&nbsp;&nbsp;" +
												"sub_type=g_f_r&nbsp;&nbsp;" +
												"对方视讯号："+uid+"&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//占用坐席，WebSDK汇报
							if(event_type=="use_seat"&&sub_type=="f_a_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报use_seat事件（用户操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"占用坐席&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="use_seat"&&sub_type=="f_g_r"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报use_seat事件（向网关发送消息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"占用坐席&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="use_seat"&&sub_type=="f_g_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报use_seat事件（网关发来的消息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"占用坐席&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//释放坐席，WebSDK汇报
							if(event_type=="release_seat"&&sub_type=="f_a_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报release_seat事件（用户操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"释放坐席&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="release_seat"&&sub_type=="f_g_r"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报release_seat事件（向网关发送消息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"释放坐席&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//打开/关闭摄像头 1 WebSDK汇报
							if(event_type=="on_camera"&&sub_type=="f_a_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报on_camera事件（用户操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="on_camera"&&sub_type=="f_g_r"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报on_camera事件（向网关发送消息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="on_camera"&&sub_type=="f_g_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报on_camera事件（网关发来的消息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//打开/关闭摄像头 2 　RtmpServer汇报
							if(event_type=="on_camera"&&sub_type=="g_f_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报on_camera事件（本端操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=g_f_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="on_camera"&&sub_type=="g_c_r"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报on_camera事件（本端操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=g_c_r&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="on_camera"&&sub_type=="g_c_l"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报on_camera事件（对端操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=g_c_l&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="on_camera"&&sub_type=="g_f_r"){
							    result = flash_eventMap.get("result");//结果
							    if(result==undefined||result==null||result===""){result="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报on_camera事件（对端操作）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"打开/关闭摄像头&nbsp;&nbsp;" +
												"sub_type=g_f_r&nbsp;&nbsp;" +
												"结果："+result+
												"</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//通话完成挂机1，WebSDK汇报
							if(event_type=="hangup"&&sub_type=="f_a_l"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    result = flash_eventMap.get("result");//结果
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报hangup事件（主动挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=f_a_l&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="hangup"&&sub_type=="f_g_r"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    result = flash_eventMap.get("result");//结果
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报hangup事件（主动挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=f_g_r&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="hangup"&&sub_type=="f_g_l"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    result = flash_eventMap.get("result");//结果
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报hangup事件（网关确认挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=f_g_l&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//通话完成挂机2，RtmpServer汇报
							if(event_type=="hangup"&&sub_type=="g_f_l"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    result = flash_eventMap.get("result");//结果
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报hangup事件（主动挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=g_f_l&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="hangup"&&sub_type=="g_c_r"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报hangup事件（主动挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=g_c_r&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							if(event_type=="hangup"&&sub_type=="g_f_r"){
							    var sid = flash_eventMap.get("sid");//会话ID
							    result = flash_eventMap.get("result");//结果
							    if(sid==undefined||sid==null||sid===""){sid="无";}
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报hangup事件（对端挂断）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"通话完成挂机&nbsp;&nbsp;" +
												"sub_type=g_f_r&nbsp;&nbsp;" +
												"会话ID："+sid;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//异常汇报，JS执行成功，Flash无法加载，WebSDK汇报
							if(event_type=="event_exception"&&sub_type=="f_load_failure"){
							    b_version = flash_eventMap.get("b_version");//浏览器版本
							    b_kernel = flash_eventMap.get("b_kernel");//浏览器内核
							    b_type = flash_eventMap.get("b_type");//浏览器类型
							    var curr_page_addr = flash_eventMap.get("curr_page_addr");//当前网页地址
							    var req_f_addr = flash_eventMap.get("req_f_addr");//请求flash文件的地址
							    result = flash_eventMap.get("result");//结果
							   
							    if(b_version==undefined||b_version==null||b_version===""){b_version="无";}
							    if(b_kernel==undefined||b_kernel==null||b_kernel===""){b_kernel="无";}
							    if(b_type==undefined||b_type==null||b_type===""){b_type="无";}
							    if(curr_page_addr==undefined||curr_page_addr==null||curr_page_addr===""){curr_page_addr="无";}
							    if(req_f_addr==undefined||req_f_addr==null||req_f_addr===""){req_f_addr="无";}
							   
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报event_exception事件（JS执行成功，Flash无法加载）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"异常汇报&nbsp;&nbsp;" +
												"sub_type=f_load_failure&nbsp;&nbsp;" +
												"浏览器版本："+b_version+"&nbsp;&nbsp;" +
												"浏览器内核："+b_kernel+"&nbsp;&nbsp;" +
												"浏览器类型："+b_type+"&nbsp;&nbsp;" +
												"当前网页地址："+curr_page_addr+"&nbsp;&nbsp;" +
												"请求flash文件的地址："+req_f_addr;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//异常汇报，Flash加载成功，网关路由无法连接，WebSDK汇报
							if(event_type=="event_exception"&&sub_type=="g_route_connect_failure"){
							    b_version = flash_eventMap.get("b_version");//浏览器版本
							    b_kernel = flash_eventMap.get("b_kernel");//浏览器内核
							    b_type = flash_eventMap.get("b_type");//浏览器类型
							    flash_version = flash_eventMap.get("flash_version");//flash版本
							    gateway_rc_addr = flash_eventMap.get("gateway_rc_addr");//网关路由地址
							    result = flash_eventMap.get("result");//结果
							   
							    if(b_version==undefined||b_version==null||b_version===""){b_version="无";}
							    if(b_kernel==undefined||b_kernel==null||b_kernel===""){b_kernel="无";}
							    if(b_type==undefined||b_type==null||b_type===""){b_type="无";}
							    if(flash_version==undefined||flash_version==null||flash_version===""){flash_version="无";}
							    if(gateway_rc_addr==undefined||gateway_rc_addr==null||gateway_rc_addr===""){gateway_rc_addr="无";}
							   
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报event_exception事件（Flash加载成功，网关路由无法连接）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"异常汇报&nbsp;&nbsp;" +
												"sub_type=g_route_connect_failure&nbsp;&nbsp;" +
												"浏览器版本："+b_version+"&nbsp;&nbsp;" +
												"浏览器内核："+b_kernel+"&nbsp;&nbsp;" +
												"浏览器类型："+b_type+"&nbsp;&nbsp;" +
												"flash版本："+flash_version+"&nbsp;&nbsp;" +
												"网关路由地址："+gateway_rc_addr;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//异常汇报，主备网关均登录失败，向HTTP接口提交异常统计信息，WebSDK汇报
							if(event_type=="event_exception"&&sub_type=="g_login_failure"){
							    b_version = flash_eventMap.get("b_version");//浏览器版本
							    b_kernel = flash_eventMap.get("b_kernel");//浏览器内核
							    b_type = flash_eventMap.get("b_type");//浏览器类型
							    flash_version = flash_eventMap.get("flash_version");//flash版本
							    gateway_rc_addr = flash_eventMap.get("gateway_rc_addr");//网关路由地址
							    f_version = flash_eventMap.get("f_version");//WebSDK版本号
							    main_gateway_addr = flash_eventMap.get("main_gateway_addr");//主选网关地址
							    back_gateway_addr = flash_eventMap.get("back_gateway_addr");//备选网关地址
							    main_gateway_err_msg = flash_eventMap.get("main_gateway_err_msg");//主选网关登录失败原因码及描述
							    var back_gateway_err_msg = flash_eventMap.get("back_gateway_err_msg");//备选网关登录失败原因码及描述
							    result = flash_eventMap.get("result");//结果
							   
							    if(b_version==undefined||b_version==null||b_version===""){b_version="无";}
							    if(b_kernel==undefined||b_kernel==null||b_kernel===""){b_kernel="无";}
							    if(b_type==undefined||b_type==null||b_type===""){b_type="无";}
							    if(flash_version==undefined||flash_version==null||flash_version===""){flash_version="无";}
							    if(gateway_rc_addr==undefined||gateway_rc_addr==null||gateway_rc_addr===""){gateway_rc_addr="无";}
							    if(f_version==undefined||f_version==null||f_version===""){f_version="无";}
							    if(main_gateway_addr==undefined||main_gateway_addr==null||main_gateway_addr===""){main_gateway_addr="无";}
							    if(back_gateway_addr==undefined||back_gateway_addr==null||back_gateway_addr===""){back_gateway_addr="无";}
							    if(main_gateway_err_msg==undefined||main_gateway_err_msg==null||main_gateway_err_msg===""){main_gateway_err_msg="无";}
							    if(back_gateway_err_msg==undefined||back_gateway_err_msg==null||back_gateway_err_msg===""){back_gateway_err_msg="无";}
							   
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报event_exception事件（主备网关均登录失败，向HTTP接口提交异常统计信息）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"异常汇报&nbsp;&nbsp;" +
												"sub_type=g_login_failure&nbsp;&nbsp;" +
												"浏览器版本："+b_version+"&nbsp;&nbsp;" +
												"浏览器内核："+b_kernel+"&nbsp;&nbsp;" +
												"浏览器类型："+b_type+"&nbsp;&nbsp;" +
												"flash版本："+flash_version+"&nbsp;&nbsp;" +
												"WebSDK版本号："+f_version+"&nbsp;&nbsp;" +
												"主选网关地址："+main_gateway_addr+"&nbsp;&nbsp;" +
												"备选网关地址："+back_gateway_addr+"&nbsp;&nbsp;" +
												"主选网关登录失败原因码及描述："+main_gateway_err_msg+"&nbsp;&nbsp;" +
												"备选网关登录失败原因码及描述："+back_gateway_err_msg;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							//异常汇报，与网关断开连接，WebSDK汇报
							if(event_type=="event_exception"&&sub_type=="g_connect_failure"){
							    connect_gateway_addr = flash_eventMap.get("connect_gateway_addr");//连接的网关地址
							    result = flash_eventMap.get("result");//原因描述
							   
							    if(connect_gateway_addr==undefined||connect_gateway_addr==null||connect_gateway_addr===""){connect_gateway_addr="无";}
							   
							    html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssWebSDK'>"+i+"&nbsp;&nbsp;WebSDK汇报event_exception事件（与网关断开连接）&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"异常汇报&nbsp;&nbsp;" +
												"sub_type=g_connect_failure&nbsp;&nbsp;" +
												"连接的网关地址："+connect_gateway_addr;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							//登出信息，放在最后
							if(event_type=="event_login"&&sub_type=="f_logout"){
								logout_time = flash_eventMap.get("logout_time");//登出时间
							    result = flash_eventMap.get("result");//原因描述
								if(logout_time==undefined||logout_time==null||logout_time===""){logout_time="无";}
								html += "<div class='flashEventCallTitleDiv'>" +
										"<table class='detailTable'>" +
											"<caption><span class='flashEventTitleCssRtmpServer'>"+i+"&nbsp;&nbsp;RtmpServer汇报Flash登出信息&nbsp;&nbsp;"+time+"</span></caption>" +
											"<tr>" +
												"<td>" +
												"sub_type=f_logout&nbsp;&nbsp;" +
												"登出时间："+logout_time;
												if(result!=undefined&&result!=null&&result!==""){
													html += "&nbsp;&nbsp;结果："+result;
												}
										html += "</td>" +
											"</tr>" +
										"</table>" +
										"</div>";
							}
							
							
							//不存在时间大于开始时间的事件，将开始通话时间标注在最后
							if(!startTimeLessFlag){
								if(lengthFlag==flash_event_length){
									
									//上一条记录的时间
									var timeBefore = flashEventTimeMap.get("time"+(i-1));
									if(timeBefore!=undefined&&timeBefore!=null&&timeBefore!==""){
										
										if(startTime!==0&&startTime!=="0"){//非话务反查时，传的startTime为0
											
											html += "<div class='flashEventCallTitleDiv'>" +
											//通话开始标注点
											"<table class='detailTable'>" +
												"<tr>" +
													"<td style='color:#FF0000;font-weight:bold;font-size:14px;'>&nbsp;&nbsp;★通话开始&nbsp;&nbsp;"+formatTime(startTime)+"</td>" +
												"</tr>" +
											"</table>" +
											"</div>";
										}
									}
								}
							}
							//不存在时间大于结束时间的事件，将结束通话时间标注在最后
							if(!endTimeLessFlag){
								if(lengthFlag==flash_event_length){
									
									//上一条记录的时间
									var timeBefore = flashEventTimeMap.get("time"+(i-1));
									if(timeBefore!=undefined&&timeBefore!=null&&timeBefore!==""){
										
										if(startTime!==0&&startTime!=="0"){//非话务反查时，传的startTime为0
											
											html += "<div class='flashEventCallTitleDiv'>" +
											//通话结束标注点
											"<table class='detailTable'>" +
												"<tr>" +
													"<td style='color:#FF0000;font-weight:bold;font-size:14px;'>&nbsp;&nbsp;★通话结束&nbsp;&nbsp;"+timeBeforeAfter(startTime,durationMills)+"</td>" +
												"</tr>" +
											"</table>" +
											"</div>";
										}
									}
								}
							}
							
						}
					}
				});
			}
		}
	}
	$('#'+toPosition).html(html);
}
