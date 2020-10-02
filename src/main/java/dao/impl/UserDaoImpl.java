package dao.impl;

import dao.BaseDaoImpl;
import dao.UserDao;
import pojo.User;

import java.text.MessageFormat;

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
        String base = "id = {0}";
        String format = MessageFormat.format(base,po.getId());
        return format;
    }
}
