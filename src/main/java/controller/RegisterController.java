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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        User user = WebUtil.getJson(request, User.class);
        String pwd = user.getPassword();
        UserService userService = new UserServiceImpl();
        User register = userService.register(user);
        int i = StatusCode.nullObjcet(register);
        if(!(StatusCode.OK+"").equals(i)){
            WebUtil.renderMap(response,"status_code",i+"");
        }
        request.getRequestDispatcher("/user/login?email="+user.getEmail()+"&password="+ pwd).forward(request,response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
