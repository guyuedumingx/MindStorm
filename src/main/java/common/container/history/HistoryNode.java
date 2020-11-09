package common.container.history;

import pojo.Node;

/**
 * 历史记录节点
 * @author yohoyes
 */
public class HistoryNode{
    private String operaType;
    private Node node;
    private Node after;

    public HistoryNode(String operaType, Node before){
        this.node = before;
        this.operaType = operaType;
    }

    public String getOperaType() {
        return operaType;
    }

    public Node getNode() {
        return node;
    }

    public void setNode(Node node){
        this.node = node;
    }

    public Node getAfter() {
        return after;
    }

    public void setAfter(Node after) {
        this.after = after;
    }
}
