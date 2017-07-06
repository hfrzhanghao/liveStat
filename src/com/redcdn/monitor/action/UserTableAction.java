package com.redcdn.monitor.action;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import net.sf.json.JSONObject;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import com.redcdn.monitor.common.CommonConstants;

/**
 * 
 * @Author Cyril
 * @date 2016-4-25下午
 * @类功能　count.jsp的各个查询所调用的方法
 */
public class UserTableAction extends BaseAction {
	private static final long serialVersionUID = 2L;

	private int pageSize = 25;//一页显示多少条记录

	private int currPage;// 当前页
	private String startTime;// 开始时间
	private String endTime;// 结束时间
	private String playType;
	
	private String ip;
	private String url;
	private String domain;
	private String isp;
	private String lockCount;
	private String firstPicMin;
	private String firstPicMax;
	
	public String getLockCount() {
		return lockCount;
	}

	public void setLockCount(String lockCount) {
		this.lockCount = lockCount;
	}

	public String getFirstPicMin() {
		return firstPicMin;
	}

	public void setFirstPicMin(String firstPicMin) {
		this.firstPicMin = firstPicMin;
	}

	public String getFirstPicMax() {
		return firstPicMax;
	}

	public void setFirstPicMax(String firstPicMax) {
		this.firstPicMax = firstPicMax;
	}

	/**
	 * 转化成毫秒的开始时间
	 */
	Long starTimestamp;
	/**
	 * 转化成毫秒的结束时间
	 */
	Long endTimestamp;

	/**
	 * 开始时间与结束时间的组合参数
	 */
	String data;

	/**
	 * @author Cyril
	 * @date 2016-4-25下午
	 */
	public String getUserData() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		form.add("startTime", startTime + "");
		form.add("endTime", endTime + "");
		
		if(!"".equals(domain) && domain != null){
			form.add("domain", domain + "");
		}
		
		if(!"".equals(isp) && isp != null){
			form.add("isp", isp + "");
		}
		
		if(url != null && !"".equals(url)){
			form.add("url", url + "");
		}
		form.add("lockCount",lockCount);
		
		form.add("firstPicMin",firstPicMin);
		
		form.add("firstPicMax",firstPicMax);
		
		form.add("service", "all");
		
		JSONObject jsonObject = null;
		try {
			// 将查询框表单值传送到monitorServer
			//if(playType.equals("1")){
			jsonObject = proxy.postFormWithReturnJSONObject1(CommonConstants.LIVE_ANALYSIS_URL, form);
			/*}else{
				jsonObject = proxy.postFormWithReturnJSONObject1(CommonConstants.DEMAND_ANALYSIS_URL, form);
			}*/
			
			logger.info("CDN统计返回数据："+jsonObject.toString());

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	
	/**
	 * 处理开始时间、结束时间，设置参数
	 * 
	 * @author
	 * @date 
	 */
	public void toSetConfig() {

		starTimestamp = StrTimeToLong(startTime);

		endTimestamp = StrTimeToLong(endTime);

		data = "startTime=" + starTimestamp + "&endTime=" + endTimestamp;

	}

	/**
	 * 将时间转化为毫秒值
	 * 
	 * @author 刘艳伟
	 */
	public long StrTimeToLong(String time) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			Date d = df.parse(time);
			return d.getTime();
		} catch (ParseException e) {
			logger.error("时间格式错误：yyyy-MM-dd HH:mm:ss：" + time);
		}
		return 0;
	}
	
	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public String getPlayType() {
		return playType;
	}

	public void setPlayType(String playType) {
		this.playType = playType;
	}

	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Long getStarTimestamp() {
		return starTimestamp;
	}

	public void setStarTimestamp(Long starTimestamp) {
		this.starTimestamp = starTimestamp;
	}

	public Long getEndTimestamp() {
		return endTimestamp;
	}

	public void setEndTimestamp(Long endTimestamp) {
		this.endTimestamp = endTimestamp;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getCurrPage() {
		return currPage;
	}

	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getIsp() {
		return isp;
	}

	public void setIsp(String isp) {
		this.isp = isp;
	}

}