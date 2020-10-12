package service.impl;

import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.NodeDao;
import dao.ProjectDao;
import pojo.Node;
import pojo.Project;
import service.NodeService;

import java.sql.SQLException;

public class NodeServiceImpl implements NodeService {
    NodeDao nodeDao = DaoFactory.getNodeDao();
    ProjectDao projectDao = DaoFactory.getProjectDao();
    @Override
    public int newNode(Node node) {
        return nodeDao.insertOne(node);
    }

    @Override
    public int delNode(int nodeId, int operatorId) {
        Node node = nodeDao.selectOne(new Node(nodeId));
        Project project = projectDao.selectOne(new Project(node.getProjectId()));
        //如果是作者本人或者项目作者,则可以删除节点
        if(node.getAuthor()==operatorId || project.getAuthor()==operatorId){
            nodeDao.deleteOne(nodeId);
            return StatusCode.OK;
        }
        return StatusCode.ERROR;
    }

    @Override
    public int chNode(Node node) {
        if(node.isEditable()) {
            int i = nodeDao.updateOne(node);
            return i==0 ? StatusCode.ERROR : StatusCode.OK;
        }
        return StatusCode.ERROR;
    }

    @Override
    public Node getNode(int nodeId) {
        return null;
    }
}
