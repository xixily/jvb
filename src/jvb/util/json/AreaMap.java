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
		// Set<String> set=map.get("����ʡ");
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

		// String s="��Object json�����ַ�����";
		// Map map=new HashMap();
		// JsonConfig jc=new Json
		// jc.setClassMap(map);
		// jc.setRootClass(Map.class);
		// jc.setArrayMode(JsonConfig.MODE_LIST);
		// JSONObject jobj=JSONObject.fromObject(s,jc);
		// �ݹ����
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
	 * ��phone�ļ�����ȡ�����ݣ�����װ��map
	 * @return
	 */
	public static Map<String, Set<String>> getMap() {
		File phone = new File("F:/��������/haoduan/phone");
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
					if (!"��".equals(String.valueOf(city.charAt(city.length() - 1)))) {
						city += "��";
					}
					if (!"ʡ".equals(String.valueOf(province.charAt(province.length() - 1)))&& !"����".equals(province)
							&& !"���ɹ�".equals(province)&&!"����".equals(province)&&!"�½�".equals(province)) {
						province += "ʡ";
					}
					if (map.get(province) == null) {
						map.put(province, new HashSet<String>());
					}
					map.get(province).add(city);
				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				System.out.println("�ļ���ȡʧ�ܣ�");
				e.printStackTrace();
			} finally {
				try {
					br.close();
				} catch (IOException e) {
					System.out.println("�������ر�ʧ�ܣ�");
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
			  map.put(string.replace("ʡ", "��"), map.get(string));
			  map.remove(string);
		}
		  map.put("������", map.get("����ʡ"));
		  map.remove("����ʡ");
		return map;
	}

	/**
	 * ��old�ļ�����ȡ��json�ַ���
	 * @return
	 */
	public static String getString() {
		File phone = new File("F:/��������/haoduan/old2");
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
		write2file(line,"F:/��������/haoduan/add");
	}
	
	/**
	 * �ַ���utf8��ʽд�ļ�
	 * @param line д��һ������
	 * @param file �ļ�·��
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
//						System.out.println("д��ɹ���");
		} catch (IOException e) {
			System.out.println("д���ļ�ʧ��!");
			e.printStackTrace();
		}
	}
}
