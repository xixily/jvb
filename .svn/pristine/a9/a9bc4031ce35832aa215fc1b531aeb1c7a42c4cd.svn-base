package jvb.util.mail;

public class MailSenderFactory {
	/**
     * 服务邮箱
     */
    private static MailSender serviceSms = null;
  
    /**
     * 获取邮箱
     * 
     * @param type 邮箱类型
     * @return 符合类型的邮箱
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
