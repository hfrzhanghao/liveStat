/**
 * 通话详情/带宽自适应调节/主叫端流量统计
 * @param {} renderTo
 */
/**
 * 主叫，冗余比例
 * 发送及接收码流统计的视图，使用highstock实现
 * @param {} renderTo
 */
function streamView_rate_zb(renderTo){
	new Highcharts.Chart({
        chart: {
            type: 'areaspline',
            renderTo: renderTo,//显示到页面上的位置
            //height:200,//高度
            //width:200,//宽度
            zoomType:'xy',//可拖动
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
            //animation:false,//动画，默认true
            //backgroundColor: 'rgba(0,0,0,0)'
        },
        exporting: {//右上角导出图片    
            enabled: false//是否能导出趋势图图片  
        },
        title: {
            text: '发送及接收码流统计'
        },
        subtitle:{
        	//text:''
        },
        tooltip: {
        	backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
            //pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        	formatter : function() {
        		var yName = this.series.name;
        		
        		if("实际发送带宽(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_total_stream_s");
        		}else if("实际接收带宽(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_total_stream_r");
        		}else if("发送冗余比例(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_r_s_rate");
        		}else if("接收冗余比例(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_r_r_rate");
        		}else if("视频发送冗余比例(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_v_r_s_rate");
        		}else if("视频接收冗余比例(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_v_r_r_rate");
        		}else if("音频发送冗余比例(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_a_r_s_rate");
        		}else if("音频接收冗余比例(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_a_r_r_rate");
        		}else{
        		    return "未获取相关值";
        		}
        	},
			style : {
				color : '#00FF00',//绿字
				fontSize : '12px'
			}
        },
        credits:{//配置右下角版权链接
            enabled:false,
            href:'',
            text:'【Butel】',
            style:{
                color:'#0000FF',
                fontSize:'19',
                fontWeight:'bold'
            }
        }, 
        xAxis: {
            categories: stream_x_zb,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            height : 150,
            labels:{
            	enabled:false//不显示刻度值，显示的话，在数据过多时，会导致y值比较小的点无法展示
            }
        },
        yAxis: [{
            title: {
                text: '冗余比例'
            },
            //top : 30,
			min:0,
		    //max:4,
			height : 150,
			lineWidth : 1,
			opposite : false,// 图标题显示位置，为true时显示在右边
			offset : 0// 偏移
            
        }],
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
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
					type : 'areaspline',
					name : '实际发送带宽(本端)',
					data : total_stream_sYArr_zb,yAxis : 0
				},{
					type : 'areaspline',
					name : '实际接收带宽(对端)',
					data : total_stream_rYArr_bz,yAxis : 0
				},{
					type : 'areaspline',
					name : '发送冗余比例(本端)',
					data : r_s_rate_zb,yAxis : 0
				},{
					type : 'areaspline',
					name : '接收冗余比例(对端)',
					data : r_r_rate_bz,yAxis : 0
				},{
					type : 'areaspline',
					name : '视频发送冗余比例(本端)',
					data : v_r_s_rate_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '视频接收冗余比例(对端)',
					data : v_r_r_rate_bz,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '音频发送冗余比例(本端)',
					data : a_r_s_rate_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '音频接收冗余比例(对端)',
					data : a_r_r_rate_bz,yAxis : 0,visible: false//默认不显示
				}]
    });
}



/**
 * 主叫，视频流量统计
 * 发送及接收码流统计的视图，使用highstock实现
 * @param {} renderTo
 */
function streamView_video_zb(renderTo){
	new Highcharts.Chart({
        chart: {
            type: 'areaspline',
            renderTo: renderTo,//显示到页面上的位置
            //height:200,//高度
            //width:200,//宽度
            zoomType:'xy',//可拖动
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
            //animation:false,//动画，默认true
            //backgroundColor: 'rgba(0,0,0,0)'
        },
        exporting: {//右上角导出图片    
            enabled: false//是否能导出趋势图图片  
        },
        title: {
            text: ''
        },
        subtitle:{
        	text:''
        },
        tooltip: {
        	backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
            //pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        	formatter : function() {
        		var yName = this.series.name;
        		
        		if("视频FEC发送流量(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_v_fec_stream_s");
        		}else if("视频FEC接收流量(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_v_fec_stream_r");
        		}else if("视频发送流量(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_v_stream_s");
        		}else if("视频接收流量(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_v_stream_r");
        		}else if("发送的copy视频码流(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_v_copy_stream_s");
        		}else if("接收的copy视频码流(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_v_copy_stream_r");
        		}else if("发送的arq视频码流(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_v_arq_stream_s");
        		}else if("接收的arq视频码流(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_v_arq_stream_r");
        		}else{
        		    return "未获取相关值";
        		}
        	},
			style : {
				color : '#00FF00',//绿字
				fontSize : '12px'
			}
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
        xAxis: {
            categories: stream_x_zb,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            height : 150,
            labels:{
            	enabled:false//不显示刻度值，显示的话，在数据过多时，会导致y值比较小的点无法展示
            }
        },
        yAxis: [{
            title: {
                text: '视频流量统计'
            },
            //top : 220,
			min:0,
		    //max:4,
			height : 150,
			lineWidth : 1,
			opposite : false,// 图标题显示位置，为true时显示在右边
			offset : 0// 偏移
            
        }],
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
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
					type : 'areaspline',
					name : '视频FEC发送流量(本端)',
					data : v_fec_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '视频FEC接收流量(对端)',
					data : v_fec_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					symbol: 'circle',
					name : '视频发送流量(本端)',
					data : v_stream_sYArr_zb,yAxis : 0
				},{
					type : 'areaspline',
					name : '视频接收流量(对端)',
					data : v_stream_rYArr_bz,yAxis : 0
				},{
					type : 'areaspline',
					name : '发送的copy视频码流(本端)',
					data : v_copy_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '接收的copy视频码流(对端)',
					data : v_copy_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '发送的arq视频码流(本端)',
					data : v_arq_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '接收的arq视频码流(对端)',
					data : v_arq_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				}]
    });
}


/**
 * 主叫，音频流量统计
 * 发送及接收码流统计的视图，使用highstock实现
 * @param {} renderTo
 */
function streamView_audio_zb(renderTo){
	new Highcharts.Chart({
        chart: {
            type: 'areaspline',
            renderTo: renderTo,//显示到页面上的位置
            //height:200,//高度
            //width:200,//宽度
            zoomType:'xy',//可拖动
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
            //animation:false,//动画，默认true
            //backgroundColor: 'rgba(0,0,0,0)'
        },
        exporting: {//右上角导出图片    
            enabled: false//是否能导出趋势图图片  
        },
        title: {
            text: ''
        },
        subtitle:{
        	text:''
        },
        tooltip: {
        	backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
            //pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        	formatter : function() {
        		var yName = this.series.name;
        		
        		if("音频FEC发送流量(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_a_fec_stream_s");
        		}else if("音频FEC接收流量(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_a_fec_stream_r");
        		}else if("音频发送流量(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_a_stream_s");
        		}else if("音频接收流量(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_a_stream_r");
        		}else if("发送的copy音频码流(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_a_copy_stream_s");
        		}else if("接收的copy音频码流(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_a_copy_stream_r");
        		}else if("发送的arq音频码流(本端)"==yName){
        			return yName+"<br/>"+stream_map_zb.get(this.x+"_a_arq_stream_s");
        		}else if("接收的arq音频码流(对端)"==yName){
        			return yName+"<br/>"+stream_map_bz.get(this.x+"_a_arq_stream_r");
        		}else{
        		    return "未获取相关值";
        		}
        	},
			style : {
				color : '#00FF00',//绿字
				fontSize : '12px'
			}
        },
        credits:{//配置右下角版权链接
            enabled:true,
            href:'http://www.butel.com/',
            text:'【Butel】',
            style:{
                color:'#0000FF',
                fontSize:'19',
                fontWeight:'bold'
            }
        }, 
        xAxis: {
            categories: stream_x_zb,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            height : 150,
            labels:{
            	enabled:false//不显示刻度值，显示的话，在数据过多时，会导致y值比较小的点无法展示
            }
        },
        yAxis: [{
            title: {
                text: '音频流量统计'
            },
            //top : 395,
			min:0,
		    //max:4,
			height : 150,
			lineWidth : 1,
			opposite : false,// 图标题显示位置，为true时显示在右边
			offset : 0// 偏移
            
        }],
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
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
					type : 'areaspline',
					name : '音频FEC发送流量(本端)',
					data : a_fec_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '音频FEC接收流量(对端)',
					data : a_fec_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '音频发送流量(本端)',
					data : a_stream_sYArr_zb,yAxis : 0
				},{
					type : 'areaspline',
					name : '音频接收流量(对端)',
					data : a_stream_rYArr_bz,yAxis : 0
				},{
					type : 'areaspline',
					name : '发送的copy音频码流(本端)',
					data : a_copy_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '接收的copy音频码流(对端)',
					data : a_copy_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '发送的arq音频码流(本端)',
					data : a_arq_stream_sYArr_zb,yAxis : 0,visible: false//默认不显示
				},{
					type : 'areaspline',
					name : '接收的arq音频码流(对端)',
					data : a_arq_stream_rYArr_bz,yAxis : 0,visible: false//默认不显示
				}]
    });
}