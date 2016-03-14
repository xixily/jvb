package jvb.dao.support;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

/**
 * ��չspring��jdbcTemplate,Ϊdao���ṩ���Ի�mysql֧��
 * 
 * @author zhangyang
 * 
 */
public class MysqlJdbcTemplate extends SimpleJdbcTemplate {
	public MysqlJdbcTemplate(DataSource dataSource) {
		super(dataSource);
	}

	public MysqlJdbcTemplate(JdbcOperations classicJdbcTemplate) {
		super(classicJdbcTemplate);
	}

	/**
	 * ��ѯ��ȡvo����
	 * 
	 * @param <T>
	 * @param sql
	 * @param vo
	 * @param args
	 * @return
	 * @throws DataAccessException
	 */
	public <T> T queryForVO(String sql, BaseVO<T> vo, Object... args) throws DataAccessException {
		return queryForObject(sql, vo, args);
	}

	/**
	 * ��ҳ��ѯ�����б�
	 * @param <T>
	 * @param sql
	 * @param vo
	 * @param limit
	 * @param start
	 * @param args
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public <T> Map<String, Object> queryForVOListByPage(String sql, BaseVO<T> vo, int limit, int start, Object... args) throws DataAccessException, SQLException {
		StringBuffer sqlBuffer = new StringBuffer();
		StringBuffer countSqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from ( ").append(sql).append(" limit ").append(start).append(" ,").append(limit).append(" ) xxx");
//		sqlBuffer.append(" limit ").append(start).append(" ,").append(limit);
		countSqlBuffer.append("select count(1) from ( ").append(sql).append(" ) ttt");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("listdata", queryForVOList(sqlBuffer.toString(), vo, args));
		resultMap.put("countNumber", queryForInt(countSqlBuffer.toString(), args));
		return resultMap;
	}
	/**
	 * ��ҳ��ѯ�����б� �洨����--��ѯ������������ORDER BY��COUNT��ȥ��
	 * @param <T>
	 * @param sql
	 * @param countSql
	 * @param vo
	 * @param limit
	 * @param start
	 * @param args
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public <T> Map<String, Object> queryForVOListByPage(String sql,String countSql, BaseVO<T> vo, int limit, int start, Object... args) throws DataAccessException, SQLException {
		StringBuffer sqlBuffer = new StringBuffer("select * from ( ");
		sqlBuffer.append(sql).append(" limit ").append(start).append(" ,").append(limit).append(" ) xxx");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("listdata", queryForVOList(sqlBuffer.toString(), vo, args));
		resultMap.put("countNumber", queryForInt(countSql, args));
		return resultMap;
	}
	/**
	 * ��ҳ��ѯ�����б� �洨����--��ѯ������������ORDER BY��COUNT��ȥ��
	 * @param <T>
	 * @param sql
	 * @param countSql
	 * @param vo
	 * @param limit
	 * @param start
	 * @param args
	 * @param fareSql ͳ��FARE
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public <T> Map<String, Object> queryForVOListByPageOrSumFare(String sql,String countSql, String fareSql, BaseVO<T> vo, int limit, int start, Object... args) throws DataAccessException, SQLException {
//		StringBuffer sqlBuffer = new StringBuffer("select * from ( ");
//		sqlBuffer.append(sql).append(" limit ").append(start).append(" ,").append(limit).append(" ) xxx");
		Map<String, Object> resultMap = new HashMap<String, Object>();
//		resultMap.put("listdata", queryForVOList(sqlBuffer.toString(), vo, args));
//		resultMap.put("countNumber", queryForInt(countSql, args));
		resultMap.put("totalFare", queryForVO(fareSql, vo, args));
		return resultMap;
	}
	/**
	 * ��ҳ��ѯ������ʾ��������  �洨����
	 * @param <T>
	 * @param countSql
	 * @param args
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public <T> Map<String, Object> queryForVOTotalCount(String countSql,Object... args) throws DataAccessException, SQLException {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("countNumber", queryForInt(countSql, args));
		return resultMap;
	}
	/**
	 * �޷�ҳ��ѯ�����б�
	 * 
	 * @param <T>
	 * @param sql
	 * @param vo
	 * @param args
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public <T> List<T> queryForVOList(String sql, BaseVO<T> vo, Object... args) throws DataAccessException, SQLException {
		return query(sql, vo, args);
	}
	
	
	

}
