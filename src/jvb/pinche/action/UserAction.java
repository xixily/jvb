package jvb.pinche.action;

import java.io.IOException;

import jvb.pinche.action.baseAction.BaseAction;
import jvb.pinche.dao.ServiceDaoImp;
import jvb.pinche.vo.User;

import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1231344131313L;
//	HttpServletRequest request=ServletActionContext.getRequest();
//	HttpServletResponse response=ServletActionContext.getResponse();
//	HttpSession session=request.getSession();
	private User user;
	private ServiceDaoImp userDao;
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public ServiceDaoImp getUserDao() {
		return userDao;
	}
	public void setUserDao(ServiceDaoImp userDao) {
		this.userDao = userDao;
	}
	// 登陆功能
	public String login() {
		System.out.println(user);
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "用户名或密码为空!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name);
		if (u1 == null) {
			request.put("msg","该用户不存在,请重新登录");
			return  ActionSupport.ERROR;
		} else if (!u1.getUserPassword().equals(user.getUserPassword())) {
			request.put("msg","密码错误，请重新登录");
			return  ActionSupport.ERROR;
		}
//		else if (u1.getState()==0) {
//			request.setAttribute("msg","用户尚未激活，请登录邮箱激活!!!");
//			return "failure";
//		} 
		else {
//			session.setAttribute("user", u1);
			session.put("user", u1);
			return ActionSupport.SUCCESS;
		}
	}
	//注册功能
	public String regiest() throws IOException {
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "用户名或密码为空!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name);
		if (u1 != null) {
			request.put("msg", "该用户名已经被注册,请修改用户名！");
			return ActionSupport.ERROR;
		}
		return ActionSupport.SUCCESS;
	}
	
//	//修改用户信息
//	public String update(){
//		userDao.update(user);
//		return ActionSupport.SUCCESS;
//	}
//	public String active(){
//		String activeCode = user.getActiveCode();
//		User u1 = userDao.queryByActiveCode(activeCode);
//		u1.setState(1);//设置用户状态为已经激活
//		userDao.update(u1);
//		return ActionSupport.SUCCESS;
//	}
}
