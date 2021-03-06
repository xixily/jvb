package jvb.pinche.vo;
/*
 * �û���
 */

public class User {
	private String userNum;
	private String userName;
	private String userPassword;
	private String nickName;
	private String email;
	private String realName;
	private String userType;
	private String telPhone;
	
	public User() {
		super();
	}
	
	public User(String userNum, String userName, String userPassword,
			String nickName, String email, String realName, String userType,
			String telPhone) {
		super();
		this.userNum = userNum;
		this.userName = userName;
		this.userPassword = userPassword;
		this.nickName = nickName;
		this.email = email;
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
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
				+ ", eMail=" + email + ", realName=" + realName + ", userType="
				+ userType + ", telPhone=" + telPhone + "]";
	}
	
}
