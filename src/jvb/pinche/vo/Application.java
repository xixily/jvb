package jvb.pinche.vo;

import java.util.Date;

public class Application {
	private String msgNum;
	private String applicant;
	private String message;
	private Date time;
	
	public Application() {
		super();
	}
	public Application(String msgNum, String applicant, String message) {
		super();
		this.msgNum = msgNum;
		this.applicant = applicant;
		this.message = message;
	}
	public String getMsgNum() {
		return msgNum;
	}
	public void setMsgNum(String msgNum) {
		this.msgNum = msgNum;
	}
	public String getApplicant() {
		return applicant;
	}
	public void setApplicant(String applicant) {
		this.applicant = applicant;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}

}
