package jvb.pinche.dao;

import java.util.List;

import jvb.pinche.vo.Address;
import jvb.pinche.vo.Application;
import jvb.pinche.vo.Comments;
import jvb.pinche.vo.Lmsg;
import jvb.pinche.vo.Smsg;
import jvb.pinche.vo.User;

public interface ServiceDao {
	public User getUserByid(String userId);
	public User getUserByUserName(String username);
	public boolean addUser(User user);
	
	public Address getAddressById(String addressId);
	public boolean addAddress(Address address);
	
	public Application getApplicationById(String ApplicationId);
	public boolean addApplication(Application application,String userId,String msgId);
	
	public Comments getCommentsById(String commentsId);
	public Comments getCommentsBypublisher(String publisher);
	public boolean addComments(Comments comments);
	
	public List<Lmsg> getLmsg();
	public Lmsg getLmsgByUserId(String userId);
	public boolean addLmsg(Lmsg lmsg);
	
	public List<Smsg> getSmsg();
	public Smsg getSmsgByUserId(String userId);
	public boolean addSmsg(Smsg Smsg);
	
}
