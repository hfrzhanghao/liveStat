/*通话详情callDetail.jsp页面中“带宽自适应调节”标签页面的JS效果 */
//“带宽自适应调节”页面数据填充

$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#bandwithAdaptive01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.bandwithAdaptive_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.bandwithAdaptive_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});