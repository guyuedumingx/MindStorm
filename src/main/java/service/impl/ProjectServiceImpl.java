package service.impl;

import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.ProjectDao;
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
        return projectDao.insertOne(project);
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
