package jvb.pinche.test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;




import jvb.pinche.db.JDBCUtil;

public class TestQuery {
	
public static void main(String[] args) {
	 Connection conn=JDBCUtil.getConn();
	 PreparedStatement ps = null;
	 ResultSet rs = null;
	 List<String> list=new ArrayList<String>();
	 String sql="SELECT mobile FROM test.tbl_mobile_code_error";
	 try {
		ps=conn.prepareStatement(sql);
		rs=ps.executeQuery();
		while(rs.next()){
			System.out.println(rs.getString(1));
		}
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
