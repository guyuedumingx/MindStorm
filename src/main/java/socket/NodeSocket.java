package socket;

import common.container.OnlineUsers;
import common.dto.OperaType;
import common.dto.Result;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;


@ServerEndpoint(value="/node/socket/{userId}/{projectId}")
public class NodeSocket {
    static Logger logger = LoggerFactory.getLogger(NodeSocket.class);
    private OnlineUsers onlineUsers = OnlineUsers.getOnlineUsers();
    private int userId;
    private int projectId;
    private Session session;

    @OnOpen
    public void onOpen(@PathParam("userId") String userId,@PathParam("projectId") String projectId, Session session) throws IOException {
        this.userId =Integer.valueOf(userId);
        this.projectId = Integer.valueOf(projectId);
        this.session = session;
        onlineUsers.add(this);
    }

    @OnClose
    public void onClose(){
        onlineUsers.remove(this);
    }

    /**
     * 正在编辑显示
     * @param message
     * @param session
     * @throws IOException
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        Result result = new Result();
        result.setChangeType(OperaType.EDITING);
        result.setChangeId(message);
//        WebUtil.renderJson(session,result);
//        logger.debug(message);
        session.getBasicRemote().sendText(message);
    }

    @OnError
    public void onError(Session session, Throwable error){
        error.printStackTrace();
    }

    public OnlineUsers getOnlineUsers() {
        return onlineUsers;
    }

    public void setOnlineUsers(OnlineUsers onlineUsers) {
        this.onlineUsers = onlineUsers;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
