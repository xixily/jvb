package jvb.util.json;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

public class AreaMap {
	// Map<String,Set<String>> map=new HashMap<String,Set<String>>();
	public static void main(String[] args) {
		// Map<String,Set<String>> map=getMap();
		// Set<String> set=map.get("江西省");
		// for (String string : set) {
		// System.out.println(string);
		// }

		Map<String, Set<String>> map = getMap();
		// JSONObject jsonObject = JSONObject.fromObject(map);
		// System.out.println(jsonObject);
		for (Map.Entry<String, Set<String>> entry : map.entrySet()) {
			System.out.println("key= " + entry.getKey() + " and value= "
					+ entry.getValue());
		}
		// String string=getString();
		// System.out.println(string);
		// JSONObject jsonObj = JSONObject.fromObject(string);
		// System.out.println(jsonObj);
		// if(jsonObj.get("options") instanceof JSONObject){
		// JSONObject jsonObj2=jsonObj.getJSONObject("options");
		// }else if(jsonObj.get("options") instanceof JSONArray){
		// System.out.println(jsonObj.get("options"));
		// }

		// String s="【Object json树形字符串】";
		// Map map=new HashMap();
		// JsonConfig jc=new Json
		// jc.setClassMap(map);
		// jc.setRootClass(Map.class);
		// jc.setArrayMode(JsonConfig.MODE_LIST);
		// JSONObject jobj=JSONObject.fromObject(s,jc);
		// 递归遍历
		// decodeJSONObject(jobj);

		// // Iterator it = jsonObj.keys();
		// // List<String> keyListstr = new ArrayList<String>();
		// // while(it.hasNext()){
		// // keyListstr.add(it.next().toString());
		// // }
		// // JSONObject jsonObj2=jsonObj.getJSONObject("options");
		// // System.out.println(jsonObj2.get("name"));
		// JSONArray jsonArray =jsonObj.getJSONArray("options");
		// // JSONArray jsonArray2 =jsonArray.getJSONArray("options");
		// System.out.println(jsonArray);
		// // ObjectMapper objectMapper = new ObjectMapper();
	}

	public static void decodeJSONObject(JSONObject json) {
		@SuppressWarnings("unchecked")
		Iterator<String> keys = json.keys();
		JSONObject jo = null;
		Object o;
		String key;
		while (keys.hasNext()) {
			key = keys.next();
			o = json.get(key);
			if (o instanceof JSONObject) {
				jo = (JSONObject) o;
				if (jo.keySet().size() > 0) {
					decodeJSONObject(jo);
				} else {
					System.out.println(key);
				}
			} else {
				System.out.println(o);
			}
		}
	}

	/**
	 * 从phone文件里面取得数据，并封装成map
	 * @return
	 */
	public static Map<String, Set<String>> getMap() {
		File phone = new File("F:/测试数据/haoduan/phone");
		Map<String, Set<String>> map = new HashMap<String, Set<String>>();
		BufferedReader br = null;
		if (phone.exists()) {
			try {
				br = new BufferedReader(new InputStreamReader(
						new FileInputStream(phone), "UTF-8"));
				String line = null;
				while ((line = br.readLine()) != null) {
					// System.out.println(line);
					String[] phoneInfo = line.split("\\|");
					String province = phoneInfo[1];
					String city = phoneInfo[2];
					if (!"市".equals(String.valueOf(city.charAt(city.length() - 1)))) {
						city += "市";
					}
					if (!"省".equals(String.valueOf(province.charAt(province.length() - 1)))&& !"西藏".equals(province)
							&& !"内蒙古".equals(province)&&!"宁夏".equals(province)&&!"新疆".equals(province)) {
						province += "省";
					}
					if (map.get(province) == null) {
						map.put(province, new HashSet<String>());
					}
					map.get(province).add(city);
				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				System.out.println("文件读取失败！");
				e.printStackTrace();
			} finally {
				try {
					br.close();
				} catch (IOException e) {
					System.out.println("输入流关闭失败！");
					e.printStackTrace();
				}
			}
		}
		List<String> rmp=new ArrayList<String>();
		  for (Map.Entry<String, Set<String>> entry : map.entrySet()) {
		   if(entry.getValue().size()==1){
			   rmp.add(entry.getKey());
		   }
		  }
		  for (String string : rmp) {
			  map.put(string.replace("省", "市"), map.get(string));
			  map.remove(string);
		}
		  map.put("重庆市", map.get("重庆省"));
		  map.remove("重庆省");
		return map;
	}

	/**
	 * 从old文件里面取得json字符串
	 * @return
	 */
	public static String getString() {
		File phone = new File("F:/测试数据/haoduan/old2");
		String str = "";
		BufferedReader br=null;
		if (phone.exists()) {
			try {
				 br = new BufferedReader(new InputStreamReader(
						new FileInputStream(phone), "UTF-8"));
				if (br.ready()) {
					String line;
					while ((line = br.readLine()) != null) {
						str += line;
					}
				}
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				if(br!=null){
					try {
						br.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return str;
	}
	
	
	public static void write2file(String line){
		write2file(line,"F:/测试数据/haoduan/add");
	}
	
	/**
	 * 字符流utf8方式写文件
	 * @param line 写入一行数据
	 * @param file 文件路径
	 */
	public static void write2file(String line,String file){
		File f = new File(file);
		if(!f.exists()) {
			try {
				f.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		try {
			BufferedWriter output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(f,true),"utf8")); 
						output.write(line);
						output.newLine();
						output.flush();
						output.close();
//						System.out.println("写入成功！");
		} catch (IOException e) {
			System.out.println("写入文件失败!");
			e.printStackTrace();
		}
	}
}
