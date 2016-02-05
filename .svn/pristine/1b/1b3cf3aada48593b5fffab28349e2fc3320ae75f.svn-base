package jvb.pinche.dao;

import java.util.List;

import org.apache.log4j.Logger;

import jvb.pinche.db.BaseDaoM;
import jvb.pinche.vo.Address;
import jvb.pinche.vo.Application;
import jvb.pinche.vo.Comments;
import jvb.pinche.vo.Lmsg;
import jvb.pinche.vo.Smsg;
import jvb.pinche.vo.User;

public class ServiceDaoImp extends BaseDaoM implements ServiceDao {
	Logger logger=Logger.getLogger(this.getClass());
	@Override
	public User getUserByid(String userId) {
		List<User> users = null;
		String sql = "SELECT * FROM jvb_pinche.tbl_user WHERE userNum=?";
		try {
			users = executeQuery(sql, User.class,userId);
		} catch (Exception e) {
			logger.error("通过userId:"+userId+"查询用户失败！", e);
			return null;
		}
		return users.get(0);
	}
	
	@Override
	public User getUserByUserName(String username) {
		List<User> users = null;
		String sql = "SELECT * FROM jvb_pinche.tbl_user WHERE userName=?";
		try {
			users = executeQuery(sql, User.class, username);
			}catch(Exception e){
			logger.error("通过userName:"+username+"查询用户失败！", e);
			}
		return null;
	}

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Address getAddressById(String addressId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addAddress(Address address) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Application getApplicationById(String ApplicationId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addApplication(Application application, String userId,
			String msgId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Comments getCommentsById(String commentsId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comments getCommentsBypublisher(String publisher) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addComments(Comments comments) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Lmsg> getLmsg() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Lmsg getLmsgByUserId(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addLmsg(Lmsg lmsg) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Smsg> getSmsg() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Smsg getSmsgByUserId(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addSmsg(Smsg Smsg) {
		// TODO Auto-generated method stub
		return false;
	}


}
