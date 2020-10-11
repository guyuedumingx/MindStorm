package controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责处理有关项目的请求
 * @author yohoyes
 */
@WebServlet("/project")
public class ProjectController extends BaseController{

    /**
     * 新建项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 进入项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 删除项目
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
}
