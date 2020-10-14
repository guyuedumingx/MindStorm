package service.impl;


import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.ProjectDao;
import dao.auxiliary.impl.ContributorDaoImpl;
import pojo.Node;
import pojo.Project;
import pojo.auxiliary.Contributor;
import service.ProjectService;
import java.util.Iterator;
import java.util.List;

/**
 * 项目service层实现类
 * @author yohoyes
 */
public class ProjectServiceImpl implements ProjectService {
    ProjectDao projectDao = DaoFactory.getProjectDao();
    ContributorDaoImpl contributorDao = new ContributorDaoImpl();

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
            contributorDao.insertOne(new Contributor(project));
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
        Project project = projectDao.selectOne(new Project(projectId));
        List<Contributor> contributors = contributorDao.selectObjectList(new Contributor(projectId));
        Iterator<Contributor> iterator = contributors.iterator();
        int[] cons = new int[contributors.size()];
        for(int i=0; iterator.hasNext();i++){
            cons[i] = iterator.next().getContributorId();
        }
        project.setContributors(cons);
        return project;
    }

    @Override
    public int existProject(int projectId) {
        Project project = projectDao.selectOne(new Project(projectId));
        return StatusCode.nullObjcet(project);
    }
}
