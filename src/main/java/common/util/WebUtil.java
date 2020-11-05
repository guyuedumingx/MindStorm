package common.util;

import com.alibaba.fastjson.JSON;
import common.dto.Result;
import common.dto.StatusCode;
import common.online.OnlineUsers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.User;
import socket.NodeSocket;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

/**
 * 与前端交互的工具类
 * @author yohoyes
 */
public class WebUtil {
    static Logger logger = LoggerFactory.getLogger(WebUtil.class);
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
            logger.error(e.getMessage());
        }
    }

    /**
     * 渲染json
     * @param session
     * @param object
     */
    public static void renderJson(Session session, Object object) {
        try {
            String s = JSON.toJSONString(object);
            session.getBasicRemote().getSendWriter().write(s);
        }catch (IOException e) {
            logger.error(e.getMessage());
        }
    }

    /**
     * 将更改发送给参与者
     * @param user
     * @param object
     */
    public static void renderForContributors(User user, Object object){
        int id = user.getId();
        OnlineUsers onlineUsers = OnlineUsers.getOnlineUsers();
        String s = JSON.toJSONString(object);
        int projectId = onlineUsers.get(id).getProjectId();
        List<NodeSocket> socketForProject = onlineUsers.getSocketForProject(projectId);
        for(NodeSocket socket : socketForProject){
            try {
                if(socket.getUserId()!=id){
                    logger.debug(s);
//                    socket.getSession().getBasicRemote().getSendWriter().write(s);
                    socket.getSession().getBasicRemote().sendText(s);
                }
            }catch (IOException e) {
                logger.error(e.getMessage());
            }
        }
    }

    /**
     * 渲染字符串
     * @param resp
     * @param key
     * @param value
     */
    public static void renderMap(HttpServletResponse resp, String key, String value) {
        Result result = new Result();
        result.put(key,value);
        renderJson(resp,result);
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
            logger.error(e.getMessage());
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
               resp.setContentType("application/json;charset=UTF-8");
               break;
           case TEXT:
               resp.setContentType("text/html;charset=UTF-8");
               break;
       }
       resp.setStatus(StatusCode.OK);
    }

    /**
     * 从request读入对象
     * @param request
     * @param <T>
     * @return
     */
    public static <T> T getJson(HttpServletRequest request, Class<T> clazz) throws IOException{
        BufferedReader streamReader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
        StringBuilder responseStrBuilder = new StringBuilder();
        String inputStr;
        while ((inputStr = streamReader.readLine()) != null) {
            responseStrBuilder.append(inputStr);
        }
        return JSON.parseObject(responseStrBuilder.toString(), clazz);
    }
}
