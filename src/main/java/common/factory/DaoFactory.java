package common.factory;

import dao.UserDao;
import dao.impl.UserDaoImpl;

public class DaoFactory {
    private static UserDao dao = new UserDaoImpl();
    public static UserDao getUserDao() {
        return dao;
    }
}
