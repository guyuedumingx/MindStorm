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
    public void newNode(Node node);

    /**
     * 删除节点
     * @param nodeId
     */
    public void delNode(int nodeId);

    /**
     * 修改节点
     * @param node
     */
    public void chNode(Node node);

    /**
     * 获取节点
     * @param nodeId
     * @return
     */
    public Node getNode(int nodeId);
}
