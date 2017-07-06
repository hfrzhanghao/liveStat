/**
 * 通话详情callDetail.jsp页面中“网络诊断”标签页面的JS效果 
 * 包括分时展示U->R、R->U的丢包和延时的视图
 * 主叫、被叫的数据处理
 */
 
 //图例名字，按目前的程序系统，最多只有六条曲线 
 var legendUR01_zb = "无此上行路径";//本端上行
 var legendUR02_zb = "无此上行路径";//本端上行
 var legendRU01_zb = "无此下行路径";//本端下行
 var legendRU02_zb = "无此下行路径";//本端下行
 var legendRU03_zb = "无此下行路径";//本端下行
 var legendRU04_zb = "无此下行路径";//本端下行
 
 var legendUR01_bz = "无此上行路径";//本端上行
 var legendUR02_bz = "无此上行路径";//本端上行
 var legendRU01_bz = "无此下行路径";//本端下行
 var legendRU02_bz = "无此下行路径";//本端下行
 var legendRU03_bz = "无此下行路径";//本端下行
 var legendRU04_bz = "无此下行路径";//本端下行
 
 //曲线数据，二维数据
 //丢包率
 var URArr01_lost_r_zb = new Array();//本端上行
 var URArr02_lost_r_zb = new Array();//本端上行
 var RUArr01_lost_r_zb = new Array();//本端下行
 var RUArr02_lost_r_zb = new Array();//本端下行
 var RUArr03_lost_r_zb = new Array();//本端下行
 var RUArr04_lost_r_zb = new Array();//本端下行
 
 //延时
 var URArr01_delay_aver_zb = new Array();//本端上行
 var URArr02_delay_aver_zb = new Array();//本端上行
 var RUArr01_delay_aver_zb = new Array();//本端下行
 var RUArr02_delay_aver_zb = new Array();//本端下行
 var RUArr03_delay_aver_zb = new Array();//本端下行
 var RUArr04_delay_aver_zb = new Array();//本端下行
 
 //丢包率
 var URArr01_lost_r_bz = new Array();//本端上行
 var URArr02_lost_r_bz = new Array();//本端上行
 var RUArr01_lost_r_bz = new Array();//本端下行
 var RUArr02_lost_r_bz = new Array();//本端下行
 var RUArr03_lost_r_bz = new Array();//本端下行
 var RUArr04_lost_r_bz = new Array();//本端下行
 
 //延时
 var URArr01_delay_aver_bz = new Array();//本端上行
 var URArr02_delay_aver_bz = new Array();//本端上行
 var RUArr01_delay_aver_bz = new Array();//本端下行
 var RUArr02_delay_aver_bz = new Array();//本端下行
 var RUArr03_delay_aver_bz = new Array();//本端下行
 var RUArr04_delay_aver_bz = new Array();//本端下行
 
 //存放以下数据的一维数组
 //丢包率
 //上行路径的丢包率，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var loss_r_arr_urzb = new Array();
 
 //最多四条下行路径
 //下行四条路径丢包率，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var loss_r_arr_ruzb = new Array();
 
 //丢包率
 //上行路径的丢包率，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var loss_r_arr_urbz = new Array();
 
 //最多四条下行路径
 //下行路径丢包率，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var loss_r_arr_rubz = new Array();
 
 //延时
 //上行路径的延时，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var delay_aver_arr_urzb = new Array();
 
 //最多四条下行路径
 //下行路径延时，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var delay_aver_arr_ruzb = new Array();
 
 //延时
 //上行路径的延时，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var delay_aver_arr_urbz = new Array();
 
 //最多四条下行路径
 //下行路径延时，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var delay_aver_arr_rubz = new Array();
 
 //存放时间的数组
 //上行路径的时间，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var diagnose_time_arr_urzb = new Array();
 
 //最多四条下行路径都
 //存放时间的数组，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var diagnose_time_arr_ruzb = new Array();
 
 //存放时间的数组
 //上行路径的时间，两条上行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var diagnose_time_arr_urbz = new Array();
 
 //最多四条下行路径
 //存放时间的数组，四条下行路径可以用同一个，因为按大类循环时，下面的子循环全都是属于同一条路径的
 var diagnose_time_arr_rubz = new Array();
 
 //tips标签使用
 var diagnose_map_zb = new Map();
 var diagnose_map_bz = new Map();
 
 /**
  * 处理数据，获取U-->R R-->U的数据，主叫端
  * @param {} datas
  */
 function diagnose_zb(datas){
 	
 	var result = datas.result;
 	if(result===0){
 		var data = datas.data;
 		if(data!=undefined&&data!=null&&data!==""){
 			var caller = data.caller;
 			if(caller!=undefined&&caller!=null&&caller!==""){
 				var call = caller.call;
 				if(call!=undefined&&call!=null&&call!==""){
 					var clucrd = call.clucrd;
 					if(clucrd!=undefined&&clucrd!=null&&clucrd!==""){
 						var num = 0;
 						$.each(clucrd,function(key){//循环主路和备路（main、back）
						 	loss_r_arr_urzb = new Array();//丢包率
						 	delay_aver_arr_urzb = new Array();//延时
						 	diagnose_time_arr_urzb = new Array();//存放时间的数组
 							var clucrdArr = clucrd[key];
 							if(clucrdArr!=undefined&&clucrdArr!=null&&clucrdArr!==""&&(clucrdArr instanceof Array)&&clucrdArr.length>0){
 								var index = 0;
 								$.each(clucrdArr,function(i,val){//循环一条路汇报的多条分段数据
 									var valMap = new Map();
 									if(val!=undefined&&val!=null&&val!==""){
 										var eventinfo = val.eventinfo;
	 									if(eventinfo!=undefined&&eventinfo!=null&&eventinfo!==""){
	 										if(eventinfo.indexOf("CLU")!=-1){//本端上行
	 											var valArr = splitString(eventinfo);
	 											if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
	 												$.each(valArr,function(j,va){
	 													if(va!=undefined&&va!=null&&va!==""){
	 														var vaArr = va.split("=");
	 														valMap.put(vaArr[0],vaArr[1]);
	 													}
	 												});
	 											}
	 											//上行最多两条路径
	 											if(num==0){//第一条路汇报的数据
	 												legendUR01_zb = "U->R"+valMap.get("dst").split("_")[1];
	 												
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_loss_r",valMap.get("loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_a_loss_r",valMap.get("a_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_v_loss_r",valMap.get("v_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_vf_loss_r",valMap.get("vf_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_delay_aver",valMap.get("delay_aver"));
	 												
	 											}else if(num==1){//第二条路汇报的数据
	 												legendUR02_zb = "U->R"+valMap.get("dst").split("_")[1];
	 												
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_loss_r",valMap.get("loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_a_loss_r",valMap.get("a_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_v_loss_r",valMap.get("v_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_vf_loss_r",valMap.get("vf_loss_r"));
	 												diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_delay_aver",valMap.get("delay_aver"));
	 											}
	 											
	 											loss_r_arr_urzb[index] = valMap.get("loss_r");//总丢包率
	 											delay_aver_arr_urzb[index] = valMap.get("delay_aver");//延时
	 											
	 											diagnose_time_arr_urzb[index] = valMap.get("time");//时间
	 											
	 											index++;
	 										}
	 									}
 									}
 								});
 							}
 							
 							if(num==0){//第一条路汇报的数据
								if(diagnose_time_arr_urzb!=undefined&&diagnose_time_arr_urzb!=null&&diagnose_time_arr_urzb!==""&&(diagnose_time_arr_urzb instanceof Array)&&diagnose_time_arr_urzb.length>0){
									$.each(diagnose_time_arr_urzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_urzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_urzb[i]);
										
										URArr01_lost_r_zb[i] = arr01;
										URArr01_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率上行第1条路主叫=↓");
		 							console.info("URArr01_lost_r_zb:"+URArr01_lost_r_zb);
		 							console.info("URArr01_delay_aver_zb:"+URArr01_delay_aver_zb);
		 							console.info("diagnose_time_arr_urzb:"+diagnose_time_arr_urzb);
		 							console.info("↑=诊断结果丢包率上行第1条路主叫=↑");
		 							*/
								}
 							}else if(num==1){//第二条路汇报的数据
 								if(diagnose_time_arr_urzb!=undefined&&diagnose_time_arr_urzb!=null&&diagnose_time_arr_urzb!==""&&(diagnose_time_arr_urzb instanceof Array)&&diagnose_time_arr_urzb.length>0){
									$.each(diagnose_time_arr_urzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										arr01[1] = stringToNumber(loss_r_arr_urzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_urzb[i]);
										
										URArr02_lost_r_zb[i] = arr01;
										URArr02_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率上行第2条路主叫=↓");
		 							console.info("URArr02_lost_r_zb:"+URArr02_lost_r_zb);
		 							console.info("URArr02_delay_aver_zb:"+URArr02_delay_aver_zb);
		 							console.info("diagnose_time_arr_urzb:"+diagnose_time_arr_urzb);
									console.info("↑=诊断结果丢包率上行第2条路主叫=↑");
									*/
								}
 							}
 							
 							num++;
 						});
 					}
 					
 					//四条下行路径处理
 					var crucld = call.crucld;
 					if(crucld!=undefined&&crucld!=null&&crucld!==""){
 						var num = 0;
 						$.each(crucld,function(key){//循环下行四条路径，最多只有四条
						 	loss_r_arr_ruzb = new Array();//丢包率
						 	delay_aver_arr_ruzb = new Array();//延时
						 	diagnose_time_arr_ruzb = new Array();//存放时间的数组
 							var crucldArr = crucld[key];
 							if(crucldArr!=undefined&&crucldArr!=null&&crucldArr!==""&&(crucldArr instanceof Array)&&crucldArr.length>0){
 								var index = 0;
 								
 								$.each(crucldArr,function(i,val){//循环一条路汇报的多条分段数据
 									var valMap = new Map();
 									if(val!=undefined&&val!=null&&val!==""){
 										var eventinfo = val.eventinfo;
	 									if(eventinfo!=undefined&&eventinfo!=null&&eventinfo!==""){
	 										if(eventinfo.indexOf("CLD")!=-1){//本端下行
	 											var valArr = splitString(eventinfo);
	 											if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
	 												$.each(valArr,function(j,va){
	 													if(va!=undefined&&va!=null&&va!==""){
	 														var vaArr = va.split("=");
	 														valMap.put(vaArr[0],vaArr[1]);
	 													}
	 												});
	 											}
	 											//下行最多四条路径
	 											if(num==0){//第一条路汇报的数据
	 												legendRU01_zb = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_loss_r",valMap.get("loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==1){//第二条路汇报的数据
	 												legendRU02_zb = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_loss_r",valMap.get("loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==2){//第三条路汇报的数据
	 												legendRU03_zb = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_loss_r",valMap.get("loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==3){//第四条路汇报的数据
	 												legendRU04_zb = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_loss_r",valMap.get("loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_zb.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_delay_aver",valMap.get("delay_aver"));
										
	 											}
	 											
	 											loss_r_arr_ruzb[index] = valMap.get("loss_r");//总丢包率
	 											delay_aver_arr_ruzb[index] = valMap.get("delay_aver");//延时
	 											
	 											diagnose_time_arr_ruzb[index] = valMap.get("time");//时间
	 											
	 											index++;
	 										}
	 									}
 									}
 								});
 							}
 							
 							if(num==0){//第一条路汇报的数据
								if(diagnose_time_arr_ruzb!=undefined&&diagnose_time_arr_ruzb!=null&&diagnose_time_arr_ruzb!==""&&(diagnose_time_arr_ruzb instanceof Array)&&diagnose_time_arr_ruzb.length>0){
									$.each(diagnose_time_arr_ruzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_ruzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_ruzb[i]);
										
										RUArr01_lost_r_zb[i] = arr01;
										RUArr01_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第1条路主叫=↓");
		 							console.info("RUArr01_lost_r_zb:"+RUArr01_lost_r_zb);
		 							console.info("RUArr01_delay_aver_zb:"+RUArr01_delay_aver_zb);
		 							console.info("diagnose_time_arr_ruzb:"+diagnose_time_arr_ruzb);
		 							console.info("↑=诊断结果丢包率下行第1条路主叫=↑");
		 							*/
								}
 							}else if(num==1){//第二条路汇报的数据
								if(diagnose_time_arr_ruzb!=undefined&&diagnose_time_arr_ruzb!=null&&diagnose_time_arr_ruzb!==""&&(diagnose_time_arr_ruzb instanceof Array)&&diagnose_time_arr_ruzb.length>0){
									$.each(diagnose_time_arr_ruzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_ruzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_ruzb[i]);
										
										RUArr02_lost_r_zb[i] = arr01;
										RUArr02_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第2条路主叫=↓");
		 							console.info("RUArr02_lost_r_zb:"+RUArr02_lost_r_zb);
		 							console.info("RUArr02_delay_aver_zb:"+RUArr02_delay_aver_zb);
		 							console.info("diagnose_time_arr_ruzb:"+diagnose_time_arr_ruzb);
		 							console.info("↑=诊断结果丢包率下行第2条路主叫=↑");
		 							*/
								}
 							}else if(num==2){//第二条路汇报的数据
								if(diagnose_time_arr_ruzb!=undefined&&diagnose_time_arr_ruzb!=null&&diagnose_time_arr_ruzb!==""&&(diagnose_time_arr_ruzb instanceof Array)&&diagnose_time_arr_ruzb.length>0){
									$.each(diagnose_time_arr_ruzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_ruzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_ruzb[i]);
										
										RUArr03_lost_r_zb[i] = arr01;
										RUArr03_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第3条路主叫=↓");
		 							console.info("RUArr03_lost_r_zb:"+RUArr03_lost_r_zb);
		 							console.info("RUArr03_delay_aver_zb:"+RUArr03_delay_aver_zb);
		 							console.info("diagnose_time_arr_ruzb:"+diagnose_time_arr_ruzb);
		 							console.info("↑=诊断结果丢包率下行第3条路主叫=↑");
		 							*/
								}
 							}else if(num==3){//第二条路汇报的数据
								if(diagnose_time_arr_ruzb!=undefined&&diagnose_time_arr_ruzb!=null&&diagnose_time_arr_ruzb!==""&&(diagnose_time_arr_ruzb instanceof Array)&&diagnose_time_arr_ruzb.length>0){
									$.each(diagnose_time_arr_ruzb,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_ruzb[i]);
										arr02[1] = stringToNumber(delay_aver_arr_ruzb[i]);
										
										RUArr04_lost_r_zb[i] = arr01;
										RUArr04_delay_aver_zb[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第4条路主叫=↓");
		 							console.info("RUArr04_lost_r_zb:"+RUArr04_lost_r_zb);
		 							console.info("RUArr04_delay_aver_zb:"+RUArr04_delay_aver_zb);
		 							console.info("diagnose_time_arr_ruzb:"+diagnose_time_arr_ruzb);
		 							console.info("↑=诊断结果丢包率下行第4条路主叫=↑");
		 							*/
								}
 							}
 							
 							num++;
 							
 						});
 					}
 				}
 			}
 		}
 		//丢包率的分段统计
 		diagnoseLostView_zb("diagnose_main1_zb02");
 		//延时的分段统计
 		diagnoseDelayView_zb("diagnose_main1_zb03");
 	}
 }
 /**
  * 处理数据，获取U-->R R-->U的数据，被叫端
  * @param {} datas
  */
 function diagnose_bz(datas){
 	
 	var result = datas.result;
 	if(result===0){
 		var data = datas.data;
 		if(data!=undefined&&data!=null&&data!==""){
 			var called = data.called;
 			if(called!=undefined&&called!=null&&called!==""){
 				var call = called.call;
 				if(call!=undefined&&call!=null&&call!==""){
 					var clucrd = call.clucrd;
 					if(clucrd!=undefined&&clucrd!=null&&clucrd!==""){
 						var num = 0;
 						$.each(clucrd,function(key){//循环主路和备路（main、back）
						 	loss_r_arr_urbz = new Array();//丢包率
						 	diagnose_time_arr_urbz = new Array();//存放时间的数组
 							var clucrdArr = clucrd[key];
 							if(clucrdArr!=undefined&&clucrdArr!=null&&clucrdArr!==""&&(clucrdArr instanceof Array)&&clucrdArr.length>0){
 								var index = 0;
 								$.each(clucrdArr,function(i,val){//循环一条路汇报的多条分段数据
 									var valMap = new Map();
 									if(val!=undefined&&val!=null&&val!==""){
 										var eventinfo = val.eventinfo;
	 									if(eventinfo!=undefined&&eventinfo!=null&&eventinfo!==""){
	 										if(eventinfo.indexOf("CLU")!=-1){//本端上行
	 											var valArr = splitString(eventinfo);
	 											if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
	 												$.each(valArr,function(j,va){
	 													if(va!=undefined&&va!=null&&va!==""){
	 														var vaArr = va.split("=");
	 														valMap.put(vaArr[0],vaArr[1]);
	 													}
	 												});
	 											}
	 											//上行最多两条路径
	 											if(num==0){//第一条路汇报的数据
	 												legendUR01_bz = "U->R"+valMap.get("dst").split("_")[1];
	 												
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_loss_r",valMap.get("loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_a_loss_r",valMap.get("a_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_v_loss_r",valMap.get("v_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_vf_loss_r",valMap.get("vf_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR01_delay_aver",valMap.get("delay_aver"));
	 												
	 											}else if(num==1){//第二条路汇报的数据
	 												legendUR02_bz = "U->R"+valMap.get("dst").split("_")[1];
	 												
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_loss_r",valMap.get("loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_a_loss_r",valMap.get("a_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_v_loss_r",valMap.get("v_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_vf_loss_r",valMap.get("vf_loss_r"));
	 												diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"UR02_delay_aver",valMap.get("delay_aver"));
	 											}
	 											
	 											loss_r_arr_urbz[index] = valMap.get("loss_r");//总丢包率
	 											delay_aver_arr_urbz[index] = valMap.get("delay_aver");//延时
	 											
	 											diagnose_time_arr_urbz[index] = valMap.get("time");//时间
	 											
	 											index++;
	 										}
	 									}
 									}
 								});
 							}
 							
 							if(num==0){//第一条路汇报的数据
								if(diagnose_time_arr_urbz!=undefined&&diagnose_time_arr_urbz!=null&&diagnose_time_arr_urbz!==""&&(diagnose_time_arr_urbz instanceof Array)&&diagnose_time_arr_urbz.length>0){
									$.each(diagnose_time_arr_urbz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_urbz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_urbz[i]);
										
										URArr01_lost_r_bz[i] = arr01;
										URArr01_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率上行第1条路被叫=↓");
		 							console.info("URArr01_lost_r_bz:"+URArr01_lost_r_bz);
		 							console.info("URArr01_delay_aver_bz:"+URArr01_delay_aver_bz);
		 							console.info("diagnose_time_arr_urbz:"+diagnose_time_arr_urbz);
									console.info("↑=诊断结果丢包率上行第1条路被叫=↑");
									*/
								}
 							}else if(num==1){//第二条路汇报的数据
 								if(diagnose_time_arr_urbz!=undefined&&diagnose_time_arr_urbz!=null&&diagnose_time_arr_urbz!==""&&(diagnose_time_arr_urbz instanceof Array)&&diagnose_time_arr_urbz.length>0){
									$.each(diagnose_time_arr_urbz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										arr01[1] = stringToNumber(loss_r_arr_urbz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_urbz[i]);
										
										URArr02_lost_r_bz[i] = arr01;
										URArr02_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率上行第2条路被叫=↓");
		 							console.info("URArr02_lost_r_bz:"+URArr02_lost_r_bz);
		 							console.info("URArr02_delay_aver_bz:"+URArr02_delay_aver_bz);
		 							console.info("diagnose_time_arr_urbz:"+diagnose_time_arr_urbz);
									console.info("↑=诊断结果丢包率上行第2条路被叫=↑");
									*/
								}
 							}
 							
 							num++;
 						});
 					}
 					
 					//四条下行路径处理
 					var crucld = call.crucld;
 					if(crucld!=undefined&&crucld!=null&&crucld!==""){
 						var num = 0;
 						$.each(crucld,function(key){//循环下行四条路径，最多只有四条
						 	loss_r_arr_rubz = new Array();//丢包率
						 	delay_aver_arr_rubz = new Array();//延时
						 	diagnose_time_arr_rubz = new Array();//存放时间的数组
 							var crucldArr = crucld[key];
 							if(crucldArr!=undefined&&crucldArr!=null&&crucldArr!==""&&(crucldArr instanceof Array)&&crucldArr.length>0){
 								var index = 0;
 								
 								$.each(crucldArr,function(i,val){//循环一条路汇报的多条分段数据
 									var valMap = new Map();
 									if(val!=undefined&&val!=null&&val!==""){
 										var eventinfo = val.eventinfo;
	 									if(eventinfo!=undefined&&eventinfo!=null&&eventinfo!==""){
	 										if(eventinfo.indexOf("CLD")!=-1){//本端下行
	 											var valArr = splitString(eventinfo);
	 											if(valArr!=undefined&&valArr!=null&&valArr!==""&&(valArr instanceof Array)&&valArr.length>0){
	 												$.each(valArr,function(j,va){
	 													if(va!=undefined&&va!=null&&va!==""){
	 														var vaArr = va.split("=");
	 														valMap.put(vaArr[0],vaArr[1]);
	 													}
	 												});
	 											}
	 											//下行最多四条路径
	 											if(num==0){//第一条路汇报的数据
	 												legendRU01_bz = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_loss_r",valMap.get("loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU01_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==1){//第二条路汇报的数据
	 												legendRU02_bz = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_loss_r",valMap.get("loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU02_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==2){//第三条路汇报的数据
	 												legendRU03_bz = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_loss_r",valMap.get("loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU03_delay_aver",valMap.get("delay_aver"));
										
	 											}else if(num==3){//第四条路汇报的数据
	 												legendRU04_bz = "R"+valMap.get("src").split("_")[1]+"->U";
	 												
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_loss_r",valMap.get("loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_a_loss_r",valMap.get("a_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_v_loss_r",valMap.get("v_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_vf_loss_r",valMap.get("vf_loss_r"));
													diagnose_map_bz.put(dateToUTC(formatTime(valMap.get("time")))+"RU04_delay_aver",valMap.get("delay_aver"));
										
	 											}
	 											
	 											loss_r_arr_rubz[index] = valMap.get("loss_r");//总丢包率
	 											delay_aver_arr_rubz[index] = valMap.get("delay_aver");//延时
	 											
	 											diagnose_time_arr_rubz[index] = valMap.get("time");//时间
	 											
	 											index++;
	 										}
	 									}
 									}
 								});
 							}
 							
 							if(num==0){//第一条路汇报的数据
								if(diagnose_time_arr_rubz!=undefined&&diagnose_time_arr_rubz!=null&&diagnose_time_arr_rubz!==""&&(diagnose_time_arr_rubz instanceof Array)&&diagnose_time_arr_rubz.length>0){
									$.each(diagnose_time_arr_rubz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_rubz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_rubz[i]);
										
										RUArr01_lost_r_bz[i] = arr01;
										RUArr01_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第1条路被叫=↓");
		 							console.info("RUArr01_lost_r_bz:"+RUArr01_lost_r_bz);
		 							console.info("RUArr01_delay_aver_bz:"+RUArr01_delay_aver_bz);
		 							console.info("diagnose_time_arr_rubz:"+diagnose_time_arr_rubz);
		 							console.info("↑=诊断结果丢包率下行第1条路被叫=↑");
		 							*/
								}
 							}else if(num==1){//第二条路汇报的数据
								if(diagnose_time_arr_rubz!=undefined&&diagnose_time_arr_rubz!=null&&diagnose_time_arr_rubz!==""&&(diagnose_time_arr_rubz instanceof Array)&&diagnose_time_arr_rubz.length>0){
									$.each(diagnose_time_arr_rubz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_rubz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_rubz[i]);
										
										RUArr02_lost_r_bz[i] = arr01;
										RUArr02_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第2条路被叫=↓");
		 							console.info("RUArr02_lost_r_bz:"+RUArr02_lost_r_bz);
		 							console.info("RUArr02_delay_aver_bz:"+RUArr02_delay_aver_bz);
		 							console.info("diagnose_time_arr_rubz:"+diagnose_time_arr_rubz);
		 							console.info("↑=诊断结果丢包率下行第2条路被叫=↑");
		 							*/
								}
 							}else if(num==2){//第二条路汇报的数据
								if(diagnose_time_arr_rubz!=undefined&&diagnose_time_arr_rubz!=null&&diagnose_time_arr_rubz!==""&&(diagnose_time_arr_rubz instanceof Array)&&diagnose_time_arr_rubz.length>0){
									$.each(diagnose_time_arr_rubz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_rubz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_rubz[i]);
										
										RUArr03_lost_r_bz[i] = arr01;
										RUArr03_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第3条路被叫=↓");
		 							console.info("RUArr03_lost_r_bz:"+RUArr03_lost_r_bz);
		 							console.info("RUArr03_delay_aver_bz:"+RUArr03_delay_aver_bz);
		 							console.info("diagnose_time_arr_rubz:"+diagnose_time_arr_rubz);
		 							console.info("↑=诊断结果丢包率下行第3条路被叫=↑");
		 							*/
								}
 							}else if(num==3){//第二条路汇报的数据
								if(diagnose_time_arr_rubz!=undefined&&diagnose_time_arr_rubz!=null&&diagnose_time_arr_rubz!==""&&(diagnose_time_arr_rubz instanceof Array)&&diagnose_time_arr_rubz.length>0){
									$.each(diagnose_time_arr_rubz,function(i,val){
										var arr01 = new Array();
										var arr02 = new Array();
										
										arr01[0] = dateToUTC(formatTime(val));
										arr02[0] = dateToUTC(formatTime(val));
										
										arr01[1] = stringToNumber(loss_r_arr_rubz[i]);
										arr02[1] = stringToNumber(delay_aver_arr_rubz[i]);
										
										RUArr04_lost_r_bz[i] = arr01;
										RUArr04_delay_aver_bz[i] = arr02;
									});
									/*
									console.info("↓=诊断结果丢包率下行第4条路被叫=↓");
		 							console.info("RUArr04_lost_r_bz:"+RUArr04_lost_r_bz);
		 							console.info("RUArr04_delay_aver_bz:"+RUArr04_delay_aver_bz);
		 							console.info("diagnose_time_arr_rubz:"+diagnose_time_arr_rubz);
		 							console.info("↑=诊断结果丢包率下行第4条路被叫=↑");
		 							*/
								}
 							}
 							
 							num++;
 						});
 					}
 				}
 			}
 		}
 		//丢包率的分段统计
 		diagnoseLostView_bz("diagnose_main1_bz02");
 		//延时的分段统计
 		diagnoseDelayView_bz("diagnose_main1_bz03");
 	}
 }
