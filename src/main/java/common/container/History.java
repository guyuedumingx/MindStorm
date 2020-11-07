package common.container;

import common.dto.OperaType;
import pojo.Node;
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
                add(OperaType.CREATE,new Node(nodeId));
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
            Node operaNode = pop.getOperaNode();
            int back = 0;
            if(OperaType.CREATE.equals(pop.getOperaType())){
                back = service.delNode(operaNode.getId(), operaNode.getAuthor());
            }else if(OperaType.UPDATE.equals(pop.getOperaType())){
                back = service.chNode(operaNode);
            }else if(OperaType.DELETE.equals(pop.getOperaType())){
                back = service.newNode(operaNode);
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

    public  List<String> getHistoryTypeList(){
        Iterator<HistoryNode> iterator = list.iterator();
        List<String> back = new ArrayList<>();
        while (iterator.hasNext()){
            back.add(iterator.next().getOperaType());
        }
        return back;
    }
}

class HistoryNode{
    private String operaType;
    private Node operaNode;

    public HistoryNode(String operaType, Node operaNode){
        this.operaNode = operaNode;
        this.operaType = operaType;
    }

    public String getOperaType() {
        return operaType;
    }

    public Node getOperaNode() {
        return operaNode;
    }
}
