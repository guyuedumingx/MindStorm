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
        return "t_user";
    }

    @Override
    public User insertOne(User object) {
        return null;
    }

    @Override
    public User updateOne(User object) {
        return super.updateOne(object);
    }

    @Override
    public User selectOne(User object) {
        return super.selectOne(object);
    }

    @Override
    public User selectById(User object) {
        return super.selectById(object);
    }

    @Override
    public User selectById(int id) {
        return super.selectById(id);
    }
}
