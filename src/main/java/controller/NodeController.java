package controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责处理有关于节点的请求
 * @author yohoyes
 */
@WebServlet("/node")
public class NodeController extends BaseController{

    /**
     * 新建节点
     * @param request
     * @param response
     * @throws IOException
     */
    public void newNode(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 删除节点
     * @param request
     * @param response
     * @throws IOException
     */
    public void delNode(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 修改节点信息
     * @param request
     * @param response
     * @throws IOException
     */
    public void chNode(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 获取节点
     * @param request
     * @param response
     * @throws IOException
     */
    public void getNode(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 点赞或取消点赞
     * @param request
     * @param response
     * @throws IOException
     */
    public void star(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }
}
