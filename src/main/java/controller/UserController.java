package controller;

import common.dto.StatusCode;
import common.util.WebUtil;
import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责处理有关用户的请求
 * @author yohoyes
 */
@WebServlet("/user")
public class UserController extends BaseController{
    /**
     * 注册
     * @param request
     * @param response
     * @throws IOException
     */
    public void register(HttpServletRequest request, HttpServletResponse response) throws IOException {
        User usr = WebUtil.getJson(request, User.class);
        UserService userService = new UserServiceImpl();
        User register = userService.register(usr);
        int i = StatusCode.nullObjcet(register);
        WebUtil.renderText(response,i+"");
    }

    /**
     * 登录
     * @param request
     * @param response
     * @throws IOException
     */
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UserService service = new UserServiceImpl();
        User user = service.login(email, password);
        int isSuccess = StatusCode.nullObjcet(user);
        WebUtil.renderText(response,isSuccess+"");
    }

    /**
     * 设置用户信息
     * @param request
     * @param response
     * @throws IOException
     */
    public void setUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 修改密码
     * @param request
     * @param response
     * @throws IOException
     */
    public void chPassword(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 获取用户信息
     * @param request
     * @param response
     * @throws IOException
     */
    public void getUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int id =Integer.valueOf(request.getParameter("user_id"));
        boolean isAuthor = Boolean.valueOf(request.getParameter("is_author"));
        User user = new UserServiceImpl().getUser(id,isAuthor);
        WebUtil.renderJson(response,user);
    }

    /**
     * 设置头像
     * @param request
     * @param response
     * @throws IOException
     */
    public void setAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 获取头像
     * @param request
     * @param response
     * @throws IOException
     */
    public void getAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
}
