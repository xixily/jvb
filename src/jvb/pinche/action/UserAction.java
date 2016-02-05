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
	// ��½����
	public String login() {
		System.out.println(user);
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "�û���������Ϊ��!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name);
		if (u1 == null) {
			request.put("msg","���û�������,�����µ�¼");
			return  ActionSupport.ERROR;
		} else if (!u1.getUserPassword().equals(user.getUserPassword())) {
			request.put("msg","������������µ�¼");
			return  ActionSupport.ERROR;
		}
//		else if (u1.getState()==0) {
//			request.setAttribute("msg","�û���δ������¼���伤��!!!");
//			return "failure";
//		} 
		else {
//			session.setAttribute("user", u1);
			session.put("user", u1);
			return ActionSupport.SUCCESS;
		}
	}
	//ע�Ṧ��
	public String regiest() throws IOException {
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "�û���������Ϊ��!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name);
		if (u1 != null) {
			request.put("msg", "���û����Ѿ���ע��,���޸��û�����");
			return ActionSupport.ERROR;
		}
		return ActionSupport.SUCCESS;
	}
	
//	//�޸��û���Ϣ
//	public String update(){
//		userDao.update(user);
//		return ActionSupport.SUCCESS;
//	}
//	public String active(){
//		String activeCode = user.getActiveCode();
//		User u1 = userDao.queryByActiveCode(activeCode);
//		u1.setState(1);//�����û�״̬Ϊ�Ѿ�����
//		userDao.update(u1);
//		return ActionSupport.SUCCESS;
//	}
}
