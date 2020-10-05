package service.impl;

import common.factory.DaoFactory;
import dao.NodeDao;
import pojo.Node;
import service.NodeService;

import java.sql.SQLException;

public class NodeServiceImpl implements NodeService {
    @Override
    public int newNode(Node node) {
        NodeDao nodeDao = DaoFactory.getNodeDao();
        int id = 0;
        id = nodeDao.insertOne(node);
        return id;
    }

    @Override
    public void delNode(int nodeId) {

    }

    @Override
    public void chNode(Node node) {

    }

    @Override
    public Node getNode(int nodeId) {
        return null;
    }
}
