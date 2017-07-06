/**
 * 通话详情/网络诊断/丢包率视图
 */
function diagnoseLostView_bz(renderTo) {
	// create the chart
	$('#'+renderTo).highcharts('StockChart', {
				chart: {
		            zoomType:'xy'//可拖动
		        },
				title : {
					text : '丢包率的分段统计(只统计U->R和R->U，最多包含两条上行路径和四条下行路径)'
				},
				exporting: {//右上角导出图片    
		            enabled: false //是否能导出趋势图图片  
		        },
				navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:225,
		        	xAxis: {
		        	    tickWidth: 0,//数据分段
		        	    lineWidth: 0,
		        	    gridLineWidth: 1,
		        	    tickPixelInterval: 100,
		        	    labels: {
		        	        align: 'left',
		        	        style: {
		        	            color: '#888'
		        	        },
		        	        x: 3,
		        	        y: -4
		        	    }
		        	}
		        },
		        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
		        	//enabled:false,
					height : 20,
					barBackgroundColor:'#2493F7',//滚动条背景色
					buttonBackgroundColor:'#F07600',//左右按钮的背景色
					buttonBorderColor:'#F07600'//左右按钮的边框色
				},
				tooltip : {// 标签提示框
					enabled : true,// 显示提示框
					backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
					crosshairs : true,// 鼠标经过时显示上下标尺线
					shared : false,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					formatter : function() {
						var now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
						
						var info = "";
						
						var seriesName = this.series.name;
						if(seriesName==legendUR01_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR01_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR01_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR01_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR01_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(seriesName==legendUR02_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR02_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR02_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR02_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"UR02_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU01_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU01_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU01_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU01_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU01_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU02_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU02_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU02_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU02_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU02_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU03_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU03_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU03_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU03_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU03_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU04_bz){
							info += seriesName+"<br/>"+
									"丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU04_loss_r")+"%<br/>"+
									"音频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU04_a_loss_r")+"%<br/>"+
									"视频丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU04_v_loss_r")+"%<br/>"+
									"视频fec丢包率："+diagnose_map_bz.get(dateToUTC(time)+"RU04_vf_loss_r")+"%<br/>"+
									time;
							return info;
						}
						if(info===""){
							return "未获取此时间点的相关数据";
						}else{
							return info ;
						}
					},
					style : {
						color : '#00FF00',//绿字
						fontSize : '12px'
					}
				},
				rangeSelector: {//控制顶部的时间快捷按钮
		        	enabled:true,
		        	buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
			            type: 'minute',  
			            count: 1,  
			            text: '1分钟'  
			        },{  
			            type: 'minute',  
			            count: 5,  
			            text: '5分钟'  
			        }, {  
			            type: 'minute',  
			            count: 10,  
			            text: '10分钟'  
			        }, {  
			            type: 'all',  
			            text: '所有' 
			        }],
			        buttonTheme: {
			        	width: 36,
			        	height: 16,
			        	padding: 1,
			        	r: 0,
			        	stroke: '#68A'
			        	//zIndex: 7
		        	},
		        	inputEnabled:true,//是否显示右上角的输入框
		        	inputBoxWidth:190,//右上角时间输入框的宽度
		        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
		        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
		            selected: 2//加载时以上定义button的index哪个被选中,从0开始  
		        },
				credits : {// 配置右下角版权链接
					enabled : false,
					href : 'http://www.butel.com/',
					text : 'Butel',
					style : {
						color : '#0000FF',
						fontSize : '19',
						fontWeight : 'bold'
					}
				},
				legend : {// 图例
					// 是否显示图例
					enabled : true,
					// 垂直排列
					layout : 'vertical',
					// 靠右显示
					align : 'right',
					verticalAlign : 'middle',//"top", "middle" or "bottom".
					borderWidth : 0,
					width:145

				},
				xAxis : {
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					type: 'datetime',//datetime
					height : 100,
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S'
		            }
				},

				yAxis : [{
						title : {
							text : '',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:4,
						height : 100,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : legendUR01_bz,
							data :URArr01_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendUR02_bz,
							data :URArr02_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU01_bz,
							data :RUArr01_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU02_bz,
							data :RUArr02_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU03_bz,
							data :RUArr03_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU04_bz,
							data :RUArr04_lost_r_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}]
			});
}

/**
 * 通话详情/诊断结果/延时视图
 */
function diagnoseDelayView_bz(renderTo) {
	// create the chart
	$('#'+renderTo).highcharts('StockChart', {
				chart: {
		            zoomType:'xy'//可拖动
		        },
				title : {
					text : '延时的分段统计(只统计U->R和R->U，最多包含两条上行路径和四条下行路径)'
				},
				exporting: {//右上角导出图片    
		            enabled: false //是否能导出趋势图图片  
		        },
				navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:225,
		        	xAxis: {
		        	    tickWidth: 0,//数据分段
		        	    lineWidth: 0,
		        	    gridLineWidth: 1,
		        	    tickPixelInterval: 100,
		        	    labels: {
		        	        align: 'left',
		        	        style: {
		        	            color: '#888'
		        	        },
		        	        x: 3,
		        	        y: -4
		        	    }
		        	}
		        },
		        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
		        	//enabled:false,
					height : 20,
					barBackgroundColor:'#2493F7',//滚动条背景色
					buttonBackgroundColor:'#F07600',//左右按钮的背景色
					buttonBorderColor:'#F07600'//左右按钮的边框色
				},
				tooltip : {// 标签提示框
					enabled : true,// 显示提示框
					backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
					crosshairs : true,// 鼠标经过时显示上下标尺线
					shared : false,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					formatter : function() {
						var now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
						
						var info = "";
						
						var seriesName = this.series.name;
						if(seriesName==legendUR01_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"UR01_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(seriesName==legendUR02_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"UR02_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU01_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"RU01_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU02_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"RU02_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU03_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"RU03_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(seriesName==legendRU04_bz){
							info += seriesName+"<br/>"+
									"延时："+diagnose_map_bz.get(dateToUTC(time)+"RU04_delay_aver")+"ms<br/>"+
									time;
							return info;
						}
						if(info===""){
							return "未获取此时间点的相关数据";
						}else{
							return info ;
						}
					},
					style : {
						color : '#00FF00',//绿字
						fontSize : '12px'
					}
				},
				rangeSelector: {//控制顶部的时间快捷按钮
		        	enabled:true,
		        	buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
			            type: 'minute',  
			            count: 1,  
			            text: '1分钟'  
			        },{  
			            type: 'minute',  
			            count: 5,  
			            text: '5分钟'  
			        }, {  
			            type: 'minute',  
			            count: 10,  
			            text: '10分钟'  
			        }, {  
			            type: 'all',  
			            text: '所有' 
			        }],
			        buttonTheme: {
			        	width: 36,
			        	height: 16,
			        	padding: 1,
			        	r: 0,
			        	stroke: '#68A'
			        	//zIndex: 7
		        	},
		        	inputEnabled:true,//是否显示右上角的输入框
		        	inputBoxWidth:190,//右上角时间输入框的宽度
		        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
		        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
		            selected: 2//加载时以上定义button的index哪个被选中,从0开始  
		        },
				credits : {// 配置右下角版权链接
					enabled : false,
					href : 'http://www.butel.com/',
					text : 'Butel',
					style : {
						color : '#0000FF',
						fontSize : '19',
						fontWeight : 'bold'
					}
				},
				legend : {// 图例
					// 是否显示图例
					enabled : true,
					// 垂直排列
					layout : 'vertical',
					// 靠右显示
					align : 'right',
					verticalAlign : 'middle',//"top", "middle" or "bottom".
					borderWidth : 0,
					width:145

				},
				xAxis : {
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					type: 'datetime',//datetime
					height : 100,
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S'
		            }
				},

				yAxis : [{
						title : {
							text : '',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:4,
						height : 100,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : legendUR01_bz,
							data :URArr01_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendUR02_bz,
							data :URArr02_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU01_bz,
							data :RUArr01_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU02_bz,
							data :RUArr02_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU03_bz,
							data :RUArr03_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : legendRU04_bz,
							data :RUArr04_delay_aver_bz,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}]
			});
}

