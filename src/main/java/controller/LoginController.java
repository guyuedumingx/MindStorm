package controller;

import common.dto.StatusCode;
import common.util.WebUtil;
import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

/**
 * 负责登录
 * @author yohoyes
 */
@WebServlet("/user/login")
public class LoginController extends BaseController {

    /**
     * 登录
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UserService service = new UserServiceImpl();
        User user = service.login(email, password);
        user.setPassword(null);
        int isSuccess = StatusCode.nullObjcet(user);

        //把用户Id存储在session中
        if(isSuccess==StatusCode.OK){
            session.setAttribute("user",user);
            Cookie userName = new Cookie("user_name", user.getName());
            Cookie userAvatar = new Cookie("user_avatar", user.getUserAvatar());
            Cookie userId = new Cookie("user_id", user.getId() + "");
//            userName.setMaxAge(60*60*24*7);
//            userAvatar.setMaxAge(60*60*24*7);
//            userId.setMaxAge(60*60*24*7);
            userName.setPath("/");
            userId.setPath("/");
            userAvatar.setPath("/");
            response.addCookie(userName);
            response.addCookie(userId);
            response.addCookie(userAvatar);
        }
        WebUtil.renderMap(response,"status_code",isSuccess+"");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

}
