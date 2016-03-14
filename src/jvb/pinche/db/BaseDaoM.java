package jvb.pinche.db;


import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;




import jvb.pinche.vo.User;

public class BaseDaoM {
	Logger logger=Logger.getLogger(this.getClass());
	private Connection conn = null;
	private PreparedStatement ps = null;
	private ResultSet rs = null;

	private void init(){
		if(this.conn == null){
			this.conn = JDBCUtil.getConn();
		}
	}
	
	/**
	 * ��ѯ���������ļ�¼��
	 * 
	 * @param sql
	 *            Ҫִ�е�sql���
	 * @param args
	 *            ��sql����еģ���ֵ�Ĳ����б�
	 * @return ���������ļ�¼��
	 */
	public long getCount(String sql, Object... args) {
		this.init();
		if(conn == null){
				conn = JDBCUtil.getConn();
				if((conn = JDBCUtil.getConn()) == null){
					logger.error("getConn()ʧ�ܣ�");
					return 0L;
				}
		}
			try {
				ps = conn.prepareStatement(sql);
				for (int i = 0; i < args.length; i++) {
					ps.setObject(i + 1, args[i]);
				}
				rs = ps.executeQuery();
				if (rs.next()) {
					return rs.getLong(1);//���ؽ��������
				}
			} catch (SQLException e) {
				logger.error("sqlִ��ʧ��" + e);
				e.printStackTrace();
			} finally {
//				JDBCUtil.realse(conn, ps, rs);
			}
		return 0L;
	}

	
	
	
	/**
	 * ��ѯʵ�����ģ�����װ��һ������
	 * 
	 * @param <T>
	 *            Ҫ��ѯ�Ķ���ļ���
	 * @param sql
	 *            Ҫִ�е�sql���
	 * @param clazz
	 *            Ҫ��ѯ�Ķ��������
	 * @param args
	 *            ��sql����еģ���ֵ�Ĳ����б�
	 * @return Ҫ��ѯ����ļ��ϣ��޽��ʱ����null
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> executeQuery(String sql, Class<T> clazz, Object... args) {
		this.init();
		List<Object> list = new ArrayList<Object>();
		if(conn == null){
			conn = JDBCUtil.getConn();
			if((conn = JDBCUtil.getConn()) == null){
				logger.error("getConn()ʧ�ܣ�");
				return null;
			}
		}
		try {
			ps = conn.prepareStatement(sql);
			for (int i = 0; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}
			rs = ps.executeQuery();
			Field[] fs = clazz.getDeclaredFields();//���clazz��������������ֶ�
			String[] colNames = new String[fs.length];//����������
			String[] rTypes = new String[fs.length];//��������
			Method[] methods = clazz.getMethods();
			while (rs.next()) {
				for (int i = 0; i < fs.length; i++) {
					Field f = fs[i];
					String colName = f.getName().substring(0, 1).toUpperCase()
							+ f.getName().substring(1);
//					System.out.println(colName);
					colNames[i] = colName;
					String rType = f.getType().getSimpleName();
					rTypes[i] = rType;
				}

				Object object = (T) clazz.newInstance();
				for (int i = 0; i < colNames.length; i++) {
					String colName = colNames[i];
					String methodName = "set" + colName;
					// ���Ҳ����ö�Ӧ��setter������
					for (Method m : methods) {
						if (methodName.equals((m.getName()))) {
							// ������˲�����ƥ���쳣�����JavaBean�и��������ͣ������else��֧���д���
							if ("int".equals(rTypes[i])
									|| "Integer".equals(rTypes[i])) {
								m.invoke(object, rs.getInt(colName));
							} else if ("Date".equals(rTypes[i])) {
								m.invoke(object, rs.getDate(colName));
							} else if ("Timestamp".equals(rTypes[i])) {
								m.invoke(object, rs.getTimestamp(colName));
							} else {
								m.invoke(object, rs.getObject(colName));
							}
							break;
						}
					}
				}
				list.add(object);
			}
			logger.info("executeQuery()�ɹ���");
			return (List<T>) list;
		} catch (Exception e) {
			logger.error("sqlִ��ʧ��" + e);
			e.printStackTrace();
		} finally {
//			JDBCUtil.realse(conn, ps, rs);
		}
		logger.error("executeQuery()ʧ�ܣ�");
		return null;
	}

	/**
	 * �Զ������ʽ��������һ��ʵ��
	 * 
	 * @param sql
	 *            Ҫִ�е�sql���
	 * @param object
	 *            Ҫ�������µ�ʵ�����
	 * @param args
	 *            ����Ҫ��ֵ���б���ɵ����飬����sql���
	 *            "insert into tbl_user values(seq_user.nextval,?,?,?)"ӦΪ1
	 * @return ���������1 �ɹ���0 ʧ��
	 */
	public int saveEntity(String sql, Object object, int... args) {
		this.init();
		if(conn == null){
			conn = JDBCUtil.getConn();
			if((conn = JDBCUtil.getConn()) == null){
				logger.error("getConn()ʧ�ܣ�");
				return 0;
			}
		}
		try {
			ps = conn.prepareStatement(sql);
			Class<? extends Object> c = object.getClass();
			Field[] fields = object.getClass().getDeclaredFields();
			int temp = 1;// ����ֵ�ģ����±꣬����±�Ϊargs�ĳ���
			int colIndex = 1;// SQL����еĵ�ǰ�ֶ��±�
			int t = 0;// args������±�
			for (int j = 0; j < fields.length; j++) {
				Field field = fields[j];// �õ�ĳ����������
				String methodName = "get"
						+ field.getName().substring(0, 1).toUpperCase()
						+ field.getName().substring(1);
				Method method = c.getMethod(methodName);// �õ��˵�ǰ���е�һ��method
				String rType = field.getType().getSimpleName().toString();
				if (t < args.length && colIndex == args[t]) {
					t++;
				} else if ("int".equals(rType) || "INTEGER".equals(rType)) {
					ps.setInt(temp++, (Integer) method.invoke(object));
				} else {
					ps.setObject(temp++, method.invoke(object));
				}
				colIndex++;// ���������±�
			}
			logger.info("saveEntity()����ɹ���");
			return ps.executeUpdate();
		} catch (Exception e) {
			logger.error("sqlִ��ʧ��" + e);
			e.printStackTrace();
		} finally {
//			JDBCUtil.realse(conn, ps, null);
		}
		logger.error("saveEntity()����ʧ�ܣ�");
		return 0;
	}

	/**
	 * ִ�пɱ������SQL��䣬���б��桢ɾ������²���
	 * 
	 * @param sql
	 *            Ҫִ�е�sql��䣬?�ĸ�ֵ˳�������args�����˳����ͬ
	 * @param args
	 *            Ҫ��ֵ�Ĳ����б�
	 * @return ������������� �ɹ���0 ʧ��
	 */
	public int saveOrUpdate(String sql, Object... args) {
		this.init();
		if(conn == null){
			conn = JDBCUtil.getConn();
			if((conn = JDBCUtil.getConn()) == null){
				logger.error("getConn()ʧ�ܣ�");
				return 0;
			}
		}
		try {
			ps = conn.prepareStatement(sql);
			for (int j = 0; j < args.length; j++) {
				ps.setObject(j + 1, args[j]);
			}
			logger.info("saveOrUpdate()�ɹ���");
			return ps.executeUpdate();
		} catch (Exception e) {
			logger.error("sqlִ��ʧ��" + e);
			e.printStackTrace();
		} finally {
//			JDBCUtil.realse(conn, ps, null);
		}
		logger.error("saveOrUpdate()ʧ�ܣ�");
		return 0;
	}
	/**
	 * �ͷ�������Դ
	 * @param conn 
	 * 			���ݿ����ӳ�
	 * @param ps
	 * 			PreparedStatement
	 * @param rs
	 * 			ResultSet
	 * 
	 */
	public void release(){
		JDBCUtil.realse(conn, ps, rs);
	}

	public static void main(String[] args) {
		BaseDaoM bd = new BaseDaoM();
		String sql = "select * from tbl_user";
		List<User> users = new ArrayList<User>();
		users = bd.executeQuery(sql, User.class);
		User u = new User();
		u.setUserNum("U000000017");
		u.setUserName("yzq");
		u.setUserPassword("123abc");
		u.setNickName("zhongqing");
		u.setEMail("bilybily@qq.com");
		u.setRealName("yzq");
		u.setUserType("�˿�");
		u.setTelPhone("123124251");
		String sql2 = "insert into tbl_user values(?,?,?,?,?,?,?,?)";
		bd.saveEntity(sql2, u);
//		User u1 = users.get(0);
//		System.out.println(u1);
//		User u2 = users.get(1);
//		System.out.println(u2);
//		User u3 = users.get(2);
//		System.out.println(u3);
//		User u4 = users.get(3);
//		System.out.println(u4);
		System.out.println(users.size());
	}
}



