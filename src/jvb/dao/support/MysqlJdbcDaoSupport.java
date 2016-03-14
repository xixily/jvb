package jvb.dao.support;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class MysqlJdbcDaoSupport extends JdbcDaoSupport{
	//JdbcDaoSupport 就是
	/**
	 * jdbcTemplate 中的sql均是用“?”做占位符的
	 * 根据上面这句话应该比较清楚的知道Spring的JdbcDaoSupport主要是为了运行sql是给?做占位符。
	 * 但是本类 又没有完全用JdbcDaoSupport里面的jdbcTemplate，而是自己再重写了一个MysqlJdbcTemplate
	 */
	private  MysqlJdbcTemplate MysqlJdbcTemplate;

	protected void initTemplateConfig() {
		//MysqlJdbcTemplate把自定义的mysqlJdbcTemplate传给simpleJdbcTemplatesuper(classicJdbcTemplate);
		this.MysqlJdbcTemplate = new MysqlJdbcTemplate(getJdbcTemplate());
	}

	public MysqlJdbcTemplate getMysqlJdbcTemplate() {
	  return MysqlJdbcTemplate;
	}
	
}
