package common.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 登录验证过滤器
 * @author yohoyes
 */
@WebFilter("*.html")
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    /**
     * 除了前端资源,登录界面,邮箱发送外,
     * 用户在未登录状态下不能进入其他界面
     * 如果检测到Session中的user参数是null
     * 则证明用户未登录
     * 将自动跳转到登录界面
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        Object user = request.getSession().getAttribute("user");
        String uri = request.getRequestURI();
        if(uri.contains("newHand")||uri.contains("login")){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            if(user!=null) {
                filterChain.doFilter(servletRequest, servletResponse);
            }else {
                request.getRequestDispatcher("login.html").forward(servletRequest, servletResponse);
            }
        }
    }

    @Override
    public void destroy() {

    }
}
