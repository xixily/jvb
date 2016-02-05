package jvb.util.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @copy of Test22
 * @author Administrator
 *
 */
public class Test44 {
	static Map<String,List<Map<String,String>>> cacheMap=new HashMap<String, List<Map<String,String>>>();
	public static void main(String[] args) {  
		String str=AreaMap.getString();
//		System.out.println(str);
		Map<String,Set<String>> map=AreaMap.getMap();
		
        try {  
            JSONObject obj = new JSONObject(str);  
            System.out.println(obj);
            
                if(obj.get("options") instanceof JSONArray){
                	JSONArray provinceArray = obj.getJSONArray("options");  //所有省的数组
                	
                	
                	/**
                	 * 初始化所有city,和key
                	 */
                	for(int i=0;i<provinceArray.length();i++){//省循环  
                        JSONObject provincJson = provinceArray.getJSONObject(i);//获得一个省
                        String provinceName=provincJson.getString("name");//省名
                        List<Map<String,String>> tempList=new ArrayList<Map<String,String>>();
                        cacheMap.put(provinceName, tempList);
                        
                        JSONArray cityArray = provincJson.getJSONArray("options");  //所有市的数组
                        
                        for (int j = 0; j < cityArray.length(); j++) {
                        	JSONObject cityJson= cityArray.getJSONObject(j);//获得一个市
                        	String city=cityJson.getString("name");
                        	String key=cityJson.getString("key");
                        	Map<String,String> tempMap=new HashMap<String,String>();
                        	tempMap.put(city, key);
                        	tempList.add(tempMap);
						}
                    } 
//                	System.out.println(cacheMap);
                	
                	
                	/**
                	 * 对比少了的市
                	 */
                	Iterator<Entry<String, List<Map<String, String>>>> entries = cacheMap.entrySet().iterator();
                	while (entries.hasNext()) {
						Map.Entry<String, List<Map<String, String>>> entry=entries.next();
						String provinceName=entry.getKey();//省名
						if("香港".equals(provinceName)||"澳门".equals(provinceName)||"台湾".equals(provinceName))continue;
						Set<String> province=map.get(provinceName);//从phone获得一个一个省provinceName的所有市
						List<Map<String,String>> citys=entry.getValue();//从缓存中获得一个省的所有市
						for (Map<String, String> city : citys) {//遍历缓存中省里面的市
							String tkey= city.entrySet().iterator().next().getKey();//获取缓存中市名
							int flag=0;
							for (String cityN : province) {
								if(cityN.equals(tkey)){
									flag=1;
									break;
								}
							}
							if(flag==0){
//								System.out.println("["+provinceName+"]减少了["+tkey+"]key["+city.get(tkey)+"]");
								AreaMap.write2file("["+provinceName+"]减少了["+tkey+"]key["+city.get(tkey)+"]");
//								System.out.println("["+provinceName+"]减少了["+tkey+"]key["+city.get(tkey)+"]");
							}
						}
					}
                	System.out.println();
                	System.out.println();
                	
                	
                	/**
                	 * 更新city
                	 */
                	for(int i=0;i<provinceArray.length();i++){
                		JSONObject jsonobject = provinceArray.getJSONObject(i);//获得一个省
                		String provinceName=jsonobject.getString("name");//省名
                		
                		
                		if("香港".equals(provinceName)||"澳门".equals(provinceName)||"台湾".equals(provinceName))continue;
//                        JSONArray cityArray = jsonobject.getJSONArray("options");  //所有市的数组
                		jsonobject.remove("options");
                        
//                        System.out.println("remove:"+provinceName+"的所有市");
//                        System.out.println(jsonobject);
                        
                        
                        Set<String> province=map.get(provinceName);
                        JSONArray temparry= new JSONArray();
                        for (String city : province) {
                        	List<Map<String,String>> list=cacheMap.get(provinceName);
                        	String key=null;
                        	for (Map<String,String> m : list) {
                        		String tkey= m.entrySet().iterator().next().getKey();
                        		 if(tkey.equals(city)){
                        			 key=m.get(tkey);
                        			 break;
                        		 }
							}
//                        	String key=cacheMap.get(tempName).get(string);
                        	if(key==null||"".equals(key)){
                        		key=UUID.randomUUID().toString();
                        		AreaMap.write2file("["+provinceName+"]增加了["+city+"]key:["+key+"]");
//                        		System.out.println("["+provinceName+"]增加了["+city+"]key:["+key+"]");
//	                        	System.out.println("省："+provinceName+"增加了"+city+"key:"+key);	
                        	}
                        	String str1="{ 'name' : '"
                        			+ city
                        			+ "' , 'options' : [ ] , 'key' : '"
                        			+ key
                        			+ "'} ";
                        	JSONObject temp = new JSONObject(str1);
                        	temparry.put(temp);
						}
//                        System.out.println("temparry:"+temparry);
                        jsonobject.put("options", temparry);
//                        jsonobject.putOnce("options", temparry);
//                        System.out.println(jsonobject);
                	}
                	
                }else{
                	System.out.println("不得了,有错误？");
                }
                System.out.println(obj);
        } catch (JSONException e) {  
            e.printStackTrace();  
        }  
    }
}
