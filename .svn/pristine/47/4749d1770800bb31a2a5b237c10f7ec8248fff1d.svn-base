package jvb.util.test;

import java.io.IOException;
import java.util.Properties;

public class MailSenderInfo {
	 // 发送邮件的服务器的IP(或主机地址)
	 private String mailServerHost;
	 // 发送邮件的服务器的端口
	 private String mailServerPort = "25";
	 // 发件人邮箱地址
	 private String fromAddress;
	 // 收件人邮箱地址
	 private String toAddress;
	 // 登陆邮件发送服务器的用户名
	 private String userName;
	 // 登陆邮件发送服务器的密码
	 private String password;
	 // 是否需要身份验证
	 private boolean validate = false;
	 // 邮件主题
	 private String subject;
	 // 邮件的文本内容
	 private String content;
	 // 邮件附件的文件名
	 private String[] attachFileNames;
	 
	 public Properties getProperties() {
	  Properties prop = new Properties();
	  try {
		prop.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("Mail.properties"));
		this.mailServerHost=prop.getProperty("mail.smtp.host");
//		this.mailServerHost="220.181.12.18";
		this.mailServerPort=prop.getProperty("mail.smtp.port");
		this.validate=Boolean.getBoolean(prop.getProperty("validate"));
//		prop.put("mail.smtp.host", this.mailServerHost);
//		prop.put("mail.smtp.port", this.mailServerPort);
//		prop.put("mail.smtp.auth", validate ? "true" : "false");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
//	  p.put("mail.smtp.host", this.mailServerHost);
//	  p.put("mail.smtp.port", this.mailServerPort);
//	  prop.put("mail.smtp.auth", validate ? "true" : "false");
	  return prop;
	 }
	 public boolean init(){
		 Properties prop=this.getProperties();
		 this.userName=prop.getProperty("userName");
		 this.password=prop.getProperty("password");
		 this.fromAddress=prop.getProperty("fromAddress");
		 return true;
	 }
	 public String getMailServerHost() {
	  return mailServerHost;
	 }
	 public void setMailServerHost(String mailServerHost) {
	  this.mailServerHost = mailServerHost;
	 }
	 public String getMailServerPort() {
	  return mailServerPort;
	 }
	 public void setMailServerPort(String mailServerPort) {
	  this.mailServerPort = mailServerPort;
	 }
	 public boolean isValidate() {
	  return validate;
	 }
	 public void setValidate(boolean validate) {
	  this.validate = validate;
	 }
	 public String[] getAttachFileNames() {
	  return attachFileNames;
	 }
	 public void setAttachFileNames(String[] fileNames) {
	  this.attachFileNames = fileNames;
	 }
	 public String getFromAddress() {
	  return fromAddress;
	 }
	 public void setFromAddress(String fromAddress) {
	  this.fromAddress = fromAddress;
	 }
	 public String getPassword() {
	  return password;
	 }
	 public void setPassword(String password) {
	  this.password = password;
	 }
	 public String getToAddress() {
	  return toAddress;
	 }
	 public void setToAddress(String toAddress) {
	  this.toAddress = toAddress;
	 }
	 public String getUserName() {
	  return userName;
	 }
	 public void setUserName(String userName) {
	  this.userName = userName;
	 }
	 public String getSubject() {
	  return subject;
	 }
	 public void setSubject(String subject) {
	  this.subject = subject;
	 }
	 public String getContent() {
	  return content;
	 }
	 public void setContent(String textContent) {
	  this.content = textContent;
	 }
	}