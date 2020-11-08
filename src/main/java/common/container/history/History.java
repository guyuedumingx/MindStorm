package common.container.history;

import common.dto.OperaType;
import pojo.Node;
import pojo.User;
import service.NodeService;
import service.impl.NodeServiceImpl;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 保存用户的历史记录
 * @author yohoyes
 */
public class History {
    List<HistoryNode> list = new ArrayList<>();
    NodeService service = new NodeServiceImpl();
    User user = null;

    public History(User user){
        this.user = user;
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

    public void addNewNodeHistory(int nodeId){
        new Thread(new Runnable() {
            @Override
            public void run() {
                add(OperaType.CREATE,service.getNode(nodeId, user.getId()));
            }
        }).start();
    }

    public void addDelNodeHistory(Node node){
        add(OperaType.DELETE,node);
    }

    public void addUpdateNodeHistory(Node node){
        add(OperaType.UPDATE,node);
    }

    /**
     * 没有记录返回-1
     * 有记录操作失败返回0
     * 撤销新建返回200
     * 撤销删除和修改返回nodeId
     * @return
     */
    public int back(int index){
        if(!list.isEmpty()){
            HistoryNode pop = list.remove(index);
            Node operaNode = pop.getNode();
            int back = 0;
            if(OperaType.CREATE.equals(pop.getOperaType())){
                Node parent = service.getNode(operaNode.getParentId(), user.getId());
                if(parent!=null){
                    back = service.delNode(operaNode.getId(), operaNode.getAuthor());
                }
            }else if(OperaType.UPDATE.equals(pop.getOperaType())){
                back = service.chNode(operaNode);
            }else if(OperaType.DELETE.equals(pop.getOperaType())){
                Node parent = service.getNode(operaNode.getParentId(), user.getId());
                if(parent!=null){
                    back = service.newNode(operaNode);
                }
            }
            return back;
        }
        //没有历史记录
        return -1;
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
            }else if(OperaType.CREATE.equals(next.getOperaType())){
                next.setAfter(next.getNode());
                next.setNode(null);
            }
            historyNodeList.add(next);
        }
        return historyNodeList;
    }
}

