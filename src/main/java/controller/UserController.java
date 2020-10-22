package controller;

import common.util.WebUtil;
import pojo.Project;
import pojo.User;
import service.ProjectService;
import service.impl.ProjectServiceImpl;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * 负责处理有关用户的请求
 * @author yohoyes
 */
@WebServlet("/user")
public class UserController extends BaseController{
    User user = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
    }

    /**
     * 设置用户信息
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 修改密码
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 获取用户信息
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ProjectService service = new ProjectServiceImpl();
        List<Project> recentProjectList = service.getRecentProjectList(user.getId());
        user.setRecentProject(recentProjectList);
        WebUtil.renderJson(response,user);
    }

}
