package jvb.cache;

import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;




public class BaseCache extends GeneralCacheAdministrator {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6054257883847747876L;
	

	public BaseCache() {
		super();
	}

	/**
	 * 添加被缓存对象
	 * 
	 * @param key
	 * @param value
	 */
	public void put(String key, Object value) {
		this.putInCache( key, value);
	}

	/**
	 * 删除被缓存的对象;
	 * @param key
	 */
	public void remove(String key) {
		this.removeEntry(key);
	}

//	/**
//	 * 删除指定时间所有被缓存的对象;
//	 * @param date
//	 */
//	public void removeAll(Date date) {
//		this.removeAll(date);
//	}
	/**
	 * 删除本缓存中所有的缓存对象
	 */
	public void removeAll() {
		this.flushAll();
	}
	 /**
	  * 从缓存中得到对象 
	  * @param key
	  * @return
	  * @throws Exception
	  */
    public Object get(String key) {  
        try{  
            return this.getFromCache(key);  
        } catch (NeedsRefreshException e) {  
            this.cancelUpdate(key); 
            return null;
            //throw e;  
        }  
  
    }  
    
    
}
