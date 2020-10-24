package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.util.WebUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import pojo.User;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.List;

/**
 * 负责用户头像
 * @author yohoyes
 */
@WebServlet("/user/avatar")
@MultipartConfig
public class AvatarController extends BaseController {
    private static final long serialVersionUID = 1L;
    User user = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
    }

    /**
     * 设置头像
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Result result = new Result();
        request.setCharacterEncoding("UTf-8");
        String resPath = getServletContext().getRealPath("/avatar");
        String filePath = "";

        //检查我们是否有文件上传请求
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        DiskFileItemFactory disk = new DiskFileItemFactory(1024*10,new File(resPath));
        ServletFileUpload up = new ServletFileUpload(disk);

        try {
            List<FileItem> list = up.parseRequest(request);
            FileItem file = list.get(0);
            InputStream in = file.getInputStream();
            String name = file.getName();
            String[] split = name.split("\\.");
            filePath =user.getId()+"."+split[split.length-1];
            writeTo(resPath+"/"+filePath,in);
            result.setStatus_code(StatusCode.OK);
        }catch (Exception e) {
            result.setStatus_code(StatusCode.LOST);
            e.printStackTrace();
        }
        result.put("url","/avatar/"+filePath);
        WebUtil.renderJson(response,result);
    }

    /**
     * 获取头像
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doPost(request, response);
    }

    private void writeTo(String fileName, InputStream in)throws IOException {
        OutputStream out = new FileOutputStream(fileName);
        byte[] b = new byte[1024];
        int length = -1;
        while((length = in.read(b))!=-1) {
            out.write(b, 0, length);
        }
        in.close();
        out.close();
    }
}

