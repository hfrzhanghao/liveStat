package com.redcdn.monitor.service.impl;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.redcdn.monitor.service.ConfigService;
import com.redcdn.monitor.util.ReadFile;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class ConfigServiceImpl implements ConfigService {
	JSONArray jsonArray;
	JSONObject jsonObject;
	String config ;
	ReadFile readFile = new ReadFile();
	
	protected Logger logger = Logger.getLogger(ConfigServiceImpl.class);

	public String getServerAdd() {
		logger.info("从配置文件config.txt中读取统计信息的接口地址。");
		try {
			config = readFile.getJson();
		} catch (IOException e) {
			logger.error("从配置文件config.txt中读取统计信息的接口地址失败。"+e);
		}
		jsonObject = JSONObject.fromObject(config);
		return jsonObject.getJSONObject("configInfo").getString("serverAdd");
	}

	public String getRelayStateURL() {
		logger.info("从配置文件config.txt中读取Relay状态信息的接口地址。");
		try {
			config = readFile.getJson();
		} catch (IOException e) {
			logger.error("从配置文件config.txt中读取Relay状态信息的接口地址失败。"+e);
		}
		jsonObject = JSONObject.fromObject(config);
		return jsonObject.getJSONObject("configInfo").getString("relayStateURL");
	}

	public int getTimeOut() {
		logger.info("从配置文件config.txt中读取超时时间。");
		try {
			config = readFile.getJson();
		} catch (IOException e) {
			logger.error("从配置文件config.txt中读取超时时间失败。"+e);
		}
		jsonObject = JSONObject.fromObject(config);
		return Integer.parseInt(jsonObject.getJSONObject("configInfo").getString("timeOut"));
	}

}
