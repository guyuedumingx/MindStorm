package controller;

import common.util.WebUtil;
import pojo.Project;
import service.ProjectService;
import service.impl.ProjectServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/util/project")
public class ProjectUtilController extends BaseController {

    ProjectService service = new ProjectServiceImpl();
    
    /**
     * 检测项目是否存在
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.valueOf(req.getParameter("id"));
        int statusCode = service.existProject(id);
        WebUtil.renderMap(resp,"status_code",statusCode+"");
    }

    /**
     * 获取最近参与的项目
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.valueOf(req.getParameter("id"));
        List<Project> recentProjectList = service.getRecentProjectList(id);
        WebUtil.renderJson(resp,recentProjectList);
    }
}
