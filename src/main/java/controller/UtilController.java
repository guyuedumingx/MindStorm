package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import common.util.WebUtil;
import pojo.User;
import service.UserService;
import service.impl.UserServiceImpl;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责其他请求
 * @author yohoyes
 */
@WebServlet("/util")
public class UtilController extends BaseController {

   /**
    * 发送邮件
    * @param request
    * @param response
    * @throws IOException
    */
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String code = AuthCodeUtil.getAuthCodeUtil();
      String email = request.getParameter("email");
      String sendFor = request.getParameter("sendFor");
      int statusCode = EmailUtil.send(sendFor,email, code);

      Result result = new Result();
      result.setStatus_code(statusCode);
      result.put("auth_code",code);
      WebUtil.renderJson(response,result);
   }

   /**
    * 查看邮箱是否存在
    * @param request
    * @param response
    * @throws IOException
    */
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String email = request.getParameter("email");
      UserService service = new UserServiceImpl();
      User user = service.getUser(email);
      int i = StatusCode.nullObjcet(user);
      WebUtil.renderMap(response,"exist_code",i+"");
   }
}
