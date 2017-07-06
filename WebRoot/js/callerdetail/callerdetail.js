/* 通话详情callDetail.jsp页面的总体js效果 */

/* 顶部固定信息的视图显示 */
/* 包括顶部的八大标签点击效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#callerdetail_div > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.callerdetail_tabs li a').click(function() {
						//var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.callerdetail_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

/**
 * 顶部固定信息
 * 
 * @param {}
 *            data
 */
function summaryView(datas,sid) {
	
	var map = new Map();
	
	//以下map的key是为了向前兼容
	map.put('100','通话中，本端对远端的点对点心跳超时【可能对端异常退出或对方网络异常】');
	map.put('101','wifi切换时，若有呼叫，清除呼叫，上报挂断事件');
	map.put('102','主叫getRtpCandisates失败(音频/视频/单路/多路 获取打洞息失败)，上报挂断事件');
	
	map.put('103','建路超时');
	map.put('104','主叫getPath()失败');
	map.put('210','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 RelayServer返回错误');
	map.put('211','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 客户端在RelayServer上的映射端口发生变化');
	map.put('212','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 向RelayServer发送心跳消息超时');
	map.put('213','建路会话保活超时，挂断呼叫');
	map.put('403','禁止呼叫');
	map.put('404','查找被叫失败(被叫不在线)');
	map.put('405','被叫不可达(INVITE发送失败)');
	map.put('408','超时或无人应答');
	map.put('410','用户被踢时，挂断呼叫');
	map.put('481','事务不存在');
	map.put('486','被叫忙');
	map.put('487','主叫取消呼叫');
	map.put('4861','主叫SDP携带信息不完整');
	map.put('4862','被叫getRtpCanditates失败，被叫获得打洞地址失败');
	map.put('4863','被叫getPath失败');
	map.put('4864','解析主叫的UserInfo失败');
	map.put('603','被叫主动拒绝');
	map.put('16','找不到SN');
	map.put('17','找不到BootStrap');
	map.put('37','NO_UCS 【连接UCS失败】');
	map.put('38','UCS_CHANGE_FAILED 【UCS切换失败】');
	map.put('-1','no call 【呼叫不存在】');
	map.put('-2','OSIP_BADPARAMETER 【OSIP协议栈参数错误】');
	map.put('-3','OSIP_WRONG_STATE 【OSIP协议栈状态错误】');
	map.put('1000','打开摄像头失败');
	map.put('1001','本地预览的控件失效');
	map.put('1002','显示远端视频的控件失效');
	//以上是为了向前兼容
	
	//以下是最新的对照表
	//Host引起的挂断原因
	map.put('2016','Host超时，同步接口结束');
	map.put('2020','用户被踢时，挂断呼叫');
	map.put('2069','HOST未连接');
	map.put('2078','UCS未连接HOST');
	map.put('2079','DHT未连接HOST');
	map.put('2080','CM未连接HOST');
	map.put('2081','DHT未JOIN');
	map.put('2098','与HOST断开');
	map.put('2099','UCS异常，在场服务断开');
	map.put('2101','UCS异常，通讯录断开');
	map.put('2103','UCS异常，用户中心断开');
	
	//SIP SDK引起的挂断原因
	//基础类，错误码
	map.put('4500','SIP协议栈失败Base，错误码+-10');
	map.put('4810','本地没有该呼叫');
	map.put('4811','对端收到OPTION时，由于当前无呼叫回复481，导致本端挂断');
	map.put('4820','主叫版本低');
	map.put('4821','被叫版本低');
	map.put('4822','被叫自适应信息为空');
	
	//主叫错误，原因码
	map.put('4849','主叫忙');
	map.put('4850','主叫查询被叫失败');
	map.put('4851','主叫获取SID失败');
	map.put('4852','主叫GetPath失败');
	map.put('4853','主叫获取打洞信息失败');
	map.put('4854','主叫建路失败');
	map.put('4855','主叫呼叫自己');
	map.put('4856','SDK不支持视频呼叫');
	map.put('4857','INVITE后没有收到SIP应答响应');
	map.put('4858','主叫查询被叫超时');
	map.put('4859','INVITE后没有收到任何SIP响应');
	
	//被叫错误，原因码
	map.put('4860','被叫忙，拒接');
	map.put('4861','被叫解析主叫SDP空');
	map.put('4862','被叫GetPath失败');
	map.put('4863','被叫获取打洞信息失败');
	map.put('4864','被叫建路失败');
	map.put('4865','被叫拒接陌生人呼叫 SIP 403');
	
	//媒体协商错误 原因码
	map.put('4880','媒体变更失败');
	map.put('4881','音频协商失败');
	map.put('4882','视频协商失败');
	map.put('4883','媒体变更时对端呼叫不存在');
	map.put('4910','媒体变更冲突');
	
	//挂断呼叫 原因码
	map.put('6030','被叫拒接 SIP 603');
	map.put('6031','主叫用户取消呼 SIP CANCEL');
	map.put('6032','主叫外呼超时,70s后主叫主动挂断呼叫');
	map.put('6033','被叫应答超时,60s后被叫主动挂断呼叫');
	map.put('6034','与Host保活超时(HC错误码)');
	map.put('6035','Media通道保活全部失败');
	map.put('6036','通话中SIP 点对点（P2P）的保活超时');
	map.put('6100','打开摄像头失败，挂断呼叫');
	map.put('6101','本端视频预览控件失效，挂断呼叫');
	map.put('6102','显示远端视频控件失效，挂断呼叫');
	map.put('6103','网络切换，挂断呼叫');
	map.put('48501','获取被叫信息被取消');
	
	map.put('60001','监控未开启');
	map.put('60002','监控密码错误');
	map.put('60003','监控接连中，摄像头被占用');
	map.put('60004','监控中，取消关联');
	map.put('60005','监控中，关闭看家');
	map.put('60006','监控打开摄像头失败，挂断监控');
	
	//自定义
	map.put('-10000','未收到挂机事件');
	
	map.put('4850','场景：主叫获取对端UserInfo信息失败。<br/>主叫汇报内容：SIP呼叫事件（sip_event_disconnected  reason=4850）被叫汇报内容：空');
	map.put('4852','场景：主叫GetPath失败。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_disconnected  reason=4852）2、从rc获取过路径。被叫汇报内容：空');
	map.put('4860','场景1：被叫忙（被叫正在通话中）；<br/>场景2：同时A呼B，B呼C，B与C正常建立呼叫，B的SDK底层自动取消来自A的呼叫；<br/>场景3：A呼B，B振铃后，C呼B，B的底层将C的呼叫自动拒接，最后B点击“接受”，A能与B正常的建立呼叫。<br/>场景1、2、3主叫汇报内容：<br/>&nbsp;&nbsp;&nbsp;&nbsp;1、SIP呼叫事件（sip_event_inprogess、sip_event_disconnected  reason=4860）2、GetPath结果统计信息（rpath）从rc获取过路径。被叫汇报内容：空<br/>场景4：A，B同时呼叫对方。<br/>主叫汇报内容：<br/>&nbsp;&nbsp;&nbsp;&nbsp;1、SIP呼叫事件（sip_event_disconnected reason=4860、sip_event_inprogess）2、GetPath结果统计信息（rpath）3、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=4860、sip_event_inprogess）2、GetPath结果统计信息（rpath）3、从rc获取过路径。');
	map.put('6030','场景：1、被叫忙（被叫主动挂断）；2、A，B接通后，同时挂断呼叫。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_m_ringing、sip_event_disconnected  reason=6030、sip_event_inprogess）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=0、 sip_event_newcall）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。');
	map.put('6031','场景1：被叫无人应答（主叫主动挂断）。<br/>主叫汇报内容：<br/>&nbsp;&nbsp;&nbsp;&nbsp;1、SIP呼叫事件（sip_event_m_ringing、sip_event_inprogess、sip_event_disconnected reason=0）2、打洞结果3、GetPath结果统计信息（rpath）4、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_newcall、sip_event_disconnected reason=6031）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。<br/>场景2：A呼叫B后，同时A取消呼叫，B应答。<br/>主叫汇报内容：<br/>&nbsp;&nbsp;&nbsp;&nbsp;1、SIP呼叫事件（sip_event_m_ringingsip_event_disconnected reason=0sip_event_inprogess）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=6031sip_event_newcall）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。');
	map.put('4859','场景：被叫没有响应（A呼叫B前，B下线，A马上呼叫B）。<br/>主叫汇报内容：1、	SIP呼叫事件（sip_event_disconnected reason=4859）2、	GetPath结果统计信息（rpath）3、	从rc获取过路径。被叫汇报内容：空');
	map.put('6032','场景：被叫没有响应（主叫70秒挂机）。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_inprogess、sip_event_m_ringing、sip_event_disconnected reason=1）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、	从rc获取过路径。被叫汇报内容：1、	SIP呼叫事件（sip_event_newcall、sip_event_disconnected reason=6032）2、	打洞结果3、	GetPath结果统计信息（lpath和rpath）4、	从rc获取过路径。');
	map.put('6033','场景：被叫无人应答（60秒超时应用挂断）。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_inprogess、sip_event_m_ringing、sip_event_disconnected reason=6033）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=1、sip_event_newcall）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。');
	map.put('4865','场景：禁止呼叫（A给B打电话，当B的好友中没A，并且B开启了“拒绝陌生人呼叫”设置，则B给A回403 禁止呼叫）。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_inprogess、sip_event_m_ringing、sip_event_disconnected reason=4865）2、打洞结果3、GetPath结果统计信息（rpath）4、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=0、sip_event_newcall）2、打洞结果3、GetPath结果统计信息（lpath和rpath）4、从rc获取过路径。');
	map.put('4881','场景：音频媒体协商失败。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=4881或4882、sip_event_inprogess）2、GetPath结果统计信息（rpath）3、从rc获取过路径。被叫汇报内容：空');
	map.put('4882','场景：视频媒体协商失败。<br/>主叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=4881或4882、sip_event_inprogess）2、GetPath结果统计信息（rpath）3、从rc获取过路径。被叫汇报内容：空');
	map.put('2020','场景：通话中用户被踢（A与B通话，C以B的登录号同时上线，B被踢掉）。<br/>主叫汇报内容：无挂机事件，其他信息正常汇报。被叫汇报内容：被叫挂机事件reason=2020，其他信息正常汇报。');
	map.put('-1000','未收到挂机事件');
	//map.put('0','主叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=0sip_event_inprogess）2、GetPath结果统计信息（rpath）3、从rc获取过路径。被叫汇报内容：1、SIP呼叫事件（sip_event_disconnected reason=0sip_event_newcall）2、GetPath结果统计信息（lpath和rpath）3、打洞结果4、从rc获取过路径。');
	
	var data;
	var caller;
	var called;
	var call;
	var total;
	var streamSummary;
	var summary;
	
	// 会话ID
	var sids ;
	// 主叫端
	var callerid ;
	// 被叫端
	var calledid;
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

	//挂断原因及汇报内容相关
	var event;
	var eventinfo ;
	var eventinfoArr ;
	var map1 = new Map();
	var map2 = new Map();
	var reason1;
	var reason2;
	var error1;
	var error2;
	
	var comlogRec_caller;//是否汇报完整
	var realCount_caller;//实际收到多少条话务日志
	var recordCount_caller;//应该收到多少条话务日志
	
	var comlogRec_called;//是否汇报完整
	var realCount_called;//实际收到多少条话务日志
	var recordCount_called;//应该收到多少条话务日志
	
	var result = datas.result;
	//取出概要信息，默认按主的取，如果主的不存在，再按被的取，都没有，则显示无。
	if(result===0){
		data = datas.data;
		if (data != undefined && data != null&&data!=="") {
			caller = data.caller;
			if(caller != undefined && caller != null&&caller!==""){
				call = caller.call;
				if(call != undefined && call != null&&call!==""){
					total = call.total;
					if(total != undefined && total != null&&total!==""){
						summary = total.summary;
						if(summary != undefined && summary != null&&summary!==""){
							// 主叫端
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
							}else{//采用被叫数据
							//------------
								called = data.called;
								if(called != undefined && called != null&&called!==""){
									call = called.call;
									if(call != undefined && call != null&&call!==""){
										total = call.total;
										if(total != undefined && total != null&&total!==""){
											summary = total.summary;
											if(summary != undefined && summary != null&&summary!==""){
												// 主叫端
												calledid = summary.called;
												//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
												if(sid.split('_')[5]==calledid){//采用主叫数据
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
							if(called != undefined && called != null&&called!==""){
								call = called.call;
								if(call != undefined && call != null&&call!==""){
									total = call.total;
									if(total != undefined && total != null&&total!==""){
										summary = total.summary;
										if(summary != undefined && summary != null&&summary!==""){
											// 主叫端
											calledid = summary.called;
											//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
											if(sid.split('_')[5]==calledid){//采用主叫数据
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
						if(called != undefined && called != null&&called!==""){
							call = called.call;
							if(call != undefined && call != null&&call!==""){
								total = call.total;
								if(total != undefined && total != null&&total!==""){
									summary = total.summary;
									if(summary != undefined && summary != null&&summary!==""){
										// 主叫端
										calledid = summary.called;
										//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
										if(sid.split('_')[5]==calledid){//采用主叫数据
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
					if(called != undefined && called != null&&called!==""){
						call = called.call;
						if(call != undefined && call != null&&call!==""){
							total = call.total;
							if(total != undefined && total != null&&total!==""){
								summary = total.summary;
								if(summary != undefined && summary != null&&summary!==""){
									// 主叫端
									calledid = summary.called;
									//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
									if(sid.split('_')[5]==calledid){//采用主叫数据
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
			}else{//在caller不存在的情况下，采用被叫数据
				called = data.called;
				if(called != undefined && called != null&&called!==""){
					call = called.call;
					if(call != undefined && call != null&&call!==""){
						total = call.total;
						if(total != undefined && total != null&&total!==""){
							summary = total.summary;
							if(summary != undefined && summary != null&&summary!==""){
								// 主叫端
								calledid = summary.called;
								//为了让“通话时长”与查询页面显示的一致，此处需将查询页面传来的sid与此处的进行比较，与主叫的相同，“通话时长”显示主叫的，与被叫的相同，“通话时长”显示被叫的
								if(sid.split('_')[5]==calledid){//采用主叫数据
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
	
	//取错误码，主被都取
	if(result===0){
		data = datas.data;
		if (data != undefined && data != null&&data!=="") {
			//取出主的错误码
			caller = data.caller;
			if(caller != undefined && caller != null&&caller!==""){
				call = caller.call;
				if(call != undefined && call != null&&call!==""){
					event = call.event;
					if(event!=undefined&&event!=null&&event!==""){
						var tag = 0;
						$.each(event,function(i,val){
							eventinfo = val.eventinfo;
							eventinfoArr = eventinfo.split(' ');
							$.each(eventinfoArr,function(j,va){
								//只将含有“event=sip_event_disconnected”的记录存入map中
								if(va.split('=')[1]=="sip_event_disconnected"){
									$.each(eventinfoArr,function(jj,v){
										map1.put(v.split('=')[0],v.split('=')[1]);
									});
									tag = 1;
									return;
								}
							});
							//一旦找到含有“event=sip_event_disconnected”的记录，进行map操作后即退出循环
							if(tag==1){
								return;
							}
						});
					}
					
				}
			}
			//取出被的错误码
			called = data.called;
			if(called != undefined && called != null&&called!==""){
				call = called.call;
				if(call != undefined && call != null&&call!==""){
					event = call.event;
					if(event!=undefined&&event!=null&&event!==""){
						var tag = 0;
						$.each(event,function(i,val){
							eventinfo = val.eventinfo;
							eventinfoArr = eventinfo.split(' ');
							$.each(eventinfoArr,function(j,va){
								//只将含有“event=sip_event_disconnected”的记录存入map中
								if(va.split('=')[1]=="sip_event_disconnected"){
									$.each(eventinfoArr,function(jj,v){
										map2.put(v.split('=')[0],v.split('=')[1]);
									});
									tag = 1;
									return;
								}
							});
							//一旦找到含有“event=sip_event_disconnected”的记录，进行map操作后即退出循环
							if(tag==1){
								return;
							}
						});
					}
				}
			}
			
			//取出主被的原因值
			reason1 = map1.get('reason');
			reason2 = map2.get('reason');

			//reason为0的是正常，不显示，要排除掉
			if(reason1!=undefined&&reason1!=null&&reason1!==""){//主
				error1 = map.get(reason1);
			}
			if(reason2!=undefined&&reason2!=null&&reason2!==""){//被
				error2 = map.get(reason2);
			}
		}
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
					
					comlogRec_caller = call.comlogRec;
					realCount_caller = call.realCount;
					recordCount_caller = call.recordCount;
					
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
					
					comlogRec_called = call.comlogRec;//汇报是否完整
					realCount_called = call.realCount;//实际汇报
					recordCount_called = call.recordCount;//应该汇报
					
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
				+ "<span class='summaryStyle'>通话时长：</span>" + duration +"<br/>";
				/*+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>道路切换：</span>" + count
				+ "次&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>fec恢复前的视频丢包率：</span>" + recvVideoLossR
				+ "%&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>音频丢包率：</span>" + recvAudioLossR + "%<br/>"*/
				
		html += "主叫收包："+
				"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_caller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>道路切换次数：</span>"+countcaller+
				"【话务报告汇报情况：" +
				"<span class='summaryStyle'>";
					if(comlogRec_caller!=undefined&&comlogRec_caller!=null&&comlogRec_caller!==""){
						if(comlogRec_caller==true){
							html += "完整。";
						}else{
							html += "不完整！";
						}
					}else{
						html += "无";
					}
					if (recordCount_caller != undefined && recordCount_caller != null && recordCount_caller !== "") {
						html += "应该汇报"+recordCount_caller+"条话务日志，";
					}
					if (realCount_caller != undefined && realCount_caller != null && realCount_caller !== "") {
						html += "实际汇报"+realCount_caller+"条话务日志";
					}
		html += "</span>】<br/>" +
				"被叫收包："+
				"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_called+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>道路切换次数：</span>"+countcalled+
		 		"【话务报告汇报情况：" +
				"<span class='summaryStyle'>";
					if(comlogRec_called!=undefined&&comlogRec_called!=null&&comlogRec_called!==""){
						if(comlogRec_called==true){
							html += "完整。";
						}else{
							html += "不完整！";
						}
					}else{
						html += "无";
					}
					if (recordCount_called != undefined && recordCount_called != null && recordCount_called !== "") {
						html += "应该汇报"+recordCount_called+"条话务日志，";
					}
					if (realCount_called != undefined && realCount_called != null && realCount_called !== "") {
						html += "实际汇报"+realCount_called+"条话务日志";
					}
		html += "</span>】<br/>";
				
		html += "<span id='topon' class='summaryStyle'>&nbsp;<b>挂断原因及汇报内容：</b><font style='color:#35A368;'><b>OPEN</b></font></span>"
				+"<span id='topoff' class='summaryStyle' style='display:none;'>&nbsp;<b>挂断原因及汇报内容：</b><font style='color:#FD042E;'><b>CLOSE</b></font></span>"
				+"<div id='topreason' style='display:none;'>";
				//主被都不存在时，显示无
				if((error1==undefined||error1==null||error1==="")&&(error2==undefined||error2==null||error2==="")){
					html += "无";
				}else{
					//主的存在显示主的，并换行，不存在不显示
					if(error1!=undefined&&error1!=null&&error1!==""){
						html +="<b>主叫：</b><br/>"+ error1+"<br/>";
					}else{
						html +="<b>主叫：</b>无<br/>";
					}
					//被的存在显示被的，不存在不显示
					if(error2!=undefined&&error2!=null&&error2!==""){
						html +="<b>被叫：</b><br/>"+ error2;
					}else{
						html +="<b>被叫：</b>无<br/>";
					}
				} 
				html+="</div>";
	$('#callerdetail_summary').html(html);
}
