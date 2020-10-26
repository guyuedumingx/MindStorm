package controller;

import com.mysql.cj.exceptions.ClosedOnExpiredPasswordException;
import common.dto.Result;
import common.dto.StatusCode;
import common.util.WebUtil;
import common.util.XmindUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@WebServlet("/util/xmind")
public class XmindController extends BaseController {
    Logger logger = LoggerFactory.getLogger(XmindController.class);
    User user = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
        try {
            if (user == null) {
                req.getRequestDispatcher("login.html").forward(req, resp);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }

    /**
     * 下载xmind文件
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Integer projectId = Integer.valueOf(req.getParameter("project_id"));
        XmindUtil.write(projectId,resp);
    }

    /**
     * 上传xmind文件
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Result result = new Result();
        req.setCharacterEncoding("UTf-8");
        String tmpPath = getServletContext().getRealPath("/tmp");

        //检查我们是否有文件上传请求
        boolean isMultipart = ServletFileUpload.isMultipartContent(req);
        DiskFileItemFactory disk = new DiskFileItemFactory(1024*10,new File(tmpPath));
        ServletFileUpload up = new ServletFileUpload(disk);

        try {
            List<FileItem> list = up.parseRequest(req);
            FileItem file = list.get(0);
            InputStream in = file.getInputStream();
            int projectId = XmindUtil.getWorkBook(in,user);
            result.setStatus_code(StatusCode.OK);
            result.put("project_id",projectId+"");
            WebUtil.renderJson(resp,result);
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}
