package jvb.util.test;

public class SendMailDemo {
	 public static void main(String[] args) {
	  // �����ʼ���������Ϣ
	  MailSenderInfo mailInfo = new MailSenderInfo();
	  mailInfo.setMailServerHost("smtp.163.com");
	  mailInfo.setMailServerPort("25");
	  mailInfo.setValidate(false);
//	  mailInfo.init();
	  // �����û���
	  mailInfo.setUserName("jwb_system_inform@163.com");
	  // ��������
	  mailInfo.setPassword("ipsibhmbwwnsgsko");
	  // ����������
	  mailInfo.setFromAddress("jwb_system_inform@163.com");
//	  String url="220.181.12.18";
	  // �ռ�������
//	  mailInfo.setToAddress("lisi@sina.com");
	  mailInfo.setToAddress("799123897@qq.com");
	  // �ʼ�����
	  mailInfo.setSubject("����Java�������ʼ�");
	  // �ʼ�����
	  StringBuffer buffer = new StringBuffer();
	  buffer.append("JavaMail 1.4.5 jar�����ص�ַ��http://www.oracle.com/technetwork/java/index-138643.html\n");
	  buffer.append("JAF 1.1.1 jar�����ص�ַ��http://www.oracle.com/technetwork/java/javase/downloads/index-135046.html");
	  mailInfo.setContent(buffer.toString());
	  
	  // �����ʼ�
	  SimpleMailSender sms = new SimpleMailSender();
	  // ���������ʽ
	  sms.sendTextMail(mailInfo);
	  // ����html��ʽ
	  SimpleMailSender.sendHtmlMail(mailInfo);
	  System.out.println("�ʼ��������");
	 }
	}