package jvb.pinche.test;

import java.sql.PreparedStatement;

public interface PageDao {
	public Page getPage(PreparedStatement dBPreparedStatement,String tableName,Page p,String query);
}
