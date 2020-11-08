package controller;

import common.dto.Result;
import common.util.WebUtil;
import pojo.Project;
import service.ProjectService;
import service.impl.ProjectServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


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
     * 退出项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.getSession().setAttribute("history",null);
    }

    /**
     * 修改项目信息
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Project project = WebUtil.getJson(req, Project.class);
        int isSuccess = service.updateProject(project);
        Result result = new Result();
        result.setStatus_code(isSuccess);
        WebUtil.renderJson(resp,result);
    }

    /**
     * 获取公开项目列表
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }
}
