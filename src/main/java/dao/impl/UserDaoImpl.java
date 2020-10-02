package dao.impl;

import dao.BaseDaoImpl;
import dao.UserDao;
import pojo.User;

/**
 * @author yohoyes
 */
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

    @Override
    public String getTableName() {
        return "user";
    }

    @Override
    public int insertOne(User object) {
        return 0;
    }

    @Override
    public User updateOne(User object) {
        return super.updateOne(object);
    }

    @Override
    public User deleteOne(User object) {
        return super.deleteOne(object);
    }

    @Override
    public User selectById(User object) {
        return super.selectById(object);
    }
}
