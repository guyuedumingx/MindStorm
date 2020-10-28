package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.util.WebUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;
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
    Logger logger = LoggerFactory.getLogger(AvatarController.class);
    private static final long serialVersionUID = 1L;
    String resPath = "";
    UserService service = new UserServiceImpl();
    User user = null;

    @Override
    protected void before(HttpServletRequest req, HttpServletResponse resp) {
        //获取用户id
        HttpSession session = req.getSession();
        user = (User)session.getAttribute("user");
        resPath = getServletContext().getRealPath("/img/avatar");
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
            long size = file.getSize();

            if((size/1024/1024/8)>2){
               result.setStatus_code(StatusCode.ERROR);
               WebUtil.renderJson(response,result);
                return;
            }
            delPreviousAvatar();
            String[] split = name.split("\\.");
            filePath =user.getId()+"."+split[split.length-1];
            writeTo(resPath+"/"+filePath,in);
            file.delete();
            result.setStatus_code(StatusCode.OK);
        }catch (Exception e) {
            result.setStatus_code(StatusCode.LOST);
            logger.error(e.getMessage());
        }
        String urlPath = "/img/avatar/"+filePath+"?ran="+Math.random();
        user.setUserAvatar(urlPath);
        service.updateUser(user);
        Cookie userAvatar = new Cookie("user_avatar", user.getUserAvatar());
        response.addCookie(userAvatar);
        result.put("url",urlPath);
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

    private void delPreviousAvatar(){
        String avatar = user.getUserAvatar();
        String[] split = avatar.split("\\?");
        if(!split[0].contains("default")){
            File file = new File(resPath+"/"+split[0]);
            file.delete();
        }
    }
}
