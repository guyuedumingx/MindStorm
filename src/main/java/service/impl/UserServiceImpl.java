package service.impl;

import common.factory.DaoFactory;
import common.util.IntListUtil;
import dao.UserDao;
import dao.auxiliary.impl.FollowDaoImpl;
import pojo.User;
import pojo.auxiliary.Follow;
import service.UserService;
import java.util.List;

/**
 * user服务的实现类
 * @author yohoyes
 */
public class UserServiceImpl implements UserService {
    UserDao userDao = DaoFactory.getUserDao();
    FollowDaoImpl followDao = DaoFactory.getFollowDao();

    @Override
    public User login(String email, String pwd) {
        User u = new User();
        u.setEmail("'"+email+"'");
        u.setPassword("'"+pwd+"'");
        return userDao.selectOne(u);
    }

    @Override
    public User getUser(int id,boolean isAuthor) {
        User user = userDao.selectOne(new User(id));
        List<Follow> follows = followDao.selectObjectList(new Follow(user.getId(),0));
        Integer[] followers = IntListUtil.getIntList(follows, "following");
        user.setFollower(followers);
        List<Follow> followings = followDao.selectObjectList(new Follow(0,user.getId()));
        Integer[] following = IntListUtil.getIntList(follows, "follower");
        user.setFollowing(following);
        user.setPassword("");
        if(!isAuthor){
            user.setToken("");
        }
        return user;
    }

    @Override
    public User getUser(String email) {
       return userDao.selectOne(new User("'"+email+"'"));
    }

    @Override
    public User register(User user) {
        user.setExp(0);
        user.setUserAvatar("/img/avatar/default"+(int)(Math.random()*3)+".png");
        user.setUserSignature("这家伙很懒,什么也没留下!");
        int i = userDao.insertOne(user);
        if(i!=0) {
            user.setId(i);
            return user;
        }else {
            return null;
        }
    }

    @Override
    public int updateUser(User user) {
         return userDao.updateOne(user);
    }
}
