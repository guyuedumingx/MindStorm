package common.container;

import socket.NodeSocket;

import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 在线用户列表
 * @author yohoyes
 */
public class OnlineUsers {

    private static OnlineUsers list = new OnlineUsers();
    /**
     * projectId,Set<userId>
     * 每个项目的id对应着在线并处于该项目中的用户的set
     */
    private Map<Integer, Set<Integer>> projectMap = null;
    /**
     *userId,NodeSocket
     * 每个用户id对应着用户的websocket
     */
    private Map<Integer,NodeSocket> socketMap = null;

    private Lock lock = new ReentrantLock();

    /**
     * 单例
     */
    private OnlineUsers(){
        this.projectMap = new HashMap<>();
        this.socketMap = new HashMap<>();
    }

    /**
     * 有用户进入项目,websocket初始化的时候就把用户加进来
     * @param socket
     */
    public void add(NodeSocket socket){
        lock.lock();
        try {
            int projectId = socket.getProjectId();
            Set<Integer> set = null;
            if (this.projectMap.containsKey(projectId)) {
                set = this.projectMap.get(projectId);
            } else {
                set = new HashSet<>();
            }
            set.add(socket.getUserId());
            if (this.socketMap.containsKey(socket.getUserId())) {
                this.socketMap.remove(socket.getUserId());
            }
            this.projectMap.put(projectId, set);
            this.socketMap.put(socket.getUserId(), socket);
        }finally {
            lock.unlock();
        }
    }

    /**
     * 在用户离开项目界面的时候移除websocket
     * @param socket
     */
    public void remove(NodeSocket socket){
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
    public NodeSocket get(int userId){
        return socketMap.get(userId);
    }

    /**
     * 根据传入的projectId把在线处在这个项目中的用户websocket返回
     * @param projectId
     * @return
     */
    public List<NodeSocket> getSocketForProject(int projectId){
        List<NodeSocket> sockets = new ArrayList<>();
        if(projectMap.containsKey(projectId)){
            Set<Integer> set = projectMap.get(projectId);
            Iterator<Integer> iterator = set.iterator();
            while (iterator.hasNext()){
                sockets.add(socketMap.get(iterator.next()));
            }
        }
        return sockets;
    }

    public static OnlineUsers getOnlineUsers(){
        return list;
    }
}
