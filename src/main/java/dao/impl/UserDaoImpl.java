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
        String format = null;
        if(po.getId()!=0) {
            format = "id = " + po.getId();
        }else if(!"".equals(po.getEmail())&&!"".equals(po.getPassword())){
            String base = "user_email = {0} and password = {1}";
            format = MessageFormat.format(base,po.getEmail(),po.getPassword());
        }else {
            String base = "user_email = {0}";
            format = MessageFormat.format(base,po.getEmail());
        }
        return format;
    }
}
