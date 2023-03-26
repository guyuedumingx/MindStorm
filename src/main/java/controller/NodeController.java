package controller;

import common.container.history.History;
import common.dto.OperaType;
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
import java.util.Map;

import static socket.NodeSocket.renderForContributors;

/**
 * 负责处理有关于节点的请求
 * @author yohoyes
 */
@WebServlet("/node")
public class NodeController extends BaseController{
    User user = null;
    NodeService service = new NodeServiceImpl();
    SensitiveWordUtil filter = SensitiveWordUtil.getInstance();
    History history = null;
    int projectId;
    Map<Integer,History> historyMap = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
        historyMap = (Map<Integer,History>) session.getAttribute("history");
        projectId = (Integer) session.getAttribute("projectId");
        history = historyMap.get(projectId);
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
        msg.setChangeType(OperaType.CREATE);
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
            history.addNewNodeHistory(nodeId);
        }else {
            result.setStatus_code(StatusCode.LOST);
        }

        renderForContributors(user,msg);
        WebUtil.renderJson(resp,result);
        afterOpera(req);
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
        msg.setChangeType(OperaType.DELETE);
        int nodeId =Integer.valueOf(request.getParameter("nodeId"));
        Node node = service.getNode(nodeId, user.getId());
        int statusCode = service.delNode(nodeId, user.getId());
        WebUtil.renderMap(response,"status_code",statusCode+"");
        if(StatusCode.OK==statusCode){
            msg.setChangeId(nodeId);
            history.addDelNodeHistory(node);
            renderForContributors(user,msg);
        }
        afterOpera(request);
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
        msg.setChangeType(OperaType.UPDATE);
        Node node = initNode(request);
        Node historyNode = service.getNode(node.getId(), user.getId());
        int id = service.chNode(node);
        int statusCode = StatusCode.isZero(id);
        WebUtil.renderMap(response,"status_code",statusCode+"");
        if(StatusCode.OK==statusCode){
            msg.setChangeId(node.getId());
            history.addUpdateNodeHistory(historyNode);
            renderForContributors(user,msg);
        }
        afterOpera(request);
    }

    private Node initNode(HttpServletRequest request) {
        String idStr = request.getParameter("id");
        int id = Integer.valueOf(idStr);
        String theme = request.getParameter("theme");
        String content = request.getParameter("content");
        //敏感词过滤
        theme = filter.replaceSensitiveWord(theme,1,"*");
        content = filter.replaceSensitiveWord(content,1,"*");
        boolean banAppend = Boolean.valueOf(request.getParameter("banAppend"));
        int projectId = Integer.valueOf(request.getParameter("projectId"));
        Node node = new Node();
        node.setId(id);
        node.setTheme(theme);
        node.setContent(content);
        node.setBanAppend(banAppend);
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
        Node node = service.getNode(Integer.valueOf(nodeId),user.getId());
        WebUtil.renderJson(response,node);
    }

    protected void afterOpera(HttpServletRequest req) {
        HttpSession session = req.getSession();
        historyMap.remove(projectId);
        historyMap.put(projectId,history);
        session.setAttribute("history", historyMap);
    }

}
