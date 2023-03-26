package controller;

import common.dto.Result;
import common.dto.StatusCode;
import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import common.util.WebUtil;
import dao.auxiliary.impl.StarDaoImpl;
import pojo.User;
import pojo.auxiliary.Star;
import service.UserService;
import service.impl.UserServiceImpl;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 负责其他请求
 * @author yohoyes
 */
@WebServlet("/util")
public class UtilController extends BaseController {
   User user = null;

   @Override
   protected void before(HttpServletRequest req, HttpServletResponse resp) {
      //获取用户id
      HttpSession session = req.getSession();
      user = (User)session.getAttribute("user");
   }

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
//      int statusCode = EmailUtil.send(sendFor,email, code);
      Result result = new Result();
      result.setStatus_code(StatusCode.OK);
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

   /**
    * 点赞
    * @param req
    * @param resp
    * @throws ServletException
    * @throws IOException
    */
   @Override
   protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      Result result = new Result();
      int nodeId =Integer.valueOf(req.getParameter("nodeId"));
      StarDaoImpl starDao = new StarDaoImpl();
      Star star = new Star(user.getId(), nodeId);
      Star res = starDao.selectOne(star);
      result.setStatus_code(StatusCode.LOST);
      if(res!=null){
         int i = starDao.deleteOne(star);
         if(i!=0) {
             result.setStatus_code(StatusCode.OK);
         }
      }else {
         starDao.insertOne(star);
         result.setStatus_code(StatusCode.OK);
      }
      WebUtil.renderJson(resp,result);
   }
}
