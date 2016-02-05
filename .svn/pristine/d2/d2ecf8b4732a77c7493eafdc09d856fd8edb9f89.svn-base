package jvb.util.json;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 增加新的，老的不变
 * @author dengxf
 *
 */
public class Test66 {
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
                	 * 遍历现有的省市，对比新的省市phone添加city和key
                	 */
                	for(int i=0;i<provinceArray.length();i++){//省循环  
                        JSONObject provincJson = provinceArray.getJSONObject(i);//获得一个省
                        String provinceName=provincJson.getString("name");//省名
                		if("香港".equals(provinceName)||"澳门".equals(provinceName)||"台湾".equals(provinceName))continue;
                        
                		JSONArray cityArray = provincJson.getJSONArray("options");  //所有市的数组
                        Set<String> province=map.get(provinceName);//从phone数据里取出一个省的所有市
                        for (String cityName : province) {
                        	int flag=0;
                        	
                        	for (int j = 0; j < cityArray.length(); j++) {
                        		JSONObject cityJson= cityArray.getJSONObject(j);//获得一个市
                        		String city=cityJson.getString("name");//获得市名
                        		if(city.equals(cityName)){
                        			flag=1;
                        			break;
                        		}
                        	}
                        	
                        	if(flag==0){
                    			String key=UUID.randomUUID().toString();
                    			AreaMap.write2file("["+provinceName+"]增加:["+cityName+"]"+"key:"+key, "F:/测试数据/haoduan/addRecord");
                    			String str1="{ 'name' : '"
                    					+ cityName
                    					+ "' , 'options' : [ ] , 'key' : '"
                    					+ key
                    					+ "'} ";
                    			JSONObject temp = new JSONObject(str1);
                    			cityArray.put(temp);//增加一个JSONObject
                    		}
                        	
						}
                        
                    } 
                	AreaMap.write2file(obj.toString());
                	
                }else{
                	System.out.println("不得了,有错误？");
                }
                System.out.println(obj);
        } catch (JSONException e) {  
            e.printStackTrace();  
        }  
    }
}
