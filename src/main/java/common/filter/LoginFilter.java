package common.filter;

import javax.servlet.*;
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
        String uri = request.getRequestURI();
        if(uri.contains("/register.html")||uri.contains("/login.html")||uri.contains("/user/login")||
        uri.contains("/css/")||uri.contains("/img/")||uri.contains("/js/")||uri.contains("/util")){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            Object user = request.getSession().getAttribute("user");
            if(user!=null){
                filterChain.doFilter(servletRequest,servletResponse);
            }else {
                request.getRequestDispatcher("login.html").forward(servletRequest,servletResponse);
            }
        }
    }

    @Override
    public void destroy() {

    }
}
