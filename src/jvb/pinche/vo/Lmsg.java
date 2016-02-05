package jvb.pinche.vo;

import java.util.Date;

/*
 * 长途拼车信息表
 */

public class Lmsg {
	private String msgNum;
	private String publisher;
	private Date publishTime;
	private String goTime;
	private String startCity;
	private String arriveCity;
	private float fare;
	private String carType;
	private int peopleNum;
	private String msgType;
	private float mileage;
	private int applicantNum;
	private String status;
	private String message;

	public Lmsg() {
		super();
	}
	public Lmsg(String msgNum, String publisher, String goTime,
			String startCity, String arriveCity, float fare, String carType,
			int peopleNum, String msgType, float mileage, int applicantNum,
			String status, String message) {
		super();
		this.msgNum = msgNum;
		this.publisher = publisher;
		this.goTime = goTime;
		this.startCity = startCity;
		this.arriveCity = arriveCity;
		this.fare = fare;
		this.carType = carType;
		this.peopleNum = peopleNum;
		this.msgType = msgType;
		this.mileage = mileage;
		this.applicantNum = applicantNum;
		this.status = status;
		this.message = message;
	}
	public String getMsgNum() {
		return msgNum;
	}
	public void setMsgNum(String msgNum) {
		this.msgNum = msgNum;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public Date getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}
	public String getGoTime() {
		return goTime;
	}
	public void setGoTime(String goTime) {
		this.goTime = goTime;
	}
	public String getStartCity() {
		return startCity;
	}
	public void setStartCity(String startCity) {
		this.startCity = startCity;
	}
	public String getArriveCity() {
		return arriveCity;
	}
	public void setArriveCity(String arriveCity) {
		this.arriveCity = arriveCity;
	}
	public float getFare() {
		return fare;
	}
	public void setFare(float fare) {
		this.fare = fare;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public int getPeopleNum() {
		return peopleNum;
	}
	public void setPeopleNum(int peopleNum) {
		this.peopleNum = peopleNum;
	}
	public String getMsgType() {
		return msgType;
	}
	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}
	public float getMileage() {
		return mileage;
	}
	public void setMileage(float mileage) {
		this.mileage = mileage;
	}
	public int getApplicantNum() {
		return applicantNum;
	}
	public void setApplicantNum(int applicantNum) {
		this.applicantNum = applicantNum;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
