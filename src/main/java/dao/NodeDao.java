package dao;

import pojo.Node;

/**
 * node的dao层接口
 * @author yohoyes
 */
public interface NodeDao extends BaseDao<Node>{
    /**
     * 查询子节点
     * @return
     */
    int[] selectChildren(int id);
}
