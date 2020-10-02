package controller;

import common.util.WebUtil;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author yohoyes
 */
@WebServlet("/user")
public class UserController extends BaseController{
    public void register(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UserService service = new UserServiceImpl();
        int login = service.login(email, password);
        WebUtil.renderText(response,login+"");
    }
    public void setUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    public void chPassword(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    public void getUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    public void setAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
    public void getAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
}
