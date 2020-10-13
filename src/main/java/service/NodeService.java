package service;

import pojo.Node;

/**
 * 节点service
 */
public interface NodeService {
    /**
     * 新建节点
     * @param node
     */
    public int newNode(Node node);

    /**
     * 删除节点
     * @param nodeId
     */
    public int delNode(int nodeId,int operatorId);

    /**
     * 修改节点
     * @param node
     */
    public int chNode(Node node);

    /**
     * 获取节点
     * @param nodeId
     * @return
     */
    public Node getNode(int nodeId);
}
