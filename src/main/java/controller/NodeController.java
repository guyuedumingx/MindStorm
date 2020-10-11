package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.factory.DaoFactory;
import common.util.WebUtil;
import dao.NodeDao;
import pojo.Node;
import service.NodeService;
import service.impl.NodeServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * 负责处理有关于节点的请求
 * @author yohoyes
 */
@WebServlet("/node")
public class NodeController extends BaseController{

    /**
     * 新建节点
     * @param req
     * @param resp
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Node node = WebUtil.getJson(req, Node.class);
        NodeService service = new NodeServiceImpl();
        int id = service.newNode(node);
        int statusCode = StatusCode.isZero(id);
        Result result = new Result();
        result.put("node_id",id);
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

    }

    /**
     * 修改节点信息
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    /**
     * 获取节点
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

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
