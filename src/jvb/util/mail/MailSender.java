package jvb.util.mail;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.apache.log4j.Logger;

public class MailSender {
	/**
     * 发送邮件的props文件
     */
    private final transient Properties props = System.getProperties();
    /**
     * 邮件服务器登录验证
     */
    private transient MyAuthenticator authenticator;
    
    /**
     *设置日志 
     */
    protected  Logger logger=Logger.getLogger(this.getClass());
    /**
     * 邮箱session
     */
    private transient Session session;
  
    /**
     * 初始化邮件发送器
     * 
     * @param smtpHostName
     *                SMTP邮件服务器地址
     * @param username
     *                发送邮件的用户名(地址)
     * @param password
     *                发送邮件的密码
     */
    public MailSender(final String smtpHostName, final String username,final String password,final String port) {
    init(username, password, smtpHostName,port);
    }
  
    /**
     * 初始化邮件发送器
     * 
     * @param username
     *                发送邮件的用户名(地址)，并以此解析SMTP服务器地址
     * @param password
     *                发送邮件的密码
     */
    public MailSender(final String username, final String password) {
    //通过邮箱地址解析出smtp服务器，对大多数邮箱都管用
    final String smtpHostName = "smtp." + username.split("@")[1];
//    String smtpHostName="";
    init(username, password, smtpHostName);
  
    }
    /**
     * 直接从系统加载邮箱配置，没有参数
     * 
     * @author dengxf
     */
    public  MailSender(){
    	init(null,null,null,null);
    }
    
    public void init(String username, String password,final String smtpHostName){
    	init(null,null,null,null);
    }
    /**
     * 初始化
     * 
     * @param username
     *                发送邮件的用户名(地址)
     * @param password
     *                密码
     * @param smtpHostName
     *                SMTP主机地址
     */
    private void init(String username, String password,final String smtpHostName,final String port) {
    // 初始化props
    	if(username==null||"".equals(username)||password==null||"".equals(password)
    			||smtpHostName==null||"".equals(smtpHostName)){
    		try {
    			props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("Mail.properties"));
    			 authenticator = new MyAuthenticator(props.getProperty("userName"), props.getProperty("password"));
    		} catch (IOException e) {
    			logger.error("获取Mail.properties配置文件失败！");
    		}
    	}else{
    		props.put("mail.smtp.auth", "true");
    		props.put("mail.smtp.host", smtpHostName);
    		if(port!=null){
    			props.put("mail.smtp.port", port);
    		}else props.put("mail.smtp.port", "25");
    		// 验证
    		authenticator = new MyAuthenticator(username, password);
    	}
    // 创建session
    session = Session.getInstance(props, authenticator);
    }
  
    /**
     * 发送邮件
     * 
     * @param recipient
     *                收件人邮箱地址
     * @param subject
     *                邮件主题
     * @param content
     *                邮件内容
     * @throws AddressException
     * @throws MessagingException
     */
    public void send(String recipient, String subject, Object content)
        throws AddressException, MessagingException {
    //穿件mime邮件类型
    final MimeMessage message = new MimeMessage(session);
    // 设置发信人
    message.setFrom(new InternetAddress(authenticator.getUserName()));
    // 设置收件人
    message.setRecipient(RecipientType.TO, new InternetAddress(recipient));
    //设置自定义发件人昵称  
//    String nick;  
    try {  
        javax.mail.internet.MimeUtility.encodeText("聚玩吧系统通知");  
    } catch (UnsupportedEncodingException e) {  
        e.printStackTrace();  
        logger.error("设置昵称失败");
    }  
    // 设置主题
    message.setSubject(subject);
    // 设置邮件内容
    message.setContent(content.toString(), "text/html;charset=utf-8");
    // 发送
    Transport.send(message);
    }
  
    /**
     * 群发邮件
     * 
     * @param recipients
     *                收件人们
     * @param subject
     *                主题
     * @param content
     *                内容
     * @throws AddressException
     * @throws MessagingException
     */
    public void send(List<String> recipients, String subject, Object content)
        throws AddressException, MessagingException {
    // 创建mime类型邮件
    final MimeMessage message = new MimeMessage(session);
    // 设置发信人
    message.setFrom(new InternetAddress(authenticator.getUserName()));
    // 设置收件人们
    final int num = recipients.size();
    InternetAddress[] addresses = new InternetAddress[num];
    for (int i = 0; i < num; i++) {
        addresses[i] = new InternetAddress(recipients.get(i));
    }
    message.setRecipients(RecipientType.TO, addresses);
    // 设置主题
    message.setSubject(subject);
    // 设置邮件内容
    message.setContent(content.toString(), "text/html;charset=utf-8");
    // 发送
    Transport.send(message);
    }
  
    /**
     * 发送邮件
     * 
     * @param recipient
     *                收件人邮箱地址
     * @param mail
     *                邮件对象
     * @throws AddressException
     * @throws MessagingException
     */
    public void send(String recipient, MailSenderInfo mail)
        throws AddressException, MessagingException {
    send(recipient, mail.getSubject(), mail.getContent());
    }
  
    /**
     * 群发邮件
     * 
     * @param recipients
     *                收件人们
     * @param mail
     *                邮件对象
     * @throws AddressException
     * @throws MessagingException
     */
    public void send(List<String> recipients, MailSenderInfo mail)
        throws AddressException, MessagingException {
    send(recipients, mail.getSubject(), mail.getContent());
    }
}
