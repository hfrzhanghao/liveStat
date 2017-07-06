/*
 * 对带宽、等级、丢包率、延时、流量统计（冗余比例、视频流量统计、音频流量统计）的数据进行处理
 * 
 */
//说明：
//数据X轴时间要以丢包率和延时的为基准，它们是每隔20s汇报一次，带宽和等级汇报时间不定，汇报的次数很少
//对于带宽和等级，在两个自适应点之间所有的点的Y轴值相同，因为在两个自适应点之间的整个时间段内，所用的带宽和等级都是前者自适应调节点的。

//视图展示所需的数据，二维
var dataArr01_bz = new Array();//端到端带宽
var dataArr02_bz = new Array();//冗余带宽
var dataArr03_bz = new Array();//有效上行带宽
var dataArr04_bz = new Array();//FEC后音频带宽
var dataArr05_bz = new Array();//FEC后视频带宽
var dataArr06_bz = new Array();//自适应调节点

var dataArr07_bz = new Array();//通话等级
var dataArr071_bz = new Array();//依据编码“带宽自适应调节等级表”用等级转换得到，在显示时转化为对应的帧率显示
var dataArr08_bz = new Array();//视频fec等级
var dataArr09_bz = new Array();//音频fec等级

var dataArr10_bz = new Array();//视频原始丢包率
var dataArr11_bz = new Array();//视频fec纠错后丢包率
var dataArr12_bz = new Array();//音频原始丢包率
var dataArr13_bz = new Array();//音频fec纠错后丢包率

var dataArr14_bz = new Array();//延时

//highstock显示标签所用
var bandMapHighstock_bz = new Map();

//被叫端X轴时间
var bandAdaptiveTimeArr_bz = new Array();
/**
 * 带宽
 */
var etoe_bwYArr_bz = new Array();//端到端带宽Y轴
var redund_up_bwYArr_bz = new Array();//冗余带宽Y轴
var valid_up_bwYArr_bz = new Array();//有效上行带宽Y轴
var audio_bw_fYArr_bz = new Array();//fec后音频带宽Y轴
var video_bw_fYArr_bz = new Array();//fec后视频带宽Y轴
var adaptivePoint_bz = new Array;//自适应调用节
var BandwidthMap_bz = new Map();//存放自适应调节点信息的Map
var audio_bitrateYArr_bz = new Array();//音频码率(发送音频码率)
var video_bitrateYArr_bz = new Array();//视频码率(发送视频码率)

/**
 * 等级
 */
var trans_level_idArr_bz = new Array();//通话等级Y轴
trans_level_idArr_bz[0] = 0;
var video_redundent_levArr_bz = new Array();//视频fec等级Y轴
video_redundent_levArr_bz[0] = 0;
var audio_redundent_levArr_bz = new Array();//音频fec等级Y轴
audio_redundent_levArr_bz[0] = 0;

/**
 * 丢包率
 */
var audio_lose_bYArr_bz = new Array();//音频原始丢包率Y轴
audio_lose_bYArr_bz[0] = 0;
var audio_lose_fYArr_bz = new Array();//音频fec纠错后丢包率Y轴
audio_lose_fYArr_bz[0] = 0;
var video_lose_bYArr_bz = new Array();//视频原始丢包率Y轴
video_lose_bYArr_bz[0] = 0;
var video_lose_fYArr_bz = new Array();//视频fec纠错后丢包率Y轴
video_lose_fYArr_bz[0] = 0;
var audio_videoMap_bz = new Map();//音视频解码效果

/**
 * 延时
 */
var delayYArr_bz = new Array();//延时Y轴
var delayMap_bz = new Map();//存放延时的Map
delayYArr_bz[0] = 0;//第一个点值为0，因为此时还没有延时汇报

/**
 * 发送及接收码流统计
 */
var v_fec_stream_sYArr_bz = new Array();//视频FEC发送流量Y轴值
var v_fec_stream_rYArr_bz = new Array();//视频FEC接收流量Y轴值
var v_stream_sYArr_bz = new Array();//视频发送流量Y轴值
var v_stream_rYArr_bz = new Array();//视频接收流量Y轴值
var a_fec_stream_sYArr_bz = new Array();//音频FEC发送流量Y轴值
var a_fec_stream_rYArr_bz = new Array();//音频FEC接收流量Y轴值
var a_stream_sYArr_bz = new Array();//音频发送流量Y轴值
var a_stream_rYArr_bz = new Array();//音频接收流量Y轴值
var total_stream_sYArr_bz = new Array();//每10秒总发送流量Y轴值
var total_stream_rYArr_bz = new Array();//每10秒总接收流量Y轴值

var total_stream_s_bz = 0;//所有10秒加起来的值，总发送流量
var total_stream_r_bz = 0;//所有10秒加起来的值，总接收流量

var v_copy_stream_sYArr_bz = new Array();//发送的copy视频码流 
var v_copy_stream_rYArr_bz = new Array();//接收的copy视频码流 
var v_arq_stream_sYArr_bz = new Array();//发送的arq视频码流
var v_arq_stream_rYArr_bz = new Array();//接收的arq视频码流 
var a_copy_stream_sYArr_bz = new Array();//发送的copy音频码流 
var a_copy_stream_rYArr_bz = new Array();//接收的copy音频码流 
var a_arq_stream_sYArr_bz = new Array();//发送的arq音频码流 
var a_arq_stream_rYArr_bz = new Array();//接收的arq音频码流 

var r_s_rate_bz = new Array();//发送冗余比例
var a_r_s_rate_bz = new Array();//音频发送冗余比例
var v_r_s_rate_bz = new Array();//视频发送冗余比例
var r_r_rate_bz = new Array();//接收冗余比例
var a_r_r_rate_bz = new Array();//音频接收冗余比例
var v_r_r_rate_bz = new Array();//视频接收冗余比例

var stream_x_bz = new Array();//X轴的值，使用数组的下标
var stream_timeArr_bz = new Array();//时间的一维数组，排序用

var stream_map_bz = new Map();//发送及接收码流的map，用来排序和视图标签显示


/**
 * “带宽自适应”被叫端
 */
function bandWithAdaptive_bz(datas){
	
	var paramExt;//包括以下大类
	
	var adjust_result_adjust_mode_0;//呼叫前静态协商结果参数上报
	
	var adjust_result_adjust_mode_1;//动态协商结果上报
	
	var trans_quality;//端到端质量上报
	
	var stream_count;//发送及接收码流统计
	
	/**
	 * 带宽
	 */
	var adjust_count;//调节次数 
	var fec_adjust_count;//FEC调节次数 
	var last_loss_rate;//上次丢包率 
	
	/**
	 * 端到端质量上报
	 */
	var avg_rtt_time;//延时
	var audio_lose_b;//音频原始丢包率
	var audio_lose_f;//音频fec纠错后丢包率
	var video_lose_b;//视频原始丢包率
	var video_lose_f;//视频fec纠错后丢包率
	var audio_res_show;//音频效果展示 
	var video_res_show;//视频效果展示
	
	
	/**
	 * 呼叫前静态协商结果参数上报
	 */
	var etoe_bw;//端到端带宽
	var redund_up_bw;//冗余带宽
	var valid_up_bw;//有效上行带宽
	var audio_bw_f;//fec后音频带宽
	var video_bw_f;//fec后视频带宽
	var audio_bitrate;//音频码率(发送音频码率)
	var video_bitrate;//视频码率(发送视频码率)
	var trans_level_id;//视、音频等级
	var video_redundent_lev;//视频fec等级
	var audio_redundent_lev;//音频fec等级
	
	//用来对时间进行排序后，确保Y轴与X轴的数据保持一致
	var tempMap = new Map();
	
	//存放端到端质量上报的每条记录的时间，作为X轴[1,length-1]的数据，第一个时间点采用静态协商的时间
	var bandAdaptiveTimeArrTemp = new Array();
	
	//存放动态协商上报的每条记录的时间，这个记录不多，很少
	var adjust_result_adjust_mode_1Time = new Array();
	
	var etoe_bwTemp = new Array();//动态协商中端到端带宽的值
	var redund_up_bwTemp = new Array();//动态协商中冗余带宽的值
	var valid_up_bwTemp = new Array();//动态协商中有效上行带宽的值
	var audio_bw_fTemp = new Array();//动态协商中fec后音频带宽的值
	var video_bw_fTemp = new Array();//动态协商中fec后视频带宽的值
	var audio_bitrateTemp = new Array();//音频码率(发送音频码率)
	var video_bitrateTemp = new Array();//视频码率(发送视频码率)
	var trans_level_idTemp = new Array();//动态协商中视、音频等级的值
	var video_redundent_levTemp = new Array();//动态协商中视频fec等级的值
	var audio_redundent_levTemp = new Array();//动态协商中音频fec等级的值
	
	/**
	 * 发送及接收码流统计每个面积图的Y值，每次调用方法时都重置一下，
	 * 防止在图表显示时因本条数据过少导致无法全部重置上条数据塞进数组的数据，
	 * 若无法全部重置，本条数据的图表上后一部分就会显示旧的数据
	 */
	v_fec_stream_sYArr_bz = new Array();//视频FEC发送流量Y轴值
	v_fec_stream_rYArr_bz = new Array();//视频FEC接收流量Y轴值
	v_stream_sYArr_bz = new Array();//视频发送流量Y轴值
	v_stream_rYArr_bz = new Array();//视频接收流量Y轴值
	a_fec_stream_sYArr_bz = new Array();//音频FEC发送流量Y轴值
	a_fec_stream_rYArr_bz = new Array();//音频FEC接收流量Y轴值
	a_stream_sYArr_bz = new Array();//音频发送流量Y轴值
	a_stream_rYArr_bz = new Array();//音频接收流量Y轴值
	total_stream_sYArr_bz = new Array();//每10秒总发送流量Y轴值
	total_stream_rYArr_bz = new Array();//每10秒总接收流量Y轴值
	total_stream_s_bz = 0;//所有10秒加起来的值，总发送流量
    total_stream_r_bz = 0;//所有10秒加起来的值，总接收流量
	v_copy_stream_sYArr_bz = new Array();//发送的copy视频码流 
	v_copy_stream_rYArr_bz = new Array();//接收的copy视频码流 
	v_arq_stream_sYArr_bz = new Array();//发送的arq视频码流
	v_arq_stream_rYArr_bz = new Array();//接收的arq视频码流 
	a_copy_stream_sYArr_bz = new Array();//发送的copy音频码流 
	a_copy_stream_rYArr_bz = new Array();//接收的copy音频码流 
	a_arq_stream_sYArr_bz = new Array();//发送的arq音频码流 
	a_arq_stream_rYArr_bz = new Array();//接收的arq音频码流 
	
	r_s_rate_bz = new Array();//发送冗余比例
	a_r_s_rate_bz = new Array();//音频发送冗余比例
	v_r_s_rate_bz = new Array();//视频发送冗余比例
	r_r_rate_bz = new Array();//接收冗余比例
	a_r_r_rate_bz = new Array();//音频接收冗余比例
	v_r_r_rate_bz = new Array();//视频接收冗余比例
	
	stream_x_bz = new Array();//X轴的值，使用数组的下标
	stream_timeArr_bz = new Array();//时间的一维数组，排序用
	stream_map_bz = new Map();//发送及接收码流的map，用来排序和视图标签显示
	
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						
						//获取X轴的基准时间数组
						trans_quality = paramExt.trans_quality;//端到端质量上报
									
						if(trans_quality!=undefined&&trans_quality!=null&&trans_quality!==""){
							$.each(trans_quality,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var trans_qualityArr = val.split(' ');
									var trans_qualityMap = new Map();
									if(trans_qualityArr!=undefined&&trans_qualityArr!=null&&trans_qualityArr!==""&&(trans_qualityArr instanceof Array)){
										$.each(trans_qualityArr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												trans_qualityMap.put(va.split('=')[0],va.split('=')[1]);
											}
										});
									}
									
									avg_rtt_time = trans_qualityMap.get('avg_rtt_time');//延时
									audio_lose_b = trans_qualityMap.get('audio_lose_b');//音频原始丢包率
									audio_lose_f = trans_qualityMap.get('audio_lose_f');//音频fec纠错后丢包率
									video_lose_b = trans_qualityMap.get('video_lose_b');//视频原始丢包率
									video_lose_f = trans_qualityMap.get('video_lose_f');//视频fec纠错后丢包率
									audio_res_show = trans_qualityMap.get('audio_res_show');//音频效果展示 
									video_res_show = trans_qualityMap.get('video_res_show');//视频效果展示
									var time = trans_qualityMap.get('time');//时间
									
									if(avg_rtt_time==undefined||avg_rtt_time==null||avg_rtt_time===""){
										avg_rtt_time = "--";
									}
									
									//将音频原始丢包率、音频fec纠错后丢包率、视频原始丢包率、视频fec纠错后丢包率、音频效果、视频效果转化为百分比，并保留两位小数
									if(audio_lose_b!=undefined&&audio_lose_b!=null&&audio_lose_b!==""){
										audio_lose_b = toFixed(parseFloat(audio_lose_b)*100);
									}
									if(audio_lose_f!=undefined&&audio_lose_f!=null&&audio_lose_f!==""){
										audio_lose_f = toFixed(parseFloat(audio_lose_f)*100);
									}
									if(video_lose_b!=undefined&&video_lose_b!=null&&video_lose_b!==""){
										video_lose_b = toFixed(parseFloat(video_lose_b)*100);
									}
									if(video_lose_f!=undefined&&video_lose_f!=null&&video_lose_f!==""){
										video_lose_f = toFixed(parseFloat(video_lose_f)*100);
									}
									if(audio_res_show!=undefined&&audio_res_show!=null&&audio_res_show!==""){
										audio_res_show = toFixed(parseFloat(audio_res_show)*100);
									}
									if(video_res_show!=undefined&&video_res_show!=null&&video_res_show!==""){
										video_res_show = toFixed(parseFloat(video_res_show)*100);
									}
									
									if(audio_lose_b==undefined||audio_lose_b==null||audio_lose_b===""){
										audio_lose_b = "--";
									}
									if(audio_lose_f==undefined||audio_lose_f==null||audio_lose_f===""){
										audio_lose_f = "--";
									}
									if(video_lose_b==undefined||video_lose_b==null||video_lose_b===""){
										video_lose_b = "--";
									}
									if(video_lose_f==undefined||video_lose_f==null||video_lose_f===""){
										video_lose_f = "--";
									}
									if(audio_res_show==undefined||audio_res_show==null||audio_res_show===""){
										audio_res_show = "--";
									}
									if(video_res_show==undefined||video_res_show==null||video_res_show===""){
										video_res_show = "--";
									}
									
									if(time!=undefined&&time!=null&&time!==""){
										time = formatTime(time);
									}
									
									if(time==undefined||time==null||time===""){
										time = "--";
									}
									
									if(time!="--"){
										//为X轴的临时变量赋值
										bandAdaptiveTimeArrTemp[i] = time;
									}
									
									//将延时的时间与Y值设置关联
									tempMap.put(time+"_avg_rtt_time",avg_rtt_time);
									//将音频原始丢包率的时间与Y值设置关联
									tempMap.put(time+"_audio_lose_b",audio_lose_b);
									//将音频fec纠错后丢包率的时间与Y值设置关联
									tempMap.put(time+"_audio_lose_f",audio_lose_f);
									//将视频原始丢包率的时间与Y值设置关联
									tempMap.put(time+"_video_lose_b",video_lose_b);
									//将视频fec纠错后丢包率的时间与Y值设置关联
									tempMap.put(time+"_video_lose_f",video_lose_f);
									audio_videoMap_bz.put(time,"音频解码率 : "+audio_res_show+"，视频解码率 : "+video_res_show);
									delayMap_bz.put(time,"延时 : "+avg_rtt_time);
								}
							});
						}
						
						
						//静态协商，第一个点采用静态协商的数据						
						adjust_result_adjust_mode_0 = paramExt.adjust_result_adjust_mode_0;
						if(adjust_result_adjust_mode_0!=undefined&&adjust_result_adjust_mode_0!=null&&adjust_result_adjust_mode_0!==""){
						
							var adjust_result_0Arr = adjust_result_adjust_mode_0.split(' ');
							var adjust_result_0Map = new Map();
							if(adjust_result_0Arr!=undefined&&adjust_result_0Arr!=null&&adjust_result_0Arr!==""){
								$.each(adjust_result_0Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_result_0Map.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							etoe_bw = adjust_result_0Map.get('etoe_bw');//端到端带宽
							redund_up_bw = adjust_result_0Map.get('redund_up_bw');//冗余带宽
							valid_up_bw = adjust_result_0Map.get('valid_up_bw');//有效上行带宽
							audio_bw_f = adjust_result_0Map.get('audio_bw_f');//fec后音频带宽
							video_bw_f = adjust_result_0Map.get('video_bw_f');//fec后视频带宽
							audio_bitrate = adjust_result_0Map.get('audio_bitrate');//音频码率(发送音频码率)
							video_bitrate = adjust_result_0Map.get('video_bitrate');//视频码率(发送视频码率)
							
							trans_level_id = adjust_result_0Map.get('trans_level_id');//视、音频等级
							video_redundent_lev = adjust_result_0Map.get('video_redundent_lev');//视频fec等级
							audio_redundent_lev = adjust_result_0Map.get('audio_redundent_lev');//音频fec等级
							
							
							if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
								etoe_bw = "--";
							}
							if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
								redund_up_bw = "--";
							}
							if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
								valid_up_bw = "--";
							}
							if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
								audio_bw_f = "--";
							}
							if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
								video_bw_f = "--";
							}
							if(audio_bitrate==undefined||audio_bitrate==null||audio_bitrate===""){
								audio_bitrate = "--";
							}
							if(video_bitrate==undefined||video_bitrate==null||video_bitrate===""){
								video_bitrate = "--";
							}
							if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
								trans_level_id = "--";
							}
							if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
								video_redundent_lev = "--";
							}
							if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
								audio_redundent_lev = "--";
							}
							
							
							/**
							 * 带宽，第一个值采用静态协商的数据
							 */
							etoe_bwYArr_bz[0] = etoe_bw;//端到端带宽Y轴
							redund_up_bwYArr_bz[0] = redund_up_bw;//冗余带宽Y轴
							valid_up_bwYArr_bz[0] = valid_up_bw;//有效上行带宽Y轴
							audio_bw_fYArr_bz[0] = audio_bw_f;//fec后音频带宽Y轴
							video_bw_fYArr_bz[0] = video_bw_f;//fec后视频带宽Y轴
							audio_bitrateYArr_bz[0] = audio_bitrate;//音频码率(发送音频码率)
							video_bitrateYArr_bz[0] = video_bitrate;//视频码率(发送视频码率)
							
							/**
							 * 等级，第一个值采用静态协商的数据
							 */
							trans_level_idArr_bz[0] = trans_level_id;//视、音频等级Y轴
							video_redundent_levArr_bz[0] = video_redundent_lev;//视频fec等级Y轴
							audio_redundent_levArr_bz[0] = audio_redundent_lev;//音频fec等级Y轴
							
							var time = adjust_result_0Map.get('time');//时间
							
							if(time!=undefined&&time!=null&&time!==""){
								time = formatTime(time);
							}
							
							if(time==undefined||time==null||time===""){
								time = "--";
							}
							//设置X轴第一个时间点的值
							bandAdaptiveTimeArr_bz[0] = time;
						}
						
						//升序排列临时变量数据
						bom(bandAdaptiveTimeArrTemp);
						
						//将临时变量的值赋值给X轴
						if(bandAdaptiveTimeArrTemp!=undefined&&bandAdaptiveTimeArrTemp!=null&&bandAdaptiveTimeArrTemp!==""){
							$.each(bandAdaptiveTimeArrTemp,function(i,val){
								//取得时间，依次存入数组，因为数组第一个值要用静态协商数据的，所以从下标1开始赋值
								if(val!=undefined&&val!=null&&val!==""){
									bandAdaptiveTimeArr_bz[i+1]= val;
								}
							});
						}
						
						//为丢包率和延时的Y轴赋值
						if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""){
							$.each(bandAdaptiveTimeArr_bz,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									if(i!==0){//排除第一个点，第一个点直接设置为0
										
										/**
										 * 丢包率
										 */
										//为音频原始丢包率Y轴赋值
										var audio_lose_bY = tempMap.get(val+"_audio_lose_b");
										if(audio_lose_bY!=undefined&&audio_lose_bY!=null&&audio_lose_bY!==""){
											audio_lose_bYArr_bz[i] = audio_lose_bY;
											//audio_lose_bYArr_bz[i] = toFixed(parseFloat(audio_lose_bY)*100);
										}
										
										//为音频fec纠错后丢包率Y轴赋值
										var audio_lose_fY = tempMap.get(val+"_audio_lose_f");
										if(audio_lose_fY!=undefined&&audio_lose_fY!=null&&audio_lose_fY!==""){
											audio_lose_fYArr_bz[i] = audio_lose_fY;
											//audio_lose_fYArr_bz[i] = toFixed(parseFloat(audio_lose_fY)*100);
										}
										
										//为视频原始丢包率Y轴赋值
										var video_lose_bY = tempMap.get(val+"_video_lose_b");
										if(video_lose_bY!=undefined&&video_lose_bY!=null&&video_lose_bY!==""){
											video_lose_bYArr_bz[i] = video_lose_bY;
											//video_lose_bYArr_bz[i] = toFixed(parseFloat(video_lose_bY)*100);
										}
										
										//为视频fec纠错后丢包率Y轴赋值
										var video_lose_fY = tempMap.get(val+"_video_lose_f");
										if(video_lose_fY!=undefined&&video_lose_fY!=null&&video_lose_fY!==""){
											video_lose_fYArr_bz[i] = video_lose_fY;
											//video_lose_fYArr_bz[i] = toFixed(parseFloat(video_lose_fY)*100);
										}
										
										/**
										 * 延时
										 */
										//为延时的Y轴赋值
										var delayY = tempMap.get(val+"_avg_rtt_time");
										if(delayY!=undefined&&delayY!=null&&delayY!==""){
											delayYArr_bz[i] = delayY;
										}
										
									}
								}
							});
						}
						
						
						//动态协商，除了第一个点，带宽和等级采用动态协商的值
						adjust_result_adjust_mode_1 = paramExt.adjust_result_adjust_mode_1;
						if(adjust_result_adjust_mode_1!=undefined&&adjust_result_adjust_mode_1!=null&&adjust_result_adjust_mode_1!==""){
							
							/**
							 * 去除掉重复汇报的数据
							 */							
							var adjust_1_Map = new Map();//key:时间，val:每个记录
							var adjust_1_adjust_count_Map = new Map();//key:时间，val:第几次调节
							var adjust_1_Arr = new Array();//存放每条记录的时间
							$.each(adjust_result_adjust_mode_1,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var adjust_1Arr = val.split(' ');
									var adjust_1Map = new Map();
									if(adjust_1Arr!=undefined&&adjust_1Arr!=null&&adjust_1Arr!==""){
										$.each(adjust_1Arr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												adjust_1Map.put(va.split('=')[0],va.split('=')[1]);
											}
										});
									}
									
									var time = adjust_1Map.get('time');
									if(time!=undefined&&time!=null&&time!==""){
										time = formatTime(time);
									}
									
									if(time==undefined||time==null||time===""){
										time = "--";
									}	
									//1.1.key:时间，val:每个记录
									adjust_1_Map.put(time,val);
									//1.2.key:时间，val:第几次调节
									adjust_1_adjust_count_Map.put(time,adjust_1Map.get('adjust_count'));
									//2.存放每条记录的时间
									adjust_1_Arr[i] = time;
								}
							});
							
							//3.将时间升序排列
							bom(adjust_1_Arr);
							
							//4.定义一个新的数组，存放不含重复记录的自适应调节数据
							var adjust_result_adjust_mode_1New = new Array();
							var flag = 0;
							//5.去掉自适应调节汇报的重复数据，只保留第一次汇报的
							if(adjust_1_Arr!=undefined&&adjust_1_Arr!=null&&adjust_1_Arr!==""&&(adjust_1_Arr instanceof Array)){
								var temp = -1;
								$.each(adjust_1_Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										var adjust_count = adjust_1_adjust_count_Map.get(val);
										if(adjust_count!=temp){
											temp = adjust_count;
											adjust_result_adjust_mode_1New[flag] = adjust_1_Map.get(val);
											flag ++;
										}
									}
								});
							}
							
							//console.info("自适应去掉前"+adjust_result_adjust_mode_1);
							//console.info("自适应去掉后"+adjust_result_adjust_mode_1New);
							
							//对去掉了重复数据的自适应数据进行处理
							if(adjust_result_adjust_mode_1New!=undefined&&adjust_result_adjust_mode_1New!=null&&adjust_result_adjust_mode_1New!==""){
								//要比较的两个数组都是升序排列好的数组。此标志的作用是：循环第一个数组时，对于第一个数组的每个记录，都会去循环比较第二个数组，当符合条件后，数组一的第二个记录开始循环时，从第二个数组的刚刚循环到的记录的下一个记录开始往后循环，而无须从头开始循环，加快了程序运行速度。
								var adjustIndexFlag = 1;//第一个点属于静态协商的点，故不用。
								$.each(adjust_result_adjust_mode_1New,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										var adjust_result_adjust_mode_1Arr = val.split(' ');
										var adjust_result_adjust_mode_1Map = new Map();
										if(adjust_result_adjust_mode_1Arr!=undefined&&adjust_result_adjust_mode_1Arr!=null&&adjust_result_adjust_mode_1Arr!==""&&(adjust_result_adjust_mode_1Arr instanceof Array)){
											$.each(adjust_result_adjust_mode_1Arr,function(j,va){
												if(va!=undefined&&va!=null&&va!==""){
													adjust_result_adjust_mode_1Map.put(va.split('=')[0],va.split('=')[1]);
												}
											});
											
										}
										
										etoe_bw = adjust_result_adjust_mode_1Map.get('etoe_bw');//端到端带宽
										redund_up_bw = adjust_result_adjust_mode_1Map.get('redund_up_bw');//冗余带宽
										valid_up_bw = adjust_result_adjust_mode_1Map.get('valid_up_bw');//有效上行带宽
										audio_bw_f = adjust_result_adjust_mode_1Map.get('audio_bw_f');//fec后音频带宽
										video_bw_f = adjust_result_adjust_mode_1Map.get('video_bw_f');//fec后视频带宽
										audio_bitrate = adjust_result_adjust_mode_1Map.get('audio_bitrate');//发送的音频码率
										video_bitrate = adjust_result_adjust_mode_1Map.get('video_bitrate');//发送的视频码率
										
										adjust_count = adjust_result_adjust_mode_1Map.get('adjust_count');//调节次数 
										fec_adjust_count = adjust_result_adjust_mode_1Map.get('fec_adjust_count');//FEC调节次数 
										last_loss_rate = adjust_result_adjust_mode_1Map.get('last_loss_rate');//上次丢包率 
										
										trans_level_id = adjust_result_adjust_mode_1Map.get('trans_level_id');//视、音频等级
										video_redundent_lev = adjust_result_adjust_mode_1Map.get('video_redundent_lev');//视频fec等级
										audio_redundent_lev = adjust_result_adjust_mode_1Map.get('audio_redundent_lev');//音频fec等级
										
										var time = adjust_result_adjust_mode_1Map.get('time');//时间
										
										if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
											etoe_bw = "--";
										}
										if(adjust_count==undefined||adjust_count==null||adjust_count===""){
											adjust_count = "--";
										}
										if(fec_adjust_count==undefined||fec_adjust_count==null||fec_adjust_count===""){
											fec_adjust_count = "--";
										}
										if(last_loss_rate==undefined||last_loss_rate==null||last_loss_rate===""){
											last_loss_rate = "--";
										}
										if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
											redund_up_bw = "--";
										}
										if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
											valid_up_bw = "--";
										}
										if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
											audio_bw_f = "--";
										}
										if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
											video_bw_f = "--";
										}
										if(video_bitrate==undefined||video_bitrate==null||video_bitrate===""){
											video_bitrate = "--";
										}
										if(audio_bitrate==undefined||audio_bitrate==null||audio_bitrate===""){
											audio_bitrate = "--";
										}
										if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
											trans_level_id = "--";
										}
										if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
											video_redundent_lev = "--";
										}
										if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
											audio_redundent_lev = "--";
										}
										
										if(time!=undefined&&time!=null&&time!==""){
											time = formatTime(time);
										}
										
										//存放动态协商上报的每条记录的时间，这个记录不多，很少
										adjust_result_adjust_mode_1Time[i] = time;
										
										etoe_bwTemp[i] = etoe_bw;//动态协商中端到端带宽的值
										redund_up_bwTemp[i] = redund_up_bw;//动态协商中冗余带宽的值
										valid_up_bwTemp[i] = valid_up_bw;//动态协商中有效上行带宽的值
										audio_bw_fTemp[i] = audio_bw_f;//动态协商中fec后音频带宽的值
										video_bw_fTemp[i] = video_bw_f;//动态协商中fec后视频带宽的值
										audio_bitrateTemp[i] = audio_bitrate;//音频码率(发送音频码率)
										video_bitrateTemp[i] = video_bitrate;//视频码率(发送视频码率)
										
										trans_level_idTemp[i] = trans_level_id;//动态协商中视、音频等级的值
										video_redundent_levTemp[i] = video_redundent_lev;//动态协商中视频fec等级的值
										audio_redundent_levTemp[i] = audio_redundent_lev;//动态协商中音频fec等级的值
										
										var html = "";
										html += "第"+adjust_count+"次调节，fec第"+fec_adjust_count+"调节，上次丢包率 : "+getPercentage(last_loss_rate)+"%";
										if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""){
											for(var k=adjustIndexFlag;k<bandAdaptiveTimeArr_bz.length;k++){
												//处理最后一个点之前的点
												if(k<(bandAdaptiveTimeArr_bz.length-1)){
												
													if(time!=undefined&&time!=null&&time!==""&&bandAdaptiveTimeArr_bz[k]!=undefined&&bandAdaptiveTimeArr_bz[k]!=null&&bandAdaptiveTimeArr_bz[k]!==""&&bandAdaptiveTimeArr_bz[k+1]!=undefined&&bandAdaptiveTimeArr_bz[k+1]!=null&&bandAdaptiveTimeArr_bz[k+1]!==""){
														//将三者转化为毫秒
														//自适应调节点的时间
														var adjust_result_adjust_mode_1TimeMillisecond = splitTime(time).getTime();
														//每11秒动态汇报的时间
														var bandAdaptiveTimeArr_bzMillisecond_k0 = splitTime(bandAdaptiveTimeArr_bz[k]).getTime();
														var bandAdaptiveTimeArr_bzMillisecond_k1 = splitTime(bandAdaptiveTimeArr_bz[k+1]).getTime();
														
														if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k0!=null&&bandAdaptiveTimeArr_bzMillisecond_k0!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k1!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k1!=null&&bandAdaptiveTimeArr_bzMillisecond_k1!==""){
															if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_k0&&adjust_result_adjust_mode_1TimeMillisecond<bandAdaptiveTimeArr_bzMillisecond_k1){
																time = bandAdaptiveTimeArr_bz[k];
																adjustIndexFlag = ++k;
																break;
															}
														}
													}
												}
												//处理最后一个点
												if(k==(bandAdaptiveTimeArr_bz.length-1)){
													if(time!=undefined&&time!=null&&time!==""&&bandAdaptiveTimeArr_bz[k]!=undefined&&bandAdaptiveTimeArr_bz[k]!=null&&bandAdaptiveTimeArr_bz[k]!==""){
														//自适应调节点的时间
														var adjust_result_adjust_mode_1TimeMillisecond = splitTime(time).getTime();
														//自适应调节点的时间
														var bandAdaptiveTimeArr_bzMillisecond_k0 = splitTime(bandAdaptiveTimeArr_bz[k]).getTime();
														
														if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k0!=null&&bandAdaptiveTimeArr_bzMillisecond_k0!==""){
															if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_k0){
																time = bandAdaptiveTimeArr_bz[k];
																adjustIndexFlag = ++k;
															}
														}
													}
												}
											}
										}
										if(time==undefined||time==null||time===""){
											time = "--";
										}	
										BandwidthMap_bz.put(time,html);
									}
								});
							}
						}
						
						//为带宽和等级的各个下标设置空值，确定长度
						if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""&&(bandAdaptiveTimeArr_bz instanceof Array)){
							//从第二个下标开始
							for(var j=1;j<bandAdaptiveTimeArr_bz.length;j++){
										
								/**
								 * 带宽，第一个值采用静态协商的数据
								 */
								etoe_bwYArr_bz[j] = "";//端到端带宽Y轴
								redund_up_bwYArr_bz[j] = "";//冗余带宽Y轴
								valid_up_bwYArr_bz[j] = "";//有效上行带宽Y轴
								audio_bw_fYArr_bz[j] = "";//fec后音频带宽Y轴
								video_bw_fYArr_bz[j] = "";//fec后视频带宽Y轴
								audio_bitrateYArr_bz[j] = "";//音频码率(发送音频码率)
								video_bitrateYArr_bz[j] = "";//视频码率(发送视频码率)
								
								/**
								 * 等级，第一个值采用静态协商的数据
								 */
								trans_level_idArr_bz[j] = "";//视、音频等级Y轴
								video_redundent_levArr_bz[j] = "";//视频fec等级Y轴
								audio_redundent_levArr_bz[j] = "";//音频fec等级Y轴
							}
						}
						
						
						//为带宽和等级的各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
						if(adjust_result_adjust_mode_1Time!=undefined&&adjust_result_adjust_mode_1Time!=null&&adjust_result_adjust_mode_1Time!==""){
							var adaptivePoint_bz_index = 0;
							//要比较的两个数组都是升序排列好的数组。此标志的作用是：循环第一个数组时，对于第一个数组的每个记录，都会去循环比较第二个数组，当符合条件后，数组一的第二个记录开始循环时，从第二个数组的刚刚循环到的记录的下一个记录开始往后循环，而无须从头开始循环，加快了程序运行速度。
							var adjustIndexFlag = 1;//第一个点属于静态协商的点，故不用
							for(var i=0;i<adjust_result_adjust_mode_1Time.length;i++){
								for(var j=adjustIndexFlag;j<bandAdaptiveTimeArr_bz.length;j++){
									if(j<(bandAdaptiveTimeArr_bz.length-1)){
										
										if(adjust_result_adjust_mode_1Time[i]!=undefined&&adjust_result_adjust_mode_1Time[i]!=null&&adjust_result_adjust_mode_1Time[i]!==""
										&&bandAdaptiveTimeArr_bz[j]!=undefined&&bandAdaptiveTimeArr_bz[j]!=null&&bandAdaptiveTimeArr_bz[j]!==""
										&&bandAdaptiveTimeArr_bz[j+1]!=undefined&&bandAdaptiveTimeArr_bz[j+1]!=null&&bandAdaptiveTimeArr_bz[j+1]!==""){
											//将三者转化为毫秒
											var adjust_result_adjust_mode_1TimeMillisecond = splitTime(adjust_result_adjust_mode_1Time[i]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j0 = splitTime(bandAdaptiveTimeArr_bz[j]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j1 = splitTime(bandAdaptiveTimeArr_bz[j+1]).getTime();
											
											if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond&&adjust_result_adjust_mode_1TimeMillisecond!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j0!=null&&bandAdaptiveTimeArr_bzMillisecond_j0!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j1!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j1!=null&&bandAdaptiveTimeArr_bzMillisecond_j1!==""){
												if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_j0&&adjust_result_adjust_mode_1TimeMillisecond<bandAdaptiveTimeArr_bzMillisecond_j1){
												//取绝对值比较，小于3秒，算作同一个时间点
												//if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
													//设置带宽自适应点
													//每隔11秒汇报一次端到端质量，系统会根据汇报的质量决定是否进行自适应调节，调节只会发生在汇报质量之后，两次端到端质量汇报之间只会发生一次自适应调节，将调节点的显示点定位在导致它发生的汇报端到端质量的时间点
													var adaptivePoint_bzTemp = new Array();
													adaptivePoint_bzTemp[0] = bandAdaptiveTimeArr_bz[j];
													adaptivePoint_bzTemp[1] = 700;
													
													adaptivePoint_bz[adaptivePoint_bz_index] = adaptivePoint_bzTemp;
													adaptivePoint_bz_index++;
													
													//此时发生了自适应调节，下面五项参数的值取调节后的新值
													etoe_bw = etoe_bwTemp[i];//端到端带宽
													redund_up_bw = redund_up_bwTemp[i];//冗余带宽
													valid_up_bw = valid_up_bwTemp[i];//有效上行带宽
													audio_bw_f = audio_bw_fTemp[i];//fec后音频带宽
													video_bw_f = video_bw_fTemp[i];//fec后视频带宽
													audio_bitrate = audio_bitrateTemp[i];//音频码率(发送音频码率)
													video_bitrate = video_bitrateTemp[i];//视频码率(发送视频码率)
													
													trans_level_id = trans_level_idTemp[i];//视、音频等级
													video_redundent_lev = video_redundent_levTemp[i];//视频fec等级
													audio_redundent_lev = audio_redundent_levTemp[i];//音频fec等级
													
													if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
														etoe_bw = "--";
													}
													if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
														redund_up_bw = "--";
													}
													if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
														valid_up_bw = "--";
													}
													if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
														audio_bw_f = "--";
													}
													if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
														video_bw_f = "--";
													}
													if(audio_bitrate==undefined||audio_bitrate==null||audio_bitrate===""){
														audio_bitrate = "--";
													}
													if(video_bitrate==undefined||video_bitrate==null||video_bitrate===""){
														video_bitrate = "--";
													}
													if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
														trans_level_id = "--";
													}
													if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
														video_redundent_lev = "--";
													}
													if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
														audio_redundent_lev = "--";
													}
													
													
													//为各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
													/**
													 * 带宽，第一个值采用静态协商的数据
													 */
													//哪个时间点发生了自适应调节，就取该点的值
													etoe_bwYArr_bz[j] = etoe_bw;//端到端带宽Y轴
													redund_up_bwYArr_bz[j] = redund_up_bw;//冗余带宽Y轴
													valid_up_bwYArr_bz[j] = valid_up_bw;//有效上行带宽Y轴
													audio_bw_fYArr_bz[j] = audio_bw_f;//fec后音频带宽Y轴
													video_bw_fYArr_bz[j] = video_bw_f;//fec后视频带宽Y轴
													audio_bitrateYArr_bz[j] = audio_bitrate;//音频码率(发送音频码率)
													video_bitrateYArr_bz[j] = video_bitrate;//视频码率(发送视频码率)
													
													/**
													 * 等级，第一个值采用静态协商的数据
													 */
													trans_level_idArr_bz[j] = trans_level_id;//视、音频等级Y轴
													video_redundent_levArr_bz[j] = video_redundent_lev;//视频fec等级Y轴
													audio_redundent_levArr_bz[j] = audio_redundent_lev;//音频fec等级Y轴
													
													//将自适应调节点放在第一个符合条件的点上
													adjustIndexFlag = ++j;
													break;
												}
											}
										}
									}
									if(j==(bandAdaptiveTimeArr_bz.length-1)){
										if(adjust_result_adjust_mode_1Time[i]!=undefined&&adjust_result_adjust_mode_1Time[i]!=null&&adjust_result_adjust_mode_1Time[i]!==""
										&&bandAdaptiveTimeArr_bz[j]!=undefined&&bandAdaptiveTimeArr_bz[j]!=null&&bandAdaptiveTimeArr_bz[j]!==""){
											//将二者转化为毫秒
											var adjust_result_adjust_mode_1TimeMillisecond = splitTime(adjust_result_adjust_mode_1Time[i]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j0 = splitTime(bandAdaptiveTimeArr_bz[j]).getTime();
											if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j0!=null&&bandAdaptiveTimeArr_bzMillisecond_j0!==""){
												if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_j0){
												//取绝对值比较，小于3秒，算作同一个时间点
												//if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
													//设置带宽自适应点
													//每隔11秒汇报一次端到端质量，系统会根据汇报的质量决定是否进行自适应调节，调节只会发生在汇报质量之后，两次端到端质量汇报之间只会发生一次自适应调节，将调节点的显示点定位在导致它发生的汇报端到端质量的时间点
													var adaptivePoint_bzTemp = new Array();
													adaptivePoint_bzTemp[0] = bandAdaptiveTimeArr_bz[j];
													adaptivePoint_bzTemp[1] = 700;
													
													adaptivePoint_bz[adaptivePoint_bz_index] = adaptivePoint_bzTemp;
													adaptivePoint_bz_index++;
													
													//此时发生了自适应调节，下面五项参数的值取调节后的新值
													etoe_bw = etoe_bwTemp[i];//端到端带宽
													redund_up_bw = redund_up_bwTemp[i];//冗余带宽
													valid_up_bw = valid_up_bwTemp[i];//有效上行带宽
													audio_bw_f = audio_bw_fTemp[i];//fec后音频带宽
													video_bw_f = video_bw_fTemp[i];//fec后视频带宽
													audio_bitrate = audio_bitrateTemp[i];//音频码率(发送音频码率)
													video_bitrate = video_bitrateTemp[i];//视频码率(发送视频码率)
													
													trans_level_id = trans_level_idTemp[i];//视、音频等级
													video_redundent_lev = video_redundent_levTemp[i];//视频fec等级
													audio_redundent_lev = audio_redundent_levTemp[i];//音频fec等级
													
													if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
														etoe_bw = "--";
													}
													if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
														redund_up_bw = "--";
													}
													if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
														valid_up_bw = "--";
													}
													if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
														audio_bw_f = "--";
													}
													if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
														video_bw_f = "--";
													}
													if(audio_bitrate==undefined||audio_bitrate==null||audio_bitrate===""){
														audio_bitrate = "--";
													}
													if(video_bitrate==undefined||video_bitrate==null||video_bitrate===""){
														video_bitrate = "--";
													}
													if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
														trans_level_id = "--";
													}
													if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
														video_redundent_lev = "--";
													}
													if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
														audio_redundent_lev = "--";
													}
													
													
													//为各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
													/**
													 * 带宽，第一个值采用静态协商的数据
													 */
													//哪个时间点发生了自适应调节，就取该点的值
													etoe_bwYArr_bz[j] = etoe_bw;//端到端带宽Y轴
													redund_up_bwYArr_bz[j] = redund_up_bw;//冗余带宽Y轴
													valid_up_bwYArr_bz[j] = valid_up_bw;//有效上行带宽Y轴
													audio_bw_fYArr_bz[j] = audio_bw_f;//fec后音频带宽Y轴
													video_bw_fYArr_bz[j] = video_bw_f;//fec后视频带宽Y轴
													audio_bitrateYArr_bz[j] = audio_bitrate;//音频码率(发送音频码率)
													video_bitrateYArr_bz[j] = video_bitrate;//视频码率(发送视频码率)
													
													/**
													 * 等级，第一个值采用静态协商的数据
													 */
													trans_level_idArr_bz[j] = trans_level_id;//视、音频等级Y轴
													video_redundent_levArr_bz[j] = video_redundent_lev;//视频fec等级Y轴
													audio_redundent_levArr_bz[j] = audio_redundent_lev;//音频fec等级Y轴
													
													//将自适应调节点放在第一个符合条件的点上
													adjustIndexFlag = ++j;
													break;
												}
											}
										}
									}
								}
							}
						}
						
						/*
						console.info("端到端带宽Y轴"+etoe_bwYArr_bz);
						console.info("冗余带宽Y轴"+redund_up_bwYArr_bz);
						console.info("有效上行带宽Y轴"+valid_up_bwYArr_bz);
						console.info("fec后音频带宽Y轴"+audio_bw_fYArr_bz);
						console.info("fec后视频带宽Y轴"+video_bw_fYArr_bz);
						console.info("视、音频等级Y轴"+trans_level_idArr_bz);
						console.info("视频fec等级Y轴"+video_redundent_levArr_bz);
						console.info("音频fec等级Y轴"+audio_redundent_levArr_bz);
						*/
						//为带宽和等级的各个空的坐标点设置值，规则：在两个自适应点之间所有的点的Y轴值相同，因为在两个自适应点之间的整个时间段内，所用的带宽和等级都是前者自适应调节点的。
						var tempBandAdaptive = "";
						
						//因为在调节之前，所有的参数值是不变的
						//将端到端带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(etoe_bwYArr_bz!=undefined&&etoe_bwYArr_bz!=null&&etoe_bwYArr_bz!==""&&(etoe_bwYArr_bz instanceof Array)){
							tempBandAdaptive = etoe_bwYArr_bz[0];
							$.each(etoe_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										etoe_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = etoe_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将冗余带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(redund_up_bwYArr_bz!=undefined&&redund_up_bwYArr_bz!=null&&redund_up_bwYArr_bz!==""&&(redund_up_bwYArr_bz instanceof Array)){
							tempBandAdaptive = redund_up_bwYArr_bz[0];
							$.each(redund_up_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										redund_up_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = redund_up_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将有效上行带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(valid_up_bwYArr_bz!=undefined&&valid_up_bwYArr_bz!=null&&valid_up_bwYArr_bz!==""&&(valid_up_bwYArr_bz instanceof Array)){
							tempBandAdaptive = valid_up_bwYArr_bz[0];
							$.each(valid_up_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										valid_up_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = valid_up_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将fec后音频带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(audio_bw_fYArr_bz!=undefined&&audio_bw_fYArr_bz!=null&&audio_bw_fYArr_bz!==""&&(audio_bw_fYArr_bz instanceof Array)){
							tempBandAdaptive = audio_bw_fYArr_bz[0];
							$.each(audio_bw_fYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										audio_bw_fYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = audio_bw_fYArr_bz[i];
									}
								}
							});
						}
						
						//将fec后视频带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(video_bw_fYArr_bz!=undefined&&video_bw_fYArr_bz!=null&&video_bw_fYArr_bz!==""&&(video_bw_fYArr_bz instanceof Array)){
							tempBandAdaptive = video_bw_fYArr_bz[0];
							$.each(video_bw_fYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										video_bw_fYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = video_bw_fYArr_bz[i];
									}
								}
							});
						}
						//将发送音频码率Y轴中值为空的下标用上一个非空下标的值代替
						if(audio_bitrateYArr_bz!=undefined&&audio_bitrateYArr_bz!=null&&audio_bitrateYArr_bz!==""&&(audio_bitrateYArr_bz instanceof Array)){
							tempBandAdaptive = audio_bitrateYArr_bz[0];
							$.each(audio_bitrateYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										audio_bitrateYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = audio_bitrateYArr_bz[i];
									}
								}
							});
						}
						//将发送视频码率Y轴中值为空的下标用上一个非空下标的值代替
						if(video_bitrateYArr_bz!=undefined&&video_bitrateYArr_bz!=null&&video_bitrateYArr_bz!==""&&(video_bitrateYArr_bz instanceof Array)){
							tempBandAdaptive = video_bitrateYArr_bz[0];
							$.each(video_bitrateYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										video_bitrateYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = video_bitrateYArr_bz[i];
									}
								}
							});
						}
						
						//将视、音频等级Y轴中值为空的下标用上一个非空下标的值代替
						if(trans_level_idArr_bz!=undefined&&trans_level_idArr_bz!=null&&trans_level_idArr_bz!==""&&(trans_level_idArr_bz instanceof Array)){
							tempBandAdaptive = trans_level_idArr_bz[0];
							$.each(trans_level_idArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										trans_level_idArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = trans_level_idArr_bz[i];
									}
								}
							});
						}
						
						//将视频fec等级Y轴中值为空的下标用上一个非空下标的值代替
						if(video_redundent_levArr_bz!=undefined&&video_redundent_levArr_bz!=null&&video_redundent_levArr_bz!==""&&(video_redundent_levArr_bz instanceof Array)){
							tempBandAdaptive = video_redundent_levArr_bz[0];
							$.each(video_redundent_levArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										video_redundent_levArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = video_redundent_levArr_bz[i];
									}
								}
							});
						}
						
						//将音频fec等级Y轴中值为空的下标用上一个非空下标的值代替
						if(audio_redundent_levArr_bz!=undefined&&audio_redundent_levArr_bz!=null&&audio_redundent_levArr_bz!==""&&(audio_redundent_levArr_bz instanceof Array)){
							tempBandAdaptive = audio_redundent_levArr_bz[0];
							$.each(audio_redundent_levArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										audio_redundent_levArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = audio_redundent_levArr_bz[i];
									}
								}
							});
						}
						
						
						//发送及接收码流统计
						stream_count = paramExt.stream_count;
						if(stream_count!=undefined&&stream_count!=null&&stream_count!==""&&(stream_count instanceof Array)&&stream_count.length>0){
						
							//说明：此处数据的视图显示用的是highcharts的面积图
							//数据组织思想：先把数组记录按时间顺序从小到大排序，然后再循环数组取出各个字段的内容
							//1 排序   
							$.each(stream_count,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var valArr = val.split(" ");
									if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
										$.each(valArr,function(j,va){
											var vaArr = va.split("=");
											if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
												if(vaArr[0]=="time"){
													//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
													stream_timeArr_bz[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
													
													//将每条数据的time的值作为key，每条数据的整体作为value
													stream_map_bz.put(splitTime(formatTime(vaArr[1])).getTime(),val);
												}
											}
										});
									}
								}
							});
							
							bom(stream_timeArr_bz);
							
							if(stream_timeArr_bz!=undefined&&stream_timeArr_bz!=null&&stream_timeArr_bz!==""&&(stream_timeArr_bz instanceof Array)&&stream_timeArr_bz.length>0){
								$.each(stream_timeArr_bz,function(i,val){
									//进行排序，为原数组的各个记录重新赋值
									stream_count[i] = stream_map_bz.get(splitTime(val).getTime());
									//为视图的X轴赋值，值为数组每条记录的下标
									stream_x_bz[i] = i;
								});
							}
							
							//将每条记录的时间存入map
							var stream_time_map = new Map();
							$.each(stream_count,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var valArr = val.split(" ");
									if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
										$.each(valArr,function(j,va){
											var vaArr = va.split("=");
											if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
												if(vaArr[0]=="time"){
													//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
													stream_time_map.put(i,formatTime(vaArr[1]));
												}
											}
										});
									}
								}
							});
							
							//2 提取字段内容到一维数组，为显示的图表的Y轴赋值
							$.each(stream_count,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var valArr = val.split(" ");
									if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
										var a_stream_s;//发送的音频码流 
										var a_fec_stream_s;//发送的fec音频码流 
										var a_copy_stream_s ;// 发送的copy音频码流 
										var a_arq_stream_s ;// 发送的arq音频码流  
										var v_stream_s;//发送的视频码流 
										var v_fec_stream_s;//发送的fec视频码流 
										var v_copy_stream_s ;// 发送的copy视频码流 
										var v_arq_stream_s ;// 发送的arq视频码流  
										var total_stream_s;//发送的总码流 
										var a_stream_r;//接收的音频码流 
										var a_fec_stream_r;//接收的fec音频码流 
										var a_copy_stream_r ;// 接收的copy音频码流 
										var a_arq_stream_r ;// 接收的arq音频码流 
										var v_stream_r;//接收的视频码流 
										var v_fec_stream_r;//接收的fec视频码流 
										var v_copy_stream_r ;// 接收的copy视频码流 
										var v_arq_stream_r ;// 接收的arq视频码流 
										var total_stream_r;//接收的总码流
										
										var total_a_r_stream_s;//音频冗余发包 
										var total_v_r_stream_s;//视频冗余发包
										var total_a_stream_s;//音频总发包
										var total_v_stream_s;//视频总发包
										
										var total_a_r_stream_r;//音频冗余收包 
										var total_v_r_stream_r;//视频冗余收包
										var total_a_stream_r;//音频总收包
										var total_v_stream_r;//视频总收包
										
										$.each(valArr,function(j,va){
											var vaArr = va.split("=");
											if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
												var info = "kbps<br/>";
												info += stream_time_map.get(i);//后跟时间
												
												//将数字形式的字符串转化为数字
												var stream_value = "";
												if(vaArr[0]!="eventtype"&&vaArr[0]!="logIndex"&&vaArr[0]!="time"){
													stream_value = stringToNumber(toFixed(stringToNumber(vaArr[1])*8/1024));
												}
												
												//将每条数据中要显示在tips上的字段存放到一维数组中
												if(vaArr[0]=="v_fec_stream_s"){//视频FEC发送流量Y轴值
													v_fec_stream_s = stream_value;
													v_fec_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_fec_stream_s",stream_value+info);
												}
												if(vaArr[0]=="v_fec_stream_r"){//视频FEC接收流量Y轴值
													v_fec_stream_r = stream_value;
													v_fec_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_fec_stream_r",stream_value+info);
												}
												if(vaArr[0]=="v_stream_s"){//视频发送流量Y轴值
													v_stream_s = stream_value;
													v_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_stream_s",stream_value+info);
												}
												if(vaArr[0]=="v_stream_r"){//视频接收流量Y轴值
													v_stream_r = stream_value;
													v_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_stream_r",stream_value+info);
												}
												if(vaArr[0]=="a_fec_stream_s"){//音频FEC发送流量Y轴值
													a_fec_stream_s = stream_value;
													a_fec_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_fec_stream_s",stream_value+info);
												}
												if(vaArr[0]=="a_fec_stream_r"){//音频FEC接收流量Y轴值
													a_fec_stream_r = stream_value;
													a_fec_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_fec_stream_r",stream_value+info);
												}
												if(vaArr[0]=="a_stream_s"){//音频发送流量Y轴值
													a_stream_s = stream_value;
													a_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_stream_s",stream_value+info);
												}
												if(vaArr[0]=="a_stream_r"){//音频接收流量Y轴值
													a_stream_r = stream_value;
													a_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_stream_r",stream_value+info);
												}
												if(vaArr[0]=="total_stream_s"){//总发送流量Y轴值
													total_stream_s = stream_value;
													total_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_total_stream_s",stream_value+info);
												}
												if(vaArr[0]=="total_stream_r"){//总接收流量Y轴值
													total_stream_r = stream_value;
													total_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_total_stream_r",stream_value+info);
												}
												if(vaArr[0]=="v_copy_stream_s"){//发送的copy视频码流 
													v_copy_stream_s = stream_value;
													v_copy_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_copy_stream_s",stream_value+info);
												}
												if(vaArr[0]=="v_copy_stream_r"){//接收的copy视频码流 
													v_copy_stream_r = stream_value;
													v_copy_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_copy_stream_r",stream_value+info);
												}
												if(vaArr[0]=="v_arq_stream_s"){//发送的arq视频码流
													v_arq_stream_s = stream_value;
													v_arq_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_arq_stream_s",stream_value+info);
												}
												if(vaArr[0]=="v_arq_stream_r"){//接收的arq视频码流 
													v_arq_stream_r = stream_value;
													v_arq_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_v_arq_stream_r",stream_value+info);
												}
												if(vaArr[0]=="a_copy_stream_s"){//发送的copy音频码流 
													a_copy_stream_s = stream_value;
													a_copy_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_copy_stream_s",stream_value+info);
												}
												if(vaArr[0]=="a_copy_stream_r"){//接收的copy音频码流 
													a_copy_stream_r = stream_value;
													a_copy_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_copy_stream_r",stream_value+info);
												}
												if(vaArr[0]=="a_arq_stream_s"){//发送的arq音频码流 
													a_arq_stream_s = stream_value;
													a_arq_stream_sYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_arq_stream_s",stream_value+info);
												}
												if(vaArr[0]=="a_arq_stream_r"){//接收的arq音频码流 
													a_arq_stream_r = stream_value;
													a_arq_stream_rYArr_bz[i] = stream_value;
													stream_map_bz.put(i+"_a_arq_stream_r",stream_value+info);
												}
											}
										});
										
										//数据校验，为空时赋值0
										//发包
										a_stream_s = isNull(a_stream_s);//发送的音频码流 
										a_fec_stream_s = isNull(a_fec_stream_s);//发送的fec音频码流 
										a_copy_stream_s = isNull(a_copy_stream_s);//发送的copy音频码流 
										a_arq_stream_s = isNull(a_arq_stream_s);//发送的arq音频码流  
										v_stream_s = isNull(v_stream_s);//发送的视频码流 
										v_fec_stream_s = isNull(v_fec_stream_s);//接收的fec视频码流 
										v_copy_stream_s = isNull(v_copy_stream_s);//接收的copy视频码流 
										v_arq_stream_s = isNull(v_arq_stream_s);//接收的arq视频码流
										//收包
										a_stream_r = isNull(a_stream_r);//发送的音频码流 
										a_fec_stream_r = isNull(a_fec_stream_r);//发送的fec音频码流 
										a_copy_stream_r = isNull(a_copy_stream_r);//发送的copy音频码流 
										a_arq_stream_r = isNull(a_arq_stream_r);//发送的arq音频码流  
										v_stream_r = isNull(v_stream_r);//发送的视频码流 
										v_fec_stream_r = isNull(v_fec_stream_r);//接收的fec视频码流 
										v_copy_stream_r = isNull(v_copy_stream_r);//接收的copy视频码流 
										v_arq_stream_r = isNull(v_arq_stream_r);//接收的arq视频码流
										
										
										//音频冗余发包
										total_a_r_stream_s = a_fec_stream_s+a_copy_stream_s+a_arq_stream_s;
										//视频冗余发包
										total_v_r_stream_s = v_fec_stream_s+v_copy_stream_s+v_arq_stream_s;
										//音频总发包
										total_a_stream_s = a_stream_s + total_a_r_stream_s;
										//视频总发包
										total_v_stream_s = v_stream_s + total_v_r_stream_s;
										
										//音频冗余收包 
										total_a_r_stream_r = a_fec_stream_r+a_copy_stream_r+a_arq_stream_r;
										//视频冗余收包
										total_v_r_stream_r = v_fec_stream_r+v_copy_stream_r+v_arq_stream_r;
										//音频总收包
										total_a_stream_r = a_stream_r + total_a_r_stream_r;
										//视频总收包
										total_v_stream_r = v_stream_r + total_v_r_stream_r;
										
										
										var info2 = "%<br/>";
										info2 += stream_time_map.get(i);//后跟时间
										//发送冗余比例
										if(total_stream_s!==0){
											r_s_rate_bz[i] = rate((stringToNumber(total_a_r_stream_s)+stringToNumber(total_v_r_stream_s)),stringToNumber(total_stream_s));
											stream_map_bz.put(i+"_r_s_rate",r_s_rate_bz[i]+info2);
										}else if(total_stream_s===0){
											r_s_rate_bz[i] = 0;
											stream_map_bz.put(i+"_r_s_rate",r_s_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_r_s_rate","未汇报值"+info2);
										}
										//音频发送冗余比例
										if(total_a_stream_s!==0){
											a_r_s_rate_bz[i] = rate(stringToNumber(total_a_r_stream_s),stringToNumber(total_a_stream_s));
											stream_map_bz.put(i+"_a_r_s_rate",a_r_s_rate_bz[i]+info2);
										}else if(total_a_stream_s===0){
											a_r_s_rate_bz[i] = 0;
											stream_map_bz.put(i+"_a_r_s_rate",a_r_s_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_a_r_s_rate","未汇报值"+info2);
										}
										//视频发送冗余比例
										if(total_v_stream_s!==0){
											v_r_s_rate_bz[i] = rate(stringToNumber(total_v_r_stream_s),stringToNumber(total_v_stream_s));
											stream_map_bz.put(i+"_v_r_s_rate",v_r_s_rate_bz[i]+info2);
										}else if(total_v_stream_s===0){
											v_r_s_rate_bz[i] = 0;
											stream_map_bz.put(i+"_v_r_s_rate",v_r_s_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_v_r_s_rate","未汇报值"+info2);
										}
										//接收冗余比例
										if(total_stream_r!==0){
											r_r_rate_bz[i] = rate((stringToNumber(total_a_r_stream_r)+stringToNumber(total_v_r_stream_r)),stringToNumber(total_stream_r));
											stream_map_bz.put(i+"_r_r_rate",r_r_rate_bz[i]+info2);
										}else if(total_stream_r===0){
											r_r_rate_bz[i] = 0;
											stream_map_bz.put(i+"_r_r_rate",r_r_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_r_r_rate","未汇报值"+info2);
										}
										//音频接收冗余比例
										if(total_a_stream_r!==0){
											a_r_r_rate_bz[i] = rate(stringToNumber(total_a_r_stream_r),stringToNumber(total_a_stream_r));
											stream_map_bz.put(i+"_a_r_r_rate",a_r_r_rate_bz[i]+info2);
										}else if(total_a_stream_r===0){
											a_r_r_rate_bz[i] = 0;
											stream_map_bz.put(i+"_a_r_r_rate",a_r_r_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_a_r_r_rate","未汇报值"+info2);
										}
										//视频接收冗余比例
										if(total_v_stream_r!==0){
											v_r_r_rate_bz[i] = rate(stringToNumber(total_v_r_stream_r),stringToNumber(total_v_stream_r));
											stream_map_bz.put(i+"_v_r_r_rate",v_r_r_rate_bz[i]+info2);
										}else if(total_v_stream_r===0){
											v_r_r_rate_bz[i] = stringToNumber(100);
											stream_map_bz.put(i+"_v_r_r_rate",v_r_r_rate_bz[i]+info2);
										}else{
											stream_map_bz.put(i+"_v_r_r_rate","未汇报值"+info2);
										}
									}
								}
							});
							//视图的显示在dataToView.js中进行调用streamView_bz("bandAdaptive_main1_bz03");这里x轴和y轴都是一维数组，各自独立，不需要组合成二维数据
						}
					}
				}
			}
		}
	}
	
	//所有10秒加起来的值，总发送流量
	if(total_stream_sYArr_bz!=undefined&&total_stream_sYArr_bz!=null&&(total_stream_sYArr_bz instanceof Array)&&total_stream_sYArr_bz.length>0){
		$.each(total_stream_sYArr_bz,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				total_stream_s_bz += stringToNumber(val);
			}
		});
	}
	//所有10秒加起来的值，总接收流量
	if(total_stream_rYArr_bz!=undefined&&total_stream_rYArr_bz!=null&&(total_stream_rYArr_bz instanceof Array)&&total_stream_rYArr_bz.length>0){
		$.each(total_stream_rYArr_bz,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				total_stream_r_bz += stringToNumber(val);
			}
		});
	}
	/*
	console.info("↓=发送及接收码流统计数据被叫端=↓");
	console.info("实际发送带宽total_stream_sYArr_bz"+total_stream_sYArr_bz);
	console.info("实际接收带宽total_stream_rYArr_bz"+total_stream_rYArr_bz);
	console.info("发送冗余比例r_s_rate_bz："+r_s_rate_bz);
	console.info("音频发送冗余比例a_r_s_rate_bz："+a_r_s_rate_bz);
	console.info("视频发送冗余比例v_r_s_rate_bz："+v_r_s_rate_bz);
	console.info("接收冗余比例r_r_rate_bz："+r_r_rate_bz);
	console.info("音频接收冗余比例a_r_r_rate_bz："+a_r_r_rate_bz);
	console.info("视频接收冗余比例v_r_r_rate_bz："+v_r_r_rate_bz);
	console.info("v_fec_stream_sYArr_bz:"+v_fec_stream_sYArr_bz);
	console.info("v_fec_stream_rYArr_bz:"+v_fec_stream_rYArr_bz);
	console.info("v_stream_sYArr_bz:"+v_stream_sYArr_bz);
	console.info("v_stream_rYArr_bz:"+v_stream_rYArr_bz);
	console.info("a_fec_stream_sYArr_bz:"+a_fec_stream_sYArr_bz);
	console.info("a_fec_stream_rYArr_bz:"+a_fec_stream_rYArr_bz);
	console.info("a_stream_sYArr_bz:"+a_stream_sYArr_bz);
	console.info("a_stream_rYArr_bz:"+a_stream_rYArr_bz);
	console.info("total_stream_sYArr_bz:"+total_stream_sYArr_bz);
	console.info("total_stream_rYArr_bz:"+total_stream_rYArr_bz);
	
	console.info("a_copy_stream_sYArr_bz:"+a_copy_stream_sYArr_bz);
	console.info("a_copy_stream_rYArr_bz:"+a_copy_stream_rYArr_bz);
	console.info("v_copy_stream_sYArr_bz:"+v_copy_stream_sYArr_bz);
	console.info("v_copy_stream_rYArr_bz:"+v_copy_stream_rYArr_bz);
	console.info("v_arq_stream_sYArr_bz:"+v_arq_stream_sYArr_bz);
	console.info("v_arq_stream_rYArr_bz:"+v_arq_stream_rYArr_bz);
	console.info("a_arq_stream_sYArr_bz:"+a_arq_stream_sYArr_bz);
	console.info("a_arq_stream_rYArr_bz:"+a_arq_stream_rYArr_bz);
	
	console.info("↑=发送及接收码流统计数据被叫端=↑");
		
	console.info("↓=包含“带宽、等级、丢包率、延时”四个图被叫=↓");
	console.info("被　发送视频码率："+video_bitrateYArr_bz);
	console.info("被　发送音频码率："+audio_bitrateYArr_bz);
	console.info("被　端到端带宽Y轴："+etoe_bwYArr_bz);
	console.info("被　冗余带宽Y轴："+redund_up_bwYArr_bz);
	console.info("被　有效上行带宽Y轴："+valid_up_bwYArr_bz);
	console.info("被　fec后音频带宽Y轴："+audio_bw_fYArr_bz);
	console.info("被　fec后视频带宽Y轴："+video_bw_fYArr_bz);
	console.info("被　自适应调用节："+adaptivePoint_bz);
	console.info("被　视、音频等级Y轴："+trans_level_idArr_bz);
	console.info("被　视频fec等级Y轴："+video_redundent_levArr_bz);
	console.info("被　音频fec等级Y轴："+audio_redundent_levArr_bz);
	
	console.info("被　音频原始丢包率Y轴："+audio_lose_bYArr_bz);
	console.info("被　音频fec纠错后丢包率Y轴："+audio_lose_fYArr_bz);
	console.info("被　视频原始丢包率Y轴:"+video_lose_bYArr_bz);
	console.info("被　视频fec纠错后丢包率Y轴:"+video_lose_fYArr_bz);
	console.info("被　延时Y轴:"+delayYArr_bz);
	console.info("被　X轴："+bandAdaptiveTimeArr_bz);
	*/
	dataArr01_bz = new Array();//端到端带宽
	dataArr02_bz = new Array();//冗余带宽
	dataArr03_bz = new Array();//有效上行带宽
	dataArr04_bz = new Array();//FEC后音频带宽
	dataArr05_bz = new Array();//FEC后视频带宽
	dataArr06_bz = new Array();//自适应调节点
	
	dataArr07_bz = new Array();//通话等级
	dataArr071_bz = new Array();//依据编码“带宽自适应调节等级表”用等级转换得到，在显示时转化为对应的帧率显示
	dataArr08_bz = new Array();//视频fec等级
	dataArr09_bz = new Array();//音频fec等级
	
	dataArr10_bz = new Array();//视频原始丢包率
	dataArr11_bz = new Array();//视频fec纠错后丢包率
	dataArr12_bz = new Array();//音频原始丢包率
	dataArr13_bz = new Array();//音频fec纠错后丢包率

	dataArr14_bz = new Array();//延时
	
	//highstock的数据格式采用的是[[时间,数据],[时间,数据],[时间,数 据],[时间,数据]]
	//下面各条线，通过前面的数据处理后，变成了一维的[数据,数据,数据,数据]格式，需要转化成highstock所采用的[[时间,数据],[时间,数据],[时间,数 据],[时间,数据]]格式
	$.each(bandAdaptiveTimeArr_bz,function(i,val){
	 	if(val!=undefined&&val!=null&&val!==""){
	 		var arr01 = new Array();
	 		var arr02 = new Array();
	 		var arr03 = new Array();
	 		var arr04 = new Array();
	 		var arr05 = new Array();
	 		var arr07 = new Array();
	 		var arr071 = new Array();
	 		var arr08 = new Array();
	 		var arr09 = new Array();
	 		var arr10 = new Array();
	 		var arr11 = new Array();
	 		var arr12 = new Array();
	 		var arr13 = new Array();
	 		var arr14 = new Array();
	 		
	 		var arr15 = new Array();
	 		var arr16 = new Array();
	 		
	 		arr01[0] = dateToUTC(val);
	 		arr02[0] = dateToUTC(val);
	 		arr03[0] = dateToUTC(val);
	 		arr04[0] = dateToUTC(val);
	 		arr05[0] = dateToUTC(val);
	 		arr07[0] = dateToUTC(val);
	 		arr071[0] = dateToUTC(val);
	 		arr08[0] = dateToUTC(val);
	 		arr09[0] = dateToUTC(val);
	 		arr10[0] = dateToUTC(val);
	 		arr11[0] = dateToUTC(val);
	 		arr12[0] = dateToUTC(val);
	 		arr13[0] = dateToUTC(val);
	 		arr14[0] = dateToUTC(val);
	 		
	 		arr15[0] = stringToNumber(video_bitrateYArr_bz[i]);//视频码率(发送视频码率)
	 		arr16[0] = stringToNumber(audio_bitrateYArr_bz[i]);//音频码率(发送音频码率)
	 		
	 		//先将字符串转化为Number型再赋值
	 		arr01[1] = stringToNumber(etoe_bwYArr_bz[i]);//端到端带宽
	 		arr02[1] = stringToNumber(redund_up_bwYArr_bz[i]);//冗余带宽
	 		arr03[1] = stringToNumber(valid_up_bwYArr_bz[i]);//有效上行带宽
	 		arr04[1] = stringToNumber(audio_bw_fYArr_bz[i]);//FEC后音频带宽
	 		arr05[1] = stringToNumber(video_bw_fYArr_bz[i]);//FEC后视频带宽
	 		
	 		arr07[1] = stringToNumber(trans_level_idArr_bz[i]);//通话等级
	 		arr071[1] = stringToNumber(frame_map.get(trans_level_idArr_bz[i]));//通话等级
	 		
	 		arr08[1] = stringToNumber(video_redundent_levArr_bz[i]);//视频fec等级
	 		arr09[1] = stringToNumber(audio_redundent_levArr_bz[i]);//音频fec等级
	 		
	 		arr10[1] = stringToNumber(video_lose_bYArr_bz[i]);//视频原始丢包率
	 		arr11[1] = stringToNumber(video_lose_fYArr_bz[i]);//视频fec纠错后丢包率
	 		arr12[1] = stringToNumber(audio_lose_bYArr_bz[i]);//音频原始丢包率
	 		arr13[1] = stringToNumber(audio_lose_fYArr_bz[i]);//音频fec纠错后丢包率
	 		
	 		arr14[1] = stringToNumber(delayYArr_bz[i]);//延时
	 		
	 		//自适应调节点信息
			var adjust_count = BandwidthMap_bz.get(val);
			
	 		var htmlHighstock = "";
	 		htmlHighstock += val+"<br/>" ;//时间点
			if(adjust_count!=undefined&&adjust_count!=null&&adjust_count!==""){
				htmlHighstock += adjust_count+"<br/>";
			}
			htmlHighstock += "发送视频码率："+arr15[0]+"kbps，发送音频码率："+arr16[0]+"kbps<br/>" +
					"【带宽】<br/>" +
	 				"　端到端带宽 : "+arr01[1]+"，带宽利用率 : "+rate(parseInt(arr03[1]),arr01[1])+"%<br/>" +
	 				"　冗余带宽 : "+arr02[1]+"，比例 : "+rate(arr02[1],parseInt(arr03[1]))+"%<br/>"+
	 				"　有效上行带宽 : "+arr03[1]+"<br/>"+//"，比例 : "+rate(arr03[1],(parseInt(arr02[1])+parseInt(arr03[1])))+"%<br/>"+
	 				"　FEC后音频带宽 : "+arr04[1]+"，比例 : "+rate(arr04[1],(parseInt(arr04[1])+parseInt(arr05[1])))+"%<br/>"+
	 				"　冗余后视频带宽 : "+arr05[1]+"，比例 : "+rate(arr05[1],(parseInt(arr04[1])+parseInt(arr05[1])))+"%<br/>" +
					"【等级】<br/>" +
					"　通话等级 : "+arr07[1]+"<br/>" +
					"　视频fec等级 : "+arr08[1]+"<br/>" +
					"　音频fec等级 : "+arr09[1]+"<br/>" ;
					if(i===0){
			htmlHighstock += "【丢包率】<br/>" +
					"　刚开始呼叫，此时还未上报丢包率数据<br/>" +
					"【延时】<br/>" +
					"　刚开始呼叫，此时还未上报延时数据";
					}else{
			htmlHighstock += "【丢包率】<br/>" +
					"　视频原始丢包率 : "+arr10[1]+"%<br/>" +
					"　视频冗余纠错后丢包率 : "+arr11[1]+"%<br/>" +
					"　音频原始丢包率 : "+arr12[1]+"%<br/>" +
					"　音频fec纠错后丢包率 : "+arr13[1]+"%<br/>" +
					"　"+audio_videoMap_bz.get(val)+"<br/>"+
					"【延时】<br/>" +
					"　延时 : "+arr14[1]+"ms";
					}
					
	 		//bandMapHighstock_bz.put(splitTime(val).getTime(),htmlHighstock);//显示每个时间点标签信息的Map
	 		bandMapHighstock_bz.put(dateToUTC(val),htmlHighstock);//显示每个时间点标签信息的Map
	 		
	 		dataArr01_bz[i] = arr01;//端到端带宽
	 		dataArr02_bz[i] = arr02;//冗余带宽
	 		dataArr03_bz[i] = arr03;//有效上行带宽
	 		dataArr04_bz[i] = arr04;//FEC后音频带宽
	 		dataArr05_bz[i] = arr05;//FEC后视频带宽
	 		
	 		dataArr07_bz[i] = arr07;//通话等级
	 		dataArr071_bz[i] = arr071;//依据编码“带宽自适应调节等级表”用等级转换得到，在显示时转化为对应的帧率显示
	 		dataArr08_bz[i] = arr08;//视频fec等级
	 		dataArr09_bz[i] = arr09;//音频fec等级
	 		
	 		dataArr10_bz[i] = arr10;//视频原始丢包率
	 		dataArr11_bz[i] = arr11;//视频fec纠错后丢包率
	 		dataArr12_bz[i] = arr12;//音频原始丢包率
	 		dataArr13_bz[i] = arr13;//音频fec纠错后丢包率
	 		
	 		dataArr14_bz[i] = arr14;//延时
	 		
	 	}
	 });
	
	 //将自适应调节点的时间转化为UTC时间
	 $.each(adaptivePoint_bz,function(i,val){
	 	var arr06 = new Array();
	 	if(val!=undefined&&val!=null&&val!==""){
	 		arr06[0] = dateToUTC(val[0]);//调节点的时间
	 		arr06[1] = stringToNumber(val[1]);//调节点的值，赋值成了700
	 		dataArr06_bz[i] = arr06;
	 	}
	 });
	
	 /*
	 console.info("dataArr01_bz:"+dataArr01_bz);
	 console.info("dataArr02_bz:"+dataArr02_bz);
	 console.info("dataArr03_bz:"+dataArr03_bz);
	 console.info("dataArr04_bz:"+dataArr04_bz);
	 console.info("dataArr05_bz:"+dataArr05_bz);
	 console.info("dataArr06_bz:"+dataArr06_bz);
	 console.info("dataArr07_bz:"+dataArr07_bz);
	 console.info("dataArr08_bz:"+dataArr08_bz);
	 console.info("dataArr09_bz:"+dataArr09_bz);
	 console.info("dataArr10_bz:"+dataArr10_bz);
	 console.info("dataArr11_bz:"+dataArr11_bz);
	 console.info("dataArr12_bz:"+dataArr12_bz);
	 console.info("dataArr13_bz:"+dataArr13_bz);
	 console.info("dataArr14_bz:"+dataArr14_bz);
	
	 console.info("dataArr071_bz:"+dataArr071_bz);
	 console.info("↑=包含“带宽、等级、丢包率、延时”四个图被叫=↑");
	 */
	//调用highstock的视图
	//包含“带宽、等级、丢包率、延时”四个图
	if(dataArr01_bz!=undefined&&dataArr01_bz!=null&&dataArr01_bz!==""&&
	dataArr02_bz!=undefined&&dataArr02_bz!=null&&dataArr02_bz!==""&&
	dataArr03_bz!=undefined&&dataArr03_bz!=null&&dataArr03_bz!==""&&
	dataArr04_bz!=undefined&&dataArr04_bz!=null&&dataArr04_bz!==""&&
	dataArr05_bz!=undefined&&dataArr05_bz!=null&&dataArr05_bz!==""&&
	dataArr06_bz!=undefined&&dataArr06_bz!=null&&dataArr06_bz!==""&&
	dataArr07_bz!=undefined&&dataArr07_bz!=null&&dataArr07_bz!==""&&
	dataArr08_bz!=undefined&&dataArr08_bz!=null&&dataArr08_bz!==""&&
	dataArr09_bz!=undefined&&dataArr09_bz!=null&&dataArr09_bz!==""&&
	dataArr10_bz!=undefined&&dataArr10_bz!=null&&dataArr10_bz!==""&&
	dataArr11_bz!=undefined&&dataArr11_bz!=null&&dataArr11_bz!==""&&
	dataArr12_bz!=undefined&&dataArr12_bz!=null&&dataArr12_bz!==""&&
	dataArr13_bz!=undefined&&dataArr13_bz!=null&&dataArr13_bz!==""&&
	dataArr14_bz!=undefined&&dataArr14_bz!=null&&dataArr14_bz!==""&&
	bandMapHighstock_bz!=undefined&&bandMapHighstock_bz!=null&&bandMapHighstock_bz!==""){
		highstockView_bz02();
	}
}

$(document).ready(function(){
	stream_formula_bz();
	
	//切换“容错机制计算公式”的可见状态
	$('#topon_stream_bz').live("click",function () {
	   $('#stream_formula_bz').slideToggle("slow");
	   $('#topon_stream_bz').toggle();
	   $('#topoff_stream_bz').toggle();
	});
	$('#topoff_stream_bz').live("click",function () {
		   $('#stream_formula_bz').slideToggle("slow");
		   $('#topon_stream_bz').toggle();
		   $('#topoff_stream_bz').toggle();
	});
});

/**
 * 流统计的计算公式，将公式展示在页面上方便查看
 */
function stream_formula_bz(){
	var html = "";
	html += "<span id='topon_stream_bz' class='summaryStyle'>&nbsp;<b>流量统计参数说明和计算公式：</b><font style='color:#35A368;'><b>OPEN</b></font></span>"
					+"<span id='topoff_stream_bz' class='summaryStyle' style='display:none;'>&nbsp;<b>流量统计参数说明和计算公式：</b><font style='color:#FD042E;'><b>CLOSE</b></font></span>"
					+"<div id='stream_formula_bz' style='display:none;font-size:12px;'>" +
							"<table border=1 style='margin-left:5px;'><tr style='vertical-align:top;'>" +
							"<td style='padding:5px;'>" +
							"<b>协议字段说明</b><br/>" +
							"eventtype=stream_count<br/>" +
							"a_stream_s=发送的音频码流<br/> " +
							"a_fec_stream_s=发送的fec音频码流<br/> " +
							"a_copy_stream_s=发送的copy音频码流<br/> " +
							"a_arq_stream_s=发送的arq音频码流<br/> " +
							"v_stream_s=发送的视频码流<br/> " +
							"v_fec_stream_s=发送的fec视频码流<br/> " +
							"v_copy_stream_s=发送的copy视频码流<br/> " +
							"v_arq_stream_s=发送的arq视频码流<br/> " +
							"total_stream_s=发送的总码流 <br/>" +
							"a_stream_r=接收的音频码流 <br/>" +
							"a_copy_stream_r=接收的copy音频码流<br/> " +
							"a_arq_stream_r=接收的arq音频码流<br/> " +
							"v_stream_r=接收的视频码流<br/> " +
							"v_fec_stream_r=接收的fec视频码流<br/> " +
							"v_copy_stream_r=接收的copy视频码流<br/> " +
							"v_arq_stream_r=接收的arq视频码流<br/> " +
							"total_stream_r=接收的总码流<br/>" +
							"</td>" +
							"<td style='padding:5px;'>" +
							"<b>公式计算</b><br/>" +
							"<b>●发送相关</b><br/>" +
							"total_a_r_stream_s(音频冗余发包)=a_fec_stream_s(发送的fec音频码流)+a_copy_stream_s(发送的copy音频码流)+a_arq_stream_s(发送的arq音频码流)<br/>" +
							"total_v_r_stream_s(视频冗余发包)=v_fec_stream_s(发送的fec视频码流)+v_copy_stream_s(发送的copy视频码流)+v_arq_stream_s(发送的arq视频码流)<br/>" +
							"total_v_stream_s(视频总发包)=v_stream_s(发送的视频码流)+total_v_r_stream_s<br/>" +
							"total_a_stream_s(音频总发包)=a_stream_s(发送的音频码流)+total_a_r_stream_s<br/>" +
							"实际发送带宽=total_a_stream_s+total_v_stream_s<br/>" +
							"发送冗余比例=(total_a_r_stream_s(音频冗余发包)+total_v_r_stream_s(视频冗余发包))/total_stream_s(总发包带宽)<br/>" +
							"视频发送冗余比例=total_v_r_stream_s(视频冗余发包)/total_v_stream_s(视频总发包)<br/>" +
							"音频发送冗余比例=total_a_r_stream_s(音频冗余发包)/total_a_stream_s(音频总发包)<br/>" +
							"<hr/>" +
							"<b>●接收相关</b><br/>" +
							"total_a_r_stream_r(音频冗余收包)=a_fec_stream_r(接收的fec音频码流)+a_copy_stream_r(接收的copy音频码流)+a_arq_stream_r(接收的arq音频码流)<br/>" +
							"total_v_r_stream_r(视频冗余收包)=v_fec_stream_r(接收的fec视频码流)+v_copy_stream_r(接收的copy视频码流)+v_arq_stream_r(接收的arq视频码流)<br/>" +
							"total_a_stream_r(音频总收包)=a_stream_r(接收的音频码流)+total_a_r_stream_r<br/>" +
							"total_v_stream_r(视频总收包)=v_stream_r(接收的视频码流)+total_v_r_stream_r<br/>" +
							"实际接收带宽=total_a_stream_r+total_v_stream_r<br/>" +
							"接收冗余比例=(total_a_r_stream_r(音频冗余收包)+total_v_r_stream_r(视频冗余收包))/total_stream_r(总收包带宽)<br/>" +
							"视频接收冗余比例=total_v_r_stream_r(视频冗余收包)/total_v_stream_r(视频总收包)<br/>" +
							"音频接收冗余比例=total_a_r_stream_r(音频冗余收包)/total_a_stream_r(音频总收包)<br/>" +
							"<hr/>" +
							"<b>●其它</b><br/>" +
							"本次通话本端发送总带宽=实际发送带宽每10秒一次的累加值<br/>" +
							"本次通话对端接收总带宽=实际接收带宽每10秒一次的累加值<br/>" +
							"平均丢包率=(本次通话本端发送总带宽-本次通话对端接收总带宽)/本次通话本端发送总带宽<br/>" +
							"</td>" +
							"</tr></table>" +
					"</div>";
    $('#bandAdaptive_stream_count_bz01_01').html(html);
}
