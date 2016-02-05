package jvb.util.mail;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class ProductPriceObserver{
	
public static void main(String[] args) {
	MailSender sms = MailSenderFactory.getSender();
//	MailSender sms2 =MailSenderFactory.getSender(smtpHostName, username, password);
//	MailSender sms2 =MailSenderFactory.getSender("smtp.qq.com", "799123897@qq.com", "q331314","465");
	String url="www.baidu.com";
	List<String> recipients = new ArrayList<String>();
//	recipients.add("799123897@qq.com");
	recipients.add("379549181@qq.com");
	recipients.add("1959584366@qq.com");
	recipients.add("570341093@qq.com");
//	recipients.add("379549181@qq.com");
	try {
		for (String recipient : recipients) {
			sms.send(recipient, "聚玩吧系统通知", "请您单击\n"+url+"\n继续完成注册");
			System.out.println("发送给："+recipient+"成功！");
		}
	} catch (AddressException e) {
		e.printStackTrace();
		System.out.println("地址问题！");
	} catch (MessagingException e) {
		e.printStackTrace();
		System.out.println("信息问题！");
	}
//		try {
//			for (String recipient : recipients) {
//			sms2.send(recipient, "聚玩吧系统通知", "请您单击\n"+url+"\n继续完成注册");
//			System.out.println("发送给："+recipient+"成功！");
//			}
//		} catch (AddressException e) {
//			e.printStackTrace();
//		} catch (MessagingException e) {
//			e.printStackTrace();
//		}
}
	        
}

