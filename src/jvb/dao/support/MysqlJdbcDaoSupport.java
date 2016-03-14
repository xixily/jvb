package jvb.dao.support;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class MysqlJdbcDaoSupport extends JdbcDaoSupport{
	//JdbcDaoSupport ����
	/**
	 * jdbcTemplate �е�sql�����á�?����ռλ����
	 * ����������仰Ӧ�ñȽ������֪��Spring��JdbcDaoSupport��Ҫ��Ϊ������sql�Ǹ�?��ռλ����
	 * ���Ǳ��� ��û����ȫ��JdbcDaoSupport�����jdbcTemplate�������Լ�����д��һ��MysqlJdbcTemplate
	 */
	private  MysqlJdbcTemplate MysqlJdbcTemplate;

	protected void initTemplateConfig() {
		//MysqlJdbcTemplate���Զ����mysqlJdbcTemplate����simpleJdbcTemplatesuper(classicJdbcTemplate);
		this.MysqlJdbcTemplate = new MysqlJdbcTemplate(getJdbcTemplate());
	}

	public MysqlJdbcTemplate getMysqlJdbcTemplate() {
	  return MysqlJdbcTemplate;
	}
	
}
