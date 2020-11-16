package socket;

import common.dto.OperaType;
import common.dto.Result;
import common.util.RedisUtil;
import common.util.SerializeUtil;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;


@ServerEndpoint(value="/node/socket/{userId}/{projectId}")
public class NodeSocket {
    static Logger logger = LoggerFactory.getLogger(NodeSocket.class);
    String projectId;
    String userId;

    @OnOpen
    public void onOpen(@PathParam("userId") String userId,@PathParam("projectId") String projectId, Session session) throws IOException {
        this.projectId = projectId;
        this.userId = userId;
        int uid =Integer.valueOf(userId);
        int pid = Integer.valueOf(projectId);
        NodeSession nodeSession = new NodeSession(session, uid, pid);
//        OnlineUsers.add(nodeSession);
        Jedis jedis = RedisUtil.getJedis();
        jedis.set(userId.getBytes(), SerializeUtil.serialize(nodeSession));
        jedis.sadd(projectId.getBytes(),userId.getBytes());
    }

    @OnClose
    public void onClose(){
//        OnlineUsers.remove(this);
        Jedis jedis = RedisUtil.getJedis();
        jedis.srem((projectId+"").getBytes(),(userId+"").getBytes());
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
        WebUtil.renderJson(session,result);
    }

    @OnError
    public void onError(Session session, Throwable error){
        logger.error(error.getLocalizedMessage());
    }
}
