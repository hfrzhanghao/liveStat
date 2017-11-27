package com.redcdn.monitor.action;

import java.net.URLEncoder;
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
public class SearchAction extends BaseAction {
	private static final long serialVersionUID = 2L;

	private int pageSize = 25;// 一页显示多少条记录

	private int currPage;// 当前页
	private String startTime;// 开始时间
	private String endTime;// 结束时间
	private String playType;

	private String ip;
	private String url;
	private String domain;
	private String domainName = "";
	private String domainNameFilter;
	private String isp;
	private String lockCount;
	private String firstPicMin;
	private String firstPicMax;

	private String openType;
	private String businessID;
	private String userName;
	private String durationSelect;
	private String duration;
	private String firstPicDurationSelect;
	private String firstPicDuration;
	private String topN = "";

	private String userAccount;

	private String service;
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
	public String getGraghData() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		form.add("startTime", startTime + "");
		form.add("endTime", endTime + "");

		if (!"".equals(domain) && domain != null) {
			form.add("domain", domain + "");
		}

		if (!"".equals(domainNameFilter) && domainNameFilter != null) {
			form.add("domainNameFilter", domainNameFilter + "");
		}

		if (!"".equals(isp) && isp != null) {
			form.add("isp", isp + "");
		}

		if (url != null && !"".equals(url)) {
			form.add("url", url + "");
		}

		if (openType != null && !"".equals(openType)) {
			form.add("openType", openType + "");
		}

		if (businessID != null && !"".equals(businessID)) {
			form.add("businessID", businessID + "");
		}

		if (userName != null && !"".equals(userName)) {
			form.add("userName", userName + "");
		}

		if (durationSelect != null && !"".equals(durationSelect)) {
			form.add("durationSelect", durationSelect + "");
		}

		if (duration != null && !"".equals(duration)) {
			form.add("duration", duration + "");
		}

		if (firstPicDurationSelect != null && !"".equals(firstPicDurationSelect)) {
			form.add("firstPicDurationSelect", firstPicDurationSelect + "");
		}

		if (firstPicDuration != null && !"".equals(firstPicDuration)) {
			form.add("firstPicDuration", firstPicDuration + "");
		}

		form.add("service", "all");

		JSONObject jsonObject = null;
		try {
			//
			if (CommonConstants.OLD_DATA == 1
					&& ((duration != null && !"".equals(duration)) || (firstPicDuration != null && !"".equals(firstPicDuration)) || Long.parseLong(startTime) < Long
							.parseLong(CommonConstants.NEW_DATA_TIME))) {
				jsonObject = proxy.postFormWithReturnJSONObject1(CommonConstants.LIVE_ANALYSIS_URL, form);
			} else {
				jsonObject = proxy.postFormWithReturnJSONObject1(CommonConstants.LIVE_ANALYSIS_URL_PRETREAT, form);
			}

			System.out.println("数据返回成功！");

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			String respons = renderJsonString(jsonObject.toString());
			System.out.println("页面数据产生成功！");
			return respons;
		}
		return null;
	}

	public String getPopData() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		form.add("startTime", startTime + "");
		form.add("endTime", endTime + "");

		if (!"".equals(domainName) && domainName != null) {
			form.add("domainName", domainName + "");
		} else {
			form.add("domainName", "live.butel.com");
		}
		if (!"".equals(topN) && topN != null) {
			form.add("topN", topN);
		} else {
			form.add("topN", 10);
		}
		String domainName1 = (domainName == null || domainName.equals("")) ? "live.butel.com" : domainName;
		String topN1 = (topN == null || topN.equals("")) ? "10" : topN;
		String params = "\"startTime\":" + startTime + ",\"endTime\":" + endTime + ",\"domainName\":\"" + domainName1 + "\",\"topN\":" + topN1;

		JSONObject jsonObject = null;
		try {
			String dataT = URLEncoder.encode("{") + params + URLEncoder.encode("}");
			jsonObject = proxy.get("http://127.0.0.1:8080/liveAnalysis/external/externalService?service=showPopular&params=" + dataT);

			System.out.println("数据返回成功！");

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			String respons = renderJsonString(jsonObject.toString());
			System.out.println("页面数据产生成功！");
			return respons;
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

	public String getDomainNameFilter() {
		return domainNameFilter;
	}

	public void setDomainNameFilter(String domainNameFilter) {
		this.domainNameFilter = domainNameFilter;
	}

	public String getIsp() {
		return isp;
	}

	public void setIsp(String isp) {
		this.isp = isp;
	}

	public String getLockCount() {
		return lockCount;
	}

	public void setLockCount(String lockCount) {
		this.lockCount = lockCount;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
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

	public String getOpenType() {
		return openType;
	}

	public void setOpenType(String openType) {
		this.openType = openType;
	}

	public String getBusinessID() {
		return businessID;
	}

	public void setBusinessID(String businessID) {
		this.businessID = businessID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDurationSelect() {
		return durationSelect;
	}

	public void setDurationSelect(String durationSelect) {
		this.durationSelect = durationSelect;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getFirstPicDurationSelect() {
		return firstPicDurationSelect;
	}

	public void setFirstPicDurationSelect(String firstPicDurationSelect) {
		this.firstPicDurationSelect = firstPicDurationSelect;
	}

	public String getFirstPicDuration() {
		return firstPicDuration;
	}

	public void setFirstPicDuration(String firstPicDuration) {
		this.firstPicDuration = firstPicDuration;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getTopN() {
		return topN;
	}

	public void setTopN(String topN) {
		this.topN = topN;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

}