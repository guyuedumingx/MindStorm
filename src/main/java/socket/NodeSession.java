package socket;

import javax.websocket.Session;
import java.io.Serializable;

public class NodeSession implements Serializable {
    static final long serialVersionUID=1L;
    private int userId;
    private int projectId;
    private Session session;

    public NodeSession(){
    }

    public NodeSession(Session session,int userId, int projectId){
        this.session = session;
        this.projectId = projectId;
        this.userId = userId;
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
