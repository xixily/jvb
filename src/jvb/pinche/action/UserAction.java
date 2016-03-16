package jvb.pinche.action;

import java.io.IOException;

import jvb.config.SessionConf;
import jvb.pinche.action.baseAction.BaseAction;
import jvb.pinche.dao.Imp.ServiceDaoImp;
import jvb.pinche.vo.User;
import jvb.util.GenrateNumber;
import jvb.util.httphandler.TelphoneUtil;

import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends BaseAction{

	private static final long serialVersionUID = 1231344131313L;
	private User user;
	private ServiceDaoImp userDao;
	private String validateCode;
	
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
	
	
	
	public String getValidateCode() {
		return validateCode;
	}
	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}
	/**
	 * 登录功能
	 * @author dengxf
	 * @return success or error
	 */
	public String login() {
		System.out.println(user);
		String name = user.getUserName();
		String password=user.getUserPassword();
		session.put(SessionConf.VALIDATE_CODE, "test");
		if(request.get(SessionConf.VALIDATE_CODE).equals(session.get(SessionConf.VALIDATE_CODE))){
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("success", "false");
			request.put("msg", "用户名或密码为空!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name).get(0);
		if (u1 == null) {
			request.put("success", "false");
			request.put("msg","该用户不存在,请重新登录");
			return  ActionSupport.ERROR;
		} else if (!u1.getUserPassword().equals(user.getUserPassword())) {
			request.put("success", "false");
			request.put("msg","密码错误，请重新登录");
			logger.error("密码错误，请重新登录");
			return  ActionSupport.ERROR;
		}
//		else if (u1.getState()==0) {
//			request.setAttribute("msg","用户尚未激活，请登录邮箱激活!!!");
//			return "failure";
//		} 
		else {
			request.put("success", "true");
			session.put("user", u1);
			user = u1;
			return ActionSupport.SUCCESS;
		}
		}else{
			request.put("msg", "验证码错误！");
			return ActionSupport.ERROR;
		}
	}
	/**
	 * 注册功能
	 * @author dengxf
	 * @return success or error
	 * @throws IOException
	 */
	public String regiest() throws IOException {
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "用户名或密码为空!!!");
			logger.error("用户名或密码为空!!!");
			return ActionSupport.ERROR;
		}
//		User u1 = userDao.getUserByUserName(name);
		if (checkeUser()) {
			request.put("msg", "该用户名已经被注册,请修改用户名！");
			logger.error("用户名或密码为空!!!");
			return ActionSupport.ERROR;
		}
		return ActionSupport.SUCCESS;
	}
	
	/**
	 * 核对账户是否存在
	 * @return boolean 
	 * 				true 存在该用户
	 * 				false 不存在改用户
	 */
	public boolean checkeUser(){
		if(userDao.getUserByUserName(user.getUserName())==null){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * 获取验证码 6 位
	 * @author dengxf
	 */
	public void getValidateCode (String phoneNumber){
		validateCode = GenrateNumber.genrateRandomCode(6);
		session.put(SessionConf.VALIDATE_CODE, validateCode);
		TelphoneUtil tel = new TelphoneUtil(phoneNumber, validateCode);
		tel.start();
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
