package controller;

import common.util.WebUtil;
import common.util.XmindUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@WebServlet("/util/xmind")
public class XmindController extends BaseController {

    /**
     * 下载xmind文件
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Integer projectId = Integer.valueOf(req.getParameter("projectId"));
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
            int projectId = XmindUtil.getWorkBook(in);
            WebUtil.renderMap(resp, "project_id", projectId + "");
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
