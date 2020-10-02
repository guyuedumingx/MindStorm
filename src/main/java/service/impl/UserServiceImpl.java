package service.impl;

import dao.UserDao;
import dao.impl.UserDaoImpl;
import pojo.User;
import service.UserService;

public class UserServiceImpl implements UserService {
    UserDao dao = new UserDaoImpl();
    @Override
    public int login(String email, String pwd) {
        User u = new User();
        u.setEmail("'"+email+"'");
        u.setPassword("'"+pwd+"'");
        return dao.selectOne(u)==null? 404:200;
    }

    @Override
    public User getUser(int id) {
        return dao.selectOne(new User(id));
    }
}
