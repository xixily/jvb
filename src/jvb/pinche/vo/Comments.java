package jvb.pinche.vo;

import java.util.Date;

/*
 * ÆÀÂÛ±í
 */

public class Comments {
	private String lms_msgNum;
	private String sms_msgNum;
	private Date time;
	private String commentator;
	private String reviewer;
	private String publisher;
	private String message;
	
	public Comments() {
		super();
	}
	public Comments(String lms_msgNum, String sms_msgNum, String commentator,
			String reviewer, String publisher, String message) {
		super();
		this.lms_msgNum = lms_msgNum;
		this.sms_msgNum = sms_msgNum;
		this.commentator = commentator;
		this.reviewer = reviewer;
		this.publisher = publisher;
		this.message = message;
	}
	public String getLms_msgNum() {
		return lms_msgNum;
	}
	public void setLms_msgNum(String lms_msgNum) {
		this.lms_msgNum = lms_msgNum;
	}
	public String getSms_msgNum() {
		return sms_msgNum;
	}
	public void setSms_msgNum(String sms_msgNum) {
		this.sms_msgNum = sms_msgNum;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getCommentator() {
		return commentator;
	}
	public void setCommentator(String commentator) {
		this.commentator = commentator;
	}
	public String getReviewer() {
		return reviewer;
	}
	public void setReviewer(String reviewer) {
		this.reviewer = reviewer;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	

}
