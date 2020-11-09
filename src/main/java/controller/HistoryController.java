package controller;

import common.container.history.History;
import common.container.history.HistoryNode;
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

/**
 * @author yohoyes
 */
@WebServlet("/history")
public class HistoryController extends BaseController {
    Logger logger = LoggerFactory.getLogger(HistoryController.class);
    History history = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession();
        history = (History) session.getAttribute("history");
    }

    @Override
    protected void after(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession();
        session.setAttribute("history",history);
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
        if(index==null||"".equals(index)){
            history.back();
        }else {
            try {
                history.back(Integer.valueOf(index));
            }catch (NumberFormatException e){
                logger.error(e.getMessage());
            }
        }
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
