package com.redcdn.monitor.common;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

/**
 * Convenience class for setting and retrieving cookies.
 */
public class CookieUtil
{
	 private static final String PATH = "/";

	    private static final int MINUTE_SECONDS = 60;

	    /**
	     * 
	     * @param response
	     * @param name
	     * @param value
	     */
	    public static void setCookie(HttpServletResponse response, String name, String value)
	    {
	        setCookie(response, name, value, PATH);
	    }

	    /**
	     * 
	     * @param response
	     * @param name
	     * @param value
	     * @param path
	     */
	    public static void setCookie(HttpServletResponse response, String name, String value, String path)
	    {
	        setCookie(response, name, value, path, -1);
	    }

	    /**
	     * 
	     * @param response
	     * @param name cookie名称
	     * @param value 值
	     * @param path 存储路径
	     * @param age 分钟
	     */
	    public static void setCookie(HttpServletResponse response, String name, String value, String path, int age)
	    {

	        setCookie(response, name, value, path, age, null);
	    }

	    /**
	     * 
	     * @param response
	     * @param name cookie名称
	     * @param value 值
	     * @param path 存储路径
	     * @param age 分钟
	     * @param domain 域
	     */
	    public static void setCookie(HttpServletResponse response, String name, String value, String path, int age,
	            String domain)
	    {

	        Cookie cookie = new Cookie(name, value);
	        cookie.setSecure(false);
	        cookie.setPath(path);
	        if (StringUtils.isNotEmpty(domain))
	        {
	            cookie.setDomain(domain);
	        }
	        if (age > 0)
	        {
	            cookie.setMaxAge(age * MINUTE_SECONDS);
	        }
	        response.addCookie(cookie);
	    }

	    public static String getCookieValue(HttpServletRequest request, String name)
	    {
	        Cookie cookie = getCookie(request, name);
	        if (cookie == null)
	        {
	            return null;
	        }
	        return cookie.getValue();
	    }

	    public static Cookie getCookie(HttpServletRequest request, String name)
	    {
	        Cookie[] cookies = request.getCookies();
	        if (cookies == null || StringUtils.isEmpty(name))
	        {
	            return null;
	        }
	        Cookie returnCookie = null;
	        for (Cookie cookie : cookies)
	        {
	            if (cookie.getName().equals(name))
	            {
	                returnCookie = cookie;
	                break;
	            }
	        }
	        return returnCookie;
	    }

	    public static String getAllCookieNameAndValue(HttpServletRequest request)
	    {
	        Cookie[] cookies = request.getCookies();
	        StringBuffer cs = new StringBuffer();

	        for (int i = 0; i < cookies.length; i++)
	        {
	            cs.append(cookies[i].getName()).append("=").append(cookies[i].getValue()).append(";");
	        }
	        return cs.toString();
	    }

	    public static void deleteCookie(HttpServletResponse response, Cookie cookie)
	    {
	        if (cookie != null)
	        {
	            // Delete the cookie by setting its maximum age to zero
	            cookie.setMaxAge(0);
	            cookie.setValue(null);
	            response.addCookie(cookie);
	        }
	    }

	    /**
	     * Convenience method to get the application's URL based on request
	     * variables.
	     */
	    public static String getAppURL(HttpServletRequest request)
	    {
	        StringBuffer url = new StringBuffer();
	        int port = request.getServerPort();
	        if (port < 0)
	        {
	            port = 80; // Work around java.net.URL bug
	        }
	        String scheme = request.getScheme();
	        url.append(scheme);
	        url.append("://");
	        url.append(request.getServerName());
	        if ((scheme.equals("http") && (port != 80)) || (scheme.equals("https") && (port != 443)))
	        {
	            url.append(':');
	            url.append(port);
	        }
	        url.append(request.getContextPath());
	        return url.toString();
	    }
}
