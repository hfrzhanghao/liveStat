/*通话详情callDetail.jsp页面中“客户端日志”标签页面的JS效果 */
//“视频参数”页面数据填充
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#clientlog01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.clientlog_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.clientlog_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

//其点击效果见/monitor2.0/WebRoot/js/sdkEventInfo.js