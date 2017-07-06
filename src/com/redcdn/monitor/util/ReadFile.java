package com.redcdn.monitor.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import sun.util.logging.resources.logging;

/**
 * 读取配置文件
 * 
 * @author 刘艳伟
 * @path count/util/ReadFile.java
 * @date 2014-9-24下午3:14:18
 */
public class ReadFile {

	public String getJson() throws IOException {
		StringBuffer sb = new StringBuffer();

		// 创建一个读取流对象和文件相关联
		// FileReader fr;
		InputStreamReader inputStreamReader;
		try {
			Logger.getLogger(ReadFile.class).info("开始读取WEB-INF/config.txt配置文件");
			String path = URLDecoder.decode(ServletActionContext.getServletContext().getRealPath("WEB-INF/config.txt"), "UTF-8");
			inputStreamReader = new InputStreamReader(new FileInputStream(path), "UTF-8");
			// 为了提高效率，加入了缓冲技术，将字符读取流对象作为参数传递给缓冲对象的构造函数。
			BufferedReader br = new BufferedReader(inputStreamReader);
			String line = null;
			// readLine()读取一个文本行。包含该行内容的字符串，不包含任何行终止符，如果已到达流末尾，则返回 null
			while ((line = br.readLine()) != null) {
				sb.append(line.trim());
			}
			br.close();
		} catch (Exception e) {
			Logger.getLogger(ReadFile.class).error("读取WEB-INF/config.txt配置文件出错"+e);
		}
		String out = "";
		byte[] b = sb.toString().getBytes("UTF-8");
		//System.out.println(b[0]);
		//如果是.txt文件，手动修改配置文件后在文件头部产生的字符其值为-17，如果是.xml文件，产生的字符其值为好像是93，这个需要待测试
		if (b[0] == -17) {// 防止用记事本修改文件造成的BOM
			try {
				out = new String(b, 3, b.length - 3, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		} else {
			out = sb.toString();
		}

		return out;
	}
}
