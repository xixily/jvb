package jvb.util.mail;

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
    public static MailSender getSender(){
    	serviceSms = new MailSender();
    	return serviceSms;
    }
    
    public static MailSender getSender(final String userName,final String password) {
        serviceSms = new MailSender(userName,password);
        return serviceSms;
    }
    
    public static MailSender getSender(final String smtpHostName, final String username,final String password,
    		final String port) {
    	serviceSms = new MailSender(smtpHostName,username,password,port);
    	return serviceSms;
    }
}
