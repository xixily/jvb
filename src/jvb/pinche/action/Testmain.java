package jvb.pinche.action;


import org.apache.log4j.Logger;

import jvb.util.GenrateId;

public class Testmain {
	
	public static void main(String[] args) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		conn = JDBCUtil.getConn();
//		String idr=GenrateId.genrateUserId();
//		System.out.println(idr);
//		String lid=GenrateId.genrateLmsgId("U000000010");
//		System.out.println(lid);
//		String sid=GenrateId.genrateLmsgId("U000000010");
//		System.out.println(sid);
		String randomCode=GenrateId.genrateRandomCode(1);
		String randomCode2=GenrateId.genrateRandomCode(8,false);
		Logger logger=Logger.getLogger(Testmain.class);
		logger.debug("debug信息\t randomCode:"+randomCode);
		logger.error("错误信息\t randomCode2:"+randomCode2);
	}
}
