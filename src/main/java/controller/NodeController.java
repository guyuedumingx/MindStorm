package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.util.SensitiveWordUtil;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * 负责处理有关于节点的请求
 * @author yohoyes
 */
@WebServlet("/node")
public class NodeController extends BaseController{
    Logger logger = LoggerFactory.getLogger(NodeController.class);
    User user = null;
    NodeService service = new NodeServiceImpl();
    SensitiveWordUtil filter = SensitiveWordUtil.getInstance();

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
    }

    /**
     * 添加节点
     * @param req
     * @param resp
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Result result = new Result();
        Result msg = new Result();
        msg.setChangeType("N");
        Node node = WebUtil.getJson(req, Node.class);
        //敏感词过滤
        node.setTheme(filter.replaceSensitiveWord(node.getTheme(), 0, "*"));
        node.setContent(filter.replaceSensitiveWord(node.getContent(), 0, "*"));

        if(node!=null){
            node.setAuthor(user.getId());
            node.setLastEditId(user.getId());
            node.setLastEditTime(System.currentTimeMillis()+"");
            int nodeId = service.newNode(node);
            int statusCode = StatusCode.isZero(nodeId);
            result.put("node_id",nodeId);
            result.setStatus_code(statusCode);
            msg.setChangeId(nodeId);
        }else {
            result.setStatus_code(StatusCode.LOST);
        }

        WebUtil.renderJson(resp,result);
//        WebUtil.renderForContributors(user,msg);
    }

    /**
     * 删除节点
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result msg = new Result();
        msg.setChangeType("D");
        int nodeId =Integer.valueOf(request.getParameter("nodeId"));
        int statusCode = service.delNode(nodeId, user.getId());
        WebUtil.renderMap(response,"status_code",statusCode+"");
        msg.setChangeId(nodeId);
//        WebUtil.renderForContributors(user,msg);
    }

    /**
     * 修改节点信息
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result msg = new Result();
        msg.setChangeType("U");
        Node node = initNode(request);
        int statusCode = service.chNode(node);
        WebUtil.renderMap(response,"status_code",statusCode+"");
        msg.setChangeId(node.getId());
//        WebUtil.renderForContributors(user,msg);
    }

    private Node initNode(HttpServletRequest request) {
        int id = Integer.valueOf(request.getParameter("id"));
        String theme = request.getParameter("theme");
        String content = request.getParameter("content");
        //敏感词过滤
        theme = filter.replaceSensitiveWord(theme,1,"*");
        content = filter.replaceSensitiveWord(content,1,"*");
        boolean editable = Boolean.valueOf(request.getParameter("editable"));
        int projectId = Integer.valueOf(request.getParameter("projectId"));
        Node node = new Node();
        node.setId(id);
        node.setTheme(theme);
        node.setContent(content);
        node.setBanAppend(editable);
        node.setProjectId(projectId);
        node.setLastEditId(user.getId());
        return node;
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
        logger.debug("请求的节点Id: "+nodeId);
        Node node = service.getNode(Integer.valueOf(nodeId),user.getId());
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
