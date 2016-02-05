package jvb.util.json;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonMapUtil {
	public static List<Map<String, Object>> parseJSON2List(String jsonStr){  
		JSONObject jsonObj = JSONObject.fromObject(jsonStr);
//        JSONArray jsonArr = JSONArray.fromObject(jsonStr);  
		JSONArray jsonArr;
		if(jsonObj.get("options") instanceof JSONArray){
//			System.out.println(jsonObj.get("options"));
//			if(jsonObj.get("options"))
			jsonArr = (JSONArray) jsonObj.get("options");  
		}else{
			return null;
		}
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();  
        Iterator<JSONObject> it = jsonArr.iterator();  
        while(it.hasNext()){  
            JSONObject json2 = it.next();  
            list.add(parseJSON2Map(json2.toString()));  
        }  
        return list;  
    }  
      
     
    public static Map<String, Object> parseJSON2Map(String jsonStr){  
        Map<String, Object> map = new HashMap<String, Object>();  
        //最外层解析  
        JSONObject json = JSONObject.fromObject(jsonStr);  
        for(Object k : json.keySet()){  
        	if("headers".equals(k))continue;
            Object v = json.get(k);   
            //如果内层还是数组的话，继续解析  
            if(v instanceof JSONArray){  
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();  
                Iterator<JSONObject> it = ((JSONArray)v).iterator();  
                while(it.hasNext()){  
                    JSONObject json2 = it.next();  
                    list.add(parseJSON2Map(json2.toString()));  
                }  
                map.put(k.toString(), list);  
            } else {  
                map.put(k.toString(), v);  
            }  
        }  
        return map;  
    }  
      
     
    public static List<Map<String, Object>> getListByUrl(String url){  
        try {  
            //通过HTTP获取JSON数据  
            InputStream in = new URL(url).openStream();  
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));  
            StringBuilder sb = new StringBuilder();  
            String line;  
            while((line=reader.readLine())!=null){  
                sb.append(line);  
            }  
            return parseJSON2List(sb.toString());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
      
     
    public static Map<String, Object> getMapByUrl(String url){  
        try {  
            //通过HTTP获取JSON数据  
            InputStream in = new URL(url).openStream();  
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));  
            StringBuilder sb = new StringBuilder();  
            String line;  
            while((line=reader.readLine())!=null){  
                sb.append(line);  
            }  
            return parseJSON2Map(sb.toString());  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
      
      
    //test  
    public static void main(String[] args) {  
//        String url = "http://...";  
//        List<Map<String,Object>> list = getListByUrl(url);  
//        List<Map<String,Object>> list = parseJSON2List(AreaMap.getString());  
        Map<String,Object> oldMap=parseJSON2Map(AreaMap.getString());
        Map<String,Set<String>> newMap =AreaMap.getMap();
        String provinceName;
//        String cityName;
        System.out.println(oldMap);
        List<?> provinces=(List<?>) oldMap.get("options");
        for (Object object : provinces) {
			Map<?,?> cityMap=(Map<?,?>) object;
			provinceName=(String) cityMap.get("name");
			Set<String> newCity=newMap.get(provinceName);
			for (@SuppressWarnings("unused") String citynn : newCity) {
				List<?> citys=(List<?>) cityMap.get("options");
				for (Object object2 : citys) { 
					Map<?,?> city=(Map<?,?>) object2;
					System.out.println(city.get("name"));
					String cityN=(String) city.get("name");
					int flag=0;
					for (String newCitys : newCity) {
						if(cityN.equals(newCitys)){
							flag=1;
							break;
						}
					}
					if(flag==0){
//						Map mo=new HashMap<>();
//						mo.put(key, value);
					}
				}
			}
		}
//        System.out.println(list);  
//        for (Map<String, Object> map : list) {
//			System.out.println(map);
//		}
    }  
}
