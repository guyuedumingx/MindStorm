package common.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 登录验证
 * @author yohoyes
 */
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        Object user = request.getSession().getAttribute("user");
        String uri = request.getRequestURI();
        System.out.println(uri);
        if("/".equals(uri)||uri.contains("/index.html")||uri.contains("/user/register")||uri.contains("/login.html")||uri.contains("/user/login")||
        uri.contains("/css/")||uri.contains("/img/")||uri.contains("/js/")||uri.contains("/util")){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            if(user!=null) {
                System.out.println("放行");
                filterChain.doFilter(servletRequest, servletResponse);
            }else {
                System.out.println("不放行");
                request.getRequestDispatcher("login.html").forward(servletRequest, servletResponse);
            }
        }
    }

    @Override
    public void destroy() {

    }
}
