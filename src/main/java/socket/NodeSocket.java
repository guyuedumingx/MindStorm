package socket;

import com.alibaba.fastjson.JSON;
import common.dto.OperaType;
import common.dto.Result;
import common.util.WebUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.User;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;


@ServerEndpoint(value="/node/socket/{userId}/{projectId}")
public class NodeSocket {
    static Logger logger = LoggerFactory.getLogger(NodeSocket.class);
    String projectId;
    String userId;
    NodeSession nodeSession;
    private static Lock lock = new ReentrantLock();

    /**
     * projectId,Set<userId>
     * 每个项目的id对应着在线并处于该项目中的用户的set
     */
    private static Map<Integer, Set<Integer>> projectMap = new ConcurrentHashMap<>();
    /**
     *userId,NodeSocket
     * 每个用户id对应着用户的websocket
     */
    private static Map<Integer,NodeSession> socketMap = new ConcurrentHashMap<>();

    /**
     * 有用户进入项目,websocket初始化的时候就把用户加进来
     * @param socket
     */
    public static void add(NodeSession socket){
        lock.lock();
        try {
            int projectId = socket.getProjectId();
            Set<Integer> set = null;
            if (projectMap.containsKey(projectId)) {
                set = projectMap.get(projectId);
            } else {
                set = new HashSet<>();
            }
            set.add(socket.getUserId());
            if (socketMap.containsKey(socket.getUserId())) {
                socketMap.remove(socket.getUserId());
            }
            projectMap.put(projectId, set);
            socketMap.put(socket.getUserId(), socket);
        }finally {
            lock.unlock();
        }
    }

    /**
     * 在用户离开项目界面的时候移除websocket
     * @param socket
     */
    public static void remove(NodeSession socket){
        lock.lock();
        try {
            int projectId = socket.getProjectId();
            int userId = socket.getUserId();
            if (projectMap.containsKey(projectId)) {
                Set<Integer> set = projectMap.get(projectId);
                set.remove(userId);
                if (socketMap.containsKey(userId)) {
                    socketMap.remove(userId);
                }
            }
        }finally {
            lock.unlock();
        }
    }

    /**
     * 根据userId获取用户的websocket
     * @param userId
     * @return
     */
    public static NodeSession get(int userId){
        return socketMap.get(userId);
    }

    /**
     * 根据传入的projectId把在线处在这个项目中的用户websocket返回
     * @param projectId
     * @return
     */
    public static List<NodeSession> getSocketForProject(int projectId){
        List<NodeSession> sockets = new ArrayList<>();
        if(projectMap.containsKey(projectId)){
            Set<Integer> set = projectMap.get(projectId);
            Iterator<Integer> iterator = set.iterator();
            while (iterator.hasNext()){
                sockets.add(socketMap.get(iterator.next()));
            }
        }
        return sockets;
    }

    @OnOpen
    public void onOpen(@PathParam("userId") String userId,@PathParam("projectId") String projectId, Session session) throws IOException {
        this.projectId = projectId;
        this.userId = userId;
        int uid =Integer.valueOf(userId);
        int pid = Integer.valueOf(projectId);
        nodeSession = new NodeSession(session, uid, pid);
        add(nodeSession);
    }

    @OnClose
    public void onClose(){
        remove(nodeSession);
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

    /**
     * 将更改发送给参与者
     * @param user
     * @param object
     */
    public static void renderForContributors(User user, Object object){
        int id = user.getId();
        String s = JSON.toJSONString(object);
        NodeSession uSocket = get(id);
        if (uSocket != null) {
            int projectId = uSocket.getProjectId();
            List<NodeSession> socketForProject = getSocketForProject(projectId);
            for (NodeSession socket : socketForProject) {
                try {
                    if (socket.getUserId() != id) {
                        socket.getSession().getBasicRemote().sendText(s);
                    }
                } catch (IOException e) {
                }
            }
        } else {
            logger.error("没有用户在线错误");
        }
    }
}
