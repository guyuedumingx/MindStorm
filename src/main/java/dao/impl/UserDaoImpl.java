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
    public String getQueryCondition(User po) {
        return "id = {0}";
    }

    @Override
    public int insertOne(User object) {
        return 0;
    }

    @Override
    public int updateOne(User object) {
        return super.updateOne(object);
    }

    @Override
    public int deleteOne(int id) {
        return super.deleteOne(id);
    }

    @Override
    public User selectById(User object) {
        return super.selectById(object);
    }
}
