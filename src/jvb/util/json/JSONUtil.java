package jvb.util.json;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jvb.pinche.vo.User;
import jvb.util.String.StringUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

/**
 *封装java对于json数据的各种操作
 * 
 * @author dengxf
 * 
 */
public class JSONUtil {
	private static final Logger logger = Logger.getLogger(JSONUtil.class);

	private JSONObject jsonObj;

	public JSONUtil(JSONObject jsonObj) {
		this.jsonObj = jsonObj;
	}

	public List<JSONUtil> getList(String key) {
		List<JSONUtil> result = new ArrayList<JSONUtil>();
		JSONArray jsonArray = null;
		String[] keys = null;
		if (key.contains(".")) {
			keys = key.split("\\.");
			JSONObject tempObj = this.jsonObj.getJSONObject(keys[0]);
			try {
				for (int i = 1; i < keys.length - 1; i++) {
					tempObj = tempObj.getJSONObject(keys[i]);
				}
				jsonArray = tempObj.getJSONArray(keys[keys.length - 1]);

			} catch (Exception e) {
				logger.error("json处理错误！", e);
				return null;
			}

		} else {
			try {
				jsonArray = jsonObj.getJSONArray(key);
			} catch (Exception e) {
				return null;
			}
		}

		for (int i = 0; i < jsonArray.size(); i++) {
			result.add(new JSONUtil(jsonArray.getJSONObject(i)));
		}
		return result;
	}

	public int getSize(String key) {
		String[] keys = null;
		if (key.contains(".")) {
			keys = key.split("\\.");
			JSONObject tempObj = this.jsonObj.getJSONObject(keys[0]);
			try {
				for (int i = 1; i < keys.length - 1; i++) {
					tempObj = tempObj.getJSONObject(keys[i]);
				}
				return tempObj.getJSONObject(keys[keys.length - 1]).size();
			} catch (Exception e) {
				logger.error("json处理错误！", e);
				return 0;
			}

		} else {
			try {
				return jsonObj.getJSONObject(key).size();
			} catch (Exception e) {
				return 0;
			}
		}
	}

	public double getDouble(String key) {
		String value = getString(key);
		try {
			return Double.parseDouble(value);
		} catch (Exception e) {
			logger.error("double数据类型转化错误！");
			return 0;
		}

	}

	public String getString(String key) {
		String[] keys = null;
		if (key.contains(".")) {
			keys = key.split("\\.");
			JSONObject tempObj = this.jsonObj.getJSONObject(keys[0]);
			try {
				for (int i = 1; i < keys.length - 1; i++) {
					tempObj = tempObj.getJSONObject(keys[i]);
				}
				return tempObj.getString(keys[keys.length - 1]);
			} catch (Exception e) {
				logger.error("json处理错误！", e);
				return "";
			}

		} else {
			try {
				return jsonObj.getString(key);
			} catch (Exception e) {
				return "";
			}
		}

	}

	public JSONArray getJSONArray(String key) {
		try {
			return this.jsonObj.getJSONArray(key);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 把java对象转化成json字符串
	 * 
	 * @param obj
	 *            转化的对象
	 * @return json字符串
	 */
	public static String getJsonString(Object obj) {
		JSONObject jsonObject = JSONObject.fromObject(obj);
		return jsonObject.toString();
	}

	/**
	 * 把json字符串转化成json对象，方便使用
	 * 
	 * @param jsonString
	 *            需要转化的json字符串
	 * @return json对象
	 */
	public static JSONObject getJsonObj(String jsonString) {
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		return jsonObject;
	}

	/**
	 * 把list转化成json字符串
	 * 
	 * @param relayList
	 *            需要转化的list
	 * @return json字符串
	 */
	public static String getJsonString(List<Object> relayList) {
		JSONArray jsonArray = new JSONArray();
		jsonArray = JSONArray.fromObject(relayList);
		return jsonArray.toString();
	}

	/**
	 * 根据参数验证json字符串
	 * 
	 * @param json
	 *            需要验证的json字符串
	 * @param param
	 *            参数列表
	 * @return true 验证成功 false 验证失败
	 */
	public static boolean validateJsonString(String json, List<String> param) {
		if (json == null) {
			json = "{}";
		}
		JSONObject jsonObj = null;
		try {
			jsonObj = getJsonObj(json);
		} catch (Exception e) {
			return false;
		}
		for (int i = 0; i < param.size(); i++) {
			if (!jsonObj.has(param.get(i))) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 动态的为json添加参数
	 * 
	 * @param json
	 *            json字符串
	 * @param key
	 * @param value
	 * @return 添加后的字符串
	 */
	public static JSONObject appendParam(JSONObject json, String key, Object value) {
		// JSONObject jsonObj=getJsonObj(json);
		json.put(key, value);
		return json;
	}

	public void appendParam(String key, Object value) {
		this.jsonObj.put(key, value);
	}

	public static JSONObject appendAllParam(String jsonStr, Enumeration<?> params, HttpServletRequest request) {
		if (jsonStr == null) {
			jsonStr = "{}";
		}
		JSONObject jsonObj = JSONUtil.getJsonObj(jsonStr);
		if (params != null) {
			while (params.hasMoreElements()) {
				String key = (String) params.nextElement();
				if ("json".equals(key)) {
					continue;
				}
				String value = request.getParameter(key);
				if (value == null) {
					value = "";
				}
				jsonObj.put(key, value);
			}
		}
		return jsonObj;
	}

	public static void initVOFromJSON(Object vo, JSONUtil util) {
		Class<? extends Object> c = vo.getClass();
		Field[] voFields = c.getDeclaredFields();
		// JSONUtil util = new JSONUtil(data);
		for (int i = 0; i < voFields.length; i++) {
			String value = util.getString(voFields[i].getName());
			if (StringUtil.isEmpty(value)) {
				continue;
			}
			try {
				Method setMethod = c.getDeclaredMethod("set" + StringUtil.fristCharUpcase(voFields[i].getName()), String.class);
				setMethod.invoke(vo, value);
			} catch (Exception e) {
				try {
					Method setMethod = c.getDeclaredMethod("set" + StringUtil.fristCharUpcase(voFields[i].getName()), boolean.class);
					setMethod.invoke(vo, Boolean.parseBoolean(value));
				} catch (Exception e1) {
					logger.error("对象解析封装错误！", e1);
				}
			}
		}
	}

	public static void main(String[] args) {
		User account = new User();
		// initVOFromJSON(
		// account,
		// JSONUtil
		// .getJsonObj("{'serviceNum':'123','limit':'10','ipAddr':'127.0.0.1','accountId':'abc','status':'','accountOverEndtime':'','companyName':'','appNode':'','accountOverBegintime':'','accountName':'1234','pbxId':'','serviceUser':'','start':'0','sessionId':'d676450d-34ac-45f2-aa08-875f5031ad0a','page':'1','callback':'Ext.data.JsonP.callback5','accountStartEndtime':'','_dc':'1331623494009','accountStartBegintime':''}"));
		System.out.println(JSONUtil.getJsonString(account));

	}
	public boolean containsKey(String key) {
		return this.jsonObj.containsKey(key);
	}

}