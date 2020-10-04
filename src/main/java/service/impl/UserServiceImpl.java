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
        return user;
    }
}
