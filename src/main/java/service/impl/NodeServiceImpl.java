package service.impl;


import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.NodeDao;
import dao.ProjectDao;
import dao.auxiliary.impl.StarDaoImpl;
import pojo.Node;
import pojo.Project;
import pojo.auxiliary.Star;
import service.NodeService;

public class NodeServiceImpl implements NodeService {
    NodeDao nodeDao = DaoFactory.getNodeDao();
    ProjectDao projectDao = DaoFactory.getProjectDao();
    StarDaoImpl starDao = DaoFactory.getStarDao();

    @Override
    public int newNode(Node node) {
        return nodeDao.insertOne(node);
    }

    @Override
    public int delNode(int nodeId, int operatorId) {
        Node node = nodeDao.selectOne(new Node(nodeId));
        //如果存在字节点,不能删除
        if(node.getChildren()!=null && node.getChildren().length!=0){
            return StatusCode.LOST;
        }
        Project project = projectDao.selectOne(new Project(node.getProjectId()));
        //如果是作者本人或者项目作者,则可以删除节点
        if(node.getAuthor()==operatorId || project.getAuthor()==operatorId){
            nodeDao.deleteOne(nodeId);
            return StatusCode.OK;
        }
        return StatusCode.LOST;
    }

    @Override
    public int chNode(Node node) {
        int i = nodeDao.updateOne(node);
        return i==0 ? StatusCode.LOST : StatusCode.OK;
    }

    @Override
    public Node getNode(int nodeId,int userId) {
        Node node = nodeDao.selectOne(new Node(nodeId));
        Star star = starDao.selectOne(new Star(userId,nodeId));
        if(star!=null){
            node.setStared(true);
        }else {
            node.setStared(false);
        }
        int[] children = nodeDao.selectChildren(nodeId);
        node.setChildren(children);
        return node;
    }
}
