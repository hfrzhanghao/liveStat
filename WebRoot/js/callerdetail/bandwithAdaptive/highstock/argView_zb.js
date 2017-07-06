/**
 * 通话详情/带宽自适应调节/主叫端arq统计，被叫端arq统计
 * @param {} renderTo
 */
/**
 * 主叫端arq统计
 */
function arqView_zb(renderTo) {
	$('#'+renderTo).highcharts('StockChart', {
				chart: {
		            zoomType:'xy'//可拖动
		        },
				title : {
					text : 'ARQ统计'
				},
				exporting: {//右上角导出图片    
		            enabled: false //是否能导出趋势图图片  
		        },
				navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:780,
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
						if(arq_map_zb.get(dateToUTC(time))!=undefined&&arq_map_zb.get(dateToUTC(time))!=null&&arq_map_zb.get(dateToUTC(time))!==""){
							info += arq_map_zb.get(dateToUTC(time));
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
					height : 644,
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S'
		            }
				},
				plotOptions: {
		            column: {//设置柱状图显示为堆积图
		                stacking: 'normal',
		                dataLabels: {
		                    enabled: true,
		                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                }
		            }		            
			    },
				yAxis : [{
						title : {
							text : '总体纠错机制',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:4,
						height : 150,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					},{
						title : {
							text : 'COPY容错技术',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						top : 250,
						min:0,
					    //max:4,
						height : 150,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					},{
						title : {
							text : 'ARQ容错技术',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						top : 415,
						min:0,
					    //max:4,
						height : 150,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					},{
						title : {
							text : 'FEC容错技术',
							align : 'high',
							offset : 0,// 偏移
							rotation : 0// 旋转
						},
						top : 580,
						min:0,
					    //max:4,
						height : 150,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : '原始丢包率',
							data :arq_lost_rate_arr_zb,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'triangle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : 'RTP丢包率(容错后)',
							data : rtp_lost_rate_arr_zb,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'circle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						},{
							type : 'spline',
							name : '总恢复率',
							data : all_recovery_rate_arr_zb,visible: false,//默认不显示
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'square'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0
						},{
							type : 'spline',
							name : 'copy恢复率',
							data : copy_recovery_rate_arr_zb,visible: false,//默认不显示
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'square'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
			           		//stack: 'a',
							yAxis : 0
						},{
							type:'spline',
							name:'fec恢复率',
							data:fec_recovery_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
			               //stack: 'a',
							yAxis:0
						},{
							type:'spline',
							name:'arq恢复率',
							data:arq_recovery_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
			                //stack: 'a',
							yAxis:0
						},{
							type:'spline',
							name:'总冗余率',
							data:all_r_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:0
						},{
							type:'spline',
							name:'fec冗余占比',
							data:fec_r_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
			                //stack: 'b',
							yAxis:0
						},{
							type:'spline',
							name:'arq冗余占比',
							data:arq_r_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
			                //stack: 'b',
							yAxis:0
						},{
							type:'spline',
							name:'copy冗余占比',
							data:copy_r_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
			               // stack: 'b',
							yAxis:0
						},{
							type:'spline',
							name:'COPY利用率',
							data:copy_use_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:1
						},{
							type:'spline',
							name:'COPY延时率',
							data:copy_delay_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis:1
						},{
							type : 'spline',
							name : 'COPY重复率',
							data : copy_repeat_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 1

						},{
							type : 'spline',
							name : 'COPY发包率',
							data : copy_send_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 1
						},{
							type : 'spline',
							name : 'ARQ利用率',
							data : arq_use_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 2
						},{
							type : 'spline',
							name : 'ARQ延时率',
							data : arq_delay_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 2
						},{
							type : 'spline',
							name : 'ARQ重复率',
							data : arq_repeat_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 2
						},{
							type : 'spline',
							name : 'ARQ发包率',
							data : arq_send_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 2
						},{
							type : 'spline',
							name : 'FEC接收有效率',
							data : fec_use_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC利用率',
							data : fec_used_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC延时率',
							data : fec_delay_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC重复率',
							data : fec_repeat_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC发包率',
							data : fec_send_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC解码成功率',
							data : fec_decode_suc_rate_arr_zb,
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC解码失败率',
							data : fec_decode_fail_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						},{
							type : 'spline',
							name : 'FEC解码无用率',
							data : fec_decode_useless_rate_arr_zb,visible: false,//默认不显示
							marker : {
			                  enabled : true,
			                  radius : 3
			                },
							yAxis : 3
						}]
			});
}
