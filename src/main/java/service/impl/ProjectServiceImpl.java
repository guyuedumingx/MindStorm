package service.impl;

import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.ProjectDao;
import pojo.Node;
import pojo.Project;
import service.ProjectService;

/**
 * 项目service层实现类
 * @author yohoyes
 */
public class ProjectServiceImpl implements ProjectService {
    ProjectDao projectDao = DaoFactory.getProjectDao();

    @Override
    public int newProject(Project project) {
        int projectId = projectDao.insertOne(project);
        if(projectId==0){
            return StatusCode.LOST;
        }else {
            //这里可以用多线程
            project.setId(projectId);
            Node node = new Node(project);
            int headNodeId = DaoFactory.getNodeDao().insertOne(node);
            project.setHeadNodeId(headNodeId);
            projectDao.updateOne(project);
        }
        return projectId;
    }

    @Override
    public int delProject(int projectId, int operatorId) {
        Project project = projectDao.selectOne(new Project(projectId));
        if(project.getAuthor()==operatorId) {
            projectDao.deleteOne(projectId);
            return StatusCode.OK;
        }
        return StatusCode.ERROR;
    }

    @Override
    public int chProject(Project project) {
        int i = projectDao.updateOne(project);
        return i==0 ? StatusCode.ERROR : StatusCode.OK;
    }

    @Override
    public Project getProject(int projectId) {
        return projectDao.selectOne(new Project(projectId));
    }
}
