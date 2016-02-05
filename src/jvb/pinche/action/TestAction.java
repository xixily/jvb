package jvb.pinche.action;

import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class TestAction extends ActionSupport implements SessionAware {
	private Map session;
	@Override
	public void setSession(Map session) {
		this.session=session;
	}
	@Override
	public String execute() throws Exception {
		return null;
	}
}
