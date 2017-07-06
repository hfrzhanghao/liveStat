/*
 * 对道路切换和音频溢出数据、flash设置视频最大值、当前设备信息进行处理，主、被都在这里处理
 * 
 */

//道路切换的数据
var pathSwitch_zbUTC = new Array();
var pathSwitch_bzUTC = new Array();

//浪涌的数据
var audioOverFlow_zbUTC = new Array();
var audioOverFlow_bzUTC = new Array();

//flash设置视频最大值的数据
var set_max_bw_zbUTC = new Array();
var set_max_bw_bzUTC = new Array();


//当前设备信息的数据
var cur_device_info_cpu_zbUTC = new Array();
var cur_device_info_cpu_bzUTC = new Array();
var cur_device_info_render_fr_zbUTC = new Array();
var cur_device_info_render_fr_bzUTC = new Array();

var cur_device_info_map = new Map();

//解码质量统计的数据
var cpu_zbUTC = new Array();//cpu
var decode_f_zbUTC = new Array();//解码帧率
var a_null_lev_zbUTC = new Array();//音频空音率

var cpu_bzUTC = new Array();//cpu
var decode_f_bzUTC = new Array();//解码帧率
var a_null_lev_bzUTC = new Array();//音频空音率

//信号强度的数据
var signal_zbUTC = new Array();//信号强度
var signal_bzUTC = new Array();//信号强度
 
//道路切换时间
var pathSwitchTimeArr_zb = new Array();
var pathSwitchTimeArr_bz = new Array();

//音频溢出时间
var audio_overflowTimeArr_zb = new Array();
var audio_overflowTimeArr_bz = new Array();

//设置最大带宽时间
var set_max_bwTimeArr_zb = new Array();
var set_max_bwTimeArr_bz = new Array();

//当前设备信息时间
var cur_device_infoTimeArr_zb = new Array();
var cur_device_infoTimeArr_bz = new Array();


/**
 * 解码质量统计
 */
var cpuYArr_zb = new Array();//cpu
var decode_fYArr_zb = new Array();//解码帧率
var a_null_levYArr_zb = new Array();//音频空音率

var decode_count_timeArr_zb = new Array();//时间的一维数组，排序用
var decode_count_map_zb = new Map();//排序用

var cpuYArr_bz = new Array();//cpu
var decode_fYArr_bz = new Array();//解码帧率
var a_null_levYArr_bz = new Array();//音频空音率

var decode_count_timeArr_bz = new Array();//时间的一维数组，排序用
var decode_count_map_bz = new Map();//排序用

/**
 * 信号强度
 */
var signalYArr_zb = new Array();//信号强度

var signal_timeArr_zb = new Array();//时间的一维数组，排序用
var signal_map_zb = new Map();//排序用

var signalYArr_bz = new Array();//信号强度

var signal_timeArr_bz = new Array();//时间的一维数组，排序用
var signal_map_bz = new Map();//排序用


var switchinfoMap;//道路切换的标签map，包含了主和被**
/**
 * “带宽自适应/道路切换和浪涌”
 */
function pathSwitch_overflow(datas){
	
	switchinfoMap = new Map();
	var paramExt;//包含以下参数
	//浪涌信息上报(音频溢出)
	var audio_overflow;
	
	//道路切换
	var pathSwitch;	
	
	//设置最大带宽
	var set_max_bw;
	
	//当前设备信息
	var cur_device_info;
	
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			var called = data.called;
			var direction = "";//方向
			if(caller!=undefined&&caller!=null&&caller!==""){
				direction = "zb";
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					pathSwitch = call.pathswitch;
					if(pathSwitch!=undefined&&pathSwitch!=null&&pathSwitch!==""){
						pathSwitchArr(pathSwitch,direction);//道路切换
					}
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						//浪涌信息上报(音频溢出)
						audio_overflow = paramExt.audio_overflow;
						if(audio_overflow!=undefined&&audio_overflow!=null&&audio_overflow!==""){
							audio_overflowArr(audio_overflow,direction);//浪涌信息上报(音频溢出)
						}
						
						//flash设置视频最大值
						set_max_bw = paramExt.set_max_bw;
						if(set_max_bw!=undefined&&set_max_bw!=null&&set_max_bw!==""){
							set_max_bwArr(set_max_bw,direction);//flash设置视频最大值
						}
						
						//当前设备信息
						cur_device_info = paramExt.cur_device_info;
						if(cur_device_info!=undefined&&cur_device_info!=null&&cur_device_info!==""){
							cur_device_infoArr(cur_device_info,direction);//当前设备信息
						}
						
						//解码质量统计 TODO
						decode_count = paramExt.decode_count;
						
						if(decode_count!=undefined&&decode_count!=null&&decode_count!==""&&(decode_count instanceof Array)&&decode_count.length>0){
							decode_countArr(decode_count,direction);
						}
						
						//信号强度周期上报
						signal = paramExt.signal;
						if(signal!=undefined&&signal!=null&&signal!==""&&(signal instanceof Array)&&signal.length>0){
							signalArr(signal,direction);
						}
						
						//按时间升序排序
						bom(cur_device_infoTimeArr_zb);
						
						//组合当前设备信息：cpu数据，渲染帧率数据，目前不用
						$.each(cur_device_infoTimeArr_zb,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var arr1 = new Array();
								
								//组合cpu的数据
								arr1[0] = dateToUTC(val);
								arr1[1] = stringToNumber(cur_device_info_map.get(dateToUTC(val)+"_cpu_zb"));
								cur_device_info_cpu_zbUTC[i] = arr1;
								
								var arr2 = new Array();
								//组合渲染帧率的数据
								arr2[0] = dateToUTC(val);
								arr2[1] = stringToNumber(cur_device_info_map.get(dateToUTC(val)+"_render_fr_zb"));
								cur_device_info_render_fr_zbUTC[i] = arr2;
								
							}
						});
						
					}
				}
			}
			
			if(called!=undefined&&called!=null&&called!==""){
				direction = "bz";
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					pathSwitch = call.pathswitch;
					if(pathSwitch!=undefined&&pathSwitch!=null&&pathSwitch!==""){
						pathSwitchArr(pathSwitch,direction);//道路切换
					}
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						//浪涌信息上报(音频溢出)
						audio_overflow = paramExt.audio_overflow;
						if(audio_overflow!=undefined&&audio_overflow!=null&&audio_overflow!==""){
							audio_overflowArr(audio_overflow,direction);//浪涌信息上报(音频溢出)
						}
						
						//flash设置视频最大值
						set_max_bw = paramExt.set_max_bw;
						if(set_max_bw!=undefined&&set_max_bw!=null&&set_max_bw!==""){
							set_max_bwArr(set_max_bw,direction);//flash设置视频最大值
						}
						
						//当前设备信息
						cur_device_info = paramExt.cur_device_info;
						if(cur_device_info!=undefined&&cur_device_info!=null&&cur_device_info!==""){
							cur_device_infoArr(cur_device_info,direction);//当前设备信息
						}
						
						//解码质量统计
						decode_count = paramExt.decode_count;
						
						if(decode_count!=undefined&&decode_count!=null&&decode_count!==""&&(decode_count instanceof Array)&&decode_count.length>0){
							decode_countArr(decode_count,direction);
						}
						
						//信号强度周期上报
						signal = paramExt.signal;
						if(signal!=undefined&&signal!=null&&signal!==""&&(signal instanceof Array)&&signal.length>0){
							signalArr(signal,direction);
						}
						
						//按时间升序排序
						bom(cur_device_infoTimeArr_bz);
						//组合当前设备信息：cpu数据，渲染帧率数据
						$.each(cur_device_infoTimeArr_bz,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var arr1 = new Array();
								
								//组合cpu的数据
								arr1[0] = dateToUTC(val);
								arr1[1] = stringToNumber(cur_device_info_map.get(dateToUTC(val)+"_cpu_bz"));
								cur_device_info_cpu_bzUTC[i] = arr1;
								
								var arr2 = new Array();
								//组合渲染帧率的数据
								arr2[0] = dateToUTC(val);
								arr2[1] = stringToNumber(cur_device_info_map.get(dateToUTC(val)+"_render_fr_bz"));
								cur_device_info_render_fr_bzUTC[i] = arr2;
								
							}
						});
					}
				}
			}
		}
	}
		
	//将道路切换的时间转化为UTC时间，并转化为二维数组
	if(pathSwitchTimeArr_zb!=undefined&&pathSwitchTimeArr_zb!=null&&pathSwitchTimeArr_zb!==""){
		$.each(pathSwitchTimeArr_zb,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 1;//数据值
				pathSwitch_zbUTC[i] = arr;
			}
		});
	}
	if(pathSwitchTimeArr_bz!=undefined&&pathSwitchTimeArr_bz!=null&&pathSwitchTimeArr_bz!==""){
		$.each(pathSwitchTimeArr_bz,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 1;//数据值
				pathSwitch_bzUTC[i] = arr;
			}
		});
	}
	
	//将浪涌的时间转化为UTC时间，并转化为二维数组
	if(audio_overflowTimeArr_zb!=undefined&&audio_overflowTimeArr_zb!=null&&audio_overflowTimeArr_zb!==""){
		$.each(audio_overflowTimeArr_zb,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 2;//数据值
				audioOverFlow_zbUTC[i] = arr;
			}
		});
	}
	if(audio_overflowTimeArr_bz!=undefined&&audio_overflowTimeArr_bz!=null&&audio_overflowTimeArr_bz!==""){
		$.each(audio_overflowTimeArr_bz,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 2;//数据值
				audioOverFlow_bzUTC[i] = arr;
			}
		});
	}
	
	//将flash设置视频最大值时间转化为UTC时间，并转化为二维数组
	if(set_max_bwTimeArr_zb!=undefined&&set_max_bwTimeArr_zb!=null&&set_max_bwTimeArr_zb!==""){
		$.each(set_max_bwTimeArr_zb,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 3;//数据值
				set_max_bw_zbUTC[i] = arr;
			}
		});
	}
	if(set_max_bwTimeArr_bz!=undefined&&set_max_bwTimeArr_bz!=null&&set_max_bwTimeArr_bz!==""){
		$.each(set_max_bwTimeArr_bz,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 3;//数据值
				set_max_bw_bzUTC[i] = arr;
			}
		});
	}
	/*
	console.info("↓=带宽自适应顶部第一个图数据主叫端=↓");
	console.info("pathSwitch_zbUTC:"+pathSwitch_zbUTC);
	console.info("audioOverFlow_zbUTC:"+audioOverFlow_zbUTC);
	console.info("set_max_bw_zbUTC:"+set_max_bw_zbUTC);
	console.info("cpu_zbUTC:"+cpu_zbUTC);
	console.info("cpu_bzUTC:"+cpu_bzUTC);
	console.info("signal_zbUTC:"+signal_zbUTC);
	console.info("signal_bzUTC:"+signal_bzUTC);
	console.info("dataArr071_zb:"+dataArr071_zb);
	console.info("decode_f_bzUTC:"+decode_f_bzUTC);
	console.info("a_null_lev_bzUTC:"+a_null_lev_bzUTC);
	console.info("↑=带宽自适应顶部第一个图数据主叫端=↑");
	*/
	//调用highstock的视图
	//包含“道路切换、浪涌、flash设置视频最大值、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频”等视图，主叫端	
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
			console.info("执行了带宽自适应顶部第一个图数据主叫端");
			highstockView_zb01("bandAdaptive_main1_zb01");
	}else{
		$("#bandAdaptive_main1_zb01").html("未获取道路切换、浪涌、flash设置视频最大值、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频的相关数据信息，故无图形数据展示。");
	}
	
	/*
	console.info("↓=带宽自适应顶部第一个图数据被叫端=↓");
	console.info("pathSwitch_bzUTC:"+pathSwitch_bzUTC);
	console.info("audioOverFlow_bzUTC:"+audioOverFlow_bzUTC);
	console.info("set_max_bw_bzUTC:"+set_max_bw_bzUTC);
	console.info("cpu_bzUTC:"+cpu_bzUTC);
	console.info("cpu_zbUTC:"+cpu_zbUTC);
	console.info("signal_bzUTC:"+signal_bzUTC);
	console.info("signal_zbUTC:"+signal_zbUTC);
	console.info("dataArr071_bz:"+dataArr071_bz);
	console.info("decode_f_zbUTC:"+decode_f_zbUTC);
	console.info("a_null_lev_zbUTC:"+a_null_lev_zbUTC);
	console.info("↑=带宽自适应顶部第一个图数据被叫端=↑");
	*/
	//包含“道路切换、浪涌、flash设置视频最大值、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频”等视图，被叫端	
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
			console.info("执行了带宽自适应顶部第一个图数据被叫端");
			highstockView_bz01("bandAdaptive_main1_bz01");
	}else{
		$("#bandAdaptive_main1_bz01").html("未获取道路切换、浪涌、flash设置视频最大值、本端cpu、对端cpu、本端信号强度、对端信号强度、编码帧率、对端渲染帧率、对端音频空音频的相关数据信息，故无图形数据展示。");
	}
}

/**
 * 道路切换 ，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function pathSwitchArr(data,direction){
	var html = "";
	
	var count;//第几次切换
	var old_main_cid;//旧的主路道路
	var old_main_rating;//旧的主路打分
	var old_back_cid;//旧的备路道路
	var old_back_rating;//旧的备路打分
	var new_main_cid;//新的主路道路
	var new_main_rating;//新的主路道路打分
	var new_back_cid;//新的备路道路
	var new_back_rating;//新的备路道路打分
	var time;//道路切换发生的时间
	
	if(direction == "zb"){
		//得到时间，然后组成数组
		pathSwitchTimeArr_zb = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var switchtime = val.switchtime;
				var switchinfo = val.switchinfo;
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
					if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
						switchtime = formatTime(switchtime);
					}
					//当时间存在时，存入数组
					//之所以另外加一个flag而不用i，是因为switchtime有时可能为空，会导致pathSwitchTimeArr_zb下标跳跃。
					pathSwitchTimeArr_zb[flag] = switchtime;
					flag ++;
					//道路切换信息，弹出框用
					if(switchinfo!=undefined&&switchinfo!=null&&switchinfo!==""){
						var switchinfoArr = switchinfo.split(' ');
						if(switchinfoArr!=undefined&&switchinfoArr!=null&&switchinfoArr!==""&&(switchinfoArr instanceof Array)){
							$.each(switchinfoArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									switchinfoMap.put(va.split('=')[0],va.split('=')[1]);
								}
							});
						}
						
						count = switchinfoMap.get('count');//第几次切换
						old_main_cid = switchinfoMap.get('old_main_cid');//旧的主路道路
						old_main_rating = switchinfoMap.get('old_main_rating');//旧的主路打分
						old_back_cid = switchinfoMap.get('old_back_cid');//旧的备路道路
						old_back_rating = switchinfoMap.get('old_back_rating');//旧的备路打分
						new_main_cid = switchinfoMap.get('new_main_cid');//新的主路道路
						new_main_rating = switchinfoMap.get('new_main_rating');//新的主路道路打分
						new_back_cid = switchinfoMap.get('new_back_cid');//新的备路道路
						new_back_rating = switchinfoMap.get('new_back_rating');//新的备路道路打分
						time = switchinfoMap.get('time');//道路切换发生的时间
						
						if(count==undefined||count==null||count===""){
							count = "--";
						}
						if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
							old_main_cid = "--";
						}
						if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
							old_main_rating = "--";
						}
						if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
							old_back_cid = "--";
						}
						if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
							old_back_rating = "--";
						}
						if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
							new_main_cid = "--";
						}
						if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
							new_main_rating = "--";
						}
						if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
							new_back_cid = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						if(time!=undefined&&time!=null&&time!==""){
							time = formatTime(time);
						}
						
						if(time==undefined||time==null||time===""){
							time = "--";
						}
						
						html += "第"+count+"次切换，时间 : "+time+"<br/>" +
								"旧的主路道路ID : "+old_main_cid+"，旧的主路道路打分 : "+old_main_rating+"<br/>" +
								"旧的备路道路ID : "+old_back_cid+"，旧的备路打分 : "+old_back_rating+"<br/>" +
								"新的主路道路ID : "+ new_main_cid+"，新的主路道路打分 : "+new_main_rating+"<br/>"+
								"新的备路道路ID : "+new_back_cid+"，新的备路道路打分 : "+new_back_rating + "<br/>";								
					}
				}
				
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//switchinfoMap.put(splitTime(switchtime).getTime()+'_1_zb',html);
					switchinfoMap.put(dateToUTC(switchtime)+'_1_zb',html);
				}else {
					if(time!="--"){
						//switchinfoMap.put(splitTime(time).getTime()+'_1_zb',html);
						switchinfoMap.put(dateToUTC(time)+'_1_zb',html);
					}
				}
			}
		});
	}
	if(direction == "bz"){
		//得到时间，然后组成数组
		pathSwitchTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var switchtime = val.switchtime;
				var switchinfo = val.switchinfo;
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
					if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
						switchtime = formatTime(switchtime);
					}
					//当时间存在时，存入数组
					//之所以另外加一个flag而不用i，是因为switchtime有时可能为空，会导致pathSwitchTimeArr_bz下标跳跃。
					pathSwitchTimeArr_bz[flag] = switchtime;
					flag ++;
					
					//道路切换信息，弹出框用
					if(switchinfo!=undefined&&switchinfo!=null&&switchinfo!==""){
						var switchinfoArr = switchinfo.split(' ');
						if(switchinfoArr!=undefined&&switchinfoArr!=null&&switchinfoArr!==""&&(switchinfoArr instanceof Array)){
							$.each(switchinfoArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									switchinfoMap.put(va.split('=')[0],va.split('=')[1]);
								}
							});
						}
						
						count = switchinfoMap.get('count');//第几次切换
						old_main_cid = switchinfoMap.get('old_main_cid');//旧的主路道路
						old_main_rating = switchinfoMap.get('old_main_rating');//旧的主路打分
						old_back_cid = switchinfoMap.get('old_back_cid');//旧的备路道路
						old_back_rating = switchinfoMap.get('old_back_rating');//旧的备路打分
						new_main_cid = switchinfoMap.get('new_main_cid');//新的主路道路
						new_main_rating = switchinfoMap.get('new_main_rating');//新的主路道路打分
						new_back_cid = switchinfoMap.get('new_back_cid');//新的备路道路
						new_back_rating = switchinfoMap.get('new_back_rating');//新的备路道路打分
						time = switchinfoMap.get('time');//道路切换发生的时间
						
						if(count==undefined||count==null||count===""){
							count = "--";
						}
						if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
							old_main_cid = "--";
						}
						if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
							old_main_rating = "--";
						}
						if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
							old_back_cid = "--";
						}
						if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
							old_back_rating = "--";
						}
						if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
							new_main_cid = "--";
						}
						if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
							new_main_rating = "--";
						}
						if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
							new_back_cid = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						if(time!=undefined&&time!=null&&time!==""){
							time = formatTime(time);
						}
						
						if(time==undefined||time==null||time===""){
							time = "--";
						}
						
						html += "第"+count+"次切换，时间 : " +time + "<br/>"+
								"旧的主路道路ID : "+old_main_cid+"，旧的主路道路打分 : "+old_main_rating+"<br/>" +
								"旧的备路道路ID : "+old_back_cid+"，旧的备路打分 : "+old_back_rating+"<br/>" +
								"新的主路道路ID : "+ new_main_cid+"，新的主路道路打分 : "+new_main_rating+"<br/>"+
								"新的备路道路ID : "+new_back_cid+"，新的备路道路打分 : "+new_back_rating + "<br/>";
					}
				}
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//switchinfoMap.put(splitTime(switchtime).getTime()+'_1_bz',html);
					switchinfoMap.put(dateToUTC(switchtime)+'_1_bz',html);
				}else {
					if(time!="--"){
						//switchinfoMap.put(splitTime(time).getTime()+'_1_bz',html);
						switchinfoMap.put(dateToUTC(time)+'_1_bz',html);
					}
				}
			}
		});
	}
}

/**
 * 浪涌信息上报(音频溢出)，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function audio_overflowArr(data,direction){
	var html = "";
	
	if(direction == "zb"){
		//得到时间，然后组成数组
		audio_overflowTimeArr_zb = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//浪涌丢掉的毫秒数
					var audio_drop_ms = rowMap.get('audio_drop_ms');
					
					//浪涌溢出时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为overflowTime有时可能为空，会导致audio_overflowTimeArr_zb下标跳跃。
						audio_overflowTimeArr_zb[flag] = time;
						flag ++;
					}
					
					if(audio_drop_ms==undefined||audio_drop_ms==null||audio_drop_ms===""){
						audio_drop_ms = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					html += "时间 : "+time+"<br/>音频浪涌丢掉的毫秒数 : " +audio_drop_ms+"ms";
				
					if(time!="--"){
						//switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_zb',html);
						switchinfoMap.put(dateToUTC(time)+'_2_zb',html);
					}
				}
			}
		});
	}
	
	if(direction == "bz"){
		//得到时间，然后组成数组
		audio_overflowTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//浪涌丢掉的毫秒数
					var audio_drop_ms = rowMap.get('audio_drop_ms');
					
					//浪涌溢出时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为overflowTime有时可能为空，会导致audio_overflowTimeArr_bz下标跳跃。
						audio_overflowTimeArr_bz[flag] = time;
						flag ++;
					}
					
					if(audio_drop_ms==undefined||audio_drop_ms==null||audio_drop_ms===""){
						audio_drop_ms = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					html += "时间 : "+time+"<br/>音频浪涌丢掉的毫秒数 : " +audio_drop_ms+"ms";
					
					if(time!="--"){
						//switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_bz',html);
						switchinfoMap.put(dateToUTC(time)+'_2_bz',html);
					}
				}
			}
		});
	}
}


/**
 * flash设置视频最大值，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function set_max_bwArr(data,direction){
	var html = "";
	if(direction == "zb"){
		//得到时间，然后组成数组 
		set_max_bwTimeArr_zb  = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//flash设置视频最大值
					var max_bw = rowMap.get("max_bw");
					//方向
					var flags = rowMap.get("flag");
					
					//时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为time有时可能为空，会导致set_max_bwTimeArr_zb下标跳跃。
						set_max_bwTimeArr_zb[flag] = time;
						flag ++;
					}
					
					if(max_bw==undefined||max_bw==null||max_bw===""){
						max_bw = "--";
					}
					if(flags==undefined||flags==null||flags===""){
						flags = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					if(flags=="loc"){
						flags = "本端原因导致本端发生了flash设置视频最大值";
					}else if(flags=="rem"){
						flags = "对端原因导致本端发生了flash设置视频最大值";
					}
					
					html += "时间 : "+time+"<br/>flash设置视频最大值 : " +max_bw+"<br/>"+flags;
				
					if(time!="--"){
						//switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_zb',html);
						switchinfoMap.put(dateToUTC(time)+'_3_zb',html);
					}
				}
			}
		});
	}
	
	if(direction == "bz"){
		//得到时间，然后组成数组
		set_max_bwTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//flash设置视频最大值
					var max_bw = rowMap.get("max_bw");
					//方向
					var flags = rowMap.get("flag");
					
					//时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为time有时可能为空，会导致set_max_bwTimeArr_bz下标跳跃。
						set_max_bwTimeArr_bz[flag] = time;
						flag ++;
					}
					
					if(max_bw==undefined||max_bw==null||max_bw===""){
						max_bw = "--";
					}
					if(flags==undefined||flags==null||flags===""){
						flags = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					if(flags=="loc"){
						flags = "本端原因导致本端发生了flash设置视频最大值";
					}else if(flags=="rem"){
						flags = "对端原因导致本端发生了flash设置视频最大值";
					}
					
					html += "时间 : "+time+"<br/>flash设置视频最大值 : " +max_bw+"<br/>"+flags;
					
					if(time!="--"){
						//switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_bz',html);
						switchinfoMap.put(dateToUTC(time)+'_3_bz',html);
					}
				}
			}
		});
	}
}


/**
 * 当前设备信息，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function cur_device_infoArr(data,direction){
	var html = "";
	if(direction == "zb"){
		//得到时间，然后组成数组 
		cur_device_infoTimeArr_zb  = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//cpu
					var cpu = rowMap.get("cpu_info");
					//渲染帧率
					var render_fr = rowMap.get("render_fr");
					
					//时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为time有时可能为空，会导致set_max_bwTimeArr_zb下标跳跃。
						cur_device_infoTimeArr_zb[flag] = time;
						flag ++;
						
						cur_device_info_map.put(dateToUTC(time)+"_cpu_zb",cpu);
						cur_device_info_map.put(dateToUTC(time)+"_render_fr_zb",render_fr);
					}
					
					if(cpu==undefined||cpu==null||cpu===""){
						cpu = "--";
					}
					if(render_fr==undefined||render_fr==null||render_fr===""){
						render_fr = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					html += "时间 : "+time+"<br/>cpu : " +cpu+"%<br/>渲染帧率："+render_fr+"帧/秒";
				
					if(time!="--"){
						switchinfoMap.put(dateToUTC(time)+'_4_zb',html);
					}
				}
			}
		});
	}
	
	if(direction == "bz"){
		//得到时间，然后组成数组
		cur_device_infoTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//cpu
					var cpu = rowMap.get("cpu_info");
					//渲染帧率
					var render_fr = rowMap.get("render_fr");
					
					//时间
					var time = rowMap.get('time');
					if(time!=undefined&&time!=null&&time!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						time = formatTime(time);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为time有时可能为空，会导致set_max_bwTimeArr_bz下标跳跃。
						cur_device_infoTimeArr_bz[flag] = time;
						flag ++;
						
						cur_device_info_map.put(dateToUTC(time)+"_cpu_bz",cpu);
						cur_device_info_map.put(dateToUTC(time)+"_render_fr_bz",render_fr);
					}
					
					if(cpu==undefined||cpu==null||cpu===""){
						cpu = "--";
					}
					if(render_fr==undefined||render_fr==null||render_fr===""){
						render_fr = "--";
					}
					if(time==undefined||time==null||time===""){
						time = "--";
					}
					
					html += "时间 : "+time+"<br/>cpu : " +cpu+"%<br/>渲染帧率："+render_fr+"帧/秒";
					
					if(time!="--"){
						switchinfoMap.put(dateToUTC(time)+'_4_bz',html);
					}
				}
			}
		});
	}
}

/**
 * 处理解码质量统计的数据
 * @param {} data
 * @param {} direction
 */
function decode_countArr(data,direction){
	var decode_count = data;
	if(direction == "zb"){
		
		if(decode_count!=undefined&&decode_count!=null&&decode_count!==""&&(decode_count instanceof Array)&&decode_count.length>0){
			//1　排序
			$.each(decode_count,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							if(va!=undefined&&va!=null&&va!==""){
								var vaArr = va.split("=");
								if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
									if(vaArr[0]=="time"){
										//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
										decode_count_timeArr_zb[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
										
										//将每条数据的time的值作为key，每条数据的整体作为value
										decode_count_map_zb.put(splitTime(formatTime(vaArr[1])).getTime(),val);
									}
								}
							}
						});
					}
				}
			});
			bom(decode_count_timeArr_zb);
			
			if(decode_count_timeArr_zb!=undefined&&decode_count_timeArr_zb!=null&&decode_count_timeArr_zb!==""&&(decode_count_timeArr_zb instanceof Array)&&decode_count_timeArr_zb.length>0){
				$.each(decode_count_timeArr_zb,function(i,val){
					//进行排序，为原数组的各个记录重新赋值
					decode_count[i] = decode_count_map_zb.get(splitTime(val).getTime());
				});
			}
			
			//2 提取字段内容到一维数组，为显示的图表的Y轴赋值
			$.each(decode_count,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								
								//将每条数据中要显示在tips上的字段存放到一维数组中
								if(vaArr[0]=="cpu"){//cpu
									cpuYArr_zb[i] = vaArr[1];
								}
								if(vaArr[0]=="decode_f"){//解码帧率（渲染帧率）
									decode_fYArr_zb[i] = vaArr[1];
								}
								if(vaArr[0]=="a_null_lev"){//音频空音率
									a_null_levYArr_zb[i] = vaArr[1];
								}
							}
						});
					}
				}
			});
		}
		
		cpu_zbUTC = new Array();//cpu
		decode_f_zbUTC = new Array();//解码帧率（渲染帧率）
		a_null_lev_zbUTC = new Array();//音频空音率
		
		$.each(decode_count_timeArr_zb,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				var arr0 = new Array();
				var arr1 = new Array();
				var arr2 = new Array();
				
				arr0[0] = dateToUTC(val);
				arr1[0] = dateToUTC(val);
				arr2[0] = dateToUTC(val);
				
				if(cpuYArr_zb[i]!=undefined&&cpuYArr_zb[i]!=null&&cpuYArr_zb[i]!==""){
					arr0[1] = stringToNumber(cpuYArr_zb[i]);//cpu
					cpu_zbUTC[i] = arr0;
				}
				
				if(decode_fYArr_zb[i]!=undefined&&decode_fYArr_zb[i]!=null&&decode_fYArr_zb[i]!==""){
					arr1[1] = stringToNumber(decode_fYArr_zb[i]);//解码帧率
					decode_f_zbUTC[i] = arr1;
				}
				
				if(a_null_levYArr_zb[i]!=undefined&&a_null_levYArr_zb[i]!=null&&a_null_levYArr_zb[i]!==""){
					arr2[1] = stringToNumber(a_null_levYArr_zb[i]) ;//音频空音率
					a_null_lev_zbUTC[i] = arr2;
				}
			}
		});
		
	}
	if(direction == "bz"){
		
		if(decode_count!=undefined&&decode_count!=null&&decode_count!==""&&(decode_count instanceof Array)&&decode_count.length>0){
			//1　排序
			$.each(decode_count,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							if(va!=undefined&&va!=null&&va!==""){
								var vaArr = va.split("=");
								if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
									if(vaArr[0]=="time"){
										//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
										decode_count_timeArr_bz[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
										
										//将每条数据的time的值作为key，每条数据的整体作为value
										decode_count_map_bz.put(splitTime(formatTime(vaArr[1])).getTime(),val);
									}
								}
							}
						});
					}
				}
			});
			
			bom(decode_count_timeArr_bz);
			
			if(decode_count_timeArr_bz!=undefined&&decode_count_timeArr_bz!=null&&decode_count_timeArr_bz!==""&&(decode_count_timeArr_bz instanceof Array)&&decode_count_timeArr_bz.length>0){
				$.each(decode_count_timeArr_bz,function(i,val){
					//进行排序，为原数组的各个记录重新赋值
					decode_count[i] = decode_count_map_bz.get(splitTime(val).getTime());
				});
			}
			
			//2 提取字段内容到一维数组，为显示的图表的Y轴赋值
			$.each(decode_count,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								
								//将每条数据中要显示在tips上的字段存放到一维数组中
								if(vaArr[0]=="cpu"){//cpu
									cpuYArr_bz[i] = vaArr[1];
								}
								if(vaArr[0]=="decode_f"){//解码帧率（渲染帧率）
									decode_fYArr_bz[i] = vaArr[1];
								}
								if(vaArr[0]=="a_null_lev"){//音频空音率
									a_null_levYArr_bz[i] = vaArr[1];
								}
							}
						});
					}
				}
			});
			
		}
		
		cpu_bzUTC = new Array();//cpu
		decode_f_bzUTC = new Array();//解码帧率（渲染帧率）
		a_null_lev_bzUTC = new Array();//音频空音率
		
		$.each(decode_count_timeArr_bz,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				var arr0 = new Array();
				var arr1 = new Array();
				var arr2 = new Array();
				
				arr0[0] = dateToUTC(val);
				arr1[0] = dateToUTC(val);
				arr2[0] = dateToUTC(val);
				
				
				if(cpuYArr_bz[i]!=undefined&&cpuYArr_bz[i]!=null&&cpuYArr_bz[i]!==""){
					arr0[1] = stringToNumber(cpuYArr_bz[i]);//cpu
					cpu_bzUTC[i] = arr0;
				}
				
				if(decode_fYArr_bz[i]!=undefined&&decode_fYArr_bz[i]!=null&&decode_fYArr_bz[i]!==""){
					arr1[1] = stringToNumber(decode_fYArr_bz[i]);//解码帧率
					decode_f_bzUTC[i] = arr1;
				}
				
				if(a_null_levYArr_bz[i]!=undefined&&a_null_levYArr_bz[i]!=null&&a_null_levYArr_bz[i]!==""){
					arr2[1] = stringToNumber(a_null_levYArr_bz[i]) ;//音频空音率
					a_null_lev_bzUTC[i] = arr2;
				}
			}
		});
		
	}
}

/**
 * 处理信号强度的数据
 * @param {} data
 * @param {} direction
 */
function signalArr(data,direction){
	var signal = data;
	if(direction == "zb"){
	
		if(signal!=undefined&&signal!=null&&signal!==""&&(signal instanceof Array)&&signal.length>0){
			//1 排序
			$.each(signal,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								if(vaArr[0]=="time"){
									//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
									signal_timeArr_zb[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
									
									//将每条数据的time的值作为key，每条数据的整体作为value
									signal_map_zb.put(splitTime(formatTime(vaArr[1])).getTime(),val);
								}
							}
						});
					}
				}
			});
			
			bom(signal_timeArr_zb);
			if(signal_timeArr_zb!=undefined&&signal_timeArr_zb!=null&&signal_timeArr_zb!==""&&(signal_timeArr_zb instanceof Array)&&signal_timeArr_zb.length>0){
				$.each(signal_timeArr_zb,function(i,val){
					//进行排序，为原数组的各个记录重新赋值
					signal[i] = signal_map_zb.get(splitTime(val).getTime());
				});
			}
			
			//2 提取字段内容到一维数组，为显示的图表的Y轴赋值
			$.each(signal,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								
								//将每条数据中要显示在tips上的字段存放到一维数组中
								if(vaArr[0]=="signal"){//信号强度值
									signalYArr_zb[i] = vaArr[1];
								}
							}
						});
					}
				}
			});
		}
		
		signal_zbUTC = new Array();//信号强度
		$.each(signal_timeArr_zb,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				var arr0 = new Array();
				
				arr0[0] = dateToUTC(val);
				
				
				if(signalYArr_zb[i]!=undefined&&signalYArr_zb[i]!=null&&signalYArr_zb[i]!==""){
					arr0[1] = stringToNumber(signalYArr_zb[i])+130;//cpu
					
					signal_zbUTC[i] = arr0;
				}
				
			}
		});
		
	}
	if(direction == "bz"){
	
		if(signal!=undefined&&signal!=null&&signal!==""&&(signal instanceof Array)&&signal.length>0){
			//1 排序
			$.each(signal,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								if(vaArr[0]=="time"){
									//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
									signal_timeArr_bz[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
									
									//将每条数据的time的值作为key，每条数据的整体作为value
									signal_map_bz.put(splitTime(formatTime(vaArr[1])).getTime(),val);
								}
							}
						});
					}
				}
			});
			
			bom(signal_timeArr_bz);
			if(signal_timeArr_bz!=undefined&&signal_timeArr_bz!=null&&signal_timeArr_bz!==""&&(signal_timeArr_bz instanceof Array)&&signal_timeArr_bz.length>0){
				$.each(signal_timeArr_bz,function(i,val){
					//进行排序，为原数组的各个记录重新赋值
					signal[i] = signal_map_bz.get(splitTime(val).getTime());
				});
			}
			
			//2 提取字段内容到一维数组，为显示的图表的Y轴赋值
			$.each(signal,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var valArr = val.split(" ");
					if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
						$.each(valArr,function(j,va){
							var vaArr = va.split("=");
							if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
								
								//将每条数据中要显示在tips上的字段存放到一维数组中
								if(vaArr[0]=="signal"){//信号强度值
									signalYArr_bz[i] = vaArr[1];
								}
							}
						});
					}
				}
			});
		}
		signal_bzUTC = new Array();//信号强度
		$.each(signal_timeArr_bz,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				var arr0 = new Array();
				
				arr0[0] = dateToUTC(val);
				
				if(signalYArr_bz[i]!=undefined&&signalYArr_bz[i]!=null&&signalYArr_bz[i]!==""){
					arr0[1] = stringToNumber(signalYArr_bz[i])+130;//cpu
					signal_bzUTC[i] = arr0;
				}
				
			}
		});
	}
}
