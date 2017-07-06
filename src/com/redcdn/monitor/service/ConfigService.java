package com.redcdn.monitor.service;

import com.sun.org.apache.xml.internal.resolver.helpers.PublicId;

/**
 * @author 刘艳伟
 * @path count/com.service.impl/ConfigService.java
 * @date 2014-9-24下午2:58:30
 * 读取配置文件的接口
 */
public interface ConfigService {
	/**
	 * 获取接口服务的地址
	 * @author 刘艳伟 
	 * @date 2014-9-24下午3:04:49
	 */
	public abstract String getServerAdd();
	
	/**
	 * 获取所有	Relay状态信息的地址
	 * @author 刘艳伟 
	 * @date 2014-10-21上午10:54:37
	 */
	public abstract String  getRelayStateURL();
	
	/**
	 * 获取连接服务器的超时时间
	 * @author 刘艳伟 
	 * @date 2014-9-24下午3:04:49
	 */
	public abstract int getTimeOut();
}
