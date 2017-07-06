// 这里是字典表，用来描述地域、运营商、用户类型、设备类型、系统类型、网络类型等。
// 地域
var domain_map = new Map();
// 大写部分
domain_map.put('BEIJING', '北京');
domain_map.put('TIANJIN', '天津');
domain_map.put('HEBEI', '河北');
domain_map.put('SHANXI', '山西');
domain_map.put('NEIMENGGU', '内蒙古');
domain_map.put('LIAONING', '辽宁');
domain_map.put('JILIN', '吉林');
domain_map.put('HEILONGJIANG', '黑龙江');
domain_map.put('SHANGHAI', '上海');
domain_map.put('JIANGSU', '江苏');
domain_map.put('ZHEJIANG', '浙江');
domain_map.put('ANHUI', '安徽');
domain_map.put('FUJIAN', '福建');
domain_map.put('JIANGXI', '江西');
domain_map.put('SHANDONG', '山东');
domain_map.put('HENAN', '河南');
domain_map.put('HUBEI', '湖北');
domain_map.put('HUNAN', '湖南');
domain_map.put('GUANGDONG', '广东');
domain_map.put('GUANGXI', '广西');
domain_map.put('HAINAN', '海南');
domain_map.put('CHONGQING', '重庆');
domain_map.put('SICHUAN', '四川');
domain_map.put('GUIZHOU', '贵州');
domain_map.put('YUNNAN', '云南');
domain_map.put('XIZANG', '西藏');
domain_map.put('SHAANXI', '陕西');
domain_map.put('GANSU', '甘肃');
domain_map.put('QINGHAI', '青海');
domain_map.put('NINGXIA', '宁夏');
domain_map.put('XINJIANG', '新疆');
domain_map.put('TAIWAN', '台湾');
domain_map.put('XIANGGANG', '香港');
domain_map.put('AOMEN', '澳门');
domain_map.put('CN', '中国其它');
// 小写部分
domain_map.put('beijing', '北京');
domain_map.put('tianjin', '天津');
domain_map.put('hebei', '河北');
domain_map.put('shanxi', '山西');
domain_map.put('neimenggu', '内蒙古');
domain_map.put('liaoning', '辽宁');
domain_map.put('jilin', '吉林');
domain_map.put('heilongjiang', '黑龙江');
domain_map.put('shanghai', '上海');
domain_map.put('jiangsu', '江苏');
domain_map.put('zhejiang', '浙江');
domain_map.put('anhui', '安徽');
domain_map.put('fujian', '福建');
domain_map.put('jiangxi', '江西');
domain_map.put('shandong', '山东');
domain_map.put('henan', '河南');
domain_map.put('hubei', '湖北');
domain_map.put('hunan', '湖南');
domain_map.put('guangdong', '广东');
domain_map.put('guangxi', '广西');
domain_map.put('hainan', '海南');
domain_map.put('chongqing', '重庆');
domain_map.put('sichuan', '四川');
domain_map.put('guizhou', '贵州');
domain_map.put('yunnan', '云南');
domain_map.put('xizang', '西藏');
domain_map.put('shaanxi', '陕西');
domain_map.put('gansu', '甘肃');
domain_map.put('qinghai', '青海');
domain_map.put('ningxia', '宁夏');
domain_map.put('xinjiang', '新疆');
domain_map.put('taiwan', '台湾');
domain_map.put('xianggang', '香港');
domain_map.put('aomen', '澳门');
domain_map.put('cn', '中国其它');

// 数字部分
domain_map.put('1', '北京');
domain_map.put('2', '天津');
domain_map.put('3', '河北');
domain_map.put('4', '山西');
domain_map.put('5', '内蒙古');
domain_map.put('6', '辽宁');
domain_map.put('7', '吉林');
domain_map.put('8', '黑龙江');
domain_map.put('9', '上海');
domain_map.put('10', '江苏');
domain_map.put('11', '浙江');
domain_map.put('12', '安徽');
domain_map.put('13', '福建');
domain_map.put('14', '江西');
domain_map.put('15', '山东');
domain_map.put('16', '河南');
domain_map.put('17', '湖北');
domain_map.put('18', '湖南');
domain_map.put('19', '广东');
domain_map.put('20', '广西');
domain_map.put('21', '海南');
domain_map.put('22', '重庆');
domain_map.put('23', '四川');
domain_map.put('24', '贵州');
domain_map.put('25', '云南');
domain_map.put('26', '西藏');
domain_map.put('27', '陕西');
domain_map.put('28', '甘肃');
domain_map.put('29', '青海');
domain_map.put('30', '宁夏');
domain_map.put('31', '新疆');
domain_map.put('32', '台湾');
domain_map.put('33', '香港');
domain_map.put('34', '澳门');
domain_map.put('35', '中国其它');

// 运营商
var isp_map = new Map();
// 大写部分
isp_map.put('DIANXIN', '电信');
isp_map.put('LIANTONG', '联通');
isp_map.put('YIDONG', '移动');
isp_map.put('GEHUAYOUXI', '歌华有线');
isp_map.put('CHANGCHENG', '长城宽带');
isp_map.put('FANGZHENGK', '方正宽带');
isp_map.put('GUANGDIAN', '广电宽带');
isp_map.put('ZHONGDIANF', '中电飞华');
isp_map.put('ZHONGDIANH', '中电华通');
isp_map.put('JIAOYUWANG', '教育网');
isp_map.put('HUAYUKUAND', '华宇宽带');
isp_map.put('KEJIWANG', '科技网');
isp_map.put('TIANWEIKUA', '天威宽带');
isp_map.put('YINGLIANKU', '盈联宽带');
isp_map.put('TAIWANWANG', '台湾网络');
isp_map.put('AOMENWANGL', '澳门网络');
isp_map.put('DIANXUNYIN', '电讯盈科');
isp_map.put('YINGHAIWEI', '瀛海威');
isp_map.put('YOUXIANTON', '有线通');
isp_map.put('TIETONG', '铁通');
isp_map.put('XIBUSHUMA', '西部数码');
isp_map.put('ZHONGKEW', '中科网');
isp_map.put('HUASHU', '华数宽带');
isp_map.put('YOUTIAN', '油田宽带');
isp_map.put('SHIXUN', '视讯宽带');
isp_map.put('YOUXIANKU', '有线宽带');
isp_map.put('BEILONGW', '北龙中网');
isp_map.put('KUANDAIT', '宽带通');
isp_map.put('BITONGWL', '比通联合网络');
isp_map.put('PBOSHI', '鹏博士宽带');
isp_map.put('GUANGDIANW', '广电网');
isp_map.put('SENHUA', '森华通信');
isp_map.put('SHIJIHUL', '世纪互联');
isp_map.put('GEHUAKD', '歌华宽带');
isp_map.put('GEHUAW', '歌华网络');
isp_map.put('TIANDIWANG', '天地网联');
isp_map.put('DIANXINT', '电信通');
isp_map.put('QITA', '其他');

// 小写部分
isp_map.put('dianxin', '电信');
isp_map.put('liantong', '联通');
isp_map.put('yidong', '移动');
isp_map.put('gehuayouxi', '歌华有线');
isp_map.put('changcheng', '长城宽带');
isp_map.put('fangzhengk', '方正宽带');
isp_map.put('guangdian', '广电宽带');
isp_map.put('zhongdianf', '中电飞华');
isp_map.put('zhongdianh', '中电华通');
isp_map.put('jiaoyuwang', '教育网');
isp_map.put('huayukuand', '华宇宽带');
isp_map.put('kejiwang', '科技网');
isp_map.put('tianweikua', '天威宽带');
isp_map.put('yinglianku', '盈联宽带');
isp_map.put('taiwanwang', '台湾网络');
isp_map.put('aomenwangl', '澳门网络');
isp_map.put('dianxunyin', '电讯盈科');
isp_map.put('yinghaiwei', '瀛海威');
isp_map.put('youxianton', '有线通');
isp_map.put('tietong', '铁通');
isp_map.put('xibushuma', '西部数码');
isp_map.put('zhongkew', '中科网');
isp_map.put('huashu', '华数宽带');
isp_map.put('youtian', '油田宽带');
isp_map.put('shixun', '视讯宽带');
isp_map.put('youxianku', '有线宽带');
isp_map.put('beilongw', '北龙中网');
isp_map.put('kuandait', '宽带通');
isp_map.put('bitongwl', '比通联合网络');
isp_map.put('pboshi', '鹏博士宽带');
isp_map.put('guangdianw', '广电网');
isp_map.put('senhua', '森华通信');
isp_map.put('shijihul', '世纪互联');
isp_map.put('gehuakd', '歌华宽带');
isp_map.put('gehuaw', '歌华网络');
isp_map.put('tiandiwang', '天地网联');
isp_map.put('dianxint', '电信通');
isp_map.put('qita', '其他');

// 数字部分
isp_map.put('1', '电信');
isp_map.put('2', '联通');
isp_map.put('3', '移动');
isp_map.put('4', '歌华有线');
isp_map.put('5', '长城宽带');
isp_map.put('6', '方正宽带');
isp_map.put('7', '广电宽带');
isp_map.put('8', '中电飞华');
isp_map.put('9', '中电华通');
isp_map.put('10', '教育网');
isp_map.put('11', '华宇宽带');
isp_map.put('12', '科技网');
isp_map.put('13', '天威宽带');
isp_map.put('14', '盈联宽带');
isp_map.put('15', '台湾网络');
isp_map.put('16', '澳门网络');
isp_map.put('17', '电讯盈科');
isp_map.put('18', '瀛海威');
isp_map.put('19', '有线通');
isp_map.put('20', '铁通');
isp_map.put('21', '西部数码');
isp_map.put('22', '中科网');
isp_map.put('23', '华数宽带');
isp_map.put('24', '油田宽带');
isp_map.put('25', '视讯宽带');
isp_map.put('26', '有线宽带');
isp_map.put('27', '北龙中网');
isp_map.put('28', '宽带通');
isp_map.put('29', '比通联合网络');
isp_map.put('30', '鹏博士宽带');
isp_map.put('31', '广电网');
isp_map.put('32', '森华通信');
isp_map.put('33', '世纪互联');
isp_map.put('34', '歌华宽带');
isp_map.put('35', '歌华网络');
isp_map.put('36', '天地网联');
isp_map.put('37', '电信通');
isp_map.put('38', '其他');

// 用户类型
var user_type_map = new Map();
user_type_map.put('0', '免费用户');
user_type_map.put('1', '付费用户');
user_type_map.put('2', 'VIP用户');

// 设备类型
var device_type_map = new Map();
device_type_map.put('0', 'N8');
device_type_map.put('1', 'PC');
device_type_map.put('2', '手机');
device_type_map.put('3', '苹果手机');
device_type_map.put('4', 'TV');
device_type_map.put('5', 'N7');

// 系统类型
var os_map = new Map();
os_map.put('0', 'Android');
os_map.put('1', 'Windows');
os_map.put('2', 'IOS');

// 网络类型
var net_type_map = new Map();
net_type_map.put('0', 'wifi网络');
net_type_map.put('1', '有线网络');
net_type_map.put('2', '3G网络');
net_type_map.put('3', 'GPRS网络');
net_type_map.put('4', '移动3G');
net_type_map.put('5', '电信3G');
net_type_map.put('6', '联通3G');
net_type_map.put('7', 'Android4G|IOS移动4G');
net_type_map.put('8', '联通4G/电信4G');
net_type_map.put('9', 'Server walker,2Mb and No upload detect');

// 摄像头和屏幕的能力大小
// int camera_size;//摄像头能力0(NULL), 4(QVGA), 16(VGA), 32(720P)
// int screen_size;//显示器屏幕大小 0(NULL), 4(QVGA), 16(VGA), 32(720P)
var camera_screen_map = new Map();
camera_screen_map.put(0, "Null");
camera_screen_map.put(4, "QVGA");
camera_screen_map.put(16, "VGA");
camera_screen_map.put(32, "720P");

var appkey_map = new Map();
appkey_map.put("1", "移动");

var flash_map = new Map();
flash_map.put('1', 'audio');
flash_map.put('2', 'video');

// 带宽自适应调节等级表 等级与帧率的对应关系
var frame_map = new Map();
frame_map.put("0", 20);
frame_map.put("1", 15);
frame_map.put("2", 10);
frame_map.put("3", 15);
frame_map.put("4", 10);
frame_map.put("5", 0);
frame_map.put("6", 0);

// 诊断结果
var diagnose_result_map = new Map();
diagnose_result_map.put("0", "质量好");
diagnose_result_map.put("1", "信号不好");
diagnose_result_map.put("2", "GetPath未找到最优中转");
diagnose_result_map.put("3", "部署问题");
diagnose_result_map.put("4", "接入拥塞");
diagnose_result_map.put("5", "严重接入拥塞");
diagnose_result_map.put("6", "其它");
diagnose_result_map.put("7", "未知");

//视频是否卡 (0 不卡 1 卡)
var v_map = new Map();
v_map.put("0","不卡");
v_map.put("1","卡");

//延时是否大，0 不是 1 是)
var delay_map = new Map();
delay_map.put("0","不是");
delay_map.put("1","是");

//话务质量  0:好,1:中,2:差
var quality_map = new Map();
quality_map.put("0","好");
quality_map.put("1","中");
quality_map.put("2","差");
