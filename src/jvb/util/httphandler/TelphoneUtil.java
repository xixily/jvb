package jvb.util.httphandler;

import org.apache.log4j.Logger;

public class TelphoneUtil extends Thread{
	private static final Logger logger = Logger.getLogger(TelphoneUtil.class);
	private String telphone = "";
	private String randomcode = "";
	public static void main(String[] args) {
		String telphone = "17744543034";
		String randomcode = "123456";
		TelphoneUtil tel = new TelphoneUtil(telphone, randomcode);
		tel.start();
		logger.info("我只想插入一行中文");
		logger.error("我只想插入一行中文");
		
	}
	public TelphoneUtil(String telphone, String randomcode){
		this.telphone = telphone;
		this.randomcode = randomcode;
	}
	public void run() {
		sendCodeToWebcal();
	}

	public void sendCodeToWebcal() {
//		Map<String, SystemConfigVO> sysConfig = (Map<String, SystemConfigVO>) CacheUtil.getFromCache(CacheContant.SystemMapConfig);
//		String url = sysConfig.get("sendCodeToWebcalUrl").getConfigValue();
		String url = "http://211.151.35.103/app?Action=Webcall&Account=N000000001907&ServiceNo=58103443&Exten=telphone&ActionID=182453&IvrVars=CAPTCHA:randomcode.&PBX=1.1.2.100";
	url = url.replace("telphone", this.telphone).replace("randomcode",
				this.randomcode);
		logger.info("sendCodeToWebcal start send to url : " + url);
		System.out.println(url);
		try {
			String result = HttpProvider.sendGet(url, 40000);
			System.out.println(result);
			logger.info("sendCodeToWebcal response : " + result);
		} catch (Exception e) {
			logger.error("sendCodeToWebcal request url [" + url
					+ "] exception ", e);
		}
	}
}
