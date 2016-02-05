package jvb.util.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;


public class AreaMap {
//	Map<String,Set<String>> map=new HashMap<String,Set<String>>();
	public static void main(String[] args) {
//		Map map=getMap();
//		JSONObject jsonObject = JSONObject.fromMap(map);
//		JSONObject jsonObject = JSONObject.fromObject(map);
//		System.out.println(jsonObject);
//		System.out.println(UUID.randomUUID());
		String key = UUID.randomUUID().toString();
		System.out.println(key);
		String ss="北京";
		String str1="{ 'name' : '"
    			+ ss
    			+ "' , 'options' : [ ] , 'key' : '"
    			+ UUID.randomUUID()
    			+ "'} ";
    	JSONObject temp =JSONObject.fromObject(str1);
    	System.out.println(temp);
		
		
//		String string=getString();
//		System.out.println(string);
//		JSONObject jsonObj = JSONObject.fromObject(string);
//		System.out.println(jsonObj);
//		if(jsonObj.get("options") instanceof JSONObject){
//			JSONObject jsonObj2=jsonObj.getJSONObject("options");
//		}else if(jsonObj.get("options") instanceof JSONArray){
////			System.out.println(jsonObj.get("options"));
//			JSONArray jsonArr = (JSONArray) jsonObj.get("options"); 
//		}else{
//			System.out.println("解析异常");
//		}
		
	}
	 public static void decodeJSONObject(JSONObject json){  
	        Iterator<String> keys=json.keys();  
	        JSONObject jo=null;  
	        Object o;  
	        String key;  
	        while(keys.hasNext()){  
	            key=keys.next();  
	            o=json.get(key);  
	            if(o instanceof JSONObject){  
	                jo=(JSONObject)o;  
	                if(jo.keySet().size()>0){  
	                    decodeJSONObject(jo);  
	                }else{  
	                    System.out.println(key);  
	                }  
	            }else{  
	                System.out.println(o);  
	            }  
	        }  
	    } 

	public static Map getMap() {
		File phone = new File("F:/测试数据/haoduan/phone");
//		Map phonemap=new Map<String, List<? extends String>>;
		Map<String,Set<String>> map=new HashMap<String,Set<String>>();
		if (phone.exists()) {
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(
						new FileInputStream(phone), "UTF-8"));
				String line = null;
				while ((line = br.readLine()) != null) {
//					System.out.println(line);
					String[] phoneInfo=line.split("\\|");
					String province=phoneInfo[1];
					String city=phoneInfo[2];
//					String cit=String.valueOf(city.charAt(city.length()-1));
					if(!"市".equals(String.valueOf(city.charAt(city.length()-1)))){
						city+="市";
					}
					if(!"省".equals(String.valueOf(province.charAt(province.length()-1)))){
						province+="省";
					}
					if(map.get(province)==null){
						map.put(province, new HashSet<String>());
					}
					map.get(province).add(city);
//					System.out.println("city:"+province+","+"city:"+city);
				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				System.out.println("文件读取失败！");
				e.printStackTrace();
			}
		}
//		 System.out.println("通过Map.entrySet遍历key和value");
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
//		  for (Map.Entry<String, Set<String>> entry : map.entrySet()) {
//			  System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
//		  }
		  return map;
	}
	public static String getString() {
		File phone = new File("F:/测试数据/haoduan/old");
		String str="";
		if (phone.exists()) {
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(
						new FileInputStream(phone), "UTF-8"));
				if(br.ready()){
					String line;
					while((line=br.readLine())!=null){
						str+=line;
					}
				}
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return str;
	}
}
