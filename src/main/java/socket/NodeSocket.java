package socket;

import common.online.OnlineUsers;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint(value="/node/socket/{userId}/{projectId}")
public class NodeSocket {
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

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
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
