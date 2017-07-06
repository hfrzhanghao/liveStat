package com.redcdn.monitor.common;

import java.io.File;
import java.io.FileInputStream;
import java.util.ResourceBundle;

public final class CommonConstants {
	public static final String USER_LOGIN_COOKIE = "userlogincookie";
	public static final String LIVE_ANALYSIS_URL_TEMP;
	public static final String LIVE_ANALYSIS_URL;
	public static final String LIVE_USER_URL;
	//public static final String DEMAND_ANALYSIS_URL;
	//public static final String DEMAND_USER_URL;
	static {
		LIVE_ANALYSIS_URL_TEMP = ResourceBundle.getBundle("config").getString("liveAnalysisURL");
		if(!LIVE_ANALYSIS_URL_TEMP.endsWith("/")){
			LIVE_ANALYSIS_URL = LIVE_ANALYSIS_URL_TEMP + "/all/liveCount";
			LIVE_USER_URL = LIVE_ANALYSIS_URL_TEMP + "/user/lockCount";
		}else{
			LIVE_ANALYSIS_URL = LIVE_ANALYSIS_URL_TEMP + "all/liveCount";
			LIVE_USER_URL = LIVE_ANALYSIS_URL_TEMP + "user/lockCount";
		}
		
		//DEMAND_ANALYSIS_URL = ResourceBundle.getBundle("config").getString("demandAnalysisURL") + "/all/liveCount";
		//DEMAND_USER_URL = ResourceBundle.getBundle("config").getString("demandAnalysisURL") + "/user/lockCount";
	}

	public static String roomjson() {
		File file = new File(CommonConstants.class.getClassLoader().getResource("").getFile() + "json.txt");
		try {
			FileInputStream fis = new FileInputStream(file);
			byte[] buf = new byte[1024];
			StringBuffer sb = new StringBuffer();
			while ((fis.read(buf)) != -1) {
				sb.append(new String(buf));
				buf = new byte[1024];
			}

			return new String(sb.toString().getBytes("GBK"), "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
