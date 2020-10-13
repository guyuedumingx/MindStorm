package controller;

import common.dto.StatusCode;
import common.util.WebUtil;
import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责注册
 * @author yohoyes
 */
@WebServlet("/user/register")
public class RegisterController extends BaseController {

    /**
     * 注册
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        User usr = WebUtil.getJson(request, User.class);
        UserService userService = new UserServiceImpl();
        User register = userService.register(usr);
        int i = StatusCode.nullObjcet(register);
        WebUtil.renderMap(response,"status_code",i+"");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
