package common.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Scanner;

/**
 * 敏感词汇过滤器
 * @author yohoyes
 */
@WebFilter("/*")
public class SensitiveWordsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        ServletRequest request = (ServletRequest)Proxy.newProxyInstance(servletRequest.getClass().getClassLoader(), servletRequest.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if(method.getName().equals("getParameter")){
                    String value = (String) method.invoke(servletRequest, args);
                }
                return null;
            }
        });
        filterChain.doFilter(request,servletResponse);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        ServletContext servletContext = filterConfig.getServletContext();
        String realPath = servletContext.getRealPath("/WEB-INF/classes/");
        Scanner scanner = new Scanner(realPath);
    }

    @Override
    public void destroy() {

    }
}
