package dao.impl;

import dao.BaseDaoImpl;
import dao.NodeDao;
import pojo.Node;


/**
 * @author yohoyes
 */
public class NodeDaoImpl extends BaseDaoImpl<Node> implements NodeDao {

    @Override
    public String getTableName() {
        return "t_node";
    }

    @Override
    public Node insertOne(Node object) {
        return null;
    }

    @Override
    public Node updateOne(Node object) {
        return null;
    }

    @Override
    public Node selectOne(Node object) {
        return null;
    }

    @Override
    public Node selectById(Node object) {
        return null;
    }

    @Override
    public Node selectById(int id) {
        return null;
    }
}
