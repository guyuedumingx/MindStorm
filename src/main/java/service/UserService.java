package service;

import pojo.User;

public interface UserService {
    public int login(String email, String pwd);

    public User getUser(int id);
}
