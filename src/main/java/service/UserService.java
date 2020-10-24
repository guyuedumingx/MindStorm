package service;

import pojo.User;

/**
 * 提供用户操作服务
 * @author yohoyes
 */
public interface UserService {

    /**
     * 登录
     * @param email 登录的邮箱
     * @param pwd 登录的密码
     * @return
     */
    User login(String email, String pwd);

    /**
     * 根据id获取用户对象
     * @param id 传入的id
     * @return User对象
     */
    User getUser(int id, boolean isAuthor);

    /**
     * 根据email 获取user
     * @param email
     * @return
     */
    User getUser(String email);

    /**
     * 注册
     * @param user
     * @return
     */
    User register(User user);

    int updateUser(User user);
}
