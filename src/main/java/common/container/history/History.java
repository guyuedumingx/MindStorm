package common.container.history;

import com.alibaba.druid.sql.ast.statement.SQLForeignKeyImpl;
import common.container.OnlineUsers;
import common.dto.OperaType;
import common.dto.Result;
import common.util.WebUtil;
import pojo.Node;
import pojo.User;
import service.NodeService;
import service.impl.NodeServiceImpl;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static socket.NodeSocket.renderForContributors;

/**
 * 保存用户的历史记录
 * @author yohoyes
 */
public class History {
    List<HistoryNode> list = new ArrayList<>();
    NodeService service = new NodeServiceImpl();
    int projectId;
    User user = null;

    public History(User user, int projectId){
        this.user = user;
        this.projectId = projectId;
    }

    /**
     * 添加历史记录
     * 历史记录只保存20条
     * @param type
     * @param node
     */
    public void add(String type,Node node){
        HistoryNode historyNode = new HistoryNode(type, node);
        if(list.size()>=20){
            list.remove(0);
        }
        list.add(historyNode);
    }

    public void addNewNodeHistory(int nodeId) {
        add(OperaType.CREATE, service.getNode(nodeId, user.getId()));
    }

    public void addDelNodeHistory(Node node){
        add(OperaType.DELETE,node);
    }

    public void addUpdateNodeHistory(Node node){
        add(OperaType.UPDATE,node);
    }

    /**
     * 操作失败返回0
     * 撤销新建返回200
     * 撤销删除和修改返回nodeId
     * @return
     */
    public int back(int index){
        if(!list.isEmpty()){
            HistoryNode pop = list.remove(index);
            Node operaNode = pop.getNode();
            Result msg = new Result();
            msg.setChangeId(operaNode.getId());
            int back = 0;
            if(OperaType.CREATE.equals(pop.getOperaType())){
                msg.setChangeType(OperaType.DELETE);
                Node parent = service.getNode(operaNode.getParentId(), user.getId());
                if(parent!=null){
                    service.delNode(operaNode.getId(), operaNode.getAuthor());

                    back = operaNode.getId();
                }
            }else if(OperaType.UPDATE.equals(pop.getOperaType())){
                msg.setChangeType(OperaType.UPDATE);
                back = service.chNode(operaNode);
                if(back!=0){
                    back = operaNode.getId();
                }
            }else if(OperaType.DELETE.equals(pop.getOperaType())){
                msg.setChangeType(OperaType.CREATE);
                Node parent = service.getNode(operaNode.getParentId(), user.getId());
                if(parent!=null){
                    back = service.newNode(operaNode);
                    back = service.updateId(back,operaNode.getId());
                    if(back!=0){
                        back = operaNode.getId();
                    }
                }
            }
            if(back==0){
                list.add(pop);
            }
            renderForContributors(user,msg);
            return back;
        }
        //没有历史记录
        return 0;
    }

    /**
     * 撤销上一步操作
     * @return
     */
    public int back(){
       return this.back(list.size()-1);
    }

    public  List<HistoryNode> getHistoryList(){
        Iterator<HistoryNode> iterator = list.iterator();
        List<HistoryNode> historyNodeList = new ArrayList<>();
        while (iterator.hasNext()){
            HistoryNode next = iterator.next();
            if(OperaType.UPDATE.equals(next.getOperaType())){
                next.setAfter(service.getNode(next.getNode().getId(),user.getId()));
            }
            historyNodeList.add(next);
        }
        return historyNodeList;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
}

