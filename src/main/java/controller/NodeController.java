package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.factory.DaoFactory;
import common.util.WebUtil;
import dao.NodeDao;
import pojo.Node;
import pojo.User;
import service.NodeService;
import service.impl.NodeServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * 负责处理有关于节点的请求
 * @author yohoyes
 */
@WebServlet("/node")
public class NodeController extends BaseController{
    User user = null;
    NodeService service = new NodeServiceImpl();

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
    }

    /**
     * 新建节点
     * @param req
     * @param resp
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Node node = WebUtil.getJson(req, Node.class);
        node.setAuthor(user.getId());
        node.setLastEditId(user.getId());
        node.setLastEditTime(System.currentTimeMillis()+"");
        int nodeId = service.newNode(node);
        int statusCode = StatusCode.isZero(nodeId);

        Result result = new Result();
        result.put("node_id",nodeId);
        result.setStatus_code(statusCode);
        WebUtil.renderJson(resp,result);
    }

    /**
     * 删除节点
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String nodeId = request.getParameter("nodeId");
        int statusCode = service.delNode(Integer.valueOf(nodeId), user.getId());
        WebUtil.renderMap(response,"status_code",statusCode+"");
    }

    /**
     * 修改节点信息
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Node node = WebUtil.getJson(request, Node.class);
        int statusCode = service.chNode(node);
        WebUtil.renderMap(response,"status_code",statusCode+"");
    }

    /**
     * 获取节点
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String nodeId = request.getParameter("id");
        Node node = service.getNode(Integer.valueOf(nodeId));
        WebUtil.renderJson(response,node);
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
