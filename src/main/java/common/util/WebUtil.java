package common.util;

import com.alibaba.fastjson.JSON;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * 与前端交互的工具类
 * @author yohoyes
 */
public class WebUtil {
    enum RenderType {
        //解析成json格式
        JSON,
        //解析成text格式
        TEXT,
    }

    /**
     * 渲染json
     * @param resp
     * @param object
     */
    public static void renderJson(HttpServletResponse resp, Object object) {
        setResponseType(RenderType.JSON,resp);
        try {
            String s = JSON.toJSONString(object);
            resp.getWriter().write(s);
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 渲染String
     * @param resp
     * @param text
     */
    public static void renderText(HttpServletResponse resp, String text) {
        setResponseType(RenderType.TEXT, resp);
        try{
            resp.getWriter().write(text);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 设置返回值类型
     * @param type
     * @param resp
     */
    public static void setResponseType(RenderType type,HttpServletResponse resp) {
       switch (type) {
           case JSON:
               resp.setContentType("application/json; charset=UTF-8");
               break;
           case TEXT:
               resp.setContentType("text/html; charset=UTF-8");
               break;
       }
       resp.setStatus(200);
    }

    /**
     * 从request读入对象
     * @param request
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T getJson(HttpServletRequest request, Class<T> clazz) {
        try {
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
            StringBuilder responseStrBuilder = new StringBuilder();
            String inputStr;
            while ((inputStr = streamReader.readLine()) != null) {
                responseStrBuilder.append(inputStr);
            }
            return JSON.parseObject(responseStrBuilder.toString(), clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
