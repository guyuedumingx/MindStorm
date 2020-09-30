package common.factory;

import dao.UserDao;
import dao.impl.UserDaoImpl;

/**
 * @author yohoyes
 */
public class DaoFactory {
    private static UserDao dao = new UserDaoImpl();
    public static UserDao getUserDao() {
        return dao;
    }
}
