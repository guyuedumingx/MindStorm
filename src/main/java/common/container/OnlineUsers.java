package common.container;

import socket.NodeSocket;

import java.util.*;

/**
 * 在线用户列表
 * @author yohoyes
 */
public class OnlineUsers {

    private static OnlineUsers list = new OnlineUsers();
    //projectId,Set<userId>
    private Map<Integer, Set<Integer>> projectMap = null;
    //userId,NodeSocket
    private Map<Integer,NodeSocket> socketMap = null;

    private OnlineUsers(){
        this.projectMap = new HashMap<>();
        this.socketMap = new HashMap<>();
    }

    public void add(NodeSocket socket){
        int projectId = socket.getProjectId();
        Set<Integer> set = null;
        if(this.projectMap.containsKey(projectId)){
            set = this.projectMap.get(projectId);
        }else {
            set = new HashSet<>();
        }
        set.add(socket.getUserId());
        if(this.socketMap.containsKey(socket.getUserId())){
            this.socketMap.remove(socket.getUserId());
        }
        this.projectMap.put(projectId,set);
        this.socketMap.put(socket.getUserId(),socket);
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
