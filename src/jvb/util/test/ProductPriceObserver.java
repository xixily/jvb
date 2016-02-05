package jvb.util.test;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class ProductPriceObserver {

	
public static void main(String[] args) {
	MailSender sms = MailSenderFactory.getSender();
	List<String> recipients = new ArrayList<String>();
	recipients.add("799123897@qq.com");
	recipients.add("379549181@qq.com");
	try {
		for (String recipient : recipients) {
			sms.send(recipient, "价格变动", "您关注的物品"
					+ "iPhone6s plus" + "降价了，由"
					+ "6999" + "元降到" + "6000" + "元，降幅达"
					+ "15%" + "元人民币。赶快购物吧。");
		}
	} catch (AddressException e) {
		e.printStackTrace();
	} catch (MessagingException e) {
		e.printStackTrace();
	}
}
	        
}

