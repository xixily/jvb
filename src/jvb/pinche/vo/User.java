package jvb.pinche.vo;
/*
 * ”√ªß±Ì
 */

public class User {
	private String userNum;
	private String userName;
	private String userPassword;
	private String nickName;
	private String eMail;
	private String realName;
	private String userType;
	private String telPhone;
	
	public User() {
		super();
	}
	
	public User(String userNum, String userName, String userPassword,
			String nickName, String eMail, String realName, String userType,
			String telPhone) {
		super();
		this.userNum = userNum;
		this.userName = userName;
		this.userPassword = userPassword;
		this.nickName = nickName;
		this.eMail = eMail;
		this.realName = realName;
		this.userType = userType;
		this.telPhone = telPhone;
	}

	public String getUserNum() {
		return userNum;
	}
	public void setUserNum(String userNum) {
		this.userNum = userNum;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getEMail() {
		return eMail;
	}
	public void setEMail(String eMail) {
		this.eMail = eMail;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getTelPhone() {
		return telPhone;
	}
	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}

	@Override
	public String toString() {
		return "User [userNum=" + userNum + ", userName=" + userName
				+ ", userPassword=" + userPassword + ", nickName=" + nickName
				+ ", eMail=" + eMail + ", realName=" + realName + ", userType="
				+ userType + ", telPhone=" + telPhone + "]";
	}
	
}
