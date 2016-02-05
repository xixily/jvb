package jvb.util.json;

import java.util.Map;
import java.util.Set;
import java.util.UUID;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class JsonObjectIterator {
	public static void main(String[] args) {  
		String str=AreaMap.getString();
		Map<String,Set<String>> map=AreaMap.getMap();
        try {  
            JSONObject obj = new JSONObject(str);  
                if(obj.get("options") instanceof JSONArray){
                	JSONArray array = obj.getJSONArray("options");  //所有省的数组
                	for(int i=0;i<array.length();i++){//省循环  
                        JSONObject jsonobject = array.getJSONObject(i);//获得一个省
                        System.out.println(jsonobject);
                        String provincename=jsonobject.getString("name");
                        Set<String> citys=(Set<String>) map.get(provincename);//从newMap里面获得省
                        jsonobject.remove("options");
                        System.out.println(obj);
                        JSONArray temparry= new JSONArray();
                        for (String string : citys) {
                        	String str1="{ 'name' : '"
                        			+ string
                        			+ "' , 'options' : [ ] , 'key' : '"
                        			+ UUID.randomUUID()
                        			+ "'} ";
                        	JSONObject temp = new JSONObject(str1);
                        	temparry.put(temp);
                		}
                        System.out.println("temparry:"+temparry);
                        jsonobject.putOnce("options", temparry);
                        System.out.println(jsonobject);
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
