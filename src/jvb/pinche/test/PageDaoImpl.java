//package jvb.pinche.test;
//
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//
//public class PageDaoImpl implements PageDao {
//
//	@Override
//	public Page getPage(PreparedStatement dBPreparedStatement,
//			String tableName, Page p, String query) {
//		 String sql = "";
//		  ResultSet pageRs = null;
//		  int totalPage = 0;
//		  sql = "SELECT COUNT(*) FROM "+tableName+" WHERE 1=1"+queryWhere;
//		  pageRs = dBPreparedStatement.query(sql);
//		  try {
//		   pageRs.next();
//		   page.setTotalCount(pageRs.getInt(1));
//		   totalPage = (page.getTotalCount()-1)/page.getPageSize()+1;
//		   if(page.getCurPage()<=1){
//		    page.setPrePage(1);
//		   }else{
//		    page.setPrePage(page.getCurPage()-1);
//		   }
//		   page.setLastPage(totalPage);
//		   if(totalPage<page.getCurPage()+1){
//		    page.setNextPage(totalPage);
//		   }else{
//		    page.setNextPage(page.getCurPage()+1);
//		   }
//		  } catch (SQLException e) {
//		   // TODO Auto-generated catch block
//		   e.printStackTrace();
//		  }finally{
//		   try {
//		    if(null!=pageRs){
//		     pageRs.close();
//		     pageRs = null;
//		    }
//		   } catch (SQLException e) {
//		    // TODO Auto-generated catch block
//		    e.printStackTrace();
//		   }
//		    
//		  }
//		  return page;
//	}
//
//}
