/*通话详情callDetail.jsp页面中“打洞信息”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#punch01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.punch_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.punch_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “打洞信息”标签页，主叫端数据
 * @param {} data
 */
function punchView_zb(datas){
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var punchCaller = call.punch;
					if(punchCaller!=undefined&&punchCaller!=null&&punchCaller!==""){
						//取出主叫端数据
						var punchArrCaller = punchCaller.split(' ');
						var map = new Map();
						for(var i=0;i<punchArrCaller.length;i++){
							map.put(punchArrCaller[i].split('=')[0],punchArrCaller[i].split('=')[1]);
						}
						
						var map1 = new Map();
						//共19个
						map1.put('eventtype','eventtype');
						map1.put('loc_host','本端Local');
						map1.put('loc_ref','本端nat');
						map1.put('loc_rel','本端服务器');
						map1.put('rem_host','远端Local');
						map1.put('rem_ref','远端nat');
						map1.put('rem_rel','远端服务器');
						
						map1.put('ice_res','ip:port:iceType(ice_res)');
						map1.put('loc_dom','本端地域编号(loc_dom)');
						map1.put('loc_isp','本端运营商编号(loc_isp)');
						map1.put('loc_dev','本端设备类型(loc_dev)');
						map1.put('loc_net','本端网路类型(loc_net)');
						map1.put('loc_os','本端操作系统(loc_os)');
						map1.put('loc_user_Type','本端用户级别(loc_user_Type)');
						map1.put('rem_dom','远端地域编号(rem_dom)');
						map1.put('rem_isp','远端运营商编号(rem_isp)');
						map1.put('rem_dev','远端设备类型(rem_dev)');
						map1.put('rem_net','远端网路类型(rem_net)');
						map1.put('rem_os','远端操作系统(rem_os)');
						map1.put('rem_user_Type','远端用户级别(rem_user_Type)');
						map1.put('time','time');
						
						//打洞类型
						var iceType;	
						var ice_res = map.get('ice_res');
						iceType = ice_res.split(':')[2];
						
						var html = "";
						
						html += "<div style='margin-left:10px;float:left;width:200px;'>&nbsp;&nbsp;<b>打洞类型(iceType)</b></div><div style='margin-bottom:-18px;'><b>="+iceType+"</b></div><br/>";
						map.each(function(key,value,i){
							html += "<div style='margin-left:10px;float:left;width:200px;'>"+(i+1)+"&nbsp;&nbsp;"+map1.get(key)+"</div>" +
									"<div style='margin-bottom:-18px;' id='"+key+"_zb'>="+value+"&nbsp;&nbsp;</div><br/>";
						});
						
						//展示与nat相关的ip的相关信息
						var loc_host;//与本端Local的ip相关的信息
						var loc_ref_info;//与本端nat的ip相关的信息
						var loc_rel_info;//与本端服务器的ip相关的信息
						var rem_host;//与远端Local的ip相关的信息
						var rem_ref_info;//与远端nat的ip相关的信息
						var rem_rel_info;//与远端服务器的ip相关的信息
						
						//与本端Local的ip相关的信息
						loc_host_info = map.get('loc_host');
						if(loc_host_info!=undefined&&loc_host_info!=null&&loc_host_info!==""){
							var loc_host_info_arr = loc_host_info.split(":");
							if(loc_host_info_arr!=undefined&&loc_host_info_arr!=null&&loc_host_info_arr!==""&&loc_host_info_arr.length>0){
								var ip = loc_host_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_host_zb');
									}
								}
							}
						}
						//与本端nat的ip相关的信息
						loc_ref_info = map.get('loc_ref');
						if(loc_ref_info!=undefined&&loc_ref_info!=null&&loc_ref_info!==""){
							var loc_ref_info_arr = loc_ref_info.split(":");
							if(loc_ref_info_arr!=undefined&&loc_ref_info_arr!=null&&loc_ref_info_arr!==""&&loc_ref_info_arr.length>0){
								var ip = loc_ref_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_ref_zb');
									}
								}
							}
						}
						//与本端服务器的ip相关的信息
						loc_rel_info = map.get('loc_rel');
						if(loc_rel_info!=undefined&&loc_rel_info!=null&&loc_rel_info!==""){
							var loc_rel_info_arr = loc_rel_info.split(":");
							if(loc_rel_info_arr!=undefined&&loc_rel_info_arr!=null&&loc_rel_info_arr!==""&&loc_rel_info_arr.length>0){
								var ip = loc_rel_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_rel_zb');
									}
								}
							}
						}
						//与远端Local的ip相关的信息
						rem_host_info = map.get('rem_host');
						if(rem_host_info!=undefined&&rem_host_info!=null&&rem_host_info!==""){
							var rem_host_info_arr = rem_host_info.split(":");
							if(rem_host_info_arr!=undefined&&rem_host_info_arr!=null&&rem_host_info_arr!==""&&rem_host_info_arr.length>0){
								var ip = rem_host_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_host_zb');
									}
								}
							}
						}
						//与远端nat的ip相关的信息
						rem_ref_info = map.get('rem_ref');
						if(rem_ref_info!=undefined&&rem_ref_info!=null&&rem_ref_info!==""){
							var rem_ref_info_arr = rem_ref_info.split(":");
							if(rem_ref_info_arr!=undefined&&rem_ref_info_arr!=null&&rem_ref_info_arr!==""&&rem_ref_info_arr.length>0){
								var ip = rem_ref_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_ref_zb');
									}
								}
							}
						}
						//与远端服务器的ip相关的信息
						rem_rel_info = map.get('rem_rel');
						if(rem_rel_info!=undefined&&rem_rel_info!=null&&rem_rel_info!==""){
							var rem_rel_info_arr = rem_rel_info.split(":");
							if(rem_rel_info_arr!=undefined&&rem_rel_info_arr!=null&&rem_rel_info_arr!==""&&rem_rel_info_arr.length>0){
								var ip = rem_rel_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_rel_zb');
									}
								}
							}
						}
						html += "注： 以上展示的与IP相关的地域、运营商信息是通过淘宝的接口查询得出的。";
						$('#punch_zb').html(html);
					}
				}
			}
		}
	}
}

/**
 * “打洞信息”标签页，被叫端数据
 * @param {} data
 */
function punchView_bz(datas){
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var punchCalled = call.punch;
					if(punchCalled!=undefined&&punchCalled!=null&&punchCalled!==""){
						//取出被叫端数据
						var punchArrCalled = punchCalled.split(' ');
						var map = new Map();
						for(var i=0;i<punchArrCalled.length;i++){
							map.put(punchArrCalled[i].split('=')[0],punchArrCalled[i].split('=')[1]);
						}
						
						var map1 = new Map();
						//共19个
						map1.put('eventtype','eventtype');
						
						map1.put('loc_host','本端Local');
						map1.put('loc_ref','本端nat');
						map1.put('loc_rel','本端服务器');
						map1.put('rem_host','远端Local');
						map1.put('rem_ref','远端nat');
						map1.put('rem_rel','远端服务器');
						
						map1.put('ice_res','ip:port:iceType(ice_res)');
						map1.put('loc_dom','本端地域编号(loc_dom)');
						map1.put('loc_isp','本端运营商编号(loc_isp)');
						map1.put('loc_dev','本端设备类型(loc_dev)');
						map1.put('loc_net','本端网路类型(loc_net)');
						map1.put('loc_os','本端操作系统(loc_os)');
						map1.put('loc_user_Type','本端用户级别(loc_user_Type)');
						map1.put('rem_dom','远端地域编号(rem_dom)');
						map1.put('rem_isp','远端运营商编号(rem_isp)');
						map1.put('rem_dev','远端设备类型(rem_dev)');
						map1.put('rem_net','远端网路类型(rem_net)');
						map1.put('rem_os','远端操作系统(rem_os)');
						map1.put('rem_user_Type','远端用户级别(rem_user_Type)');
						map1.put('time','time');
						
						//打洞类型
						var iceType;	
						var ice_res = map.get('ice_res');
						iceType = ice_res.split(':')[2];
						
						var html = "";
						html += "<div style='margin-left:10px;float:left;width:200px;'>&nbsp;&nbsp;<b>打洞类型(iceType)</b></div><div style='margin-bottom:-18px;'><b>="+iceType+"</b></div><br/>";
						map.each(function(key,value,i){
							html += "<div style='margin-left:10px;float:left;width:200px;'>"+(i+1)+"&nbsp;&nbsp;"+map1.get(key)+"</div>" +
									"<div style='margin-bottom:-18px;' id='"+key+"_bz'>="+value+"&nbsp;&nbsp;</div><br/>";
						});
						//展示与nat相关的ip的相关信息
						var loc_host;//与本端Local的ip相关的信息
						var loc_ref_info;//与本端nat的ip相关的信息
						var loc_rel_info;//与本端服务器的ip相关的信息
						var rem_host;//与远端Local的ip相关的信息
						var rem_ref_info;//与远端nat的ip相关的信息
						var rem_rel_info;//与远端服务器的ip相关的信息
						
						//与本端Local的ip相关的信息
						loc_host_info = map.get('loc_host');
						if(loc_host_info!=undefined&&loc_host_info!=null&&loc_host_info!==""){
							var loc_host_info_arr = loc_host_info.split(":");
							if(loc_host_info_arr!=undefined&&loc_host_info_arr!=null&&loc_host_info_arr!==""&&loc_host_info_arr.length>0){
								var ip = loc_host_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_host_bz');
									}
								}
							}
						}
						//与本端nat的ip相关的信息
						loc_ref_info = map.get('loc_ref');
						if(loc_ref_info!=undefined&&loc_ref_info!=null&&loc_ref_info!==""){
							var loc_ref_info_arr = loc_ref_info.split(":");
							if(loc_ref_info_arr!=undefined&&loc_ref_info_arr!=null&&loc_ref_info_arr!==""&&loc_ref_info_arr.length>0){
								var ip = loc_ref_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_ref_bz');
									}
								}
							}
						}
						//与本端服务器的ip相关的信息
						loc_rel_info = map.get('loc_rel');
						if(loc_rel_info!=undefined&&loc_rel_info!=null&&loc_rel_info!==""){
							var loc_rel_info_arr = loc_rel_info.split(":");
							if(loc_rel_info_arr!=undefined&&loc_rel_info_arr!=null&&loc_rel_info_arr!==""&&loc_rel_info_arr.length>0){
								var ip = loc_rel_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'loc_rel_bz');
									}
								}
							}
						}
						//与远端Local的ip相关的信息
						rem_host_info = map.get('rem_host');
						if(rem_host_info!=undefined&&rem_host_info!=null&&rem_host_info!==""){
							var rem_host_info_arr = rem_host_info.split(":");
							if(rem_host_info_arr!=undefined&&rem_host_info_arr!=null&&rem_host_info_arr!==""&&rem_host_info_arr.length>0){
								var ip = rem_host_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_host_bz');
									}
								}
							}
						}
						//与远端nat的ip相关的信息
						rem_ref_info = map.get('rem_ref');
						if(rem_ref_info!=undefined&&rem_ref_info!=null&&rem_ref_info!==""){
							var rem_ref_info_arr = rem_ref_info.split(":");
							if(rem_ref_info_arr!=undefined&&rem_ref_info_arr!=null&&rem_ref_info_arr!==""&&rem_ref_info_arr.length>0){
								var ip = rem_ref_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_ref_bz');
									}
								}
							}
						}
						//与远端服务器的ip相关的信息
						rem_rel_info = map.get('rem_rel');
						if(rem_rel_info!=undefined&&rem_rel_info!=null&&rem_rel_info!==""){
							var rem_rel_info_arr = rem_rel_info.split(":");
							if(rem_rel_info_arr!=undefined&&rem_rel_info_arr!=null&&rem_rel_info_arr!==""&&rem_rel_info_arr.length>0){
								var ip = rem_rel_info_arr[0];
								if(ip!=undefined&&ip!=null&&ip!==""){
									if(isIP(ip)){
										getIp(ip,'rem_rel_bz');
									}
								}
							}
						}
						html += "注： 以上展示的与IP相关的地域、运营商信息是通过淘宝的接口查询得出的。";
						$('#punch_bz').html(html);
					}
				}
			}
		}
	}
}