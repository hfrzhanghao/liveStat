/**
 * 通话详情/带宽自适应调节/被叫端质量统计
 * @param {} renderTo
 */
/**
 * 包含“道路切换、浪涌、flash设置视频最大值、当前设备信息”等视图
 */
function highstockView_bz01(renderTo) {
	// create the chart
	$('#'+renderTo).highcharts('StockChart', {
				chart: {
		            zoomType:'xy'//可拖动
		        },
				title : {
					text : ''
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
						if(switchinfoMap.get(dateToUTC(time)+"_1_bz")!=undefined&&switchinfoMap.get(dateToUTC(time)+"_1_bz")!=null&&switchinfoMap.get(dateToUTC(time)+"_1_bz")!==""){
							//道路切换
							info += switchinfoMap.get(dateToUTC(time)+"_1_bz");
						}
						if(switchinfoMap.get(dateToUTC(time)+"_2_bz")!=undefined&&switchinfoMap.get(dateToUTC(time)+"_2_bz")!=null&&switchinfoMap.get(dateToUTC(time)+"_2_bz")!==""){
							//浪涌
							info += switchinfoMap.get(dateToUTC(time)+"_2_bz");
						}
						if(switchinfoMap.get(dateToUTC(time)+"_3_bz")!=undefined&&switchinfoMap.get(dateToUTC(time)+"_3_bz")!=null&&switchinfoMap.get(dateToUTC(time)+"_3_bz")!==""){
							//flash设置视频最大值
							info += switchinfoMap.get(dateToUTC(time)+"_3_bz");
						}
						/*
						if(switchinfoMap.get(dateToUTC(time)+"_4_zb")!=undefined&&switchinfoMap.get(dateToUTC(time)+"_4_zb")!=null&&switchinfoMap.get(dateToUTC(time)+"_4_zb")!==""){
							//当前设备信息，因一端汇报的数据是对端的数据，所以要反着显示
							info += switchinfoMap.get(dateToUTC(time)+"_4_zb");
						}*/
						
						var seriesName = this.series.name;
						if(seriesName=="本端cpu"){
							return seriesName+"<br/>"+this.point.y+"%<br/>"+time;
						}
						if(seriesName=="对端cpu"){
							return seriesName+"<br/>"+this.point.y+"%<br/>"+time;
						}
						if(seriesName=="本端信号强度"){
							return seriesName+"<br/>"+this.point.y+"dbm<br/>"+time;
						}
						if(seriesName=="对端信号强度"){
							return seriesName+"<br/>"+this.point.y+"dbm<br/>"+time;
						}
						if(seriesName=="编码帧率"){
							//依据编码“带宽自适应调节等级表”用等级转换得到，在显示时转化为对应的帧率显示
							return seriesName+"<br/>"+(this.point.y)+"帧/秒<br/>"+time;
						}
						if(seriesName=="对端渲染帧率"){
							return seriesName+"<br/>"+this.point.y+"帧/秒<br/>"+time;
						}
						if(seriesName=="对端音频空音率"){
							return seriesName+"<br/>"+this.point.y+"%<br/>"+time;
						}
						
						if(info===""){
							return "未获取此时间点的相关数据";
						}else{
							return info ;
						}
						/*
						 if(this.y==1){
							//必须将时间转化为毫秒，否则key值不对应，取不出值，因为汇报的日志中日期格式是2015-02-05 15:06:52;012，而插件读取的界面时间是2015-2-5 15:6:52;012
	                		//return "道路切换，"+switchinfoMap.get(splitTime(time).getTime()+"_1_zb");
	                		return "道路切换，"+switchinfoMap.get(dateToUTC(time)+"_1_zb");
	                	}else if(this.y==2){
	                		//return "浪涌，"+switchinfoMap.get(splitTime(time).getTime()+"_2_zb");
	                		return "浪涌，"+switchinfoMap.get(dateToUTC(time)+"_2_zb");
	                	}else if(this.y==3){
	                		return "flash设置视频最大值，"+switchinfoMap.get(dateToUTC(time)+"_3_zb");
	                	}else{
							return this.series.name;
							//return "未获取此时间点的相关数据";
						}
						*/
					},
					xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
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
					    //max:2,
						height : 100,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'scatter',
							name : '道路切换',
							data :pathSwitch_bzUTC,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'triangle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}, {
							type : 'scatter',
							name : '浪涌',
							data : audioOverFlow_bzUTC,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'scatter',
							name : 'flash设置视频最大值',
							data : set_max_bw_bzUTC,visible: false,//默认不显示
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'square'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0
						},{
							type:'spline',
							name:'本端cpu',
							data:cpu_bzUTC,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:0
						},{
							type:'spline',
							name:'对端cpu',
							data:cpu_zbUTC,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:0
						},{
							type:'spline',
							name:'本端信号强度',
							data:signal_bzUTC,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:0
						},{
							type:'spline',
							name:'对端信号强度',
							data:signal_zbUTC,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:0
						},{
							type : 'spline',
							name : '编码帧率',
							data : dataArr071_bz,//依据编码“带宽自适应调节等级表”用等级转换得到，在显示时转化为对应的帧率显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 0

						},{
							type : 'spline',
							name : '对端渲染帧率',
							data : decode_f_zbUTC,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 0
						},{
							type : 'spline',
							name : '对端音频空音率',
							data : a_null_lev_zbUTC,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 0
						}]
			});
}
/**
 * 包含“带宽、等级、丢包率、延时”四个图
 */
function highstockView_bz02() {
	// create the chart
	$('#bandAdaptive_main1_bz02').highcharts('StockChart', {
				chart: {
		            zoomType:'xy'//可拖动
		        },
				exporting: {//右上角导出图片    
		            enabled: false,//是否能导出趋势图图片  
		            style : {
						color : '#00FF00',// 绿字
						fontSize : '12px',
						fontWeight : 'bold'
					}
		        },
		        navigation:{//对图表右上角的导出趋势图的菜单进行设置
			    	enabled:true,
			    	buttonOptions:{
				    	width:200,
				    	text:'导出'
			    	},
			    	menuStyle: {
			    		border: '1px solid #A0A0A0',
			    		background: '#FFFFFF'
			    	}
			    },
		        navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:405,
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
					shared : true,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
					formatter : function() {
						var  now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
        	   			//if(bandMapHighstock_bz.get(splitTime(time).getTime())!=undefined&&bandMapHighstock_bz.get(splitTime(time).getTime())!=null&&bandMapHighstock_bz.get(splitTime(time).getTime())!==""){
        	   			if(bandMapHighstock_bz.get(dateToUTC(time))!=undefined&&bandMapHighstock_bz.get(dateToUTC(time))!=null&&bandMapHighstock_bz.get(dateToUTC(time))!==""){
        	   				//必须将时间转化为毫秒，否则key值不对应，取不出值，因为汇报的日志中日期格式是2015-02-05 15:06:52;012，而插件读取的界面时间是2015-2-5 15:6:52;012
	        	   			//return  bandMapHighstock_bz.get(splitTime(time).getTime());
	        	   			return  bandMapHighstock_bz.get(dateToUTC(time));
						}else{
							return "因数据过于密集，请缩小查看的时间区域";
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
			            type: 'minute',  
			            count: 20,  
			            text: '20分钟'  
			        }, {  
			            type: 'minute',  
			            count: 30,  
			            text: '30分钟'  
			        }, {  
			            type: 'minute',  
			            count: 45,  
			            text: '45分钟'  
			        }, {  
			            type: 'hour',  
			            count: 1,  
			            text: '1小时'  
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
					enabled : true,
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
					borderWidth : 0

				},
				plotOptions:{//对于数据点的操作　
		        	column:{
		        		allowPointSelect:true,//允许柱形被选择
			        	//pointWidth:null,//每个柱形的宽度，默认是null，自动根据实际情况变化
		        		//pointRange:20,
			        	showCheckbox:false//图例旁显示复选框
		        	}
		        },
				xAxis : {
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					height:310,
					type: 'datetime',//datetime
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
							text : '带宽(kbps)',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:2048,
						height : 90,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}, {
						title : {
							text : '等级',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						top : 145,
						min:0,
						max:6,
						height : 80,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}, {
						title : {
							text : '丢包率(%)',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						tickPixelInterval:20,//数据间隔
						labels:{
			            	formatter:function(){
			            		return this.value;
			            	}
			            },
						top : 235,
						min:0,
						max:50,
						height : 80,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}, {
						title : {
							text : '延时(ms)',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						tickPixelInterval:20,//数据间隔
						labels:{
			            	formatter:function(){
			            		return this.value;
			            	}
			            },
						top : 325,
						min:0,
						height : 30,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						// tickPosition:'outside',
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'column',
							name : '端到端带宽',
							data : dataArr01_bz,
							yAxis : 0

						}, {
							type : 'column',
							name : '冗余带宽',
							data : dataArr02_bz,
							yAxis : 0

						}, {
							type : 'column',
							name : '有效上行带宽',
							data : dataArr03_bz,
							yAxis : 0
						},{
							type : 'column',
							name : 'FEC后音频带宽',
							data : dataArr04_bz,
							yAxis : 0

						}, {
							type : 'column',
							name : '冗余后视频带宽',
							data : dataArr05_bz,
							yAxis : 0
						}, {
							type : 'scatter',
							symbol: 'diamond',
							name : '自适应调节点',
							data : dataArr06_bz,
							marker : {  
			                  enabled : true,//显示曲线上的点  
			                  radius : 6,//曲线上点的大小
			                  symbol:'diamond'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}, {
							type : 'column',
							name : '通话等级',
							data : dataArr07_bz,
							yAxis : 1

						}, {
							type : 'column',
							name : '视频fec等级',
							data : dataArr08_bz,
							yAxis : 1

						}, {
							type : 'column',
							name : '音频fec等级',
							data : dataArr09_bz,
							yAxis : 1
						},{
							type : 'spline',
							name : '视频原始丢包率',
							data : dataArr10_bz,
							yAxis : 2

						}, {
							type : 'spline',
							name : '视频冗余纠错后丢包率',
							data : dataArr11_bz,
							yAxis : 2

						}, {
							type : 'spline',
							name : '音频原始丢包率',
							data : dataArr12_bz,
							yAxis : 2
						},{
							type : 'spline',
							name : '音频fec纠错后丢包率',
							data : dataArr13_bz,
							yAxis : 2

						},{
							type : 'spline',
							name : '延时',
							data : dataArr14_bz,
							yAxis : 3

						}]
			});
}