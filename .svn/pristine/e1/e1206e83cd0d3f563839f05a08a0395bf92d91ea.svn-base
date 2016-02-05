package jvb.util.String;

import java.util.regex.Pattern;

/**
 * 字符串处理的工具类
 * 
 * @author zhangyang
 * 
 */
public class StringUtil {
	/**
	 * 判断字符串，是否为空
	 * 
	 * @param str
	 *            要处理的字符串
	 * @return true 为空，false 非空
	 */
	public static boolean isEmpty(String str) {
		if (("".equals(str)) || (str == null)) {
			return true;
		} else {
			return false;
		}
	}

	public static String killNull(String str) {
		if (str == null) {
			return "";
		} else {
			return str;
		}
	}

	public static String removeLastChar(String str) {
		if (str != null && str.length() >= 1) {
			return str.substring(0, str.length() - 1);
		}
		return str;
	}

	public static StringBuffer removeLastChar(StringBuffer str) {
		if (str != null && str.length() >= 1) {
			return str.deleteCharAt(str.length() - 1);
		}
		return str;
	}

	public static String fristCharUpcase(String str) {
		if (str != null && str.length() >= 1) {
			String firstChar = str.substring(0, 1);

			return firstChar.toUpperCase() + str.substring(1);
		}
		return str;
	}

	public static StringBuffer removeLastChar(StringBuffer buffer, char ch) {
		if (buffer.charAt(buffer.length() - 1) == ch) {
			return buffer.deleteCharAt(buffer.length() - 1);
		} else {
			return buffer;
		}
	}

	public static boolean isNumber(String str) {
		Pattern pattern = Pattern.compile("[0-9]*");
		return pattern.matcher(str).matches();
	}
	
	public static void main(String[] args) {
		String abc="1234abc";
		System.out.println(isNumber(abc));
	}

}