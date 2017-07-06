/* 话务报告callerreport.jsp的JS文件 */

/***********以下为视图************/
/**
 * 0顶部信息
 */
function setView00(datas,sid) {
	//会话ID
	var sids;
	// 主叫端id
	var callerid ;
	// 被叫端id
	var calledid ;
	// 开始时间
	var starttime ;
	// 通话时长
	var duration ;
	// 道路切换
	//var count ;
	// 视频丢包
	//var recvVideoLossR;
	// 音频丢包
	//var recvAudioLossR ;
	
	//版本
	var versioncaller;
	var versioncalled;
	
	
	var data;
	var caller;
	var called;
	var call;
	var total;
	var summary;
	var streamSummary;
	
	//主叫
	var countcaller;//主叫道路切换次数
	var recvAudioLossRcaller;//主叫音频丢包率
	var recvVideoLossRcaller ;//主叫 fec恢复前的视频丢包率
	var recvFecLossRcaller;//主叫fec恢复后的视频流丢包率
	
	//被叫
	var countcalled;//被叫道路切换次数
	var recvAudioLossRcalled;//被叫音频丢包率
	var recvVideoLossRcalled ;//被叫 fec恢复前的视频丢包率
	var recvFecLossRcalled;//被叫fec恢复后的视频流丢包率
	
	var result = datas.result;
	if(result===0){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						versioncaller = total.version;
						summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							callerid = summary.caller;
							//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
							if(sid.split('_')[5]==callerid){//采用主叫数据
								
								// 会话ID
								sids = summary.sid;
								// 被叫端
								calledid = summary.called;
								
								// 开始时间
								starttime = summary.starttime;
								// 通话时长
								duration = summary.duration;
								// 道路切换
								//count = summary.count;
								// 视频丢包
								//recvVideoLossR = summary.recvVideoLossR;
								// 音频丢包
								//recvAudioLossR = summary.recvAudioLossR;
							}else{//在查询页面显示的不是主叫数据时，采用被叫数据
							//------------------
								called = data.called;
								if(called!=undefined&&called!=null&&called!==""){
									call = called.call;
									if(call!=undefined&&call!=null&&call!==""){
										total = call.total;
										if(total!=undefined&&total!=null&&total!==""){
											versioncalled = total.version;
											summary = total.summary;
											if(summary!=undefined&&summary!=null&&summary!==""){
												calledid = summary.called;
												//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
												if(sid.split('_')[5]==calledid){//采用被叫数据
													
													// 会话ID
													sids = summary.sid;
													// 被叫端
													callerid = summary.caller;
													
													// 开始时间
													starttime = summary.starttime;
													// 通话时长
													duration = summary.duration;
													// 道路切换
													//count = summary.count;
													// 视频丢包
													//recvVideoLossR = summary.recvVideoLossR;
													// 音频丢包
													//recvAudioLossR = summary.recvAudioLossR;
												}
											}
										}
									}
								}
								//------------------
							}
						}else{//在summary不存在的情况下，采用被叫数据
							called = data.called;
							if(called!=undefined&&called!=null&&called!==""){
								call = called.call;
								if(call!=undefined&&call!=null&&call!==""){
									total = call.total;
									if(total!=undefined&&total!=null&&total!==""){
										versioncalled = total.version;
										summary = total.summary;
										if(summary!=undefined&&summary!=null&&summary!==""){
											calledid = summary.called;
											//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
											if(sid.split('_')[5]==calledid){//采用被叫数据
												
												// 会话ID
												sids = summary.sid;
												// 被叫端
												callerid = summary.caller;
												
												// 开始时间
												starttime = summary.starttime;
												// 通话时长
												duration = summary.duration;
												// 道路切换
												//count = summary.count;
												// 视频丢包
												//recvVideoLossR = summary.recvVideoLossR;
												// 音频丢包
												//recvAudioLossR = summary.recvAudioLossR;
											}
										}
									}
								}
							}
						}
					}else{//在total不存在的情况下，采用被叫数据
						called = data.called;
						if(called!=undefined&&called!=null&&called!==""){
							call = called.call;
							if(call!=undefined&&call!=null&&call!==""){
								total = call.total;
								if(total!=undefined&&total!=null&&total!==""){
									versioncalled = total.version;
									summary = total.summary;
									if(summary!=undefined&&summary!=null&&summary!==""){
										calledid = summary.called;
										//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
										if(sid.split('_')[5]==calledid){//采用被叫数据
											
											// 会话ID
											sids = summary.sid;
											// 被叫端
											callerid = summary.caller;
											
											// 开始时间
											starttime = summary.starttime;
											// 通话时长
											duration = summary.duration;
											// 道路切换
											//count = summary.count;
											// 视频丢包
											//recvVideoLossR = summary.recvVideoLossR;
											// 音频丢包
											//recvAudioLossR = summary.recvAudioLossR;
										}
									}
								}
							}
						}
					}
				}else{//在summary不存在的情况下，采用被叫数据
					called = data.called;
					if(called!=undefined&&called!=null&&called!==""){
						call = called.call;
						if(call!=undefined&&call!=null&&call!==""){
							total = call.total;
							if(total!=undefined&&total!=null&&total!==""){
								versioncalled = total.version;
								summary = total.summary;
								if(summary!=undefined&&summary!=null&&summary!==""){
									calledid = summary.called;
									//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
									if(sid.split('_')[5]==calledid){//采用被叫数据
										
										// 会话ID
										sids = summary.sid;
										// 被叫端
										callerid = summary.caller;
										
										// 开始时间
										starttime = summary.starttime;
										// 通话时长
										duration = summary.duration;
										// 道路切换
										//count = summary.count;
										// 视频丢包
										//recvVideoLossR = summary.recvVideoLossR;
										// 音频丢包
										//recvAudioLossR = summary.recvAudioLossR;
									}
								}
							}
						}
					}
				}
			}else{//在call不存在的情况下，采用被叫数据
				called = data.called;
				if(called!=undefined&&called!=null&&called!==""){
					call = called.call;
					if(call!=undefined&&call!=null&&call!==""){
						total = call.total;
						if(total!=undefined&&total!=null&&total!==""){
							versioncalled = total.version;
							summary = total.summary;
							if(summary!=undefined&&summary!=null&&summary!==""){
								calledid = summary.called;
								//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
								if(sid.split('_')[5]==calledid){//采用被叫数据
									
									// 会话ID
									sids = summary.sid;
									// 被叫端
									callerid = summary.caller;
									
									// 开始时间
									starttime = summary.starttime;
									// 通话时长
									duration = summary.duration;
									// 道路切换
									//count = summary.count;
									// 视频丢包
									//recvVideoLossR = summary.recvVideoLossR;
									// 音频丢包
									//recvAudioLossR = summary.recvAudioLossR;
								}
							}
						}
					}
				}
			}
			
			//版本主被的都要显示
			called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						versioncalled = total.version;
					}
				}
			}
		}
		
	}
	
	// 空值校验
	if (sids == undefined || sids == null || sids === "") {
		sids = "无";
	}
	if (callerid == undefined || callerid == null || callerid === "") {
		callerid = "无";
	}
	if (calledid == undefined || calledid == null || calledid === "") {
		calledid = "无";
	}
	if (starttime == undefined || starttime == null || starttime === "") {
		starttime = "无";
	}
	if (duration == undefined || duration == null || duration === "") {
		duration = "无";
	}
	/*
	if (count != 0 && (count == undefined || count == null || count == "")) {
		count = "无";
	}
	if (recvVideoLossR != 0 && (recvVideoLossR == undefined || recvVideoLossR == null || recvVideoLossR == "")) {
		recvVideoLossR = "无";
	}
	if (recvAudioLossR != 0 && (recvAudioLossR == undefined || recvAudioLossR == null || recvAudioLossR == "")) {
		recvAudioLossR = "无";
	}
	*/
	
	if(versioncaller==undefined||versioncaller==null||versioncaller===""){
		versioncaller = "无";
	}
	if(versioncalled==undefined||versioncalled==null||versioncalled===""){
		versioncalled = "无";
	}
	/*
	 * 对于 fec恢复后的视频流丢包率有两个地方可以取值，一个是call/total/streamSummary/recvFecLostR，另一个是call/stream/recv/v_after_fec_recover_loss_r
	   ，所以都要取出来，默认按第一个取值，如果第一个没有，再按第二个显示，都没有值时，显示无。
	*/
	var stream;
	var recv;
	var v_after_fec_recover_loss_r_caller;//主叫 fec恢复后的视频流丢包率
	var v_after_fec_recover_loss_r_called;//被叫 fec恢复后的视频流丢包率
	var v_after_r_caller;//主叫 fec恢复后的视频流丢包率
	var v_after_r_called;//被叫 fec恢复后的视频流丢包率
	//取主、被的音频丢包率/fec恢复前的视频丢包/fec恢复后的视频流丢包率/道路切换次数
	if(result===0){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			//取主的
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						streamSummary = total.streamSummary;
						if(streamSummary!=undefined&&streamSummary!=null&&streamSummary!==""){
							recvAudioLossRcaller = streamSummary.recvAudioLossR;
							recvVideoLossRcaller = streamSummary.recvVideoLossR;
							recvFecLossRcaller = streamSummary.recvFecLostR;
						}
						summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							countcaller = summary.count;
						}
					}
					
					stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = recv.split(' ');
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							// fec恢复后的视频流丢包率
							v_after_fec_recover_loss_r_caller = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率
						}
					}
					
				}
			}
			
			//------------------------------------
			//取被的
			called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						streamSummary = total.streamSummary;
						if(streamSummary!=undefined&&streamSummary!=null&&streamSummary!==""){
							recvAudioLossRcalled = streamSummary.recvAudioLossR;
							recvVideoLossRcalled = streamSummary.recvVideoLossR;
							recvFecLossRcalled = streamSummary.recvFecLostR;
						}
						summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							countcalled = summary.count;
						}
					}
					
					stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = recv.split(' ');
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							// fec恢复后的视频流丢包率
							v_after_fec_recover_loss_r_called = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率
						}
					}
				}
			}
			//------------------------------------
		}
	}
	
	//空值校验，主叫
	if(recvAudioLossRcaller==undefined||recvAudioLossRcaller==null||recvAudioLossRcaller===""){
		recvAudioLossRcaller = "无";
	}else{
		recvAudioLossRcaller = toFixed(recvAudioLossRcaller)+"%";
	}
	
	if(recvVideoLossRcaller == undefined||recvVideoLossRcaller==null||recvVideoLossRcaller===""){
		recvVideoLossRcaller = "无";
	}else{
		recvVideoLossRcaller = toFixed(recvVideoLossRcaller)+"%";
	}
	if(recvFecLossRcaller!=undefined&&recvFecLossRcaller!=null&&recvFecLossRcaller!==""){
		v_after_r_caller = toFixed(recvFecLossRcaller)+"%";
	}else if(v_after_fec_recover_loss_r_caller!=undefined&&v_after_fec_recover_loss_r_caller!=null&&v_after_fec_recover_loss_r_caller!==""){
		v_after_r_caller = toFixed(v_after_fec_recover_loss_r_caller)+"%";
	}else{
		v_after_r_caller = "无";
	}
	
	if(countcaller==undefined||countcaller==null||countcaller===""){
		countcaller = "无";
	}
	
	//空值校验，被叫
	if(recvAudioLossRcalled==undefined||recvAudioLossRcalled==null||recvAudioLossRcalled===""){
		recvAudioLossRcalled = "无";
	}else{
		recvAudioLossRcalled = toFixed(recvAudioLossRcalled)+"%";
	}
	
	if(recvVideoLossRcalled==undefined||recvVideoLossRcalled==null||recvVideoLossRcalled===""){
		recvVideoLossRcalled = "无";
	}else{
		recvVideoLossRcalled = toFixed(recvVideoLossRcalled)+"%";
	}
	
	if(recvFecLossRcalled!=undefined&&recvFecLossRcalled!=null&&recvFecLossRcalled!==""){
		v_after_r_called = toFixed(recvFecLossRcalled)+"%";
	}else if(v_after_fec_recover_loss_r_called!=undefined&&v_after_fec_recover_loss_r_called!=null&&v_after_fec_recover_loss_r_called!==""){
		v_after_r_called = toFixed(v_after_fec_recover_loss_r_called)+"%";
	}else{
		v_after_r_called = "无";
	}
	
	if(countcalled==undefined||countcalled==null||countcalled===""){
		countcalled = "无";
	}
	
	var html = "<span class='summaryStyle'>会话ID：</span>" + sids
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>主叫端：</span>" + callerid
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>被叫端：</span>" + calledid 
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>开始时间：</span>" + starttime
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>通话时长：</span>" + duration+ "<br/>";
			
			/*
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>道路切换：</span>" + count
			+ "次&nbsp;&nbsp;&nbsp;&nbsp;"				
			+ "<span class='summaryStyle'>fec恢复前的视频丢包率：</span>" + recvVideoLossR
			+ "%&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<span class='summaryStyle'>音频丢包率：</span>" + recvAudioLossR + "%<br/>"
			*/
			
	html += "主叫收包："+
			"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_caller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>道路切换次数：</span>"+countcaller+"<br/>"+
			"被叫收包："+
			"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_called+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>道路切换次数：</span>"+countcalled+"<br/>";
			
	html+= "<span class='summaryStyle'>主叫版本：</span>" + versioncaller+"<br/>"
			+ "<span class='summaryStyle'>被叫版本：</span>" + versioncalled;
	$('#callerreport_00').html(html);
}

/**
 * 1 重要用户信息
 */
function setView01(datas){
	var html="";
    html += "<table class=\"detailTable\">" +
	"<tr><td colspan=\"10\"><b>重要用户信息</b></td></tr>" +
	"<tr align=\"center\">" +
		"<td>呼叫类型</td>" +
		"<td>IP</td>" +
		"<td>网络类型</td>" +
		"<td>系统类型</td>" +
		"<td>上行带宽</td>" +
		"<td>下行带宽</td>" +
		"<td>用户类型</td>" +
		"<td>设备类型</td>" +
		"<td>地域</td>" +
		"<td>运营商</td>" +
	"</tr>" ;
	var data;
	var caller;
	var called;
	var getpath;
	//源用户信息
	var src_user_info ;
	
	//目的用户信息
	var dest_user_info ;
	//请求ID
	var req_id ;
	var result = datas.result;
	if(result===0){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				//先按主的取，如果主的不存在，再按被的取，如果都不存在，显示空
				getpath = caller.getpath;
					
				if(getpath!=undefined&&getpath!=null&&getpath!==""){
					//源用户信息
					src_user_info = getpath.src_user_info;
					//目的用户信息
					dest_user_info = getpath.dest_user_info;
					//请求ID
					req_id = getpath.req_id;
				}else{
					called = data.called;
					if(called!=undefined&&called!=null&&called!==""){
						getpath = called.getpath;
						if(getpath!=undefined&&getpath!=null&&getpath!==""){
							//源用户信息
							src_user_info = getpath.dest_user_info;
							//目的用户信息
							dest_user_info = getpath.src_user_info;
							//请求ID
							req_id = getpath.req_id;
						}
					}else{
						html += "<tr><td colspan='10' align='center'>未获取信息</td></tr>";
					}
				}
			}else{
				called = data.called;
				if(called!=undefined&&called!=null&&called!==""){
					getpath = called.getpath;
					if(getpath!=undefined&&getpath!=null&&getpath!==""){
						//源用户信息
						src_user_info = getpath.dest_user_info;
						//目的用户信息
						dest_user_info = getpath.src_user_info;
						//请求ID
						req_id = getpath.req_id;
					}
				}else{
					html += "<tr><td colspan='10' align='center'>未获取信息</td></tr>";
				}
			}
		}else{
			html += "<tr><td colspan='10' align='center'>未获取信息</td></tr>";
		}
	}else{
		html += "<tr><td colspan='10' align='center'>未获取信息</td></tr>";
	}
			
	/*
	 * 源
	 */
	//用户ID
	var src_user_id ;
	
	//用户IP
	var src_udp_ip ;
	
	//端口，此值虽然取了，但不用显示，因为通话详情里的nat打洞后的端口可能和这个不同，会引起误解
	var src_udp_port ;
	
	//上行带宽
	var src_out_bound ;
	
	//下行带宽
	var src_in_bound ;
	
	//运营商索引
	var src_isp_index ;
	
	//用户类型
	var src_user_type ;
	
	//设备类型
	var src_device_type ;
	
	//系统类型
	var src_os ;
	
	//运营商
	var src_isp ;
	//地域
	var src_domain ;
	//地域索引
	var src_domain_index ;
	//网络类型
	var src_net_type ;
	
				
	if(src_user_info!=undefined&&src_user_info!=null&&src_user_info!==""){
		/*
		 * 源
		 */
		//用户ID
		src_user_id = src_user_info.user_id;
		
		//用户IP
		src_udp_ip = src_user_info.udp_ip;
		
		//端口，此值虽然取了，但不用显示，因为通话详情里的nat打洞后的端口可能和这个不同，会引起误解
		src_udp_port = src_user_info.udp_port;
		
		//上行带宽
		src_out_bound = src_user_info.outbound_band;
		
		//下行带宽
		src_in_bound = src_user_info.inbound_band;
		
		//运营商索引
		src_isp_index = src_user_info.isp_index;
		
		//用户类型
		src_user_type = src_user_info.user_type;
		
		//设备类型
		src_device_type = src_user_info.device_type;
		
		//系统类型
		src_os = src_user_info.os;
		
		//运营商
		src_isp = src_user_info.isp;
		//地域
		src_domain = src_user_info.domain;
		//地域索引
		src_domain_index = src_user_info.domain_index;
		//网络类型
		src_net_type = src_user_info.net_type;
		
	}
	//主叫空值校验
	if(src_user_id==undefined||src_user_id==null||src_user_id===""){
		src_user_id = "无";
	}
	if(src_udp_ip==undefined||src_udp_ip==null||src_udp_ip===""){
		src_udp_ip = "无";
	}
	if(dest_out_bound==undefined||dest_out_bound==null||dest_out_bound===""){
		dest_out_bound = "无";
	}
	if(dest_in_bound==undefined||dest_in_bound==null||dest_in_bound===""){
		dest_in_bound = "无";
	}
	if(src_out_bound==undefined||src_out_bound==null||src_out_bound===""){
		src_out_bound = "无";
	}
	if(src_in_bound==undefined||src_in_bound==null||src_in_bound===""){
		src_in_bound = "无";
	}
	if(src_isp_index==undefined||src_isp_index==null||src_isp_index===""){
		src_isp_index = "无";
	}
	if(src_user_type==undefined||src_user_type==null||src_user_type===""){
		src_user_type = "无";
	}
	if(src_device_type==undefined||src_device_type==null||src_device_type===""){
		src_device_type = "无";
	}
	if(src_os==undefined||src_os==null||src_os===""){
		src_os = "无";
	}
	if(src_isp==undefined||src_isp==null||src_isp===""){
		src_isp = "无";
	}
	if(src_domain==undefined||src_domain==null||src_domain===""){
		src_domain = "无";
	}
	if(src_domain_index==undefined||src_domain_index==null||src_domain_index===""){
		src_domain_index = "无";
	}
	if(src_net_type==undefined||src_net_type==null||src_net_type===""){
		src_net_type = "无";
	}
	
	/*
	 * 目的
	 */
	//用户ID
	var dest_user_id ;
	
	//用户IP
	var dest_udp_ip ;
	
	//端口，此值虽然取了，但不用显示，因为通话详情里的nat打洞后的端口可能和这个不同，会引起误解
	var dest_udp_port ;
	
	//上行带宽
	var dest_out_bound ;
	
	//下行带宽
	var dest_in_bound ;
	
	//运营商索引
	var dest_isp_index ;
	
	//用户类型
	var dest_user_type ;
	
	//设备类型
	var dest_device_type ;
	
	//系统类型
	var dest_os ;
	
	//运营商
	var dest_isp ;
	//地域
	var dest_domain ;
	//地域索引
	var dest_domain_index ;
	//网络类型
	var dest_net_type ;
	
	if(dest_user_info!=undefined&&dest_user_info!=null&&dest_user_info!==""){
		/*
		 * 目的
		 */
		//用户ID
		dest_user_id = dest_user_info.user_id;
		
		//用户IP
		dest_udp_ip = dest_user_info.udp_ip;
		
		//端口，此值虽然取了，但不用显示，因为通话详情里的nat打洞后的端口可能和这个不同，会引起误解
		dest_udp_port = dest_user_info.udp_port;
		
		//上行带宽
		dest_out_bound = dest_user_info.outbound_band;
		
		//下行带宽
		dest_in_bound = dest_user_info.inbound_band;
		
		//运营商索引
		dest_isp_index = dest_user_info.isp_index;
		
		//用户类型
		dest_user_type = dest_user_info.user_type;
		
		//设备类型
		dest_device_type = dest_user_info.device_type;
		
		//系统类型
		dest_os = dest_user_info.os;
		
		//运营商
		dest_isp = dest_user_info.isp;
		//地域
		dest_domain = dest_user_info.domain;
		//地域索引
		dest_domain_index = dest_user_info.domain_index;
		//网络类型
		dest_net_type = dest_user_info.net_type;
		
	}
	//被叫空值校验
	if(dest_user_id==undefined||dest_user_id==null||dest_user_id===""){
		dest_user_id = "无";
	}
	if(dest_udp_ip==undefined||dest_udp_ip==null||dest_udp_ip===""){
		dest_udp_ip = "无";
	}
	if(dest_udp_port==undefined||dest_udp_port==null||dest_udp_port===""){
		dest_udp_port = "无";
	}
	if(dest_out_bound==undefined||dest_out_bound==null||dest_out_bound===""){
		dest_out_bound = "无";
	}
	if(dest_in_bound==undefined||dest_in_bound==null||dest_in_bound===""){
		dest_in_bound = "无";
	}
	if(dest_isp_index==undefined||dest_isp_index==null||dest_isp_index===""){
		dest_isp_index = "无";
	}
	if(dest_user_type==undefined||dest_user_type==null||dest_user_type===""){
		dest_user_type = "无";
	}
	if(dest_device_type==undefined||dest_device_type==null||dest_device_type===""){
		dest_device_type = "无";
	}
	if(dest_os==undefined||dest_os==null||dest_os===""){
		dest_os = "无";
	}
	if(dest_isp==undefined||dest_isp==null||dest_isp===""){
		dest_isp = "无";
	}
	if(dest_domain==undefined||dest_domain==null||dest_domain===""){
		dest_domain = "无";
	}
	if(dest_domain_index==undefined||dest_domain_index==null||dest_domain_index===""){
		dest_domain_index = "无";
	}
	if(dest_net_type==undefined||dest_net_type==null||dest_net_type===""){
		dest_net_type = "无";
	}
		
	//主叫，从数据字典里取出与索引码对应的中文描述
	var net_type_map_src_net_type = net_type_map.get(src_net_type);
	var os_map_src_os = os_map.get(src_os);
	var user_type_map_src_user_type = user_type_map.get(src_user_type);
	var device_type_map_src_device_type = device_type_map.get(src_device_type);
	var domain_map_src_domain = domain_map.get(src_domain);
	var domain_map_src_domain_index = domain_map.get(src_domain_index);
	var isp_map_src_isp = isp_map.get(src_isp);
	var isp_map_src_isp_index = isp_map.get(src_isp_index);
	
	if(net_type_map_src_net_type==undefined||net_type_map_src_net_type==null||net_type_map_src_net_type===""){
		net_type_map_src_net_type = "无";
	}
	if(os_map_src_os==undefined||os_map_src_os==null||os_map_src_os===""){
		os_map_src_os = "无";
	}
	if(user_type_map_src_user_type==undefined||user_type_map_src_user_type==null||user_type_map_src_user_type===""){
		user_type_map_src_user_type = "无";
	}
	if(device_type_map_src_device_type==undefined||device_type_map_src_device_type==null||device_type_map_src_device_type===""){
		device_type_map_src_device_type = "无";
	}
	if(domain_map_src_domain==undefined||domain_map_src_domain==null||domain_map_src_domain===""){
		domain_map_src_domain = "无";
	}
	if(domain_map_src_domain_index==undefined||domain_map_src_domain_index==null||domain_map_src_domain_index===""){
		domain_map_src_domain_index = "无";
	}
	if(isp_map_src_isp==undefined||isp_map_src_isp==null||isp_map_src_isp===""){
		isp_map_src_isp = "无";
	}
	if(isp_map_src_isp_index==undefined||isp_map_src_isp_index==null||isp_map_src_isp_index===""){
		isp_map_src_isp_index = "无";
	}
	
	//被叫，从数据字典里取出与索引码对应的中文描述
	var net_type_map_dest_net_type = net_type_map.get(dest_net_type);
	var os_map_dest_os = os_map.get(dest_os);
	var user_type_map_dest_user_type = user_type_map.get(dest_user_type);
	var device_type_map_dest_device_type = device_type_map.get(dest_device_type);
	var domain_map_dest_domain = domain_map.get(dest_domain);
	var domain_map_dest_domain_index = domain_map.get(dest_domain_index);
	var isp_map_dest_isp = isp_map.get(dest_isp);
	var isp_map_dest_isp_index = isp_map.get(dest_isp_index);
	
	if(net_type_map_dest_net_type==undefined||net_type_map_dest_net_type==null||net_type_map_dest_net_type===""){
		net_type_map_dest_net_type = "无";
	}
	if(os_map_dest_os==undefined||os_map_dest_os==null||os_map_dest_os===""){
		os_map_dest_os = "无";
	}
	if(user_type_map_dest_user_type==undefined||user_type_map_dest_user_type==null||user_type_map_dest_user_type===""){
		user_type_map_dest_user_type = "无";
	}
	if(device_type_map_dest_device_type==undefined||device_type_map_dest_device_type==null||device_type_map_dest_device_type===""){
		device_type_map_dest_device_type = "无";
	}
	if(domain_map_dest_domain==undefined||domain_map_dest_domain==null||domain_map_dest_domain===""){
		domain_map_dest_domain = "无";
	}
	if(domain_map_dest_domain_index==undefined||domain_map_dest_domain_index==null||domain_map_dest_domain_index===""){
		domain_map_dest_domain_index = "无";
	}
	if(isp_map_dest_isp==undefined||isp_map_dest_isp==null||isp_map_dest_isp===""){
		isp_map_dest_isp = "无";
	}
	if(isp_map_dest_isp_index==undefined||isp_map_dest_isp_index==null||isp_map_dest_isp_index===""){
		isp_map_dest_isp_index = "无";
	}

	html += "<tr>" +
			 	"<td>主叫[";
				if(req_id!=undefined&&req_id!=null&&req_id!==""){
					if(req_id.split('_').length>0){
						html += req_id.split('_')[2];
					}else{
						html += "无";
					}
				}else{
					html += "无";
				}
			html += "]</td>" +
				"<td>"+src_udp_ip+"</td>" +
				"<td>"+net_type_map_src_net_type+"["+src_net_type+"]</td>" +
				"<td>"+os_map_src_os+"["+src_os+"]</td>" +
				"<td>"+src_out_bound+"</td>" +
				"<td>"+src_in_bound+"</td>" +
				"<td>"+user_type_map_src_user_type+"["+src_user_type+"]</td>" +
				"<td>"+device_type_map_src_device_type+"["+src_device_type+"]</td>" ;
	if(domain_map_src_domain!="无"){
		  html+="<td>"+domain_map_src_domain+"["+src_domain+"]</td>" ;
	}else if(domain_map_src_domain_index!="无"){
		  html+="<td>"+domain_map_src_domain_index+"["+src_domain_index+"]</td>" ;
	}else{
		  html+="<td>"+src_domain+"</td>";
	}
	if(isp_map_src_isp!="无"){
		  html+="<td>"+isp_map_src_isp+"["+src_isp+"]</td>" ;
	}else if(isp_map_src_isp_index!="无"){
		  html+="<td>"+isp_map_src_isp_index+"["+src_isp_index+"]</td>" ;
	}else{
		  html+="<td>"+src_isp+"</td>";
	}
		
	html += "</tr>" +
			"<tr>" +
				"<td>被叫[";
				if(req_id!=undefined&&req_id!=null&&req_id!==""){
					if(req_id.split('_').length>0){
						html += req_id.split('_')[3];
					}else{
						html += "无";
					}
				}else{
					html += "无";
				}
				html += "]</td>" +
				"<td>"+dest_udp_ip+"</td>" +
				"<td>"+net_type_map_dest_net_type+"["+dest_net_type+"]</td>" +
				"<td>"+os_map_dest_os+"["+dest_os+"]</td>" +
				"<td>"+dest_out_bound+"</td>" +
				"<td>"+dest_in_bound+"</td>" +
				"<td>"+user_type_map_dest_user_type+"["+dest_user_type+"]</td>" +
				"<td>"+device_type_map_dest_device_type+"["+dest_device_type+"]</td>" ;
	if(domain_map_dest_domain!="无"){
		  html+="<td>"+domain_map_dest_domain+"["+dest_domain+"]</td>" ;
	}else if(domain_map_dest_domain_index!="无"){
		  html+="<td>"+domain_map_dest_domain_index+"["+dest_domain_index+"]</td>" ;
	}else{
		  html+="<td>"+dest_domain+"</td>";
	}
	if(isp_map_dest_isp!="无"){
		  html+="<td>"+isp_map_dest_isp+"["+dest_isp+"]</td>" ;
	}else if(isp_map_dest_isp_index!="无"){
		  html+="<td>"+isp_map_dest_isp_index+"["+dest_isp_index+"]</td>" ;
	}else{
		  html+="<td>"+dest_isp+"</td>";
	}
	html+="</tr>" +
	"</table>";
	$('#callerreport_01').html(html);
}

/**
 * 2 端到端流质量　00创建表格
 */
function createTable0200(){
	var html = "<table class='detailTable'>" +
			"<tr>" +
				"<td colspan='4'><b>端到端流质量</b></td>" +
			"</tr>" +
			"<tr>" +
				"<td colspan='2' id='row1_1'></td>" +
				"<td colspan='2' id='row1_2'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>参数类型</td>" +
				"<td>值</td>" +
				"<td>参数类型</td>" +
				"<td>值</td>" +
			"</tr>" +
			"<tr>" +
				"<td>音频丢包率</td>" +
				"<td id='row3_2'></td>" +
				"<td>音频丢包率</td>" +
				"<td id='row3_4'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>音频延时</td>" +
				"<td id='row4_2'></td>" +
				"<td>音频延时</td>" +
				"<td id='row4_4'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>视频FEC纠错率</td>" +
				"<td id='row5_2'></td>" +
				"<td>视频FEC纠错率</td>" +
				"<td id='row5_4'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>视频双路纠错比例</td>" +
				"<td id='row6_2'></td>" +
				"<td>视频双路纠错比例</td>" +
				"<td id='row6_4'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>视频丢包率</td>" +
				"<td id='row7_2'></td>" +
				"<td>视频丢包率</td>" +
				"<td id='row7_4'></td>" +
			"</tr>" +
			"<tr>" +
				"<td>视频延时</td>" +
				"<td id='row8_2'></td>" +
				"<td>视频延时</td>" +
				"<td id='row8_4'></td>" +
			"</tr>" +
		"</table>";
		$('#callerreport_02').html(html);
}

/**
 * 2 端到端流质量　01主被
 */
function setView0201(datas,reportorId){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var recvStream = data.recvStream;
			if(recvStream!=undefined&&recvStream!=null&&recvStream!==""){
				var recvStreamArr = recvStream.split(' ');
				var map = new Map();
				$.each(recvStreamArr,function(i,val){
					map.put(val.split('=')[0],val.split('=')[1]);
				});
				var a_recv = map.get('a_recv');//音频收包
				var a_loss = map.get('a_loss');//音频丢包
				
				var v_recv = map.get('v_recv');//视频收包
				var v_loss = map.get('v_loss');//视频丢包
				
				var vf_recv = map.get('vf_recv');
				var vf_loss = map.get('vf_loss');
				
				//var vfecd = map.get('vfecd');//fec纠错率			
				
				if(reportorId!=undefined&&reportorId!=null&&reportorId!==""){
					$('#row1_1').html('主叫方['+reportorId+']接收流信息统计');
				}
				if(a_loss!=undefined&&a_loss!=null&&a_loss!==""&&a_recv!=undefined&&a_recv!=null&&a_recv!==""){
					$('#row3_2').html(rate(a_loss,parseInt(a_loss)+parseInt(a_recv)));
				}
				$('#row4_2').html('*无数据*');
				if(vf_loss!=undefined&&vf_loss!=null&&vf_loss!==""&&vf_recv!=undefined&&vf_recv!=null&&vf_recv!==""){
					$('#row5_2').html(rate(vf_loss,parseInt(vf_loss)+parseInt(vf_recv)));
				}
				/*$('#row5_2').html(rate(map.get('vfecd'),(map.get('vfecd')+map.get('v_loss'))));*/
				$('#row6_2').html('*无数据*');
				if(v_loss!=undefined&&v_loss!=null&&v_loss!==""&&v_recv!=undefined&&v_recv!=null&&v_recv!==""){
					$('#row7_2').html(rate(v_loss,parseInt(v_loss)+parseInt(v_recv)));
				}
				$('#row8_2').html('*无数据*');
			}else{
				$('#row3_2').html('无');
				$('#row4_2').html('无');
				$('#row5_2').html('无');
				$('#row6_2').html('*无数据*');
				$('#row7_2').html('无');
				$('#row8_2').html('无');
			}
		}
	}
}
/**
 * 2 端到端流质量　02被主
 */
function setView0202(datas,reportorId){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var recvStream = data.recvStream;
			if(recvStream!=undefined&&recvStream!=null&&recvStream!==""){
				var recvStreamArr = recvStream.split(' ');
				var map = new Map();
				$.each(recvStreamArr,function(i,val){
					map.put(val.split('=')[0],val.split('=')[1]);
				});
				var a_recv = map.get('a_recv');//音频收包
				var a_loss = map.get('a_loss');//音频丢包
				
				var v_recv = map.get('v_recv');//视频收包
				var v_loss = map.get('v_loss');//视频丢包
				
				var vf_recv = map.get('vf_recv');
				var vf_loss = map.get('vf_loss');
				//var vfecd = map.get('vfecd');//fec纠错率	
				if(reportorId!=undefined&&reportorId!=null&&reportorId!==""){
					$('#row1_2').html('被叫方['+reportorId+']接收流信息统计');
				}
				if(a_loss!=undefined&&a_loss!=null&&a_loss!==""&&a_recv!=undefined&&a_recv!=null&&a_recv!==""){
					$('#row3_4').html(rate(a_loss,parseInt(a_loss)+parseInt(a_recv)));
				}
				$('#row4_4').html('*无数据*');
				if(vf_loss!=undefined&&vf_loss!=null&&vf_loss!==""&&vf_recv!=undefined&&vf_recv!=null&&vf_recv!==""){
					$('#row5_4').html(rate(vf_loss,parseInt(vf_loss)+parseInt(vf_recv)));
				}
				$('#row6_4').html('*无数据*');
				if(v_loss!=undefined&&v_loss!=null&&v_loss!==""&&v_recv!=undefined&&v_recv!=null&&v_recv!==""){
					$('#row7_4').html(rate(v_loss,parseInt(v_loss)+parseInt(v_recv)));
				}
				$('#row8_4').html('*无数据*');
			}else{
				$('#row3_4').html('无');
				$('#row4_4').html('无');
				$('#row5_4').html('无');
				$('#row6_4').html('*无数据*');
				$('#row7_4').html('无');
				$('#row8_4').html('无');
			}
		
		}
	}
	
	
}
/**
 * 3 对照发包信息 00[创建表格]
 */
function createTable0300(){
	var html = "";
	html += "<table class=\"detailTable\">" +
				"<tr>" +
					"<td colspan=\"3\" id='reportorIdCalled'></td>" +
					"<td colspan=\"3\" id='reportorIdCaller'></td>" +
				"</tr>" +
				"<tr align='center'>" +
					"<td>参数类型</td>" +
					"<td>值</td>" +
					"<td>相关参数</td>" +
					"<td>参数类型</td>" +
					"<td>值</td>" +
					"<td>相关参数</td>" +
				"</tr>" +
				"<tr>" +
					"<td>发包带宽</td>" +
					"<td id='col2_01'></td>" +
					"<td id='col3_01'></td>" +
					"<td>发包带宽</td>" +
					"<td id='col5_01'></td>" +
					"<td id='col6_01'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>呼叫发包总数</td>" +
					"<td id='col2_02'></td>" +
					"<td id='col3_02'></td>" +
					"<td>呼叫发包总数</td>" +
					"<td id='col5_02'></td>" +
					"<td id='col6_02'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>呼叫发包总字节数</td>" +
					"<td id='col2_03'></td>" +
					"<td id='col3_03'></td>" +
					"<td>呼叫发包总字节数</td>" +
					"<td id='col5_03'></td>" +
					"<td id='col6_03'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>音频发包总数</td>" +
					"<td id='col2_04'></td>" +
					"<td rowspan=\"2\" id='col3_04'></td>" +
					"<td>音频发包总数</td>" +
					"<td id='col5_04'></td>" +
					"<td rowspan=\"2\" id='col6_04'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>音频发包总字节数</td>" +
					"<td id='col2_05'></td>" +
					"<td>音频发包总字节数</td>" +
					"<td id='col5_05'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>视频发包总数</td>" +
					"<td id='col2_06'></td>" +
					"<td rowspan=\"2\" id='col3_06'></td>" +
					"<td>视频发包总数</td>" +
					"<td id='col5_06'></td>" +
					"<td rowspan=\"2\" id='col6_06'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>视频发包总字节数</td>" +
					"<td id='col2_07'></td>" +
					"<td>视频发包总字节数</td>" +
					"<td id='col5_07'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>FEC发包总数</td>" +
					"<td id='col2_08'></td>" +
					"<td rowspan=\"2\" id='col3_08'></td>" +
					"<td>FEC发包总数</td>" +
					"<td id='col5_08'></td>" +
					"<td rowspan=\"2\" id='col6_08'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>FEC发包字节数</td>" +
					"<td id='col2_09'></td>" +
					"<td>FEC发包字节数</td>" +
					"<td id='col5_09'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>失败的包个数</td>" +
					"<td id='col2_10'></td>" +
					"<td id='col3_10'></td>" +
					"<td>失败的包个数</td>" +
					"<td id='col5_10'></td>" +
					"<td id='col6_10'></td>" +
				"</tr>" +
			"</table>";
	$("#callerreport_03").html(html);
}

/**
 * 3 对照发包信息 01[被叫参数类型]
 */
function setView0301(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							// 被叫端
							var called = summary.called;
							if (called == undefined || called == null || called === "") {
								called = "无";
							}
							
							var stream = call.stream;
							if(stream!=undefined&&stream!=null&&stream!==""){
								var max ;//最大带宽
								var avg ;//平均带宽
								var min ;//最小带宽
								//发包带宽(SBW)
								var bw = stream.bw;
								if(bw!=undefined&&bw!=null&&bw!==""){
									var bwArr = bw.split(' ');
									var mapbw = new Map();
									$.each(bwArr,function(i,val){
										mapbw.put(val.split('=')[0],val.split('=')[1]);
									});
									
									max = mapbw.get('max');//最大带宽
									avg = mapbw.get('avg');//平均带宽
									min = mapbw.get('min');//最小带宽
								}
								//空值校验
								if(max==undefined||max==null||max===""){
									max = "未提供数据";
								}
								if(avg==undefined||avg==null||avg===""){
									avg = "未提供数据";
								}
								if(min==undefined||min==null||min===""){
									min = "未提供数据";
								}
								
								var a_send ;//音频发包数(a_send)
								var a_send_byte ;//音频发包量(a_byte)
								var v_send ;//视频发包数(v_send)
								var v_send_byte ;//视频发包量(v_byte)
							
								var vf_send ;//FEC发包数(vf_send)
								var vf_send_byte;//FEC发包量(vf_byte)
							
								var send ;//总发包数(send)
								var send_byte ;//总发包量(byte)	
								var sendto_failure ;//(sendto_failure)
								
								//发包统计(CSS)	
								var send = stream.send;
								if(send!=undefined&&send!=null&&send!==""){
									var sendArr = send.split(' ');
									var mapsend = new Map();
									$.each(sendArr,function(i,val){
										mapsend.put(val.split('=')[0],val.split('=')[1]);
									});
									
									a_send = mapsend.get('a_send');//音频发包数(a_send)
									a_send_byte = mapsend.get('a_send_byte');//音频发包量(a_byte)
									v_send = mapsend.get('v_send');//视频发包数(v_send)
									v_send_byte = mapsend.get('v_send_byte');//视频发包量(v_byte)
								
									vf_send = mapsend.get('vf_send');//FEC发包数(vf_send)
									vf_send_byte = mapsend.get('vf_send_byte');//FEC发包量(vf_byte)
								
									send = mapsend.get('send');//总发包数(send)
									send_byte = mapsend.get('send_byte');//总发包量(byte)	
									sendto_failure = mapsend.get('sendto_failure');//(sendto_failure)
								}
								//空值校验	
								if(a_send==undefined||a_send==null||a_send===""){
									a_send = "未提供数据";
								}
								if(a_send_byte==undefined||a_send_byte==null||a_send_byte===""){
									a_send_byte = "未提供数据";
								}
								if(v_send==undefined||v_send==null||v_send===""){
									v_send = "未提供数据";
								}
								if(v_send_byte==undefined||v_send_byte==null||v_send_byte===""){
									v_send_byte = "未提供数据";
								}
								if(vf_send==undefined||vf_send==null||vf_send===""){
									vf_send = "未提供数据";
								}
								if(vf_send_byte==undefined||vf_send_byte==null||vf_send_byte===""){
									vf_send_byte = "未提供数据";
								}
								if(send==undefined||send==null||send===""){
									send = "未提供数据";
								}
								if(send_byte==undefined||send_byte==null||send_byte===""){
									send_byte = "未提供数据";
								}
								if(sendto_failure==undefined||sendto_failure==null||sendto_failure===""){
									sendto_failure = "未提供数据";
								}
								
								$('#reportorIdCalled').html("被叫方["+called+"]发送信息统计");
								$('#col2_01').html("Min："+min+"<br/>Avg："+avg+"<br/>Max："+max);
								$('#col2_02').html(send);
								$('#col2_03').html(send_byte);
								$('#col2_04').html(a_send);
								$('#col2_05').html(a_send_byte);
								$('#col2_06').html(v_send);
								$('#col2_07').html(v_send_byte);
								$('#col2_08').html(vf_send);
								$('#col2_09').html(vf_send_byte);
								$('#col2_10').html(sendto_failure);
							}else{
								$('#reportorIdCalled').html("未提供数据");
								$('#col2_01').html("未提供数据");
								$('#col2_02').html("未提供数据");
								$('#col2_03').html("未提供数据");
								$('#col2_04').html("未提供数据");
								$('#col2_05').html("未提供数据");
								$('#col2_06').html("未提供数据");
								$('#col2_07').html("未提供数据");
								$('#col2_08').html("未提供数据");
								$('#col2_09').html("未提供数据");
								$('#col2_10').html("未提供数据");
							}
						}else{
							$('#reportorIdCalled').html("未提供数据");
							$('#col2_01').html("未提供数据");
							$('#col2_02').html("未提供数据");
							$('#col2_03').html("未提供数据");
							$('#col2_04').html("未提供数据");
							$('#col2_05').html("未提供数据");
							$('#col2_06').html("未提供数据");
							$('#col2_07').html("未提供数据");
							$('#col2_08').html("未提供数据");
							$('#col2_09').html("未提供数据");
							$('#col2_10').html("未提供数据");
						}
					}else{
						$('#reportorIdCalled').html("未提供数据");
						$('#col2_01').html("未提供数据");
						$('#col2_02').html("未提供数据");
						$('#col2_03').html("未提供数据");
						$('#col2_04').html("未提供数据");
						$('#col2_05').html("未提供数据");
						$('#col2_06').html("未提供数据");
						$('#col2_07').html("未提供数据");
						$('#col2_08').html("未提供数据");
						$('#col2_09').html("未提供数据");
						$('#col2_10').html("未提供数据");
					}
				}else{
					$('#reportorIdCalled').html("未提供数据");
					$('#col2_01').html("未提供数据");
					$('#col2_02').html("未提供数据");
					$('#col2_03').html("未提供数据");
					$('#col2_04').html("未提供数据");
					$('#col2_05').html("未提供数据");
					$('#col2_06').html("未提供数据");
					$('#col2_07').html("未提供数据");
					$('#col2_08').html("未提供数据");
					$('#col2_09').html("未提供数据");
					$('#col2_10').html("未提供数据");
				}
			}else{
				$('#reportorIdCalled').html("未提供数据");
				$('#col2_01').html("未提供数据");
				$('#col2_02').html("未提供数据");
				$('#col2_03').html("未提供数据");
				$('#col2_04').html("未提供数据");
				$('#col2_05').html("未提供数据");
				$('#col2_06').html("未提供数据");
				$('#col2_07').html("未提供数据");
				$('#col2_08').html("未提供数据");
				$('#col2_09').html("未提供数据");
				$('#col2_10').html("未提供数据");
			}
		}else{
			$('#reportorIdCalled').html("未提供数据");
			$('#col2_01').html("未提供数据");
			$('#col2_02').html("未提供数据");
			$('#col2_03').html("未提供数据");
			$('#col2_04').html("未提供数据");
			$('#col2_05').html("未提供数据");
			$('#col2_06').html("未提供数据");
			$('#col2_07').html("未提供数据");
			$('#col2_08').html("未提供数据");
			$('#col2_09').html("未提供数据");
			$('#col2_10').html("未提供数据");
		}
	}else{
		$('#reportorIdCalled').html("未提供数据");
		$('#col2_01').html("未提供数据");
		$('#col2_02').html("未提供数据");
		$('#col2_03').html("未提供数据");
		$('#col2_04').html("未提供数据");
		$('#col2_05').html("未提供数据");
		$('#col2_06').html("未提供数据");
		$('#col2_07').html("未提供数据");
		$('#col2_08').html("未提供数据");
		$('#col2_09').html("未提供数据");
		$('#col2_10').html("未提供数据");
	}
}

/**
 * 3 对照发包信息 02[被叫相关参数]
 */
function setView0302(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var param = call.param;
					if(param!=undefined&&param!=null&&param!==""){
						var paramArrCalled = param.split(' ');
						var map = new Map();
						for(var i=0;i<paramArrCalled.length;i++){
							map.put(paramArrCalled[i].split('=')[0],paramArrCalled[i].split('=')[1]);
						}
						$('#col3_01').html("上行历史最大可用带宽："+map.get('maxbw')+"<br/>当前上行可用带宽："+map.get('curbw'));
						$('#col3_04').html("音频包2合1开关："+map.get('2in1')+"<br/>音频编码格式："+map.get('acodec'));
						$('#col3_06').html("视频分辨率："+map.get('vformat')+"<br/>目标码率(Kbit/s)："+map.get('targetbps')+"<br/>限流码率(Kbit/s)："+map.get('limbps')+"<br/>视频帧率(帧/s)："+map.get('fps'));
						$('#col3_08').html("视频fec比率："+map.get('vfecratio')+"<br/>视频fec开关： "+map.get('vfec')+"<br/>I帧fec开关："+map.get('ifec'));
					}else{
						$('#col3_01').html("未提供数据");
						$('#col3_04').html("未提供数据");
						$('#col3_06').html("未提供数据");
						$('#col3_08').html("未提供数据");
					}
				}else{
					$('#col3_01').html("未提供数据");
					$('#col3_04').html("未提供数据");
					$('#col3_06').html("未提供数据");
					$('#col3_08').html("未提供数据");
				}
			}else{
				$('#col3_01').html("未提供数据");
				$('#col3_04').html("未提供数据");
				$('#col3_06').html("未提供数据");
				$('#col3_08').html("未提供数据");
			}
		}else{
			$('#col3_01').html("未提供数据");
			$('#col3_04').html("未提供数据");
			$('#col3_06').html("未提供数据");
			$('#col3_08').html("未提供数据");
		}
	}else{
		$('#col3_01').html("未提供数据");
		$('#col3_04').html("未提供数据");
		$('#col3_06').html("未提供数据");
		$('#col3_08').html("未提供数据");
	}
}

/**
 * 3 对照发包信息 03[主叫参数类型]
 */
function setView0303(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							// 主叫端
							var caller = summary.caller;
							if (caller == undefined || caller == null || caller === "") {
								caller = "无";
							}
							
							var stream = call.stream;
							
							var max ;//最大带宽
							var avg ;//平均带宽
							var min ;//最小带宽
							
							//发包带宽(SBW)
							var bw = stream.bw;
							if(bw!=undefined&&bw!=null&&bw!==""){
								var bwArr = bw.split(' ');
								var mapbw = new Map();
								$.each(bwArr,function(i,val){
									mapbw.put(val.split('=')[0],val.split('=')[1]);
								});
								
								max = mapbw.get('max');//最大带宽
								avg = mapbw.get('avg');//平均带宽
								min = mapbw.get('min');//最小带宽
							}
							//空值校验
							if(max==undefined||max==null||max===""){
								max = "未提供数据";
							}
							if(avg==undefined||avg==null||avg===""){
								avg = "未提供数据";
							}
							if(min==undefined||min==null||min===""){
								min = "未提供数据";
							}
							var a_send ;//音频发包数(a_send)
							var a_send_byte ;//音频发包量(a_byte)
							var v_send ;//视频发包数(v_send)
							var v_send_byte ;//视频发包量(v_byte)
						
							var vf_send ;//FEC发包数(vf_send)
							var vf_send_byte ;//FEC发包量(vf_byte)
						
							var send ;//总发包数(send)
							var send_byte ;//总发包量(byte)	
							var sendto_failure ;//(sendto_failure)
							
							//发包统计(CSS)	
							var send = stream.send;
							if(send!=undefined&&send!=null&&send!==""){
								var sendArr = send.split(' ');
								var mapsend = new Map();
								$.each(sendArr,function(i,val){
									mapsend.put(val.split('=')[0],val.split('=')[1]);
								});
								
								a_send = mapsend.get('a_send');//音频发包数(a_send)
								a_send_byte = mapsend.get('a_send_byte');//音频发包量(a_byte)
								v_send = mapsend.get('v_send');//视频发包数(v_send)
								v_send_byte = mapsend.get('v_send_byte');//视频发包量(v_byte)
							
								vf_send = mapsend.get('vf_send');//FEC发包数(vf_send)
								vf_send_byte = mapsend.get('vf_send_byte');//FEC发包量(vf_byte)
							
								send = mapsend.get('send');//总发包数(send)
								send_byte = mapsend.get('send_byte');//总发包量(byte)	
								sendto_failure = mapsend.get('sendto_failure');//(sendto_failure)
							}
							//空值校验	
							if(a_send==undefined||a_send==null||a_send===""){
								a_send = "未提供数据";
							}
							if(a_send_byte==undefined||a_send_byte==null||a_send_byte===""){
								a_send_byte = "未提供数据";
							}
							if(v_send==undefined||v_send==null||v_send===""){
								v_send = "未提供数据";
							}
							if(v_send_byte==undefined||v_send_byte==null||v_send_byte===""){
								v_send_byte = "未提供数据";
							}
							if(vf_send==undefined||vf_send==null||vf_send===""){
								vf_send = "未提供数据";
							}
							if(vf_send_byte==undefined||vf_send_byte==null||vf_send_byte===""){
								vf_send_byte = "未提供数据";
							}
							if(send==undefined||send==null||send===""){
								send = "未提供数据";
							}
							if(send_byte==undefined||send_byte==null||send_byte===""){
								send_byte = "未提供数据";
							}
							if(sendto_failure==undefined||sendto_failure==null||sendto_failure===""){
								sendto_failure = "未提供数据";
							}
								
							$('#col5_01').html("Max："+max+"<br>Avg："+avg+"<br/>Min："+min);
							$('#col5_02').html(send);
							$('#col5_03').html(send_byte);
							$('#col5_04').html(a_send);
							$('#col5_05').html(a_send_byte);
							$('#col5_06').html(v_send);
							$('#col5_07').html(v_send_byte);
							$('#col5_08').html(vf_send);
							$('#col5_09').html(vf_send_byte);
							$('#col5_10').html(sendto_failure);
							$('#reportorIdCaller').html("主叫方["+caller+"]发送信息统计");
						}else{
							$('#col5_01').html("未提供数据");
							$('#col5_02').html("未提供数据");
							$('#col5_03').html("未提供数据");
							$('#col5_04').html("未提供数据");
							$('#col5_05').html("未提供数据");
							$('#col5_06').html("未提供数据");
							$('#col5_07').html("未提供数据");
							$('#col5_08').html("未提供数据");
							$('#col5_09').html("未提供数据");
							$('#col5_10').html("未提供数据");
							$('#reportorIdCaller').html("未提供数据");
						}
					}else{
						$('#col5_01').html("未提供数据");
						$('#col5_02').html("未提供数据");
						$('#col5_03').html("未提供数据");
						$('#col5_04').html("未提供数据");
						$('#col5_05').html("未提供数据");
						$('#col5_06').html("未提供数据");
						$('#col5_07').html("未提供数据");
						$('#col5_08').html("未提供数据");
						$('#col5_09').html("未提供数据");
						$('#col5_10').html("未提供数据");
						$('#reportorIdCaller').html("未提供数据");
					}
				}else{
					$('#col5_01').html("未提供数据");
					$('#col5_02').html("未提供数据");
					$('#col5_03').html("未提供数据");
					$('#col5_04').html("未提供数据");
					$('#col5_05').html("未提供数据");
					$('#col5_06').html("未提供数据");
					$('#col5_07').html("未提供数据");
					$('#col5_08').html("未提供数据");
					$('#col5_09').html("未提供数据");
					$('#col5_10').html("未提供数据");
					$('#reportorIdCaller').html("未提供数据");
				}
			}else{
				$('#col5_01').html("未提供数据");
				$('#col5_02').html("未提供数据");
				$('#col5_03').html("未提供数据");
				$('#col5_04').html("未提供数据");
				$('#col5_05').html("未提供数据");
				$('#col5_06').html("未提供数据");
				$('#col5_07').html("未提供数据");
				$('#col5_08').html("未提供数据");
				$('#col5_09').html("未提供数据");
				$('#col5_10').html("未提供数据");
				$('#reportorIdCaller').html("未提供数据");
			}
		}else{
			$('#col5_01').html("未提供数据");
			$('#col5_02').html("未提供数据");
			$('#col5_03').html("未提供数据");
			$('#col5_04').html("未提供数据");
			$('#col5_05').html("未提供数据");
			$('#col5_06').html("未提供数据");
			$('#col5_07').html("未提供数据");
			$('#col5_08').html("未提供数据");
			$('#col5_09').html("未提供数据");
			$('#col5_10').html("未提供数据");
			$('#reportorIdCaller').html("未提供数据");
		}
	}else{
		$('#col5_01').html("未提供数据");
		$('#col5_02').html("未提供数据");
		$('#col5_03').html("未提供数据");
		$('#col5_04').html("未提供数据");
		$('#col5_05').html("未提供数据");
		$('#col5_06').html("未提供数据");
		$('#col5_07').html("未提供数据");
		$('#col5_08').html("未提供数据");
		$('#col5_09').html("未提供数据");
		$('#col5_10').html("未提供数据");
		$('#reportorIdCaller').html("未提供数据");
	}
}
/**
 * 3 对照发包信息 04[主叫相关参数]
 */
function setView0304(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var param = call.param;
					if(param!=undefined&&param!=null&&param!==""){
						var paramArrCaller = param.split(' ');
						var map = new Map();
						for(var i=0;i<paramArrCaller.length;i++){
							map.put(paramArrCaller[i].split('=')[0],paramArrCaller[i].split('=')[1]);
						}
						
						$('#col6_01').html("上行历史最大可用带宽："+map.get('maxbw')+"<br/>当前上行可用带宽："+map.get('curbw'));
						$('#col6_04').html("音频包2合1开关："+map.get('2in1')+"<br/>音频编码格式："+map.get('acodec'));
						$('#col6_06').html("视频分辨率："+map.get('vformat')+"<br/>目标码率(Kbit/s)："+map.get('targetbps')+"<br/>限流码率(Kbit/s)："+map.get('limbps')+"<br/>视频帧率(帧/s)："+map.get('fps'));
						$('#col6_08').html("视频fec比率："+map.get('vfecratio')+"<br/>视频fec开关： "+map.get('vfec')+"<br/>I帧fec开关："+map.get('ifec'));
					}else{
						$('#col6_01').html("未提供数据");
						$('#col6_04').html("未提供数据");
						$('#col6_06').html("未提供数据");
						$('#col6_08').html("未提供数据");
					}
				}else{
					$('#col6_01').html("未提供数据");
					$('#col6_04').html("未提供数据");
					$('#col6_06').html("未提供数据");
					$('#col6_08').html("未提供数据");
				}
			}else{
				$('#col6_01').html("未提供数据");
				$('#col6_04').html("未提供数据");
				$('#col6_06').html("未提供数据");
				$('#col6_08').html("未提供数据");
			}
		}else{
			$('#col6_01').html("未提供数据");
			$('#col6_04').html("未提供数据");
			$('#col6_06').html("未提供数据");
			$('#col6_08').html("未提供数据");
		}
	}else{
		$('#col6_01').html("未提供数据");
		$('#col6_04').html("未提供数据");
		$('#col6_06').html("未提供数据");
		$('#col6_08').html("未提供数据");
	}
}

/**
 * 4 路径质量 01主被
 */
function setView04_zb(datas){
	var html = "";
	html += "<b>路径质量</b>";
	
	var result = datas.result;
	var data;
	var caller;
	//网优数据
	var netanalysiscaller;
	
	if(result===0){
		data = datas.data;
		//在显示进入视图的链接时，如果主叫为空，按被的显示，如果主被都为空，则不显示
		if(data!=undefined&&data!=null&&data!==""){
			caller = data.caller;
			var sid ;
			if(caller!=undefined&&caller!=null&&caller!==""){
				netanalysiscaller = caller.netanalysis;
				if(netanalysiscaller!=undefined&&netanalysiscaller!=null&&netanalysiscaller!==""){
					sid = netanalysiscaller.sid;
					html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					html += "————〉<a href='webRelay/Main.html?sid="+sid+"&reportorId="+sid.split('_')[2]+"' target='_blank'><b>进入视图模式</b></a>";
				   	html += "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#FF0000'>▲注：灰色字体表示此链路未汇报话务质量</font>";
				}else{
					var called = data.called;
					if(called!=undefined&&called!=null&&called!==""){
						var netanalysiscalled = called.netanalysis;
						if(netanalysiscalled!=undefined&&netanalysiscalled!=null&&netanalysiscalled!==""){
							sid = netanalysiscalled.sid;
							html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							html += "————〉<a href='webRelay/Main.html?sid="+sid+"&reportorId="+sid.split('_')[2]+"' target='_blank'><b>进入视图模式</b></a>";
						   	html += "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#FF0000'>▲注：灰色字体表示此链路未汇报话务质量</font>";
						}
					}
				}
			}
		}
	}
		
	//表头信息
	html += "<table class='detailTable'>" +
			"<tr><td colspan='10'><b>主到被</b></td></tr>" +
			"<tr align='center' style='background-color:RGB(209,223,236);'>" +
				"<td rowspan='2' width='50px'>路径ID</td>" +
				"<td colspan='4'>路径质量</td>" +
				"<td colspan='5'>链路质量</td>" +
			"</tr>" +
			"<tr align='center' style='background-color:RGB(209,223,236);'>" +
				"<td width='96px'>路径描述</td>" +
				"<td width='50px'>预测质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输计算质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输统计质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='141px'>链路描述</td>" +
				"<td width='60px'>探测质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>偏离度<br/><font style='color:RGB(0,0,255);'>丢包误差率(%)/<br/>延时误差率(%)</font></td>" +
				"<td><font style='color:RGB(0,0,255);'>Relay信息</font></td>" +
			"</tr>";
			
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				//网优数据
				var netanalysiscaller = caller.netanalysis;
				if(netanalysiscaller!=undefined&&netanalysiscaller!=null&&netanalysiscaller!==""){
					var s2d ;
					var relay_info ;
					s2d = netanalysiscaller.s2d;
					relay_info = netanalysiscaller.relay_info;
					if(s2d!=undefined&&s2d!=null&&s2d!==""&&relay_info!=undefined&&relay_info!=null&&relay_info!==""){
			
						$.each(s2d,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var sub_path_array = val.sub_path_array;
								if(sub_path_array!=undefined&&sub_path_array!=null&&sub_path_array!==""){
									var path_id = val.path_id;
									if(path_id==undefined||path_id==null||path_id===""){
										path_id = "无";
									}
									html += "<tr>" +
												"<td>"+path_id+"</td>" +
												"<td colspan='9'>" ;
											html += "<table class='detailTable'>";
								  	$.each(sub_path_array,function(j,va){
								  		if(va!=undefined&&va!=null&&va!==""){
										  	var segment ;
										  	var quality ;
										  	var path_info;
											var U_R ;
											var R_R ;
											var R_U ;
											
											var lost ;//预测质量丢包率(%)/延时(毫秒)
											var calclost ;//实际传输计算质量丢包率(%)/延时(毫秒)
											var reallost ;//实际传输统计质量丢包率(%)/延时(毫秒)
											var delay;//预测质量延时(毫秒)
											var calcdelay;//实际传输计算质量延时(毫秒)
											var realdelay;//实际传输统计质量延时(毫秒)
											
											
											var delay_segment;
											var realdelay_segment;
											
										  	segment = va.segment;
										  	if(segment!=undefined&&segment!=null&&segment!==""){
												U_R = segment.U_R;
												R_R = segment.R_R;
												R_U = segment.R_U;
										  	}
										  	quality = va.quality;
										  	if(quality!=undefined&&quality!=null&&quality!==""){
												lost = quality.lost;//预测质量丢包率(%)
												calclost = quality.calclost;//实际传输计算质量丢包率(%)
												reallost = quality.reallost;//实际传输统计质量丢包率(%)
												delay = quality.delay;//预测质量延时(毫秒)
												calcdelay = quality.calcdelay;//实际传输计算质量延时(毫秒)
												realdelay = quality.realdelay;//实际传输统计质量延时(毫秒)
										  	}
									  		
										  	if(lost!=undefined&&lost!=null&&lost!==""){
												lost = toFixed(lost);
										  	}else{
										  		lost = "无";
										  	}
										  	if(calclost!=undefined&&calclost!=null&&calclost!==""){
												calclost = toFixed(calclost);
										  	}else{
										  		calclost = "无";
										  	}
										  	if(reallost!=undefined&&reallost!=null&&reallost!==""){
												reallost = toFixed(reallost);
										  	}else{
										  		reallost = "无";
										  	}
										  	
										  	if(delay==undefined||delay==null||delay===""){
												delay = "无";
											}
										  	if(calcdelay==undefined||calcdelay==null||calcdelay===""){
												calcdelay = "无";
											}
										  	if(realdelay==undefined||realdelay==null||realdelay===""){
												realdelay = "无";
											}
										  	
										  	path_info = va.path_info;
										  	if(path_info==undefined||path_info==null||path_info===""){
												path_info = "无";
											}
									  	
										html += "<tr>" +
													"<td valign='top' style='word-break:break-all' width='90px'><p>"+path_info+"</p></td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+lost+"/"+delay+"</td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+calclost+"/"+calcdelay+"</td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+reallost+"/"+realdelay+"</td>" +
													"<td>" +
														"<table class='detailTable'>" ;
										    if(U_R!=undefined&&U_R!=null&&U_R!==""){
												html += "<tr>" ;
																
												var dest_ip;
												var dest_id;
												
												dest_ip = U_R.dest_ip;
												dest_id = U_R.dest_id;
												
												if(dest_ip==undefined||dest_ip==null||dest_ip===""){
													dest_ip = "无";
												}
												if(dest_id==undefined||dest_id==null||dest_id===""){
													dest_id = "无";
												}
											
								 		        var isused = U_R.isused;//是否使用了
								 		        if(isused==true){
													html += "<td style='word-break:break-all;' width='135px'>Us->"+
																dest_ip+"("+dest_id+")<br/>"+
											 		        "</td>" ;
								 		        }else{
													html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='135px'>Us->"+
																dest_ip+"("+dest_id+")<br/>"+
											 		        "</td>" ;
								 		        }
								 		        //U-R
								 		        var lost_UR = U_R.lost;//探测质量丢包率(%)/延时(毫秒)
								 		        var reallost_UR=U_R.reallost;//实际传输质量丢包率(%)/延时(毫秒)
								 		        var deflectlost_UR=U_R.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
								 		        var deflectdelay_UR = U_R.deflectdelay;//延时误差率
								 		        
								 		        delay_segment = U_R.delay;
								 		        realdelay_segment = U_R.realdelay;
							 		        	
								 		        if(lost_UR!=undefined&&lost_UR!=null&&lost_UR!==""){
													lost_UR = toFixed(lost_UR);
											  	}else{
											  		lost_UR = "无";
											  	}
											  	
								 		        if(reallost_UR!=undefined&&reallost_UR!=null&&reallost_UR!==""){
													reallost_UR = toFixed(reallost_UR);
											  	}else{
											  		reallost_UR = "无";
											  	}
											  	
								 		        if(deflectlost_UR!=undefined&&deflectlost_UR!=null&&deflectlost_UR!==""){
													deflectlost_UR = toFixed(deflectlost_UR);
											  	}else{
											  		deflectlost_UR = "无";
											  	}
											  	
								 		        if(deflectdelay_UR!=undefined&&deflectdelay_UR!=null&&deflectdelay_UR!==""){
													deflectdelay_UR = toFixed(deflectdelay_UR);
											  	}else{
											  		deflectdelay_UR = "无";
											  	}
								 		        
											  	if(delay_segment==undefined||delay_segment==null||delay_segment===""){
													delay_segment = "无";
												}
												
												if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
													realdelay_segment = "无";
												}
											  	
								 		        if(isused==true){
													html+="<td valign='top' style='word-break:break-all;' width='60px'>"+lost_UR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;' width='50px'>"+reallost_UR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;' width='50px'>"+deflectlost_UR+"&nbsp;/&nbsp;"+deflectdelay_UR+"</td>" +
													"<td>" ;
								 		        }else{
													html+="<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='60px'>"+lost_UR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='50px'>"+reallost_UR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='50px'>"+deflectlost_UR+"&nbsp;/&nbsp;"+deflectdelay_UR+"</td>" +
													"<td>" ;
								 		        }
												$.each(relay_info,function(m,v){
													if(v!=undefined&&v!=null&&v!=""){
														var payLoadInfo = v.payLoadInfo;
														var relayInfo = v.relayInfo;
														
														var cpu;
														var mem;
														var inbound;
														var outbound;
														
														var relayID;
														var name;
														var media_ip;
														var max_inbound;
														var max_outbound;
														
														if(payLoadInfo!=undefined&&payLoadInfo!=null&&payLoadInfo!==""){
															cpu = payLoadInfo.cpu;
															mem = payLoadInfo.mem;
															inbound = payLoadInfo.inbound;
															outbound = payLoadInfo.outbound;
														}
														
														if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
															relayID = relayInfo.relayID;
															//name =relayInfo.name;
															//media_ip =relayInfo.media_ip;
															//max_inbound =relayInfo.max_inbound;
															//max_outbound =relayInfo.max_outbound;
														}
														
														if(mapRelay2Map!=undefined&&mapRelay2Map!=null&&mapRelay2Map!==""){
												    		mapRelay2Map.each(function(key,value,index){
												    			if(relayID!=undefined&&relayID!=null&&relayID!==""){
													    			if(relayID==key){
													    				if(value!=undefined&&value!=null&&value!==""){
																    		/*
																    		 * 基本信息
																    		 */
																    		//名字
																    		name = value.name;
																    		//媒体IP
									    									media_ip = value.media_ip;
																    		//下行带宽
																    		max_inbound = value.max_inbound;
																    		//上行带宽
																    		max_outbound = value.max_outbound;
													    				}
													    			}
												    			}
												    		});
														}
																					
														
														if(cpu==undefined||cpu==null||cpu===""){
															cpu = "无";
														}
														if(mem==undefined||mem==null||mem===""){
															mem = "无";
														}
														if(inbound==undefined||inbound==null||inbound===""){
															inbound = "无";
														}
														if(outbound==undefined||outbound==null||outbound===""){
															outbound = "无";
														}
														
														
														if(relayID==undefined||relayID==null||relayID===""){
															relayID = "无";
														}
														if(name==undefined||name==null||name===""){
															name = "无";
														}
														if(media_ip==undefined||media_ip==null||media_ip===""){
															media_ip = "无";
														}
														if(max_inbound==undefined||max_inbound==null||max_inbound===""){
															max_inbound = "无";
														}
														if(max_outbound==undefined||max_outbound==null||max_outbound===""){
															max_outbound = "无";
														}
														
														
														//只有U_R/R_R才显示relay信息，R_U不显示
														if(relayID==dest_id){
															html+="<font style='color:RGB(32,169,9);font-size:12px;'>Name：</font>"+name+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>IP：</font>"+media_ip+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>CPU：</font>"+cpu+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>内存：</font>"+mem+
															"<br/><font style='color:RGB(32,169,9);font-size:12px;'>带宽：</font>"+
															"in(已用/额配 kbps):"+inbound+"/"+max_inbound+
															"&nbsp;&nbsp;&nbsp;&nbsp;out(已用/额配 kbps):"+outbound+"/"+max_outbound;
														}
													}
												});
											html+="</td>" +
												"</tr>";
										    }
											if(R_R!=undefined&&R_R!=null&&R_R!==""){
											  //R_R是个数组，因为会有多个R_R
										    	$.each(R_R,function(i,val){
											  		if(val!=undefined&&val!=null&&val!==""){
										  		html+="<tr>" ;
											  			var src_ip;
											  			var src_id;
											  			var dest_ip;
														var dest_id;
														
														src_ip = val.src_ip;
														src_id = val.src_id;
														dest_ip = val.dest_ip;
														dest_id = val.dest_id;
														
														if(src_ip==undefined||src_ip==null||src_ip===""){
															src_ip = "无";
														}
														if(src_id==undefined||src_id==null||src_id===""){
															src_id = "无";
														}
														if(dest_ip==undefined||dest_ip==null||dest_ip===""){
															dest_ip = "无";
														}
														if(dest_id==undefined||dest_id==null||dest_id===""){
															dest_id = "无";
														}
											  		
											  		
												        var isused = val.isused;//是否使用了
												        if(isused==true){
															html += "<td style='word-break:break-all;' width='121px'>"+
																		src_ip+"("+src_id+")-><br/>"+dest_ip+"("+dest_id+")<br/>"+
															        "</td>";
												        }else{
															html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='121px'>"+
																		src_ip+"("+src_id+")-><br/>"+dest_ip+"("+dest_id+")<br/>"+
															        "</td>";
												        }
												        //R-R
												        var lost_RR = val.lost;//探测质量丢包率(%)/延时(毫秒)
												        var reallost_RR = val.reallost;//实际传输质量丢包率(%)/延时(毫秒)
												        var deflectlost_RR = val.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
												        var deflectdelay_RR = val.deflectdelay;//延时误差率
												        
												        delay_segment = val.delay;
											 		    realdelay_segment = val.realdelay;
											        	
												        if(lost_RR!=undefined&&lost_RR!=null&&lost_RR!==""){
												        	lost_RR = toFixed(lost_RR);
												        }else{
												        	
												        }
												        if(reallost_RR!=undefined&&reallost_RR!=null&&reallost_RR!==""){
												        	reallost_RR = toFixed(reallost_RR);
												        }else{
												        	reallost_RR = "无";
												        }
												        if(deflectlost_RR!=undefined&&deflectlost_RR!=null&&deflectlost_RR!==""){
												        	deflectlost_RR = toFixed(deflectlost_RR);
												        }else{
												        	deflectlost_RR = "无";
												        }
												        if(deflectdelay_RR!=undefined&&deflectdelay_RR!=null&&deflectdelay_RR!==""){
												        	deflectdelay_RR = toFixed(deflectdelay_RR);
												        }else{
												        	deflectdelay_RR = "无";
												        }
												        
												        if(delay_segment==undefined||delay_segment==null||delay_segment===""){
												        	delay_segment = "无";
												        }
												        if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
												        	realdelay_segment = "无";
												        }
												        
												        if(isused==true){
															html+="<td valign='top'>"+lost_RR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
															"<td valign='top'>"+reallost_RR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
															"<td valign='top'>"+deflectlost_RR+"&nbsp;/&nbsp;"+deflectdelay_RR+"</td>" +
															"<td>" ;
												        }else{
															html+="<td valign='top' style='color:RGB(128,128,128);'>"+lost_RR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
															"<td valign='top' style='color:RGB(128,128,128);'>"+reallost_RR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
															"<td valign='top' style='color:RGB(128,128,128);'>"+deflectlost_RR+"&nbsp;/&nbsp;"+deflectdelay_RR+"</td>" +
															"<td>" ;
												        }
														$.each(relay_info,function(m,v){
															if(v!=undefined&&v!=null&&v!=""){
																var payLoadInfo = v.payLoadInfo;
																var relayInfo = v.relayInfo;
																
																var cpu;
																var mem;
																var inbound;
																var outbound;
																
																var relayID;
																var name;
																var media_ip;
																var max_inbound;
																var max_outbound;
																
																if(payLoadInfo!=undefined&&payLoadInfo!=null&&payLoadInfo!==""){
																	cpu = payLoadInfo.cpu;
																	mem = payLoadInfo.mem;
																	inbound = payLoadInfo.inbound;
																	outbound = payLoadInfo.outbound;
																}
																
																if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
																	relayID = relayInfo.relayID;
																	//name =relayInfo.name;
																	//media_ip =relayInfo.media_ip;
																	//max_inbound =relayInfo.max_inbound;
																	//max_outbound =relayInfo.max_outbound;
																}
																
																if(mapRelay2Map!=undefined&&mapRelay2Map!=null&&mapRelay2Map!==""){
														    		mapRelay2Map.each(function(key,value,index){
														    			if(relayID!=undefined&&relayID!=null&&relayID!==""){
															    			if(relayID==key){
															    				if(value!=undefined&&value!=null&&value!==""){
																		    		/*
																		    		 * 基本信息
																		    		 */
																		    		//名字
																		    		name = value.name;
																		    		//媒体IP
											    									media_ip = value.media_ip;
																		    		//下行带宽
																		    		max_inbound = value.max_inbound;
																		    		//上行带宽
																		    		max_outbound = value.max_outbound;
															    				}
															    			}
														    			}
														    		});
																}
																
																if(cpu==undefined||cpu==null||cpu===""){
																	cpu = "无";
																}
																if(mem==undefined||mem==null||mem===""){
																	mem = "无";
																}
																if(inbound==undefined||inbound==null||inbound===""){
																	inbound = "无";
																}
																if(outbound==undefined||outbound==null||outbound===""){
																	outbound = "无";
																}
																
																
																if(relayID==undefined||relayID==null||relayID===""){
																	relayID = "无";
																}
																if(name==undefined||name==null||name===""){
																	name = "无";
																}
																if(media_ip==undefined||media_ip==null||media_ip===""){
																	media_ip = "无";
																}
																if(max_inbound==undefined||max_inbound==null||max_inbound===""){
																	max_inbound = "无";
																}
																if(max_outbound==undefined||max_outbound==null||max_outbound===""){
																	max_outbound = "无";
																}
																
																//只有U_R/R_R才显示relay信息，R_U不显示
																if(relayID==dest_id){
																	html+="<font style='color:RGB(32,169,9);font-size:12px;'>Name：</font>"+name+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>IP：</font>"+media_ip+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>CPU：</font>"+cpu+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>内存：</font>"+mem+
																	"<br/><font style='color:RGB(32,169,9);font-size:12px;'>带宽：</font>"+
																	"in(已用/额配 kbps):"+inbound+"/"+max_inbound+
																	"&nbsp;&nbsp;&nbsp;&nbsp;out(已用/额配 kbps):"+outbound+"/"+max_outbound;
																}
															}
														});
												html+="</td>" +
													"</tr>";
												  }
											  });
											}
										  //RU
											if(R_U!=undefined&&R_U!=null&&R_U!==""){
										 		html+="<tr>" ;
									 			var src_ip;
									 			var src_id;
									 			
									 			src_ip = R_U.src_ip;
									 			src_id = R_U.src_id;
									 			
									 			if(src_ip==undefined||src_ip==null||src_ip===""){
									 				src_ip = "无";
									 			}
									 			if(src_id==undefined||src_id==null||src_id===""){
									 				src_id = "无";
									 			}
									 	
												var isused = R_U.isused;//是否使用了
												if(isused==true){
													html += "<td style='word-break:break-all;' width='121px'>"+
																src_ip+"("+src_id+")->Ud"+
															"</td>" ;
												}else{
													html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='121px'>"+
																src_ip+"("+src_id+")->Ud"+
															"</td>" ;
												}
												var lost_RU = R_U.lost;//探测质量丢包率(%)/延时(毫秒)
												var reallost_RU = R_U.reallost;//实际传输质量丢包率(%)/延时(毫秒)
												var deflectlost_RU = R_U.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
												var deflectdelay_RU = R_U.deflectdelay;//延时误差率
												
												delay_segment = R_U.delay;
									 		    realdelay_segment = R_U.realdelay;
												
												if(lost_RU!=undefined&&lost_RU!=null&&lost_RU!==""){
													lost_RU = toFixed(lost_RU);
												}else{
													lost_RU = "无";
												}
												if(reallost_RU!=undefined&&reallost_RU!=null&&reallost_RU!==""){
													reallost_RU = toFixed(reallost_RU);
												}else{
													reallost_RU = "无";
												}
												if(deflectlost_RU!=undefined&&deflectlost_RU!=null&&deflectlost_RU!==""){
													deflectlost_RU = toFixed(deflectlost_RU);
												}else{
													deflectlost_RU = "无";
												}
												if(deflectdelay_RU!=undefined&&deflectdelay_RU!=null&&deflectdelay_RU!==""){
													deflectdelay_RU = toFixed(deflectdelay_RU);
												}else{
													deflectdelay_RU = "无";
												}
												
												if(delay_segment==undefined||delay_segment==null||delay_segment===""){
										        	delay_segment = "无";
										        }
										        if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
										        	realdelay_segment = "无";
										        }
												
												if(isused==true){
													html+="<td valign='top'>"+lost_RU+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top'>"+reallost_RU+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top'>"+deflectlost_RU+"&nbsp;/&nbsp;"+deflectdelay_RU+"</td>" +
													"<td></td>";
												}else{
													html+="<td valign='top' style='color:RGB(128,128,128);'>"+lost_RU+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='color:RGB(128,128,128);'>"+reallost_RU+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='color:RGB(128,128,128);'>"+deflectlost_RU+"&nbsp;/&nbsp;"+deflectdelay_RU+"</td>" +
													"<td></td>";
												}
												html +="</tr>" ;
											}
											html += "</table>" +
												"</td>" +
											"</tr>";
									  	 }
									  });
								html += "</table>";
							html += "</td>" +
								"</tr>" ;
								}
							}
						});
					}else{
						html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
					}
				}else{
					html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
				}
			}else{
				html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
			}
		}else{
			html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
		}
	}else{
		html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
	}
	html += "</table>";
	$('#callerreport_04').html(html);
}

/**
 * 4　路径质量　02被主
 */
function setView04_bz(datas){
	
	var html = "";
	//表头信息
    html += "<table class='detailTable'>" +
			"<tr><td colspan='10'><b>被到主</b></td></tr>" +
			"<tr align='center' style='background-color:RGB(209,223,236);'>" +
				"<td rowspan='2' width='50px'>路径ID</td>" +
				"<td colspan='4'>路径质量</td>" +
				"<td colspan='5'>链路质量</td>" +
			"</tr>" +
			"<tr align='center' style='background-color:RGB(209,223,236);'>" +
				"<td width='96px'>路径描述</td>" +
				"<td width='50px'>预测质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输计算质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输统计质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='141px'>链路描述</td>" +
				"<td width='60px'>探测质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>实际传输质量<br/><font style='color:RGB(0,0,255);'>丢包率(%)/延时(毫秒)</font></td>" +
				"<td width='50px'>偏离度<br/><font style='color:RGB(0,0,255);'>丢包误差率(%)/<br/>延时误差率(%)</font></td>" +
				"<td><font style='color:RGB(0,0,255);'>Relay信息</font></td>" +
			"</tr>";
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				//网优数据
				var netanalysiscalled = called.netanalysis;
				if(netanalysiscalled!=undefined&&netanalysiscalled!=null&&netanalysiscalled!==""){
					var s2d ;
					var relay_info ;
					s2d = netanalysiscalled.s2d;
					relay_info = netanalysiscalled.relay_info;
					if(s2d!=undefined&&s2d!=null&&s2d!==""&&relay_info!=undefined&&relay_info!=null&&relay_info!==""){
						$.each(s2d,function(i,val){
							if(val!=undefined&&val!=null&&val!==""){
								var sub_path_array = val.sub_path_array;
								if(sub_path_array!=undefined&&sub_path_array!=null&&sub_path_array!==""){
									var path_id = val.path_id;
									if(path_id==undefined||path_id==null||path_id===""){
										path_id = "无";
									}
									html += "<tr>" +
												"<td>"+path_id+"</td>" +
												"<td colspan='9'>" ;
											html += "<table class='detailTable'>";
								  	$.each(sub_path_array,function(j,va){
								  		if(va!=undefined&&va!=null&&va!==""){
										  	var segment ;
										  	var quality ;
										  	var path_info;
											var U_R ;
											var R_R ;
											var R_U ;
											
											var lost ;//预测质量丢包率(%)/延时(毫秒)
											var calclost ;//实际传输计算质量丢包率(%)/延时(毫秒)
											var reallost ;//实际传输统计质量丢包率(%)/延时(毫秒)
											var delay;//预测质量延时(毫秒)
											var calcdelay;//实际传输计算质量延时(毫秒)
											var realdelay;//实际传输统计质量延时(毫秒)
											
											
											var delay_segment;
											var realdelay_segment;
											
										  	segment = va.segment;
										  	if(segment!=undefined&&segment!=null&&segment!==""){
												U_R = segment.U_R;
												R_R = segment.R_R;
												R_U = segment.R_U;
										  	}
										  	quality = va.quality;
										  	if(quality!=undefined&&quality!=null&&quality!==""){
												lost = quality.lost;//预测质量丢包率(%)
												calclost = quality.calclost;//实际传输计算质量丢包率(%)
												reallost = quality.reallost;//实际传输统计质量丢包率(%)
												delay = quality.delay;//预测质量延时(毫秒)
												calcdelay = quality.calcdelay;//实际传输计算质量延时(毫秒)
												realdelay = quality.realdelay;//实际传输统计质量延时(毫秒)
										  	}
									  		
										  	if(lost!=undefined&&lost!=null&&lost!==""){
												lost = toFixed(lost);
										  	}else{
										  		lost = "无";
										  	}
										  	if(calclost!=undefined&&calclost!=null&&calclost!==""){
												calclost = toFixed(calclost);
										  	}else{
										  		calclost = "无";
										  	}
										  	if(reallost!=undefined&&reallost!=null&&reallost!==""){
												reallost = toFixed(reallost);
										  	}else{
										  		reallost = "无";
										  	}
										  	
										  	if(delay==undefined||delay==null||delay===""){
												delay = "无";
											}
										  	if(calcdelay==undefined||calcdelay==null||calcdelay===""){
												calcdelay = "无";
											}
										  	if(realdelay==undefined||realdelay==null||realdelay===""){
												realdelay = "无";
											}
										  	
										  	path_info = va.path_info;
										  	if(path_info==undefined||path_info==null||path_info===""){
												path_info = "无";
											}
									  	
										html += "<tr>" +
													"<td valign='top' style='word-break:break-all' width='90px'><p>"+path_info+"</p></td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+lost+"/"+delay+"</td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+calclost+"/"+calcdelay+"</td>" +
													"<td valign='top' style='word-break:break-all' width='50px'>"+reallost+"/"+realdelay+"</td>" +
													"<td>" +
														"<table class='detailTable'>" ;
										    if(U_R!=undefined&&U_R!=null&&U_R!==""){
												html += "<tr>" ;
																
												var dest_ip;
												var dest_id;
												
												dest_ip = U_R.dest_ip;
												dest_id = U_R.dest_id;
												
												if(dest_ip==undefined||dest_ip==null||dest_ip===""){
													dest_ip = "无";
												}
												if(dest_id==undefined||dest_id==null||dest_id===""){
													dest_id = "无";
												}
											
								 		        var isused = U_R.isused;//是否使用了
								 		        if(isused==true){
													html += "<td style='word-break:break-all;' width='135px'>Us->"+
																dest_ip+"("+dest_id+")<br/>"+
											 		        "</td>" ;
								 		        }else{
													html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='135px'>Us->"+
																dest_ip+"("+dest_id+")<br/>"+
											 		        "</td>" ;
								 		        }
								 		        //U-R
								 		        var lost_UR = U_R.lost;//探测质量丢包率(%)/延时(毫秒)
								 		        var reallost_UR=U_R.reallost;//实际传输质量丢包率(%)/延时(毫秒)
								 		        var deflectlost_UR=U_R.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
								 		        var deflectdelay_UR = U_R.deflectdelay;//延时误差率
								 		        
								 		        delay_segment = U_R.delay;
								 		        realdelay_segment = U_R.realdelay;
							 		        	
								 		        if(lost_UR!=undefined&&lost_UR!=null&&lost_UR!==""){
													lost_UR = toFixed(lost_UR);
											  	}else{
											  		lost_UR = "无";
											  	}
											  	
								 		        if(reallost_UR!=undefined&&reallost_UR!=null&&reallost_UR!==""){
													reallost_UR = toFixed(reallost_UR);
											  	}else{
											  		reallost_UR = "无";
											  	}
											  	
								 		        if(deflectlost_UR!=undefined&&deflectlost_UR!=null&&deflectlost_UR!==""){
													deflectlost_UR = toFixed(deflectlost_UR);
											  	}else{
											  		deflectlost_UR = "无";
											  	}
											  	
								 		        if(deflectdelay_UR!=undefined&&deflectdelay_UR!=null&&deflectdelay_UR!==""){
													deflectdelay_UR = toFixed(deflectdelay_UR);
											  	}else{
											  		deflectdelay_UR = "无";
											  	}
								 		        
											  	if(delay_segment==undefined||delay_segment==null||delay_segment===""){
													delay_segment = "无";
												}
												
												if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
													realdelay_segment = "无";
												}
											  	
								 		        if(isused==true){
													html+="<td valign='top' style='word-break:break-all;' width='60px'>"+lost_UR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;' width='50px'>"+reallost_UR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;' width='50px'>"+deflectlost_UR+"&nbsp;/&nbsp;"+deflectdelay_UR+"</td>" +
													"<td>" ;
								 		        }else{
													html+="<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='60px'>"+lost_UR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='50px'>"+reallost_UR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='word-break:break-all;color:RGB(128,128,128);' width='50px'>"+deflectlost_UR+"&nbsp;/&nbsp;"+deflectdelay_UR+"</td>" +
													"<td>" ;
								 		        }
												$.each(relay_info,function(m,v){
													if(v!=undefined&&v!=null&&v!=""){
														var payLoadInfo = v.payLoadInfo;
														var relayInfo = v.relayInfo;
														
														var cpu;
														var mem;
														var inbound;
														var outbound;
														
														var relayID;
														var name;
														var media_ip;
														var max_inbound;
														var max_outbound;
														
														if(payLoadInfo!=undefined&&payLoadInfo!=null&&payLoadInfo!==""){
															cpu = payLoadInfo.cpu;
															mem = payLoadInfo.mem;
															inbound = payLoadInfo.inbound;
															outbound = payLoadInfo.outbound;
														}
														
														if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
															relayID = relayInfo.relayID;
															//name =relayInfo.name;
															//media_ip =relayInfo.media_ip;
															//max_inbound =relayInfo.max_inbound;
															//max_outbound =relayInfo.max_outbound;
														}
														
														if(mapRelay2Map!=undefined&&mapRelay2Map!=null&&mapRelay2Map!==""){
												    		mapRelay2Map.each(function(key,value,index){
												    			if(relayID!=undefined&&relayID!=null&&relayID!==""){
													    			if(relayID==key){
													    				if(value!=undefined&&value!=null&&value!==""){
																    		/*
																    		 * 基本信息
																    		 */
																    		//名字
																    		name = value.name;
																    		//媒体IP
									    									media_ip = value.media_ip;
																    		//下行带宽
																    		max_inbound = value.max_inbound;
																    		//上行带宽
																    		max_outbound = value.max_outbound;
													    				}
													    			}
												    			}
												    		});
														}
														
														if(cpu==undefined||cpu==null||cpu===""){
															cpu = "无";
														}
														if(mem==undefined||mem==null||mem===""){
															mem = "无";
														}
														if(inbound==undefined||inbound==null||inbound===""){
															inbound = "无";
														}
														if(outbound==undefined||outbound==null||outbound===""){
															outbound = "无";
														}
														
														
														if(relayID==undefined||relayID==null||relayID===""){
															relayID = "无";
														}
														if(name==undefined||name==null||name===""){
															name = "无";
														}
														if(media_ip==undefined||media_ip==null||media_ip===""){
															media_ip = "无";
														}
														if(max_inbound==undefined||max_inbound==null||max_inbound===""){
															max_inbound = "无";
														}
														if(max_outbound==undefined||max_outbound==null||max_outbound===""){
															max_outbound = "无";
														}
														
														
														//只有U_R/R_R才显示relay信息，R_U不显示
														if(relayID==dest_id){
															html+="<font style='color:RGB(32,169,9);font-size:12px;'>Name：</font>"+name+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>IP：</font>"+media_ip+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>CPU：</font>"+cpu+"&nbsp;&nbsp;&nbsp;&nbsp;"+
															"<font style='color:RGB(32,169,9);font-size:12px;'>内存：</font>"+mem+
															"<br/><font style='color:RGB(32,169,9);font-size:12px;'>带宽：</font>"+
															"in(已用/额配 kbps):"+inbound+"/"+max_inbound+
															"&nbsp;&nbsp;&nbsp;&nbsp;out(已用/额配 kbps):"+outbound+"/"+max_outbound;
														}
													}
												});
											html+="</td>" +
												"</tr>";
										    }
											if(R_R!=undefined&&R_R!=null&&R_R!==""){
											  //R_R是个数组，因为会有多个R_R
										    	$.each(R_R,function(i,val){
											  		if(val!=undefined&&val!=null&&val!==""){
										  		html+="<tr>" ;
											  			var src_ip;
											  			var src_id;
											  			var dest_ip;
														var dest_id;
														
														src_ip = val.src_ip;
														src_id = val.src_id;
														dest_ip = val.dest_ip;
														dest_id = val.dest_id;
														
														if(src_ip==undefined||src_ip==null||src_ip===""){
															src_ip = "无";
														}
														if(src_id==undefined||src_id==null||src_id===""){
															src_id = "无";
														}
														if(dest_ip==undefined||dest_ip==null||dest_ip===""){
															dest_ip = "无";
														}
														if(dest_id==undefined||dest_id==null||dest_id===""){
															dest_id = "无";
														}
											  		
											  		
												        var isused = val.isused;//是否使用了
												        if(isused==true){
															html += "<td style='word-break:break-all;' width='121px'>"+
																		src_ip+"("+src_id+")-><br/>"+dest_ip+"("+dest_id+")<br/>"+
															        "</td>";
												        }else{
															html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='121px'>"+
																		src_ip+"("+src_id+")-><br/>"+dest_ip+"("+dest_id+")<br/>"+
															        "</td>";
												        }
												        //R-R
												        var lost_RR = val.lost;//探测质量丢包率(%)/延时(毫秒)
												        var reallost_RR = val.reallost;//实际传输质量丢包率(%)/延时(毫秒)
												        var deflectlost_RR = val.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
												        var deflectdelay_RR = val.deflectdelay;//延时误差率
												        
												        delay_segment = val.delay;
											 		    realdelay_segment = val.realdelay;
											        	
												        if(lost_RR!=undefined&&lost_RR!=null&&lost_RR!==""){
												        	lost_RR = toFixed(lost_RR);
												        }else{
												        	
												        }
												        if(reallost_RR!=undefined&&reallost_RR!=null&&reallost_RR!==""){
												        	reallost_RR = toFixed(reallost_RR);
												        }else{
												        	reallost_RR = "无";
												        }
												        if(deflectlost_RR!=undefined&&deflectlost_RR!=null&&deflectlost_RR!==""){
												        	deflectlost_RR = toFixed(deflectlost_RR);
												        }else{
												        	deflectlost_RR = "无";
												        }
												        if(deflectdelay_RR!=undefined&&deflectdelay_RR!=null&&deflectdelay_RR!==""){
												        	deflectdelay_RR = toFixed(deflectdelay_RR);
												        }else{
												        	deflectdelay_RR = "无";
												        }
												        
												        if(delay_segment==undefined||delay_segment==null||delay_segment===""){
												        	delay_segment = "无";
												        }
												        if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
												        	realdelay_segment = "无";
												        }
												        
												        if(isused==true){
															html+="<td valign='top'>"+lost_RR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
															"<td valign='top'>"+reallost_RR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
															"<td valign='top'>"+deflectlost_RR+"&nbsp;/&nbsp;"+deflectdelay_RR+"</td>" +
															"<td>" ;
												        }else{
															html+="<td valign='top' style='color:RGB(128,128,128);'>"+lost_RR+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
															"<td valign='top' style='color:RGB(128,128,128);'>"+reallost_RR+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
															"<td valign='top' style='color:RGB(128,128,128);'>"+deflectlost_RR+"&nbsp;/&nbsp;"+deflectdelay_RR+"</td>" +
															"<td>" ;
												        }
														$.each(relay_info,function(m,v){
															if(v!=undefined&&v!=null&&v!=""){
																var payLoadInfo = v.payLoadInfo;
																var relayInfo = v.relayInfo;
																
																var cpu;
																var mem;
																var inbound;
																var outbound;
																
																var relayID;
																var name;
																var media_ip;
																var max_inbound;
																var max_outbound;
																
																if(payLoadInfo!=undefined&&payLoadInfo!=null&&payLoadInfo!==""){
																	cpu = payLoadInfo.cpu;
																	mem = payLoadInfo.mem;
																	inbound = payLoadInfo.inbound;
																	outbound = payLoadInfo.outbound;
																}
																
																if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
																	relayID = relayInfo.relayID;
																	//name =relayInfo.name;
																	//media_ip =relayInfo.media_ip;
																	//max_inbound =relayInfo.max_inbound;
																	//max_outbound =relayInfo.max_outbound;
																}
																
																if(mapRelay2Map!=undefined&&mapRelay2Map!=null&&mapRelay2Map!==""){
														    		mapRelay2Map.each(function(key,value,index){
														    			if(relayID!=undefined&&relayID!=null&&relayID!==""){
															    			if(relayID==key){
															    				if(value!=undefined&&value!=null&&value!==""){
																		    		/*
																		    		 * 基本信息
																		    		 */
																		    		//名字
																		    		name = value.name;
																		    		//媒体IP
											    									media_ip = value.media_ip;
																		    		//下行带宽
																		    		max_inbound = value.max_inbound;
																		    		//上行带宽
																		    		max_outbound = value.max_outbound;
															    				}
															    			}
														    			}
														    		});
																}
																
																if(cpu==undefined||cpu==null||cpu===""){
																	cpu = "无";
																}
																if(mem==undefined||mem==null||mem===""){
																	mem = "无";
																}
																if(inbound==undefined||inbound==null||inbound===""){
																	inbound = "无";
																}
																if(outbound==undefined||outbound==null||outbound===""){
																	outbound = "无";
																}
																
																
																if(relayID==undefined||relayID==null||relayID===""){
																	relayID = "无";
																}
																if(name==undefined||name==null||name===""){
																	name = "无";
																}
																if(media_ip==undefined||media_ip==null||media_ip===""){
																	media_ip = "无";
																}
																if(max_inbound==undefined||max_inbound==null||max_inbound===""){
																	max_inbound = "无";
																}
																if(max_outbound==undefined||max_outbound==null||max_outbound===""){
																	max_outbound = "无";
																}
																
																//只有U_R/R_R才显示relay信息，R_U不显示
																if(relayID==dest_id){
																	html+="<font style='color:RGB(32,169,9);font-size:12px;'>Name：</font>"+name+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>IP：</font>"+media_ip+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>CPU：</font>"+cpu+"&nbsp;&nbsp;&nbsp;&nbsp;"+
																	"<font style='color:RGB(32,169,9);font-size:12px;'>内存：</font>"+mem+
																	"<br/><font style='color:RGB(32,169,9);font-size:12px;'>带宽：</font>"+
																	"in(已用/额配 kbps):"+inbound+"/"+max_inbound+
																	"&nbsp;&nbsp;&nbsp;&nbsp;out(已用/额配 kbps):"+outbound+"/"+max_outbound;
																}
															}
														});
												html+="</td>" +
													"</tr>";
												  }
											  });
											}
										  //RU
											if(R_U!=undefined&&R_U!=null&&R_U!==""){
										 		html+="<tr>" ;
									 			var src_ip;
									 			var src_id;
									 			
									 			src_ip = R_U.src_ip;
									 			src_id = R_U.src_id;
									 			
									 			if(src_ip==undefined||src_ip==null||src_ip===""){
									 				src_ip = "无";
									 			}
									 			if(src_id==undefined||src_id==null||src_id===""){
									 				src_id = "无";
									 			}
									 	
												var isused = R_U.isused;//是否使用了
												if(isused==true){
													html += "<td style='word-break:break-all;' width='121px'>"+
																src_ip+"("+src_id+")->Ud"+
															"</td>" ;
												}else{
													html += "<td style='word-break:break-all;color:RGB(128,128,128);' width='121px'>"+
																src_ip+"("+src_id+")->Ud"+
															"</td>" ;
												}
												var lost_RU = R_U.lost;//探测质量丢包率(%)/延时(毫秒)
												var reallost_RU = R_U.reallost;//实际传输质量丢包率(%)/延时(毫秒)
												var deflectlost_RU = R_U.deflectlost;//偏离度丢包误差率(%)/延时误差率(%)
												var deflectdelay_RU = R_U.deflectdelay;//延时误差率
												
												delay_segment = R_U.delay;
									 		    realdelay_segment = R_U.realdelay;
												
												if(lost_RU!=undefined&&lost_RU!=null&&lost_RU!==""){
													lost_RU = toFixed(lost_RU);
												}else{
													lost_RU = "无";
												}
												if(reallost_RU!=undefined&&reallost_RU!=null&&reallost_RU!==""){
													reallost_RU = toFixed(reallost_RU);
												}else{
													reallost_RU = "无";
												}
												if(deflectlost_RU!=undefined&&deflectlost_RU!=null&&deflectlost_RU!==""){
													deflectlost_RU = toFixed(deflectlost_RU);
												}else{
													deflectlost_RU = "无";
												}
												if(deflectdelay_RU!=undefined&&deflectdelay_RU!=null&&deflectdelay_RU!==""){
													deflectdelay_RU = toFixed(deflectdelay_RU);
												}else{
													deflectdelay_RU = "无";
												}
												
												if(delay_segment==undefined||delay_segment==null||delay_segment===""){
										        	delay_segment = "无";
										        }
										        if(realdelay_segment==undefined||realdelay_segment==null||realdelay_segment===""){
										        	realdelay_segment = "无";
										        }
												
												if(isused==true){
													html+="<td valign='top'>"+lost_RU+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top'>"+reallost_RU+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top'>"+deflectlost_RU+"&nbsp;/&nbsp;"+deflectdelay_RU+"</td>" +
													"<td></td>";
												}else{
													html+="<td valign='top' style='color:RGB(128,128,128);'>"+lost_RU+"&nbsp;/&nbsp;"+delay_segment+"</td>" +
													"<td valign='top' style='color:RGB(128,128,128);'>"+reallost_RU+"&nbsp;/&nbsp;"+realdelay_segment+"</td>" +
													"<td valign='top' style='color:RGB(128,128,128);'>"+deflectlost_RU+"&nbsp;/&nbsp;"+deflectdelay_RU+"</td>" +
													"<td></td>";
												}
												html +="</tr>" ;
											}
											html += "</table>" +
												"</td>" +
											"</tr>";
									  	 }
									  });
								html += "</table>";
							html += "</td>" +
								"</tr>" ;
								}
							}
						});
					}else{
						html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
					}
				}else{
					html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
				}
			}else{
				html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
			}
		}else{
			html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
		}
	}else{
		html += "<tr><td colspan='10' align='center'>未获取到数据！</td></tr>" ;
	}
	html += "</table>";
	$('#callerreport_04').append(html);
}

/**
 * 5 选路策略 主被
 */
function setView05_zb(datas){
	var html="";
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var getpath = caller.getpath;
				if(getpath!=undefined&&getpath!=null&&getpath!==""){
					/*
					 * 策略信息
					 */
					var getpath_strategy = getpath.getpath_strategy;
					var transit_amplifying;//放大与否
					var quality_priority;//质量优先/价格优先
					var full_search;//完全搜索/不完全搜索
					var hops;//跳数
					var path_num;//条数
					
					if(getpath_strategy!=undefined&&getpath_strategy!=null&&getpath_strategy!==""){
						//放大与否
						transit_amplifying = getpath_strategy.transit_amplifying;
						if(transit_amplifying==true){
							transit_amplifying = "放大";
						}else{
							transit_amplifying = "不放大";
						}
						
						//质量优先/价格优先
						quality_priority = getpath_strategy.quality_priority;
						if(quality_priority==true){
							quality_priority = "质量优先";
						}else{
							quality_priority = "价格优先";
						}
						
						//完全搜索/不完全搜索
						full_search = getpath_strategy.full_search;
						if(full_search==true){
							full_search = "完全搜索";
						}else{
							full_search = "不完全搜索";
						}
						
						//跳数
						hops = getpath_strategy.hops;
						if(hops==1){
							hops = "一跳";
						}else if(hops==2){
							hops = "两跳";
						}
						
						//条数
						path_num = getpath_strategy.path_num;
						if(path_num!=undefined&&path_num!=null&&path_num!==""){
							path_num = path_num+"条";
						}
					}
						
					if(transit_amplifying==undefined||transit_amplifying==null||transit_amplifying===""){
						transit_amplifying = "无法确定是否放大";
					}
					if(quality_priority==undefined||quality_priority==null||quality_priority===""){
						quality_priority = "无法确定是质量优先还是价格优先";
					}
					if(full_search==undefined||full_search==null||full_search===""){
						full_search = "无法确定是完全搜索还是不完全搜索";
					}
					if(hops==undefined||hops==null||hops===""){
						hops = "无法确定几跳";
					}
					if(path_num==undefined||path_num==null||path_num===""){
						path_num = "无法确定几条";
					}
					html += "<div>" +
							     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(主->被)</b>："+transit_amplifying+"，  "+quality_priority+"，    "+full_search+"，   "+hops+"，  "+path_num +
						     "</div>" ;
				}else{
					html += "<div>" +
								     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(主->被)</b>：无信息" +
							"</div>" ;
				}
			}else{
				html += "<div>" +
							     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(主->被)</b>：无信息" +
						"</div>" ;
			}
		}else{
			html += "<div>" +
						     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(主->被)</b>：无信息" +
					"</div>" ;
		}
	}else{
		html += "<div>" +
					     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(主->被)</b>：无信息" +
				"</div>" ;
	}
	$('#callerreport_05').append(html);
}

/**
 * 5 选路策略 被主
 */
function setView05_bz(datas){
	var html="";
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var getpath = called.getpath;
				if(getpath!=undefined&&getpath!=null&&getpath!==""){
					/*
					 * 策略信息
					 */
					var getpath_strategy = getpath.getpath_strategy;
					
					var transit_amplifying;//放大与否
					var quality_priority;//质量优先/价格优先
					var full_search;//完全搜索/不完全搜索
					var hops;//跳数
					var path_num;//条数
					
					if(getpath_strategy!=undefined&&getpath_strategy!=null&&getpath_strategy!==""){
						//放大与否
						transit_amplifying = getpath_strategy.transit_amplifying;
						if(transit_amplifying==true){
							transit_amplifying = "放大";
						}else{
							transit_amplifying = "不放大";
						}
						
						//质量优先/价格优先
						quality_priority = getpath_strategy.quality_priority;
						if(quality_priority==true){
							quality_priority = "质量优先";
						}else{
							quality_priority = "价格优先";
						}
						
						//完全搜索/不完全搜索
						full_search = getpath_strategy.full_search;
						if(full_search==true){
							full_search = "完全搜索";
						}else{
							full_search = "不完全搜索";
						}
						
						//跳数
						hops = getpath_strategy.hops;
						if(hops==1){
							hops = "一跳";
						}else if(hops==2){
							hops = "两跳";
						}
						
						//条数
						path_num = getpath_strategy.path_num;
						if(path_num!=undefined&&path_num!=null&&path_num!==""){
							path_num = path_num+"条";
						}
					}
					if(transit_amplifying==undefined||transit_amplifying==null||transit_amplifying===""){
						transit_amplifying = "无法确定是否放大";
					}
					if(quality_priority==undefined||quality_priority==null||quality_priority===""){
						quality_priority = "无法确定是质量优先还是价格优先";
					}
					if(full_search==undefined||full_search==null||full_search===""){
						full_search = "无法确定是完全搜索还是不完全搜索";
					}
					if(hops==undefined||hops==null||hops===""){
						hops = "无法确定几跳";
					}
					if(path_num==undefined||path_num==null||path_num===""){
						path_num = "无法确定几条";
					}
						
					html += "<div>" +
							     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(被->主)</b>："+transit_amplifying+"，  "+quality_priority+"，    "+full_search+"，   "+hops+"，  "+path_num +
						     "</div>" ;
				}else{
					html += "<div>" +
								     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(被->主)</b>：无信息" +
							"</div>" ;
				}
			}else{
				html += "<div>" +
							     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(被->主)</b>：无信息" +
						"</div>" ;
			}
		}else{
			html += "<div>" +
						     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(被->主)</b>：无信息" +
					"</div>" ;
		}
	}else{
		html += "<div>" +
					     "&nbsp;&nbsp;&nbsp;&nbsp;<b>(被->主)</b>：无信息" +
				"</div>" ;
	}
	$('#callerreport_05').append(html);
}

/**
 * 计算百分比
 * @param {} loss 除数
 * @param {} recv　被除数
 * @return {String}
 */
function rate(loss,recv){
	if(parseInt(loss)>=0&&parseInt(recv)>=0){
		if(loss!=undefined&&loss!=null&&recv!=undefined&&recv!=null){
			if(recv==0&&loss!=0){
				return "数据有误";
			}else if(recv==0&&loss==0){
				return "未丢包";
			}else if(loss==0){
				return "0%";
			}
			//Math.round()返回数字最接近的整数，四舍五入
			//在本程序中，要求显示百分比时保留两位小数，所以以下公式先将float型数据乘以10000，
			//然后再通过Math.round()四舍五入取整，将四舍五入的结果再除以100，即得结果。
			// /100.00，因为保留了4位小数，那要显示百分比，必须得将保留的数除以100，如果是保留三位小数，要显示百分比，则是乘以1000除以10.00，如果是保留两位小数，要显示百分比，则是乘以100除以1.00
			return (Math.round(parseFloat(parseInt(loss) / parseInt(recv)) * 10000) / 100.00 + "%");
		}
	}else{
		return "数据有误";
	}
}