package controller;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 * Controller的公有父类
 * @author yohoyes
 */
@MultipartConfig
public class BaseController extends HttpServlet {

    protected void before(HttpServletRequest req, HttpServletResponse resp){
    }

    protected void after(HttpServletRequest req, HttpServletResponse resp) {
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			
        before(req,resp);
        super.service(req, resp);
        after(req,resp);
    }
}
