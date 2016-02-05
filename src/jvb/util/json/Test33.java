package jvb.util.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class Test33 {
	public static void main(String[] args) {
		String str=AreaMap.getString();
		System.out.println(str);
		JSONObject obj=JSONObject.fromObject(str);
		System.out.println(obj);
	}
	public static Map<String,Object> parseJSON2Map(String jsonStr){
		Map<String,Object> map=new HashMap<String, Object>();
		
		JSONObject json=JSONObject.fromObject(jsonStr);
		for(Object key:json.keySet()){
			Object value=json.get(key);
			if(value instanceof JSONArray){
				List<Object> list;//=new ArrayList<Map<String,Object>>();
				list=parseJSON2List(value.toString());
				map.put( key.toString(), list);
			}else{
				map.put(key.toString(), value);
			}
		}
		
		return map;
	}
	public static List<Object> parseJSON2List(String jsonStr){
		List<Object> list = new ArrayList<Object>(); 
		JSONArray jsonArray=JSONArray.fromObject(jsonStr);
		@SuppressWarnings("unchecked")
		Iterator<JSONObject> it=jsonArray.iterator();
		while(it.hasNext()){
			JSONObject json2=it.next();
			for (Object object : json2.keySet()) {
				Object ob=json2.get(object);
				if(!(ob==null)){
					if(ob instanceof JSONObject){
						list.add(parseJSON2Map(ob.toString()));
					}else{
						list.add(object);
					}
				}else{
					list.add(object);
				}
				
			}
		}
		return list;
	}
	
}
