package controller;

import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import common.util.WebUtil;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 负责其他请求
 * @author yohoyes
 */
@WebServlet("/util")
public class UtilController extends BaseController {

   public void registerEmail(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String code = AuthCodeUtil.getAuthCodeUtil();
      String email = request.getParameter("email");
      int statusCode = EmailUtil.sendRegisterEmail(email, code);
      Map<String,String> map = new HashMap<String, String>();
      map.put("status_code",statusCode+"");
      map.put("auth_code",code);
      WebUtil.renderJson(response,map);
   }
}
