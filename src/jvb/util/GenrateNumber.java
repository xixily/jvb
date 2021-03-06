package jvb.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Random;

import jvb.pinche.db.JDBCUtil;

/**
 * 获取并创建userNum
 * @author dengxf
 *
 */
public class GenrateNumber {
	static ResultSet rs=null;
	@SuppressWarnings("resource")
	
	public static String genrateUserId(){
		Connection conn = JDBCUtil.getConn();
		PreparedStatement ps=null;
		String userId=null;
		String sql="SELECT userNum FROM jvb_pinche.tbl_user  ORDER BY userNum DESC LIMIT 1";
		String sql2="INSERT INTO `jvb_pinche`.`tbl_user` (userNum,userName) VALUES (?,?)";
		try {
			JDBCUtil.beginTx(conn);
			ps=conn.prepareStatement(sql);
			rs=ps.executeQuery();
			if(rs.next()){
//				synchronized(GenrateId.class){  
					Long l=Long.parseLong("1"+rs.getString(1).substring(1))+1;
					userId="U"+l.toString().substring(1);
					ps=conn.prepareStatement(sql2);
					ps.setObject(1, userId);
					ps.setObject(2, userId);
					ps.execute();
			    }  
				JDBCUtil.commit(conn);
				return userId;
//			}
		} catch (SQLException e) {
			System.out.println("获取userId失败！");
			e.printStackTrace();
		}finally{
			JDBCUtil.realse(conn, ps);
		}
		return null;
	}
	
	/**
	 * 创建并获取LmsgNum
	 * @param userId 用户id
	 * @return lmsgId 长途拼车信息
	 * @author dengxf
	 */
	@SuppressWarnings("resource")
	public static String genrateLmsgId(String userId){
		Connection conn = JDBCUtil.getConn();
		PreparedStatement ps=null;
		String lmsgId=null;
		String sql="SELECT msgNum FROM jvb_pinche.lmsg  ORDER BY msgNum DESC LIMIT 1";
		String sql2="INSERT INTO jvb_pinche.lmsg (msgNum,publisher) VALUES (?,?)";
		try {
			JDBCUtil.beginTx(conn);
			ps=conn.prepareStatement(sql);
			rs=ps.executeQuery();
			if(rs.next()){
//				synchronized(GenrateId.class){  
					Long l=Long.parseLong("1"+rs.getString(1).substring(2))+1;
					lmsgId="LM"+l.toString().substring(1);
					ps=conn.prepareStatement(sql2);
					ps.setObject(1, lmsgId);
					ps.setObject(2, userId);
					ps.execute();
//			    }  
				JDBCUtil.commit(conn);
				return lmsgId;
			}
		} catch (SQLException e) {
			System.out.println("获取LmsgId失败！");
			e.printStackTrace();
		}finally{
			JDBCUtil.realse(conn, ps);
		}
		return null;
	}
	
	/**
	 * 创建并获取LmsgNum
	 * @param userId 用户id
	 * @return lmsgId 长途拼车信息id
	 */
	@SuppressWarnings("resource")
	public static String genrateSmsgId(String userId){
		Connection conn = JDBCUtil.getConn();
		PreparedStatement ps=null;
		String lmsgId=null;
		String sql="SELECT msgNum FROM jvb_pinche.smsg  ORDER BY msgNum DESC LIMIT 1";
		String sql2="INSERT INTO jvb_pinche.smsg (msgNum,publisher) VALUES (?,?)";
		try {
			JDBCUtil.beginTx(conn);
			ps=conn.prepareStatement(sql);
			rs=ps.executeQuery();
			if(rs.next()){
//				synchronized(GenrateId.class){  
					Long l=Long.parseLong("1"+rs.getString(1).substring(2))+1;
					lmsgId="LM"+l.toString().substring(1);
					ps=conn.prepareStatement(sql2);
					ps.setObject(1, lmsgId);
					ps.setObject(2, userId);
					ps.execute();
//				}  
				JDBCUtil.commit(conn);
				return lmsgId;
			}
		} catch (SQLException e) {
			System.out.println("获取SmsgId失败！");
			e.printStackTrace();
		}finally{
			JDBCUtil.realse(conn, ps);
		}
		return null;
	}
	
	/**
	 * 获取简单纯数字随机码
	 * @param lon 生成随机码的长度
	 * @return genrateRandomCode(lon,true)
	 */
	public static String genrateRandomCode(int lon){
		return genrateRandomCode(lon,true);
	}
	
	/**
	 * 获取数字字母组合随机码
	 * @param lon 生成随机码的长度
	 * @param simple true简单随机码(纯数字)
	 * @return randomCode
	 */
	public static String genrateRandomCode(int lon,boolean simple){
		long bit=9L;
		String randomCode ;
		if(simple==true){
			for (int i = 1; i <lon; i++) {
				bit*=10;
			}
			randomCode = String.valueOf(Math.round((Math.random() * bit)) + bit/9);
		}else{
			Random r = new Random();
			  int i = 0;
			  String str = "";
			  String s = null;
			  while (i < lon) {
			   switch (r.nextInt(63)) {
			    case (0): s = "0"; break;
			    case (1): s = "1"; break;
			    case (2): s = "2"; break;
			    case (3): s = "3"; break;
			    case (4): s = "4"; break;
			    case (5): s = "5"; break;
			    case (6): s = "6"; break;
			    case (7): s = "7"; break;
			    case (8): s = "8"; break;
			    case (9): s = "9"; break;
			    case (10): s = "a"; break;
			    case (11): s = "b"; break;
			    case (12): s = "c"; break;
			    case (13): s = "d"; break;
			    case (14): s = "e"; break;
			    case (15): s = "f"; break;
			    case (16): s = "g"; break;
			    case (17): s = "h"; break;
			    case (18): s = "i"; break;
			    case (19): s = "j"; break;
			    case (20): s = "k"; break;
			    case (21): s = "m"; break;
			    case (23): s = "n"; break;
			    case (24): s = "o"; break;
			    case (25): s = "p"; break;
			    case (26): s = "q"; break;
			    case (27): s = "r"; break;
			    case (28): s = "s"; break;
			    case (29): s = "t"; break;
			    case (30): s = "u"; break;
			    case (31): s = "v"; break;
			    case (32): s = "w"; break;
			    case (33): s = "l"; break;
			    case (34): s = "x"; break;
			    case (35): s = "y"; break;
			    case (36): s = "z"; break;
			    case (37): s = "A"; break;
			    case (38): s = "B"; break;
			    case (39): s = "C"; break;
			    case (40): s = "D"; break;
			    case (41): s = "E"; break;
			    case (42): s = "F"; break;
			    case (43): s = "G"; break;
			    case (44): s = "H"; break;
			    case (45): s = "I"; break;
			    case (46): s = "L"; break;
			    case (47): s = "J"; break;
			    case (48): s = "K"; break;
			    case (49): s = "M"; break;
			    case (50): s = "N"; break;
			    case (51): s = "O"; break;
			    case (52): s = "P"; break;
			    case (53): s = "Q"; break;
			    case (54): s = "R"; break;
			    case (55): s = "S"; break;
			    case (56): s = "T"; break;
			    case (57): s = "U"; break;
			    case (58): s = "V"; break;
			    case (59): s = "W"; break;
			    case (60): s = "X"; break;
			    case (61): s = "Y"; break;
			    case (62): s = "Z"; break;
			   }
			   i++;
			   str = s + str;
			  }
			  randomCode=str;
		}
		return randomCode;
	}
}
