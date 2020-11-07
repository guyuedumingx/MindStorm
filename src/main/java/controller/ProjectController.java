package controller;

import common.container.History;
import common.dto.Result;
import common.dto.SearchBack;
import common.dto.StatusCode;
import common.util.SensitiveWordUtil;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.Project;
import pojo.User;
import service.ProjectService;
import service.impl.ProjectServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * 负责处理有关项目的请求
 * @author yohoyes
 */
@WebServlet("/project")
public class ProjectController extends BaseController{
    Logger logger = LoggerFactory.getLogger(ProjectController.class);
    ProjectService service = new ProjectServiceImpl();
    SensitiveWordUtil filter = SensitiveWordUtil.getInstance();
    User user = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
    }

    /**
     * 新建项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Project project = WebUtil.getJson(request, Project.class);
        //敏感词过滤
        project.setName(filter.replaceSensitiveWord(project.getName(),1,"*"));
        project.setIntroduction(filter.replaceSensitiveWord(project.getIntroduction(),1,"*"));

        project.setAuthor(user.getId());
        int id = service.newProject(project,user.getId());
        Result result = new Result();
        result.setStatus_code(id!=0 ? StatusCode.OK : StatusCode.LOST);
        result.put("project_id",id);
        WebUtil.renderJson(response,result);
    }

    /**
     * 进入项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException,ServletException {
        int id =Integer.valueOf(request.getParameter("id"));
        Project project = service.getProject(id);
        if(project==null){
            request.getRequestDispatcher("index.html").forward(request,response);
        }else {
            WebUtil.renderJson(response,project);
        }
        History history = new History();
        HttpSession session = request.getSession();
        session.setAttribute("history",history);
    }

    /**
     * 删除项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int id =Integer.valueOf(request.getParameter("id"));
        int statusCode = service.delProject(id, user.getId());
        WebUtil.renderMap(response,"status_code",statusCode+"");
    }

    /**
     * 搜索项目
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        SearchBack result = new SearchBack();
        String key = req.getParameter("key");
        List<Project> search = service.search(key);
        if(search==null){
            result.setStatus_code(StatusCode.ERROR);
        }else {
            result.setStatus_code(StatusCode.OK);
            result.setResult(search);
        }
        WebUtil.renderJson(resp,result);
    }
}

