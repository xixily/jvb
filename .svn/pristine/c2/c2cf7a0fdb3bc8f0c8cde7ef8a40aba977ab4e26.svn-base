package jvb.pinche.action.baseAction;

import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport implements RequestAware,SessionAware{
	/**
	 * ....action
	 */
	private static final long serialVersionUID = 1646138132134L;
	protected  Logger logger=Logger.getLogger(this.getClass());
	protected Map<String,Object> request;
	protected Map<String,Object> session;
//	public void setSession(Map<String,Object> session) {
//		this.session = session;
//	}
	@Override
	public void setRequest(Map<String, Object> request) {
		this.request=request;
	}
	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
}
