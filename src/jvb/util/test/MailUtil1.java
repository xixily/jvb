package jvb.util.test;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.log4j.Logger;

import jvb.util.test.Mail1;
public class MailUtil1 {

	protected final Logger logger = Logger.getLogger(getClass());

	public boolean send(Mail1 mail) {
		HtmlEmail email = new HtmlEmail();
		try {
			email.setHostName(mail.getHost());
			email.setCharset(Mail1.ENCODEING);
			email.addTo(mail.getReceiver());
			email.setFrom(mail.getSender(), mail.getName());
			email.setAuthentication(mail.getUsername(), mail.getPassword());
			email.setSubject(mail.getSubject());
			email.setMsg(mail.getMessage());
			email.send();
			if (logger.isDebugEnabled()) {
				logger.debug(mail.getSender() + "发送给" + mail.getReceiver()+"成功！");
			}
			return true;
		} catch (EmailException e) {
			e.printStackTrace();
			logger.info(mail.getSender() + "发送给" + mail.getReceiver()
					+ "失败！");
			return false;
		}
	}
	public static void main(String[] args) {
		Mail1 mail = new Mail1();
		mail.setHost("smtp.163.com"); 
		mail.setSender("jwb_system_inform@163.com");
		mail.setReceiver("799123897@qq.com"); 
		mail.setUsername("jwb_system_inform@163.com"); 
		mail.setPassword("ipsibhmbwwnsgsko"); 
		mail.setSubject("aaaaaaaaa");
		mail.setMessage("bbbbbbbbbbbbbbbbb");
		new MailUtil1().send(mail);
	}

}
