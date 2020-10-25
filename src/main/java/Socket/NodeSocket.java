package Socket;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint(value="/websocketTest/{userId}")
public class NodeSocket {
    private String userId;

    @OnOpen
    public void onOpen(@PathParam("userId") String userId, Session session) throws IOException {
        this.userId = userId;
    }

    @OnClose
    public void onClose(){
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println(this.userId);
        //回复用户
        session.getBasicRemote().sendText("收到 "+this.userId+" 的消息 ");
    }

    @OnError
    public void onError(Session session, Throwable error){
        error.printStackTrace();
    }

}
