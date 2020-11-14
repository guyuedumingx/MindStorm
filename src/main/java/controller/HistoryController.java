package controller;

import common.container.history.History;
import common.container.history.HistoryNode;
import common.dto.Result;
import common.dto.StatusCode;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author yohoyes
 */
@WebServlet("/history")
public class HistoryController extends BaseController {
    Logger logger = LoggerFactory.getLogger(HistoryController.class);
    Map<Integer,History> historyMap = null;
    History history = null;
    int projectId;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession();
        historyMap = (Map<Integer,History>) session.getAttribute("history");
        projectId = (Integer)session.getAttribute("projectId");
        history = historyMap.get(projectId);
    }

    /**
     * 撤销操作
     * index是撤销到第几步
     * 如果index为空则撤销最后一步
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String index = req.getParameter("index");

        Result result = new Result();
        if(index==null||"".equals(index)){
            history.back();
        }else {
            try {
                int back = history.back(Integer.valueOf(index));
                if(back==0){
                    result.setStatus_code(StatusCode.LOST);
                }else {
                    result.setStatus_code(StatusCode.OK);
                    result.put("node_id",back);
                }
            }catch (NumberFormatException e){
                result.setStatus_code(StatusCode.ERROR);
                logger.error(e.getMessage());
            }
            WebUtil.renderJson(resp,result);
        }
        HttpSession session = req.getSession();
        historyMap.remove(projectId);
        historyMap.put(projectId,history);
        session.setAttribute("history", historyMap);
    }

    /**
     * 获取历史记录信息
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<HistoryNode> historyList = history.getHistoryList();
        WebUtil.renderJson(resp,historyList);
    }
}
