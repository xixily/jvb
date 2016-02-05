package jvb.util.String;

import java.util.regex.Pattern;

/**
 * �ַ�������Ĺ�����
 * 
 * @author zhangyang
 * 
 */
public class StringUtil {
	/**
	 * �ж��ַ������Ƿ�Ϊ��
	 * 
	 * @param str
	 *            Ҫ������ַ���
	 * @return true Ϊ�գ�false �ǿ�
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