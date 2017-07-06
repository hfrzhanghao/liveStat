/**
 * 处理数据为空值时的情况
 */
function isNull(args){
	if(args==undefined||args==null||args===""){
		return parseInt(0);
	}else{
		return args;
	}
}

/**
 * 如果是整数，直接返回，如果只含一位小数，直接返回，如果超过一位小数，保留两位小数
 * @param {数字} data
 * @return {String}
 */
function toFixed(data){
	if(isNaN(data)==true){//非数值返回异常提醒
		return "非数值类型，无法处理";
	}else if((data+"").indexOf(".")==-1){//当是整数时直接返回
		return data;
	}else if((data+"").split(".")[1].length==1){//只有一位小数时直接返回
		return data;
	}
	return parseFloat(data).toFixed(2);
}

/**
 * 计算百分比
 * @param {} loss 被除数
 * @param {} recv　除数
 * @return {String} loss/recv
 */
function rate(loss,recv){
	if(stringToNumber(loss)>=0&&stringToNumber(recv)>=0){
		if(loss!=undefined&&loss!=null&&loss!==""&&recv!=undefined&&recv!=null&&recv!==""){
			if(recv===0){
				return "分母不能为0";
			}else if(loss==0){
				return 0;
			}
			//Math.round()返回数字最接近的整数，四舍五入
			//在本程序中，要求显示百分比时保留两位小数，所以以下公式先将float型数据乘以10000，
			//然后再通过Math.round()四舍五入取整，将四舍五入的结果再除以100，即得结果。
			// /100.00，因为保留了4位小数，那要显示百分比，必须得将保留的数除以100，如果是保留三位小数，要显示百分比，则是乘以1000除以10.00，如果是保留两位小数，要显示百分比，则是乘以100除以1.00
			return (Math.round(parseFloat(stringToNumber(loss) / stringToNumber(recv)) * 10000) / 100.00);
		}
	}else{
		return "数据有误";
	}
}

/**
 * 数组里面每条记录的格式为“2015-1-14 14:32:45:165”
 * 冒泡排序，将时间按从小到大排序
 * @param {} scatterTime
 */
function bom(array){
	// 定义一个中间变量
	var temp = 0;
	if(array!=undefined&&array!=null&&array!==""){
		// 循环比较，按升序排序，外层循环中比较次数减1，因为最后一个元素无须自己跟自己比较
		for (var i = 0; i < array.length - 1; i++) {
			// 头脑中建立立体感，从最下面一个元素开始比较，冒泡上浮
			for (var j = array.length - 1; j > i; j--) {
				
				var a = splitTime(array[j]);
				var b = splitTime(array[j-1]);
				// 交换位置
				if ( a < b ) {
					temp = array[j];
					array[j] = array[j - 1];
					array[j - 1] = temp;
				}
			}
		}
	}
}

/**
 * 将毫秒值转化为年-月-日 时:分:秒:毫秒的时间
 * @param {} time
 * @return {}
 */
function longTimeToDate(longTime){
	var day = new Date(longTime); //将毫秒转化为当前日期
	
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minutes = day.getMinutes();
	var second = day.getSeconds();
	var millisecond = day.getMilliseconds();
	
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(hours<10){
		hours = "0"+hours;
	}
	if(minutes<10){
		minutes = "0"+minutes;
	}
	if(second<10){
		second = "0"+second;
	}
	if(millisecond<10){
		millisecond = "00"+millisecond;
	}else if(10<millisecond&&millisecond<100){
		millisecond = "0"+millisecond;
	}
	
	var newDay = year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+second+":"+millisecond;
	
	return newDay;
}

/**
 * 将毫秒值转化为年-月-日 时:分:秒的时间
 * @param {} time
 * @return {}
 */
function longTimeToDateNoMillisecond(longTime){
	var day = new Date(longTime); //将毫秒转化为当前日期
	
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minutes = day.getMinutes();
	var second = day.getSeconds();
	
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(hours<10){
		hours = "0"+hours;
	}
	if(minutes<10){
		minutes = "0"+minutes;
	}
	if(second<10){
		second = "0"+second;
	}
	
	var newDay = year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+second;
	
	return newDay;
}

/**
 * 将以下格式的字符串转化为本地时间，不带毫秒
 *数据格式为“2015-1-14 14:32:45”
 * @param {} time
 */
function stringToDate(time){
	var times = time;
	var year;//年
	var month;//月
	var day;//日
	var hours;//时
	var minutes;//分
	var seconds;//秒
	if(times!=undefined&&times!=null&&times!==""){
		var timesArr01 =  times.split(' ');
		if(timesArr01!=undefined&&timesArr01!=null&&timesArr01!==""){
			if(timesArr01[0]!=undefined&&timesArr01[0]!=null&&timesArr01[0]!==""){
				var timesArr01_01 = timesArr01[0].split('-');
				
				if(timesArr01_01!=undefined&&timesArr01_01!=null&&timesArr01_01!==""){
					year = timesArr01_01[0];//年
					month = timesArr01_01[1];//月
					day = timesArr01_01[2];//日
				}
			}
			if(timesArr01[1]!=undefined&&timesArr01[1]!=null&&timesArr01[1]!==""){
				var timesArr01_02 = timesArr01[1].split(':');
				if(timesArr01_02!=undefined&&timesArr01_02!=null&&timesArr01_02!==""){
					hours = timesArr01_02[0];//时
					minutes = timesArr01_02[1];//分
					seconds = timesArr01_02[2];//秒
				}
			}
			
			if(year!=undefined&&year!=null&&year!==""&&
			   month!=undefined&&month!=null&&month!==""&&
			   day!=undefined&&day!=null&&day!==""&&
			   hours!=undefined&&hours!=null&&hours!==""&&
			   minutes!=undefined&&minutes!=null&&minutes!==""&&
			   seconds!=undefined&&seconds!=null&&seconds!==""){
				return new Date(year,(month-1),day,hours,minutes,seconds);
			}
		}
	}
}


/**
 * 将以下格式的字符串转化为本地时间，带毫秒
 *数据格式为“2015-1-14 14:32:45:165”
 * @param {} time
 */
function splitTime(time){
	var times = time;
	var year;//年
	var month;//月
	var day;//日
	var hours;//时
	var minutes;//分
	var seconds;//秒
	var milliseconds;//毫秒
	if(times!=undefined&&times!=null&&times!==""){
		var timesArr01 = times.split(' ');
		if(timesArr01!=undefined&&timesArr01!=null&&timesArr01!==""){
			if(timesArr01[0]!=undefined&&timesArr01[0]!=null&&timesArr01[0]!==""){
				var timesArr01_01 = timesArr01[0].split('-');
				
				if(timesArr01_01!=undefined&&timesArr01_01!=null&&timesArr01_01!==""){
					year = timesArr01_01[0];//年
					month = timesArr01_01[1];//月
					day = timesArr01_01[2];//日
				}
			}
			if(timesArr01[1]!=undefined&&timesArr01[1]!=null&&timesArr01[1]!==""){
				var timesArr01_02 = timesArr01[1].split(':');
				if(timesArr01_02!=undefined&&timesArr01_02!=null&&timesArr01_02!==""){
					hours = timesArr01_02[0];//时
					minutes = timesArr01_02[1];//分
					seconds = timesArr01_02[2];//秒
					//有的日志会没有汇报毫秒
					if(timesArr01_02[3]!=undefined&&timesArr01_02[3]!=null&&timesArr01_02[3]!==""){
						milliseconds = timesArr01_02[3];//毫秒
					}else{
						milliseconds = 000;
					}
				}
			}
			
			if(year!=undefined&&year!=null&&year!==""&&
			   month!=undefined&&month!=null&&month!==""&&
			   day!=undefined&&day!=null&&day!==""&&
			   hours!=undefined&&hours!=null&&hours!==""&&
			   minutes!=undefined&&minutes!=null&&minutes!==""&&
			   seconds!=undefined&&seconds!=null&&seconds!==""&&
			   milliseconds!=undefined&&milliseconds!=null&&milliseconds!==""
			){
				return new Date(year,(month-1),day,hours,minutes,seconds,milliseconds);
			}
		}
	}
}

/**
 * 将以下格式的字符串转化为UTC时间(国际标准时间)
 *数据格式为“2015-1-14 14:32:45:165”
 * @param {} time　返回的是毫秒
 */
function dateToUTC(time){
	var times = time;
	var year;//年
	var month;//月
	var day;//日
	var hours;//时
	var minutes;//分
	var seconds;//秒
	var milliseconds;//毫秒
	if(times!=undefined&&times!=null&&times!==""){
		var timesArr01 =  times.split(' ');
		if(timesArr01!=undefined&&timesArr01!=null&&timesArr01!==""){
			if(timesArr01[0]!=undefined&&timesArr01[0]!=null&&timesArr01[0]!==""){
				var timesArr01_01 = timesArr01[0].split('-');
				
				if(timesArr01_01!=undefined&&timesArr01_01!=null&&timesArr01_01!==""){
					year = timesArr01_01[0];//年
					month = timesArr01_01[1];//月
					day = timesArr01_01[2];//日
				}
			
			}
			if(timesArr01[1]!=undefined&&timesArr01[1]!=null&&timesArr01[1]!==""){
				var timesArr01_02 = timesArr01[1].split(':');
				if(timesArr01_02!=undefined&&timesArr01_02!=null&&timesArr01_02!==""){
					hours = timesArr01_02[0];//时
					minutes = timesArr01_02[1];//分
					seconds = timesArr01_02[2];//秒
					milliseconds = timesArr01_02[3];//毫秒
				}
				
			}
			
			if(year!=undefined&&year!=null&&year!==""&&
			   month!=undefined&&month!=null&&month!==""&&
			   day!=undefined&&day!=null&&day!==""&&
			   hours!=undefined&&hours!=null&&hours!==""&&
			   minutes!=undefined&&minutes!=null&&minutes!==""&&
			   seconds!=undefined&&seconds!=null&&seconds!==""&&
			   milliseconds!=undefined&&milliseconds!=null&&milliseconds!==""
			){
				return Date.UTC(year,(month-1),day,hours,minutes,seconds,milliseconds);
			}
		}
	}
}

/**
 * 将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
 * @param {} time
 * @return {}
 */
function formatTime(time){
	if(time!=undefined&&time!=null&&time!==""){
		return time.substring(0,time.lastIndexOf('-'))+" "+time.substring(time.lastIndexOf('-')+1);
	}
}

/**
 * 去除排好序的数组中的重复记录
 * @param {} newArr
 * @param {} oldArr
 */
function getNoNameArr(newArr, oldArr){
	if(oldArr[0]!=undefined&&oldArr[0]!=null&&oldArr[0]!==""){
		newArr[0] = oldArr[0];
		if(oldArr.length>1){
			for(var i=1;i<oldArr.length;i++){
				var length = newArr.length;
				if(newArr[length-1]!=oldArr[i]){
					newArr[length] = oldArr[i];
				}
			}
		}
	}
}

/**
 * 将小数变成百分比
 * @param {} data
 * @return {}
 */
function getPercentage(data){
	if(isNaN(data)==true){//非数值返回异常提醒
		return "非数值类型，无法处理";
	}
	return Math.round(parseFloat(data) * 10000) / 100.00;
}

/**
 * 将数字形式的字符串转化为数字
 * @param {} data
 */
function stringToNumber(data){
	if(isNaN(data)==false){
		if(data.toString().indexOf(".")){
			return parseFloat(data);
		}else{
			return parseInt(data);
		}
	}else{
		return "非数值类型，无法处理";
	}
}

/**
 * 拆分由key=value key=value ...组成的字符串，返回一个数组
 * 因为value里可能带有空格，所以要做特殊处理
 * @return [key=value key=value]
 */
function splitString(str){
	var arrs = new Array();
	var arrsIndex = 0;
	var strArr = str.split(" ");
	var length = strArr.length;
	if(strArr!=undefined&&strArr!=null&&strArr!==""){
		//第一次循环，将不带有=号的数组记录与前一条记录组合后，作为前一条记录的值，并将本条记录置空
		var spaceFlag = "";
		$.each(strArr,function(i,val){
			//数据记录里面不含=号，说明此value中含有空格
			if(val.toString().indexOf("=")==-1){
				spaceFlag += " "+val.replace(/[\"]/g,"");
				//假如不含=的在最后
				if(i==(length-1)){
					arrs[arrsIndex-1] += spaceFlag;
				}
			}else{
				if(spaceFlag!==""){
					arrs[arrsIndex-1] += spaceFlag;
					spaceFlag = "";//置空
					arrs[arrsIndex] = val;
					arrsIndex++;
				}else{
					arrs[arrsIndex] = val;
					arrsIndex++;
				}
			}
		});
	}
	return arrs;
}

/**
 * 将毫秒数转化为3小时32分54秒的格式
 * @param {} time
 * @return {}
 */
function timeformat(time) {
	var times = "";
	if (time) {
		var timef = Math.round(time / 1000);// 转换到秒
		if (timef > 60) {
			var second = Math.round(timef % 60);//四舍五入
			var minite = Math.floor(timef / 60);//下取整
			if (minite > 60) {
				var mminite = Math.round(minite % 60);//四舍五入
				var hour = Math.floor(minite / 60);//下取整
				if (hour > 0) {
					times = hour + "小时" + mminite + "分" + second + "秒";
				} else {
					times = mminite + "分" + second + "秒";
				}
			} else {
				times = minite + "分" + second + "秒";
			}
		} else {
			times = timef + "秒";
		}

	}
	return times;
}

/**
 * 将浮点数舍弃小数点，取整型返回
 * @param {数字} obj
 */
function toInt(obj){
	if(isNaN(obj)==false){//判断是不是数字
		if(obj!=undefined&&obj!=null&&obj!==""){
			if((obj+"").indexOf(".")!=-1){//包含小数
				return (obj+"").split(".")[0];
			}else{
				return obj;
			}
		}
	}else{
		return "非数值类型，无法处理";
	}
}

/**
 * 排序用的函数，升序
 * @param {} v1
 * @param {} v2
 * @return {}
 */
function compactASC(v1,v2){
	if(v1<v2){
		return -1;
	}else if(v1>v2){
		return 1;
	}else{
		return 0;
	}
}
/**
 * 排序用的函数，降序
 * @param {} v1
 * @param {} v2
 * @return {}
 */
function compactDesc(v1,v2){
	if(v1<v2){
		return -1;
	}else if(v1>v2){
		return 1;
	}else{
		return 0;
	}
}

/**
* 功能：返回当前时间flag分钟之前的时间
* @param {} flag 分钟数
* @return {} 年-月-日　时:分:秒
* 如果flag = 3
* 若当前时间是：2014-05-05 16:37:08
* 则返回：2014-05-05 16:34:08
*/
function time(flag){
	var day = new Date(); 
	day.setMinutes(day.getMinutes()-flag);
	//返回当前时间flag天之前的日期，如果flag = 3，若当前时间为2014-05-05 16:34:08，则返回2014-05-02 16:34:08
	//day.setDate(parseInt(day.getDate(),10)-flag);
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minuts = day.getMinutes();
	var second = day.getSeconds();
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(second<10){
		second = "0"+second;
	}
	var time =year+"-"+month+"-"+date+" "+ hours+":"+ minuts+":"+ second;
	return time;
}

/**
 * 功能，返回指定时间flag毫秒之前或之后的时间，返回的格式为　2015-01-14 14:32:45:165
 * @param {} date 字符串格式为：2015-01-14-14:32:45:165
 * @param {} flag 毫秒值
 */
function timeBeforeAfter(date,flag){
	//将date转化为2015-01-14 14:32:45:165的格式
	var dates = formatTime(date);
	//将date转化为本地日期类型
	var day = splitTime(dates);
	//将date增加flag毫秒
	day.setMilliseconds(day.getMilliseconds()+flag);
	//返回当前时间flag天之前的日期，如果flag = 3，若当前时间为2014-05-05 16:34:08，则返回2014-05-02 16:34:08
	//day.setDate(parseInt(day.getDate(),10)-flag);
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minuts = day.getMinutes();
	var second = day.getSeconds();
	var millisecond = day.getMilliseconds();
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(hours<10){
		hours = "0"+hours;
	}
	if(minuts<10){
		minuts = "0"+minuts;
	}
	if(second<10){
		second = "0"+second;
	}
	if(millisecond<10){
		millisecond = "00"+millisecond;
	}else if(10<millisecond&&millisecond<100){
		millisecond = "0"+millisecond;
	}
	
	var time =year+"-"+month+"-"+date+" "+ hours+":"+ minuts+":"+ second+":"+millisecond;
	return time;
}
/**
 * 判断是不是符合IP格式
 * @param {} ip
 * @return {Boolean}
 */
function isIP(ip){
	if(ip==undefined||ip==null||ip===""){
		return false;
	}else{
		var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var reg = ip.match(exp);
		if(reg==null)
		{
		return false;
		}
		else
		{
		return true;
		}
	}
	
}

/**
 * 根据IP获取与之相关的地域和运营商信息
 * @param {} ip ip地址
 * @param {} showIpLocation　在页面上显示的位置
 */
function getIp(ip,showIpLocation){	
	$.ajax({
		type : "post",
		url : "search.ipinfo.action",
		dataType : "json",
		data : "ip="+ip,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showIpView(data,showIpLocation);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 对查询出的与IP相关的数据进行展示
 * @param {} datas
 * @param {} showIpLocation
 */
function showIpView(datas,showIpLocation){
	var data;
	var country;//国家，如中国
	var area;//区域，如华北
	var region;//省份，如贵州省
	var city;//城市，如黔东南苗族侗族自治州
	var isp;//运营商，如电信
	data = datas.data;
	if(data!=undefined&&data!=null&&data!==""){
		country = data.country;//国家，如中国
		area = data.area;//区域，如华北
		region = data.region;//省份，如贵州省
		city = data.city;//城市，如黔东南苗族侗族自治州
		isp = data.isp;//运营商，如电信
		var ipInfo = "";
		if(data!=undefined&&data!=null&&data!==""){
			ipInfo += country+" ";
		}
		if(data!=undefined&&data!=null&&data!==""){
			ipInfo += area+" ";
		}
		if(data!=undefined&&data!=null&&data!==""){
			ipInfo += region+" ";
		}
		if(data!=undefined&&data!=null&&data!==""){
			ipInfo += city+" ";
		}
		if(data!=undefined&&data!=null&&data!==""){
			ipInfo += isp;
		}
		$('#'+showIpLocation).append(ipInfo);
	}
}