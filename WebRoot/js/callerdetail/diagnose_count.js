/**
 * 查询页面，按诊断结果进行统计，显示饼图的数据处理
 * @param {} datas
 */
var diagnosePieArr = new Array();//饼图的二维数组
var diagnosePieMap = new Map();//饼图的Map，点击饼图时显示sid

/**
 * 处理按诊断结果进行统计的数据
 * @param {} datas 
 */
function diagnoseCountPieData(datas){
	diagnosePieArr = new Array();//饼图的二维数组
	diagnosePieMap = new Map();//饼图的Map，点击饼图时显示sid
	var result = datas.result;
	if(result===0){
		var object = datas.object;
		if(object!=undefined&&object!=null&&object!==""){
			var index = 0;
			$.each(object,function(key){
				if(key!=undefined&&key!=null&&key!==""){
					var diagnoseName = diagnose_result_map.get(key);
					var arr = new Array();
					if(diagnoseName!=undefined&&diagnoseName!=null&&diagnoseName!==""){
						arr[0] = diagnoseName;
					}else{
						arr[0] = "不明原因";
					}
					
					var count = object[key].count;
					if(count!=undefined&&count!=null&&count!==""){
						arr[1] = stringToNumber(count);
						diagnosePieArr[index] = arr;
						index++;
					
					}
					
					var sid = object[key].sid;
					if(sid!=undefined&&sid!=null&&sid!==""){
						diagnosePieMap.put("diagnose_"+key,sid);
					}
					
				}
			});
			diagnoseViewPie("diagnosePie");
		}else{
			$("#diagnosePie").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		}
	}else{
		$("#diagnosePie").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
	}
}

/**
 * 查询页面/诊断结果/统计
 */
function diagnoseViewPie(renderTo){
	new Highcharts.Chart({
        chart: {
            type: 'pie',
            renderTo: renderTo,//显示到页面上的位置
            //height:200,//高度
            //width:200,//宽度
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            //animation:false,//动画，默认true
            backgroundColor: 'rgba(0,0,0,0)'
        },
         exporting:{
           enabled:false//用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示
        },
        title: {
            text: '不同类型诊断结果统计概况'
        },
        subtitle:{
        	//text:''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        	//formatter : function() {
        	//	var yName = this.series.name;
        	//}
        },
        credits:{//配置右下角版权链接
            enabled:false,
            href:'http://www.butel.com/',
            text:'【Butel】',
            style:{
                color:'#0000FF',
                fontSize:'19',
                fontWeight:'bold'
            }
        }, 
        plotOptions: {
             pie: {
                innerSize: 100,
                depth: 45,
                showInLegend: true//显示图例
            },
            series: {
                cursor: 'pointer',
                events: {//点击触发事件
                    click: function(event) {
                        //alert(event.point.name);
                    	var name = event.point.name;
                    	var sids;
                    	if(name=="质量好"){
                    		sids = diagnosePieMap.get("diagnose_0");
                    	}else if(name=="信号不好"){
                    		sids = diagnosePieMap.get("diagnose_1");
                    	}else if(name=="GetPath未找到最优中转"){
                    		sids = diagnosePieMap.get("diagnose_2");
                    	}else if(name=="部署问题"){
                    		sids = diagnosePieMap.get("diagnose_3");
                    	}else if(name=="接入拥塞"){
                    		sids = diagnosePieMap.get("diagnose_4");
                    	}else if(name=="严重接入拥塞"){
                    		sids = diagnosePieMap.get("diagnose_5");
                    	}else if(name=="其它"){
                    		sids = diagnosePieMap.get("diagnose_6");
                    	}else if(name=="未知"){
                    		sids = diagnosePieMap.get("diagnose_7");
                    	}else if(name=="不明原因"){
                    		sids = diagnosePieMap.get("diagnose_-1");
                    	}
                    	
                    	diagnoseRetName = name;
                    	
                    	if(sids!=undefined&&sids!=null&&sids!==""){
                    		sidList = sids;
                    		var nextPage = diagnosePageSize;
                    		showSidList(nextPage);
                    	}
                    	
                    }
                }
            }
        },
        legend: {
            enabled: true,//是否显示图例，默认true
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
        	name:'比例',
        	data:diagnosePieArr
        }]
    });
}

var sidList;//保存sid全局变量
var funcNameDiagnose = "showSidList";
var diagnosePageSize = 15;//每页显示15条记录
var diagnoseRetName;
/**
 * 点击饼图时显示相应的sid列表到页面上
 * @param {} sids
 */
function showSidList(nextPage){
	var html = "";
	if(sidList!=undefined&&sidList!=null&&sidList!==""&&(sidList instanceof Array)&&sidList.length>0){
		var resNum = -1;//目前循环到的下标
		var sidLength = sidList.length;
		html += "<table class='detailTable'><tr><th>【"+diagnoseRetName+"】对应的会话ID如下</th></tr>";
		$.each(sidList,function(i,val){
			resNum++;
			//显示mac分页用
			if(resNum>=(nextPage-diagnosePageSize)&&resNum<nextPage){
				html += "<tr id='diagnoseSid_"+i+"'><td><a onclick=openDiagnoseDialog('"+i+"','"+val+"')>"+val+"</a></td></tr>";
			}
		});
		html += "</table>";
		
		//sid总记录数不足一页或正好满一页
		if(nextPage==diagnosePageSize&&nextPage>=sidLength){
			html += "已经没有更多记录要显示了哟";
		}else{//sid总记录数多于一页
			if(nextPage==diagnosePageSize){//首页
				nextPage += diagnosePageSize;
				html += "<a onclick="+funcNameDiagnose+"("+nextPage+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<a onclick="+funcNameDiagnose+"("+(Math.ceil(sidLength/diagnosePageSize))*diagnosePageSize+")>尾页</a>";
			}else if(nextPage<sidLength){
				html += "<a onclick="+funcNameDiagnose+"("+diagnosePageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<a onclick="+funcNameDiagnose+"("+(nextPage-diagnosePageSize)+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<a onclick="+funcNameDiagnose+"("+(nextPage+diagnosePageSize)+")>下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<a onclick="+funcNameDiagnose+"("+(Math.ceil(sidLength/diagnosePageSize))*diagnosePageSize+")>尾页</a>";
			}else if(nextPage>=sidLength){
				nextPage -= diagnosePageSize;
				html += "<a onclick="+funcNameDiagnose+"("+diagnosePageSize+")>首页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<a onclick="+funcNameDiagnose+"("+nextPage+")>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "已经没有更多记录要显示了哟";
			}
		}
		html += "&nbsp;&nbsp;&nbsp;&nbsp;为您找到约"+sidLength+"条相关结果";
		
		$("#diagnosePieSidList").html(html);
	}else{
		$("#diagnosePieSidList").html("无相关sid展示。");
	}
}

function openDiagnoseDialog(i,sid){
	//点击后行变色
	var k = document.getElementById("diagnoseSid_"+i);
	k.style.background="RGB(96,165,252)";
	
	window.open("callDetail.jsp?sid="+sid);
	jQuery(this).target = "_blank";
}
