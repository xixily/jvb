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
	 * ��¼����
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
			request.put("msg", "�û���������Ϊ��!!!");
			return ActionSupport.ERROR;
		}
		User u1 = userDao.getUserByUserName(name).get(0);
		if (u1 == null) {
			request.put("success", "false");
			request.put("msg","���û�������,�����µ�¼");
			return  ActionSupport.ERROR;
		} else if (!u1.getUserPassword().equals(user.getUserPassword())) {
			request.put("success", "false");
			request.put("msg","������������µ�¼");
			logger.error("������������µ�¼");
			return  ActionSupport.ERROR;
		}
//		else if (u1.getState()==0) {
//			request.setAttribute("msg","�û���δ������¼���伤��!!!");
//			return "failure";
//		} 
		else {
			request.put("success", "true");
			session.put("user", u1);
			user = u1;
			return ActionSupport.SUCCESS;
		}
		}else{
			request.put("msg", "��֤�����");
			return ActionSupport.ERROR;
		}
	}
	/**
	 * ע�Ṧ��
	 * @author dengxf
	 * @return success or error
	 * @throws IOException
	 */
	public String regiest() throws IOException {
		String name = user.getUserName();
		String password=user.getUserPassword();
		if("".equals(name)||name==null||"".equals(password)||password==null){
			request.put("msg", "�û���������Ϊ��!!!");
			logger.error("�û���������Ϊ��!!!");
			return ActionSupport.ERROR;
		}
//		User u1 = userDao.getUserByUserName(name);
		if (checkeUser()) {
			request.put("msg", "���û����Ѿ���ע��,���޸��û�����");
			logger.error("�û���������Ϊ��!!!");
			return ActionSupport.ERROR;
		}
		return ActionSupport.SUCCESS;
	}
	
	/**
	 * �˶��˻��Ƿ����
	 * @return boolean 
	 * 				true ���ڸ��û�
	 * 				false �����ڸ��û�
	 */
	public boolean checkeUser(){
		if(userDao.getUserByUserName(user.getUserName())==null){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * ��ȡ��֤�� 6 λ
	 * @author dengxf
	 */
	public void getValidateCode (String phoneNumber){
		validateCode = GenrateNumber.genrateRandomCode(6);
		session.put(SessionConf.VALIDATE_CODE, validateCode);
		TelphoneUtil tel = new TelphoneUtil(phoneNumber, validateCode);
		tel.start();
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
