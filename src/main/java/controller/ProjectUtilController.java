package controller;

import common.dto.Result;
import common.dto.SearchBack;
import common.dto.StatusCode;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.Project;
import service.ProjectService;
import service.impl.ProjectServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


/**
 * 项目增补接口
 * @author yohoyes
 */
@WebServlet("/util/project")
public class ProjectUtilController extends BaseController {

    Logger logger = LoggerFactory.getLogger(ProjectUtilController.class);
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
        Result result = new Result();
        String id = request.getParameter("projectId");
        if (id!=null&&!"".equals(id)){
            try {
                int isSuccess = service.delPrecentProject(Integer.valueOf(id));
                int statusCode = isSuccess==0 ? StatusCode.LOST : StatusCode.OK;
                result.setStatus_code(statusCode);
            }catch (NumberFormatException e){
                result.setStatus_code(StatusCode.LOST);
                logger.error(e.getMessage());
            }
        }else {
            result.setStatus_code(StatusCode.LOST);
        }
        WebUtil.renderJson(response,result);
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
        String page = req.getParameter("page");
        SearchBack result = new SearchBack();
        List<Project> publicProjectsFromPages = null;
        try {
            int p = Integer.valueOf(page);
            publicProjectsFromPages = service.getPublicProjectsFromPages(p);
            result.setResult(publicProjectsFromPages);
            result.setStatus_code(StatusCode.OK);
        }catch (NumberFormatException e){
            logger.error(e.getMessage());
            result.setStatus_code(StatusCode.ERROR);
        }
        WebUtil.renderJson(resp,result);
    }
}
