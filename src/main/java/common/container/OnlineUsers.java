package common.container;

import socket.NodeSocket;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 在线用户列表
 * @author yohoyes
 */
public class OnlineUsers {

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
    private static Map<Integer,NodeSocket> socketMap = new ConcurrentHashMap<>();

    /**
     * 单例
     */
    private OnlineUsers(){
    }

    /**
     * 有用户进入项目,websocket初始化的时候就把用户加进来
     * @param socket
     */
    public static void add(NodeSocket socket){
//        lock.lock();
//        try {
//            int projectId = socket.getProjectId();
//            Set<Integer> set = null;
//            if (projectMap.containsKey(projectId)) {
//                set = projectMap.get(projectId);
//            } else {
//                set = new HashSet<>();
//            }
//            set.add(socket.getUserId());
//            if (socketMap.containsKey(socket.getUserId())) {
//                socketMap.remove(socket.getUserId());
//            }
//            projectMap.put(projectId, set);
//            socketMap.put(socket.getUserId(), socket);
//        }finally {
//            lock.unlock();
//        }
    }

    /**
     * 在用户离开项目界面的时候移除websocket
     * @param socket
     */
    public static void remove(NodeSocket socket){
//        lock.lock();
//        try {
//            int projectId = socket.getProjectId();
//            int userId = socket.getUserId();
//            if (projectMap.containsKey(projectId)) {
//                Set<Integer> set = projectMap.get(projectId);
//                set.remove(userId);
//                if (socketMap.containsKey(userId)) {
//                    socketMap.remove(userId);
//                }
//            }
//        }finally {
//            lock.unlock();
//        }
    }

    /**
     * 根据userId获取用户的websocket
     * @param userId
     * @return
     */
    public static NodeSocket get(int userId){
        return socketMap.get(userId);
    }

    /**
     * 根据传入的projectId把在线处在这个项目中的用户websocket返回
     * @param projectId
     * @return
     */
    public static List<NodeSocket> getSocketForProject(int projectId){
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
}
