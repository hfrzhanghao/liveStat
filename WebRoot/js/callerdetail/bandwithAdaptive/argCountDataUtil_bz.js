/**
 * 带宽自适应/被叫->主叫容错机制统计的数据处理
 */
 
 //总体纠错机制
 var arq_lost_rate_arr_bz = new Array();//原始丢包率
 var rtp_lost_rate_arr_bz = new Array();//RTP丢包率(容错后)
 var all_recovery_rate_arr_bz = new Array();//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
 var copy_recovery_rate_arr_bz = new Array();//copy恢复率
 var fec_recovery_rate_arr_bz = new Array();//fec恢复率
 var arq_recovery_rate_arr_bz = new Array();//arq恢复率
 var all_r_rate_arr_bz = new Array();//总冗余率
 var fec_r_rate_arr_bz = new Array();//fec冗余占比
 var arq_r_rate_arr_bz = new Array();//arq冗余占比
 var copy_r_rate_arr_bz = new Array();//copy冗余占比
 
 //COPY容错技术
 var copy_use_rate_arr_bz = new Array();//COPY利用率
 var copy_delay_rate_arr_bz = new Array();//COPY延时率
 var copy_repeat_rate_arr_bz = new Array();//COPY重复率
 var copy_send_rate_arr_bz = new Array();//COPY发包率
 
 //ARQ容错技术
 var arq_use_rate_arr_bz = new Array();//ARQ利用率
 var arq_delay_rate_arr_bz = new Array();//ARQ延时率
 var arq_repeat_rate_arr_bz = new Array();//ARQ重复率
 var arq_send_rate_arr_bz = new Array();//ARQ发包率
 
 /**
  * FEC容错技术
  */
 //fec包接收统计
 var fec_use_rate_arr_bz = new Array();//FEC接收有效率
 var fec_used_rate_arr_bz = new Array();//FEC利用率
 var fec_delay_rate_arr_bz = new Array();//FEC延时率
 var fec_repeat_rate_arr_bz = new Array();//FEC重复率
 var fec_send_rate_arr_bz = new Array();//FEC发包率
 
 //fec包解码统计
 var fec_decode_suc_rate_arr_bz = new Array();//FEC解码成功率
 var fec_decode_fail_rate_arr_bz = new Array();//FEC解码失败率
 var fec_decode_useless_rate_arr_bz = new Array();//FEC解码无用率	
 
 var arq_time_arr_bz = new Array();//排序用	
 var arq_map_bz = new Map();//arq统计的map，用来排序
	
function argData_bz(datas){
	
	//总体纠错机制
	arq_lost_rate_arr_bz = new Array();//原始丢包率
	rtp_lost_rate_arr_bz = new Array();//RTP丢包率(容错后)
	all_recovery_rate_arr_bz = new Array();//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
	copy_recovery_rate_arr_bz = new Array();//copy恢复率
	fec_recovery_rate_arr_bz = new Array();//fec恢复率
	arq_recovery_rate_arr_bz = new Array();//arq恢复率
	all_r_rate_arr_bz = new Array();//总冗余率
    fec_r_rate_arr_bz = new Array();//fec冗余占比
    arq_r_rate_arr_bz = new Array();//arq冗余占比
    copy_r_rate_arr_bz = new Array();//copy冗余占比
	 
	//COPY容错技术
	copy_use_rate_arr_bz = new Array();//COPY利用率
	copy_delay_rate_arr_bz = new Array();//COPY延时率
	copy_repeat_rate_arr_bz = new Array();//COPY重复率
	copy_send_rate_arr_bz = new Array();//COPY发包率
	 
	//ARQ容错技术
	arq_use_rate_arr_bz = new Array();//ARQ利用率
	arq_delay_rate_arr_bz = new Array();//ARQ延时率
	arq_repeat_rate_arr_bz = new Array();//ARQ重复率
	arq_send_rate_arr_bz = new Array();//ARQ发包率
	 
	 /**
	  * FEC容错技术
	  */
	//fec包接收统计
	fec_use_rate_arr_bz = new Array();//FEC接收有效率
	fec_used_rate_arr_bz = new Array();//FEC利用率
	fec_delay_rate_arr_bz = new Array();//FEC延时率
	fec_repeat_rate_arr_bz = new Array();//FEC重复率
	fec_send_rate_arr_bz = new Array();//FEC发包率
	
	//fec包解码统计
	fec_decode_suc_rate_arr_bz = new Array();//FEC解码成功率
	fec_decode_fail_rate_arr_bz = new Array();//FEC解码失败率
	fec_decode_useless_rate_arr_bz = new Array();//FEC解码无用率	
	 		
	arq_time_arr_bz = new Array();//排序用	
	arq_map_bz = new Map();//arq统计的map，用来排序
	
	var result;
	result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						//arq的统计数据
						var arq_count_10s = paramExt.arq_count_10s;
						//排序						
						if(arq_count_10s!=undefined&&arq_count_10s!=null&&arq_count_10s!==""&&(arq_count_10s instanceof Array)&&arq_count_10s.length>0){
							
							$.each(arq_count_10s,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var valArr = splitString(val);
									if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
										$.each(valArr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												var vaArr = va.split("=");
												if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&(vaArr instanceof Array)&&vaArr.length>0){
													if(vaArr[0]=="time"){
														//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
														arq_time_arr_bz[i] = formatTime(vaArr[1]);//时间的一维数组，排序用
														arq_map_bz.put(splitTime(formatTime(vaArr[1])).getTime(),val);
													}
												}
											}
										});
									}
								}
							});
							bom(arq_time_arr_bz);
							
							if(arq_time_arr_bz!=undefined&&arq_time_arr_bz!=null&&arq_time_arr_bz!==""&&(arq_time_arr_bz instanceof Array)&&arq_time_arr_bz.length>0){
								$.each(arq_time_arr_bz,function(i,val){
									//进行排序，为原数组的各个记录重新赋值
									arq_count_10s[i] = arq_map_bz.get(splitTime(val).getTime());
								});
							}
							
							//排序以后进行数据整理
							$.each(arq_count_10s,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var valMap = new Map();
									var valArr = splitString(val);
									if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
										$.each(valArr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												var vaArr = va.split("=");
												valMap.put(vaArr[0],vaArr[1]);
											}
										});
										
										/**
										 * 1、获取各字段值
										 */
										//容错恢复后，接收到的有效(用于音视频播放)rtp包总数
										var RC_T = isNull(valMap.get("RC_T"));
										//容错恢复后，丢失rtp包总数
										var LS_T = isNull(valMap.get("LS_T"));
										//COPY包的接收总数
										var CP_T = isNull(valMap.get("CP_T"));
										//接收到的COPY包中，成功用于恢复的包总数
										var CP_E = isNull(valMap.get("CP_E"));
										//接收到的COPY包中，迟到超时导致恢复失败的包总数
										var CP_L = isNull(valMap.get("CP_L"));
										//接收到的COPY包中，重复包导致无效(已经恢复)的包总数
										var CP_R = isNull(valMap.get("CP_R"));
										
										//接收到FEC包的总数
										var FEC_RC_T = isNull(valMap.get("FEC_RC_T"));
										//接收到FEC包的有效总数
										var FEC_RC_E = isNull(valMap.get("FEC_RC_E"));
										//接收到FEC包的迟到总数
										var FEC_RC_L = isNull(valMap.get("FEC_RC_L"));
										//接收到FEC包的重复总数
										var FEC_RC_R = isNull(valMap.get("FEC_RC_R"));
										
										//恢复RTP丢包成功的FEC包总数
										var FEC_DEC_S = isNull(valMap.get("FEC_DEC_S"));
										//没有参与恢复RTP丢包的FEC包总数
										var FEC_DEC_N = isNull(valMap.get("FEC_DEC_N"));
										//恢复RTP丢包失败的FEC包总数
										var FEC_DEC_F = isNull(valMap.get("FEC_DEC_F"));
										//使用FEC恢复的RTP包的总数
										var FEC_DEC_RTP = isNull(valMap.get("FEC_DEC_RTP"));
										
										//ARQ包的接收总数
										var ARQ_T = isNull(valMap.get("ARQ_T"));
										//接收到的ARQ包中，成功用于恢复的包总数
										var ARQ_E = isNull(valMap.get("ARQ_E"));
										//接收到的ARQ包中，迟到超时导致恢复失败的包总数
										var ARQ_L = isNull(valMap.get("ARQ_L"));
										//接收到的ARQ包中，重复包导致无效(已经恢复)的包总数
										var ARQ_R = isNull(valMap.get("ARQ_R"));
										
										/**
										 * 2、计算各种比率
										 */
										//总体纠错机制
										var RTP = stringToNumber(RC_T) + stringToNumber(LS_T);//RTP理论值
										var rtp_lost_rate_bz ;//RTP丢包率(容错后)
										var all_recovery_rate_bz;//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
										var copy_recovery_rate_bz ;//copy恢复率
										var fec_recovery_rate_bz ;//fec恢复率
										var arq_recovery_rate_bz ;//arq恢复率
										var arq_lost_rate_bz ;//原始丢包率
										
										var all_r_rate_bz ;//总冗余率
									    var fec_r_rate_bz ;//fec冗余占比
									    var arq_r_rate_bz ;//arq冗余占比
									    var copy_r_rate_bz ;//copy冗余占比
										
										if(RTP!==0){
											rtp_lost_rate_bz = rate(LS_T,RTP);//RTP丢包率(容错后)
											copy_recovery_rate_bz = rate(CP_E,RTP);//copy恢复率
											fec_recovery_rate_bz = rate(FEC_DEC_RTP,RTP);//fec恢复率
											arq_recovery_rate_bz = rate(ARQ_E,RTP);//arq恢复率
										}else{
											rtp_lost_rate_bz = 0;//RTP丢包率(容错后)
											copy_recovery_rate_bz = 0;//copy恢复率
											fec_recovery_rate_bz = 0;//fec恢复率
											arq_recovery_rate_bz = 0;//arq恢复率
										}
										//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
										all_recovery_rate_bz = stringToNumber(copy_recovery_rate_bz) + stringToNumber(fec_recovery_rate_bz) + stringToNumber(arq_recovery_rate_bz);
										
										//原始丢包率
										arq_lost_rate_bz = stringToNumber(rtp_lost_rate_bz) + stringToNumber(copy_recovery_rate_bz) + stringToNumber(fec_recovery_rate_bz) + stringToNumber(arq_recovery_rate_bz);
										 
										var fec_copy_arq_sum = stringToNumber(FEC_RC_T) + stringToNumber(ARQ_T) + stringToNumber(CP_T);
										if(RC_T!==0){
											all_r_rate_bz = rate(fec_copy_arq_sum,RC_T);//总冗余率
										}else{
											all_r_rate_bz = 0 ;//总冗余率
										}
										
										if(fec_copy_arq_sum!==0){
										    fec_r_rate_bz = rate(FEC_RC_T,fec_copy_arq_sum);//fec冗余占比
										    arq_r_rate_bz = rate(ARQ_T,fec_copy_arq_sum);//arq冗余占比
										    copy_r_rate_bz = rate(CP_T,fec_copy_arq_sum);//copy冗余占比
										}else{
										    fec_r_rate_bz = 0;//fec冗余占比
										    arq_r_rate_bz = 0;//arq冗余占比
										    copy_r_rate_bz = 0;//copy冗余占比
										}
										
										
										//COPY容错技术
										var copy_use_rate_bz ;//COPY利用率
										var copy_delay_rate_bz ;//COPY延时率
										var copy_repeat_rate_bz ;//COPY重复率
										var copy_send_rate_bz ;//COPY发包率
									
										if(CP_T!==0){
											copy_use_rate_bz = rate(CP_E,CP_T);//COPY利用率
											copy_delay_rate_bz = rate(CP_L,CP_T);//COPY延时率
											copy_repeat_rate_bz = rate(CP_R,CP_T);//COPY重复率
										}else{
											copy_use_rate_bz = 0;//COPY利用率
											copy_delay_rate_bz = 0;//COPY延时率
											copy_repeat_rate_bz = 0;//COPY重复率
										}
										
										if(RTP!==0){
											copy_send_rate_bz = rate(CP_T,RTP);//COPY发包率
										}else{
											copy_send_rate_bz = 0;//COPY发包率
										}
										 
										//ARQ容错技术
										var arq_use_rate_bz ;//ARQ利用率
										var arq_delay_rate_bz;//ARQ延时率
										var arq_repeat_rate_bz ;//ARQ重复率
										var arq_send_rate_bz ;//ARQ发包率
										
										if(ARQ_T!==0){
											arq_use_rate_bz = rate(ARQ_E,ARQ_T);//ARQ利用率
											arq_delay_rate_bz = rate(ARQ_L,ARQ_T);//ARQ延时率
											arq_repeat_rate_bz = rate(ARQ_R,ARQ_T);//ARQ重复率
										}else{
											arq_use_rate_bz = 0;//ARQ利用率
											arq_delay_rate_bz = 0;//ARQ延时率
											arq_repeat_rate_bz = 0;//ARQ重复率
										}
										
										if(RTP!==0){
											arq_send_rate_bz = rate(ARQ_T,RTP);//ARQ发包率
										}else{
											arq_send_rate_bz = 0;//ARQ发包率
										}
									 	/**
									 	 * FEC容错技术
									 	 */
										//FEC包接收统计
										var fec_use_rate_bz ;//FEC接收有效率
										var fec_used_rate_bz ;//FEC利用率
										var fec_delay_rate_bz ;//FEC延时率
										var fec_repeat_rate_bz ;//FEC重复率
										var fec_send_rate_bz ;//FEC发包率
										if(FEC_RC_T!==0){
											fec_use_rate_bz = rate(FEC_RC_E,FEC_RC_T);//FEC接收有效率
											fec_used_rate_bz = rate((stringToNumber(FEC_DEC_S) + stringToNumber(FEC_DEC_F)),FEC_RC_E);//FEC利用率
											fec_delay_rate_bz = rate(FEC_RC_L,FEC_RC_T);//FEC延时率
											fec_repeat_rate_bz = rate(FEC_RC_R,FEC_RC_T);//FEC重复率
										}else{
											fec_use_rate_bz = 0;//FEC接收有效率
											fec_used_rate_bz = 0;//FEC利用率
											fec_delay_rate_bz = 0;//FEC延时率
											fec_repeat_rate_bz = 0;//FEC重复率
										}
										
										if(RTP!==0){
											fec_send_rate_bz = rate(FEC_RC_T,RTP);//FEC发包率
										}else{
											fec_send_rate_bz = 0;//FEC发包率
										}
										
										//FEC包解码统计
										var fec_decode_suc_rate_bz ;//FEC解码成功率
										var fec_decode_fail_rate_bz ;//FEC解码失败率
										var fec_decode_useless_rate_bz ;//FEC解码无用率
										if(FEC_RC_E!==0){
											fec_decode_suc_rate_bz = rate(FEC_DEC_S,FEC_RC_E);//FEC解码成功率
											fec_decode_fail_rate_bz = rate(FEC_DEC_F,FEC_RC_E);//FEC解码失败率
											fec_decode_useless_rate_bz = rate(FEC_DEC_N,FEC_RC_E);//FEC解码无用率
										}else{
											fec_decode_suc_rate_bz = 0;//FEC解码成功率
											fec_decode_fail_rate_bz = 0;//FEC解码失败率
											fec_decode_useless_rate_bz = 0;//FEC解码无用率
										}
										
										/**
										 * 3、定义中间数组
										 */
										var arr01 = new Array();
										var arr02 = new Array();
										var arr03 = new Array();
										var arr04 = new Array();
										var arr05 = new Array();
										var arr345 = new Array();
										
										var arr06 = new Array();
										var arr07 = new Array();
										var arr08 = new Array();										
										var arr09 = new Array();
										
										var arr10 = new Array();
										var arr11 = new Array();
										var arr12 = new Array();
										var arr13 = new Array();
										
										var arr14 = new Array();										
										var arr141 = new Array();										
										var arr15 = new Array();
										var arr16 = new Array();
										var arr17 = new Array();
										
										var arr18 = new Array();
										var arr19 = new Array();
										var arr20 = new Array();
										
										var arr21 = new Array();
										var arr22 = new Array();
										var arr23 = new Array();
										var arr24 = new Array();
										
										arr01[0] = dateToUTC(formatTime(valMap.get("time")));
										arr02[0] = dateToUTC(formatTime(valMap.get("time")));
										arr03[0] = dateToUTC(formatTime(valMap.get("time")));
										arr04[0] = dateToUTC(formatTime(valMap.get("time")));
										arr05[0] = dateToUTC(formatTime(valMap.get("time")));
										arr345[0] = dateToUTC(formatTime(valMap.get("time")));
										arr06[0] = dateToUTC(formatTime(valMap.get("time")));
										arr07[0] = dateToUTC(formatTime(valMap.get("time")));
										arr08[0] = dateToUTC(formatTime(valMap.get("time")));
										arr09[0] = dateToUTC(formatTime(valMap.get("time")));
										arr10[0] = dateToUTC(formatTime(valMap.get("time")));
										arr11[0] = dateToUTC(formatTime(valMap.get("time")));
										arr12[0] = dateToUTC(formatTime(valMap.get("time")));
										arr13[0] = dateToUTC(formatTime(valMap.get("time")));
										arr14[0] = dateToUTC(formatTime(valMap.get("time")));
										arr141[0] = dateToUTC(formatTime(valMap.get("time")));
										arr15[0] = dateToUTC(formatTime(valMap.get("time")));
										arr16[0] = dateToUTC(formatTime(valMap.get("time")));
										arr17[0] = dateToUTC(formatTime(valMap.get("time")));
										arr18[0] = dateToUTC(formatTime(valMap.get("time")));
										arr19[0] = dateToUTC(formatTime(valMap.get("time")));
										arr20[0] = dateToUTC(formatTime(valMap.get("time")));
										arr21[0] = dateToUTC(formatTime(valMap.get("time")));
										arr22[0] = dateToUTC(formatTime(valMap.get("time")));
										arr23[0] = dateToUTC(formatTime(valMap.get("time")));
										arr24[0] = dateToUTC(formatTime(valMap.get("time")));
										
										//总体纠错机制
										arr01[1] = stringToNumber(toFixed(stringToNumber(arq_lost_rate_bz)));//原始丢包率
										arr02[1] = stringToNumber(toFixed(stringToNumber(rtp_lost_rate_bz)));//RTP丢包率(容错后)
										arr03[1] = stringToNumber(toFixed(stringToNumber(copy_recovery_rate_bz)));//copy恢复率
										arr04[1] = stringToNumber(toFixed(stringToNumber(fec_recovery_rate_bz)));//fec恢复率
										arr05[1] = stringToNumber(toFixed(stringToNumber(arq_recovery_rate_bz)));//arq恢复率
										arr345[1] = stringToNumber(toFixed(stringToNumber(all_recovery_rate_bz)));//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
										
										//COPY容错技术
										arr06[1] = stringToNumber(toFixed(stringToNumber(copy_use_rate_bz)));//COPY利用率
										arr07[1] = stringToNumber(toFixed(stringToNumber(copy_delay_rate_bz)));//COPY延时率
										arr08[1] = stringToNumber(toFixed(stringToNumber(copy_repeat_rate_bz)));//COPY重复率
										arr09[1] = stringToNumber(toFixed(stringToNumber(copy_send_rate_bz)));//COPY发包率
										
										//ARQ容错技术
										arr10[1] = stringToNumber(toFixed(stringToNumber(arq_use_rate_bz)));//ARQ利用率
										arr11[1] = stringToNumber(toFixed(stringToNumber(arq_delay_rate_bz)));//ARQ延时率
										arr12[1] = stringToNumber(toFixed(stringToNumber(arq_repeat_rate_bz)));//ARQ重复率
										arr13[1] = stringToNumber(toFixed(stringToNumber(arq_send_rate_bz)));//ARQ发包率
										
										/**
										 * FEC容错技术
										 */
										//fec包接收统计
										arr14[1] = stringToNumber(toFixed(stringToNumber(fec_use_rate_bz)));//FEC接收有效率
										arr141[1] = stringToNumber(toFixed(stringToNumber(fec_used_rate_bz)));//FEC利用率
										arr15[1] = stringToNumber(toFixed(stringToNumber(fec_delay_rate_bz)));//FEC延时率
										arr16[1] = stringToNumber(toFixed(stringToNumber(fec_repeat_rate_bz)));//FEC重复率
										arr17[1] = stringToNumber(toFixed(stringToNumber(fec_send_rate_bz)));//FEC发包率
										
										//fec包解码统计
										arr18[1] = stringToNumber(toFixed(stringToNumber(fec_decode_suc_rate_bz)));//FEC解码成功率
										arr19[1] = stringToNumber(toFixed(stringToNumber(fec_decode_fail_rate_bz)));//FEC解码失败率
										arr20[1] = stringToNumber(toFixed(stringToNumber(fec_decode_useless_rate_bz)));//FEC解码无用率
										
										//成本比
										arr21[1] = stringToNumber(toFixed(stringToNumber(all_r_rate_bz)));//总冗余率
										arr22[1] = stringToNumber(toFixed(stringToNumber(fec_r_rate_bz)));//fec冗余占比
										arr23[1] = stringToNumber(toFixed(stringToNumber(arq_r_rate_bz)));//arq冗余占比
										arr24[1] = stringToNumber(toFixed(stringToNumber(copy_r_rate_bz)));//copy冗余占比
										
										
										/**
										 * 4、生成图表所需的二维数组
										 */
										//总体纠错机制
										arq_lost_rate_arr_bz[i] = arr01;//原始丢包率
										rtp_lost_rate_arr_bz[i] = arr02;//RTP丢包率(容错后)
										all_recovery_rate_arr_bz[i] = arr345;//总恢复率，等于copy恢复率+fec恢复率+arq恢复率
										copy_recovery_rate_arr_bz[i] = arr03;//copy恢复率
										fec_recovery_rate_arr_bz[i] = arr04;//fec恢复率
										arq_recovery_rate_arr_bz[i] = arr05;//arq恢复率
										all_r_rate_arr_bz[i] = arr21;//总冗余率
									    fec_r_rate_arr_bz[i] = arr22;//fec冗余占比
									    arq_r_rate_arr_bz[i] = arr23;//arq冗余占比
									    copy_r_rate_arr_bz[i] = arr24;//copy冗余占比
										 
										//COPY容错技术
										copy_use_rate_arr_bz[i] = arr06;//COPY利用率
										copy_delay_rate_arr_bz[i] = arr07;//COPY延时率
										copy_repeat_rate_arr_bz[i] = arr08;//COPY重复率
										copy_send_rate_arr_bz[i] = arr09;//COPY发包率
										 
										//ARQ容错技术
										arq_use_rate_arr_bz[i] = arr10;//ARQ利用率
										arq_delay_rate_arr_bz[i] = arr11;//ARQ延时率
										arq_repeat_rate_arr_bz[i] = arr12;//ARQ重复率
										arq_send_rate_arr_bz[i] = arr13;//ARQ发包率
										 
										/**
										 * FEC容错技术
										 */
										//fec包接收统计
										fec_use_rate_arr_bz[i] = arr14;//FEC接收有效率
										fec_used_rate_arr_bz[i] = arr141;//FEC利用率 
										fec_delay_rate_arr_bz[i] = arr15;//FEC延时率
										fec_repeat_rate_arr_bz[i] = arr16;//FEC重复率
										fec_send_rate_arr_bz[i] = arr17;//FEC发包率
										
										//fec包解码统计
										fec_decode_suc_rate_arr_bz[i] = arr18;//FEC解码成功率
										fec_decode_fail_rate_arr_bz[i] = arr19;//FEC解码失败率
										fec_decode_useless_rate_arr_bz[i] = arr20;//FEC解码无用率	
										
										
										
										var html = "";
										html += formatTime(valMap.get("time")) + "<br/>"+
												"【总体纠错机制】<br/>"+
												"　原始丢包率："+toFixed(arq_lost_rate_bz)+"%<br/>"+
												"　RTP丢包率(容错后)："+toFixed(rtp_lost_rate_bz)+"%<br/>"+
												"　┅┅┅┅┅┅┅┅┅┅<br/>"+
												"　总恢复率："+toFixed(all_recovery_rate_bz)+"%<br/>"+
												"　copy恢复率："+toFixed(copy_recovery_rate_bz)+"%<br/>"+
												"　fec恢复率："+toFixed(fec_recovery_rate_bz)+"%<br/>"+
												"　arq恢复率："+toFixed(arq_recovery_rate_bz)+"%<br/>" +
												"　┅┅┅┅┅┅┅┅┅┅<br/>"+
												
												"　总冗余率："+toFixed(all_r_rate_bz)+"%<br/>"+
												"　fec冗余占比："+toFixed(fec_r_rate_bz)+"%<br/>"+
												"　arq冗余占比："+toFixed(arq_r_rate_bz)+"%<br/>"+
												"　copy冗余占比："+toFixed(copy_r_rate_bz)+"%<br/>"+
												
												"【COPY】<br/>"+
												"　COPY利用率："+toFixed(copy_use_rate_bz)+"%<br/>"+
												"　COPY延时率："+toFixed(copy_delay_rate_bz)+"%<br/>"+
												"　COPY重复率："+toFixed(copy_repeat_rate_bz)+"%<br/>"+
												"　COPY发包率："+toFixed(copy_send_rate_bz)+"%<br/>"+
												
												"【ARQ】<br/>"+
												"　ARQ利用率："+toFixed(arq_use_rate_bz)+"%<br/>"+
												"　ARQ延时率："+toFixed(arq_delay_rate_bz)+"%<br/>"+
												"　ARQ重复率："+toFixed(arq_repeat_rate_bz)+"%<br/>"+
												"　ARQ发包率："+toFixed(arq_send_rate_bz)+"%<br/>"+
												
												"【FEC】<br/>"+
												"　FEC接收有效率："+toFixed(fec_use_rate_bz)+"%<br/>"+
												"　FEC利用率："+toFixed(fec_used_rate_bz)+"%<br/>"+
												"　FEC延时率："+toFixed(fec_delay_rate_bz)+"%<br/>"+
												"　FEC重复率："+toFixed(fec_repeat_rate_bz)+"%<br/>"+
												"　FEC发包率："+toFixed(fec_send_rate_bz)+"%<br/>"+
												
												"　FEC解码成功率："+toFixed(fec_decode_suc_rate_bz)+"%<br/>"+
												"　FEC解码失败率："+toFixed(fec_decode_fail_rate_bz)+"%<br/>"+
												"　FEC解码无用率："+toFixed(fec_decode_useless_rate_bz)+"%";
												
										arq_map_bz.put(dateToUTC(formatTime(valMap.get("time"))),html);
										
									}
								}
							});
						}
					}
				}
			}
		}
	}
	/*
	console.info("↓=arq视图展示，被叫端=↓");
	console.info("原始丢包率arq_lost_rate_arr_bz:"+arq_lost_rate_arr_bz);
	console.info("RTP丢包率(容错后)rtp_lost_rate_arr_bz:"+rtp_lost_rate_arr_bz);
	console.info("总恢复率all_recovery_rate_arr_bz:"+all_recovery_rate_arr_bz);
	console.info("copy恢复率copy_recovery_rate_arr_bz:"+copy_recovery_rate_arr_bz);
	console.info("fec恢复率fec_recovery_rate_arr_bz:"+fec_recovery_rate_arr_bz);
	console.info("arq恢复率arq_recovery_rate_arr_bz:"+arq_recovery_rate_arr_bz);
	
	console.info("总冗余率all_r_rate_arr_bz:"+all_r_rate_arr_bz);
	console.info("fec冗余占比fec_r_rate_arr_bz:"+fec_r_rate_arr_bz);
	console.info("arq冗余占比arq_r_rate_arr_bz:"+arq_r_rate_arr_bz);
	console.info("copy冗余占比copy_r_rate_arr_bz:"+copy_r_rate_arr_bz);
	
	console.info("COPY利用率copy_use_rate_arr_bz:"+copy_use_rate_arr_bz);
	console.info("COPY延时率copy_delay_rate_arr_bz:"+copy_delay_rate_arr_bz);
	console.info("COPY重复率copy_repeat_rate_arr_bz:"+copy_repeat_rate_arr_bz);
	console.info("COPY发包率copy_send_rate_arr_bz:"+copy_send_rate_arr_bz);
	
	console.info("ARQ利用率arq_use_rate_arr_bz:"+arq_use_rate_arr_bz);
	console.info("ARQ延时率arq_delay_rate_arr_bz:"+arq_delay_rate_arr_bz);
	console.info("ARQ重复率arq_repeat_rate_arr_bz:"+arq_repeat_rate_arr_bz);
	console.info("ARQ发包率arq_send_rate_arr_bz:"+arq_send_rate_arr_bz);
	
	console.info("FEC接收有效率fec_use_rate_arr_bz:"+fec_use_rate_arr_bz);
	console.info("FEC利用率fec_used_rate_arr_bz:"+fec_used_rate_arr_bz);
	console.info("FEC延时率fec_delay_rate_arr_bz:"+fec_delay_rate_arr_bz);
	console.info("FEC重复率fec_repeat_rate_arr_bz:"+fec_repeat_rate_arr_bz);
	console.info("FEC发包率fec_send_rate_arr_bz:"+fec_send_rate_arr_bz);
	console.info("FEC解码成功率fec_decode_suc_rate_arr_bz:"+fec_decode_suc_rate_arr_bz);
	console.info("FEC解码失败率fec_decode_fail_rate_arr_bz:"+fec_decode_fail_rate_arr_bz);
	console.info("FEC解码无用率fec_decode_useless_rate_arr_bz:"+fec_decode_useless_rate_arr_bz);
	console.info("↑=arq视图展示，被叫端=↑");
	*/
	if(arq_lost_rate_arr_bz!=undefined&&arq_lost_rate_arr_bz!=null&&arq_lost_rate_arr_bz!==""&&arq_lost_rate_arr_bz.length>0||
	rtp_lost_rate_arr_bz!=undefined&&rtp_lost_rate_arr_bz!=null&&rtp_lost_rate_arr_bz!==""&&rtp_lost_rate_arr_bz.length>0||
	all_recovery_rate_arr_bz!=undefined&&all_recovery_rate_arr_bz!=null&&all_recovery_rate_arr_bz!==""&&all_recovery_rate_arr_bz.length>0||
	copy_recovery_rate_arr_bz!=undefined&&copy_recovery_rate_arr_bz!=null&&copy_recovery_rate_arr_bz!==""&&copy_recovery_rate_arr_bz.length>0||
	fec_recovery_rate_arr_bz!=undefined&&fec_recovery_rate_arr_bz!=null&&fec_recovery_rate_arr_bz!==""&&fec_recovery_rate_arr_bz.length>0||
	arq_recovery_rate_arr_bz!=undefined&&arq_recovery_rate_arr_bz!=null&&arq_recovery_rate_arr_bz!==""&&arq_recovery_rate_arr_bz.length>0||
	
	all_r_rate_arr_bz!=undefined&&all_r_rate_arr_bz!=null&&all_r_rate_arr_bz!==""&&all_r_rate_arr_bz.length>0||
	fec_r_rate_arr_bz!=undefined&&fec_r_rate_arr_bz!=null&&fec_r_rate_arr_bz!==""&&fec_r_rate_arr_bz.length>0||
	arq_r_rate_arr_bz!=undefined&&arq_r_rate_arr_bz!=null&&arq_r_rate_arr_bz!==""&&arq_r_rate_arr_bz.length>0||
	copy_r_rate_arr_bz!=undefined&&copy_r_rate_arr_bz!=null&&copy_r_rate_arr_bz!==""&&copy_r_rate_arr_bz.length>0||
	
	copy_use_rate_arr_bz!=undefined&&copy_use_rate_arr_bz!=null&&copy_use_rate_arr_bz!==""&&copy_use_rate_arr_bz.length>0||
	copy_delay_rate_arr_bz!=undefined&&copy_delay_rate_arr_bz!=null&&copy_delay_rate_arr_bz!==""&&copy_delay_rate_arr_bz.length>0||
	copy_repeat_rate_arr_bz!=undefined&&copy_repeat_rate_arr_bz!=null&&copy_repeat_rate_arr_bz!==""&&copy_repeat_rate_arr_bz.length>0||
	copy_send_rate_arr_bz!=undefined&&copy_send_rate_arr_bz!=null&&copy_send_rate_arr_bz!==""&&copy_send_rate_arr_bz.length>0||
	arq_use_rate_arr_bz!=undefined&&arq_use_rate_arr_bz!=null&&arq_use_rate_arr_bz!==""&&arq_use_rate_arr_bz.length>0||
	arq_delay_rate_arr_bz!=undefined&&arq_delay_rate_arr_bz!=null&&arq_delay_rate_arr_bz!==""&&arq_delay_rate_arr_bz.length>0||
	arq_repeat_rate_arr_bz!=undefined&&arq_repeat_rate_arr_bz!=null&&arq_repeat_rate_arr_bz!==""&&arq_repeat_rate_arr_bz.length>0||
	arq_send_rate_arr_bz!=undefined&&arq_send_rate_arr_bz!=null&&arq_send_rate_arr_bz!==""&&arq_send_rate_arr_bz.length>0||
	fec_use_rate_arr_bz!=undefined&&fec_use_rate_arr_bz!=null&&fec_use_rate_arr_bz!==""&&fec_use_rate_arr_bz.length>0||
	fec_used_rate_arr_bz!=undefined&&fec_used_rate_arr_bz!=null&&fec_used_rate_arr_bz!==""&&fec_used_rate_arr_bz.length>0||
	fec_delay_rate_arr_bz!=undefined&&fec_delay_rate_arr_bz!=null&&fec_delay_rate_arr_bz!==""&&fec_delay_rate_arr_bz.length>0||
	fec_repeat_rate_arr_bz!=undefined&&fec_repeat_rate_arr_bz!=null&&fec_repeat_rate_arr_bz!==""&&fec_repeat_rate_arr_bz.length>0||
	fec_send_rate_arr_bz!=undefined&&fec_send_rate_arr_bz!=null&&fec_send_rate_arr_bz!==""&&fec_send_rate_arr_bz.length>0||
	fec_decode_suc_rate_arr_bz!=undefined&&fec_decode_suc_rate_arr_bz!=null&&fec_decode_suc_rate_arr_bz!==""&&fec_decode_suc_rate_arr_bz.length>0||
	fec_decode_fail_rate_arr_bz!=undefined&&fec_decode_fail_rate_arr_bz!=null&&fec_decode_fail_rate_arr_bz!==""&&fec_decode_fail_rate_arr_bz.length>0||
	fec_decode_useless_rate_arr_bz!=undefined&&fec_decode_useless_rate_arr_bz!=null&&fec_decode_useless_rate_arr_bz!==""&&fec_decode_useless_rate_arr_bz.length>0){
		//展示arq的视图，被叫端汇报的是主叫端容错机制，所以要显示在主叫端标签
		arqView_bz("bandAdaptive_arq_count_zb01");
	}else{
		$("#bandAdaptive_arq_count_bz01").html("未获取ARQ统计的总体纠错机制、COPY容错技术、ARQ容错技术、FEC容错技术相关数据，故无图形数据展示。");
	}
}


$(document).ready(function(){
	arq_formula_bz();
	
	//切换“容错机制计算公式”的可见状态
	$('#topon_arq_bz').live("click",function () {
	   $('#arq_formula_bz').slideToggle("slow");
	   $('#topon_arq_bz').toggle();
	   $('#topoff_arq_bz').toggle();
	});
	$('#topoff_arq_bz').live("click",function () {
		   $('#arq_formula_bz').slideToggle("slow");
		   $('#topon_arq_bz').toggle();
		   $('#topoff_arq_bz').toggle();
	});
});

/**
 * 容错机制的计算公式，将公式展示在页面上方便查看
 */
function arq_formula_bz(){
	var html = "";
	html += "<span id='topon_arq_bz' class='summaryStyle'>&nbsp;<b>容错机制参数说明和计算公式：</b><font style='color:#35A368;'><b>OPEN</b></font></span>"
					+"<span id='topoff_arq_bz' class='summaryStyle' style='display:none;'>&nbsp;<b>容错机制参数说明和计算公式：</b><font style='color:#FD042E;'><b>CLOSE</b></font></span>"
					+"<div id='arq_formula_bz' style='display:none;font-size:12px;'>" +
							"<table border=1 style='margin-left:5px;'>" +
							"<tr>" +
							"<td colspan='2'>注：此标签展示的视图内容是主叫端汇报的数据。" +
							"</td>" +
							"</tr>" +
							"<tr style='vertical-align:top;'>" +
							"<td style='padding:5px;'>" +
							"<b>协议字段说明</b><br/>" +
							"eventtype=arq_count_10s<br/>" +
							"RC_T 容错恢复后，接收到的有效(用于音视频播放)rtp包总数<br/>" +
							"LS_T 容错恢复后，丢失rtp包总数<br/>" +
							"CP_T COPY包的接收总数<br/>" +
							"CP_E 接收到的COPY包中，成功用于恢复的包总数<br/>" +
							"CP_L 接收到的COPY包中，迟到超时导致恢复失败的包总数<br/>" +
							"CP_R 接收到的COPY包中，重复包导致无效(已经恢复)的包总数<br/>" +
							"FEC_RC_T 接收到FEC包的总数<br/>" +
							"FEC_RC_E 接收到FEC包的有效总数<br/>" +
							"FEC_RC_L 接收到FEC包的迟到总数<br/>" +
							"FEC_RC_R 接收到FEC包的重复总数<br/>" +
							"FEC包接收统计的理论值关系： FEC_RC_T=FEC_RC_E+FEC_RC_L+FEC_RC_R<br/>"+
							"FEC_DEC_S 恢复RTP丢包成功的FEC包总数<br/>" +
							"FEC_DEC_N 没有参与恢复RTP丢包的FEC包总数<br/>" +
							"FEC_DEC_F 恢复RTP丢包失败的FEC包总数<br/>" +
							"FEC_DEC_RTP 使用FEC恢复的RTP包的总数<br/>" +
							"FEC包解码统计与FEC总接收包的理论值关系：FEC_RC_T=FEC_DEC_S+FEC_DEC_N+FEC_DEC_F<br/>"+
							"ARQ_T ARQ包的接收总数<br/>" +
							"ARQ_E 接收到的ARQ包中，成功用于恢复的包总数<br/>" +
							"ARQ_L 接收到的ARQ包中，迟到超时导致恢复失败的包总数<br/>" +
							"ARQ_R 接收到的ARQ包中，重复包导致无效(已经恢复)的包总数<br/>" +
							"</td>" +
							"<td style='padding:5px;'>" +
							"<b>公式计算</b><br/>" +
							"RTP接收包理论值 =RC_T+LS_T<br/>" +
							"原始丢包率=RTP丢包率(容错后)+copy恢复率+fec恢复率+arq恢复率<br/>" +
							"RTP丢包率(容错后)=LS_T/RTP接收包理论值<br/>" +
							"总恢复率=copy恢复率+fec恢复率+arq恢复率<br/>" +
							"copy恢复率=CP_E/RTP接收包理论值</br/>" +
							"fec恢复率=FEC_DEC_RTP/RTP接收包理论值</br>" +
							"arq恢复率=ARQ_E/RTP接收包理论值<br/>" +
							"总冗余率=(FEC_RC_T+ARQ_T+CP_T)/RC_T<br/>" +
							"fec冗余占比=FEC_RC_T/(FEC_RC_T+ARQ_T+CP_T)<br/>" +
							"arq冗余占比=ARQ_T/(FEC_RC_T+ARQ_T+CP_T)<br/>" +
							"copy冗余占比=CP_T/(FEC_RC_T+ARQ_T+CP_T) <br/>" +
							"COPY利用率=CP_E/CP_T<br/>" +
							"COPY延时率=CP_L/CP_T<br/>" +
							"COPY重复率=CP_R/CP_T<br/>" +
							"COPY发包率=CP_T/RTP接收包理论值<br/>" +
							"ARQ利用率=ARQ_E/ARQ_T<br/>" +
							"ARQ延时率=ARQ_L/ARQ_T<br/>" +
							"ARQ重复率=ARQ_R/ARQ_T<br/>" +
							"ARQ发包率=ARQ_T/RTP接收包理论值<br/>" +
							"FEC接收有效率=FEC_RC_E/FEC_RC_T<br/>" +
							"FEC利用率=(FEC_DEC_S+FEC_DEC_F)/FEC_RC_E<br/>" +
							"FEC延时率=FEC_RC_L/FEC_RC_T<br/>" +
							"FEC重复率=FEC_RC_R/FEC_RC_T<br/>" +
							"FEC发包率=FEC_RC_T/RTP接收包理论值<br/>" +
							"FEC解码成功率=FEC_DEC_S/FEC_RC_E<br/>" +
							"FEC解码失败率=FEC_DEC_F/FEC_RC_E<br/>" +
							"FEC解码无用率=FEC_DEC_N/FEC_RC_E<br/>" +
							"</td>" +
							"</tr></table>" +
					"</div>";
    $('#bandAdaptive_arq_count_bz01_01').html(html);
}


