package jvb.util.test;

public class MailSenderFactory {
	/**
     * ��������
     */
    private static MailSender serviceSms = null;
  
    /**
     * ��ȡ����
     * 
     * @param type ��������
     * @return �������͵�����
     */
    public static MailSender getSender() {
        serviceSms = new MailSender("jwb_system_inform@163.com","q331314");
        return serviceSms;
    }

}
