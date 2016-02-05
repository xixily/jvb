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
                	JSONArray provinceArray = obj.getJSONArray("options");  //����ʡ������
                	
                	
                	/**
                	 * ��ʼ������city,��key
                	 */
                	for(int i=0;i<provinceArray.length();i++){//ʡѭ��  
                        JSONObject provincJson = provinceArray.getJSONObject(i);//���һ��ʡ
                        String provinceName=provincJson.getString("name");//ʡ��
                        List<Map<String,String>> tempList=new ArrayList<Map<String,String>>();
                        cacheMap.put(provinceName, tempList);
                        
                        JSONArray cityArray = provincJson.getJSONArray("options");  //�����е�����
                        
                        for (int j = 0; j < cityArray.length(); j++) {
                        	JSONObject cityJson= cityArray.getJSONObject(j);//���һ����
                        	String city=cityJson.getString("name");
                        	String key=cityJson.getString("key");
                        	Map<String,String> tempMap=new HashMap<String,String>();
                        	tempMap.put(city, key);
                        	tempList.add(tempMap);
						}
                    } 
//                	System.out.println(cacheMap);
                	
                	
                	/**
                	 * �Ա����˵���
                	 */
                	Iterator<Entry<String, List<Map<String, String>>>> entries = cacheMap.entrySet().iterator();
                	while (entries.hasNext()) {
						Map.Entry<String, List<Map<String, String>>> entry=entries.next();
						String provinceName=entry.getKey();//ʡ��
						if("���".equals(provinceName)||"����".equals(provinceName)||"̨��".equals(provinceName))continue;
						Set<String> province=map.get(provinceName);//��phone���һ��һ��ʡprovinceName��������
						List<Map<String,String>> citys=entry.getValue();//�ӻ����л��һ��ʡ��������
						for (Map<String, String> city : citys) {//����������ʡ�������
							String tkey= city.entrySet().iterator().next().getKey();//��ȡ����������
							int flag=0;
							for (String cityN : province) {
								if(cityN.equals(tkey)){
									flag=1;
									break;
								}
							}
							if(flag==0){
//								System.out.println("["+provinceName+"]������["+tkey+"]key["+city.get(tkey)+"]");
								AreaMap.write2file("["+provinceName+"]������["+tkey+"]key["+city.get(tkey)+"]");
//								System.out.println("["+provinceName+"]������["+tkey+"]key["+city.get(tkey)+"]");
							}
						}
					}
                	System.out.println();
                	System.out.println();
                	
                	
                	/**
                	 * ����city
                	 */
                	for(int i=0;i<provinceArray.length();i++){
                		JSONObject jsonobject = provinceArray.getJSONObject(i);//���һ��ʡ
                		String provinceName=jsonobject.getString("name");//ʡ��
                		
                		
                		if("���".equals(provinceName)||"����".equals(provinceName)||"̨��".equals(provinceName))continue;
//                        JSONArray cityArray = jsonobject.getJSONArray("options");  //�����е�����
                		jsonobject.remove("options");
                        
//                        System.out.println("remove:"+provinceName+"��������");
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
                        		AreaMap.write2file("["+provinceName+"]������["+city+"]key:["+key+"]");
//                        		System.out.println("["+provinceName+"]������["+city+"]key:["+key+"]");
//	                        	System.out.println("ʡ��"+provinceName+"������"+city+"key:"+key);	
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
                	System.out.println("������,�д���");
                }
                System.out.println(obj);
        } catch (JSONException e) {  
            e.printStackTrace();  
        }  
    }
}