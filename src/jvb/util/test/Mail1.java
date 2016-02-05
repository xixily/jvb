package jvb.util.test;

import java.io.Serializable;

/**
 * Mail����ʵ��
 * 
 * @author shadow
 * 
 */
@SuppressWarnings("serial")
public class Mail1 implements Serializable {

	public static final String ENCODEING = "UTF-8";
	private String host;
	private String sender;
	private String receiver;
	private String name;
	private String username;
	private String password;
	private String subject;
	private String message;

	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
