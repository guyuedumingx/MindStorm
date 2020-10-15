package controller;

import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.*;
import java.io.*;

/**
 * 负责用户头像
 * @author yohoyes
 */
@MultipartConfig
@WebServlet("/user/avatar")
public class AvatarController extends BaseController {
    private static final long serialVersionUID = 1L;

    /**
     * 设置头像
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Part part = request.getPart("image");
        String fileName = getFileName(part);
        String realPath = request.getSession().getServletContext().getRealPath("")+"img/";
        mkDir(realPath);
        writeTo(realPath+fileName,part);
        UserService service = new UserServiceImpl();
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        service.setUserImage(user.getUser_id(),fileName);
        session.setAttribute("user",service.getUser(user.getUser_id()));
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
    private String getFileName(Part part) {
        String head = part.getHeader("Content-Disposition");
        String fileName = head.substring(head.indexOf("filename=\"") + 10, head.lastIndexOf("\""));
        return fileName;
    }
    private void writeTo(String fileName, Part part)throws IOException {
        InputStream in = part.getInputStream();
        OutputStream out = new FileOutputStream(fileName);
        byte[] b = new byte[1024];
        int length = -1;
        while((length = in.read(b))!=-1) {
            out.write(b, 0, length);
        }
        in.close();
        out.close();
    }
    private void mkDir(String path){
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
    }
}

