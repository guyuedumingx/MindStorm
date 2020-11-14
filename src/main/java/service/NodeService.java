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
    int newNode(Node node);

    /**
     * 删除节点
     * @param nodeId
     */
    int delNode(int nodeId,int operatorId);

    /**
     * 修改节点
     * @param node
     */
    int chNode(Node node);

    /**
     * 获取节点
     * @param nodeId
     * @return
     */
    Node getNode(int nodeId, int userId);

    /**
     * 更新节点id
     * @param preId
     * @param afterId
     * @return
     */
    int updateId(int preId, int afterId);
}
