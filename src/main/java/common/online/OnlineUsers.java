package common.online;

import socket.NodeSocket;

import javax.websocket.Session;
import java.util.*;

/**
 * 在线用户列表
 * @author yohoyes
 */
public class OnlineUsers {

    private static OnlineUsers list = new OnlineUsers();
    //projectId,Set<userId>
    private Map<Integer, Set<Integer>> projectMap = new HashMap<>();
    //userId,NodeSocket
    private Map<Integer,NodeSocket> socketMap = new HashMap<>();

    private OnlineUsers(){}

    public void add(NodeSocket socket){
        int projectId = socket.getProjectId();
        Set<Integer> set = null;
        if(projectMap.containsKey(projectId)){
            set = projectMap.get(projectId);
        }else {
            set = new HashSet<>();
        }
        set.add(socket.getUserId());
        if(socketMap.containsKey(socket.getUserId())){
            socketMap.remove(socket.getUserId());
        }
        socketMap.put(socket.getUserId(),socket);
    }

    public void remove(NodeSocket socket){
        int projectId = socket.getProjectId();
        int userId = socket.getUserId();
        if(projectMap.containsKey(projectId)){
            Set<Integer> set = projectMap.get(projectId);
            set.remove(userId);
            if(socketMap.containsKey(userId)){
                socketMap.remove(userId);
            }
        }
    }

    public NodeSocket get(int userId){
        return socketMap.get(userId);
    }

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
