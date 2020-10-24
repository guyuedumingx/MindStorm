package service.impl;

import common.dto.StatusCode;
import common.factory.DaoFactory;
import dao.ProjectDao;
import dao.UserDao;
import dao.auxiliary.impl.ContributorDaoImpl;
import dao.auxiliary.impl.RecentProjectDaoImpl;
import pojo.Node;
import pojo.Project;
import pojo.User;
import pojo.auxiliary.Contributor;
import pojo.auxiliary.RecentProject;
import service.ProjectService;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


/**
 * 项目service层实现类
 * @author yohoyes
 */
public class ProjectServiceImpl implements ProjectService {
    ProjectDao projectDao = DaoFactory.getProjectDao();
    UserDao userDao = DaoFactory.getUserDao();
    ContributorDaoImpl contributorDao = new ContributorDaoImpl();
    RecentProjectDaoImpl recentProjectDao = new RecentProjectDaoImpl();

    @Override
    public int newProject(Project project,int userId) {
        return newProject(project,true,userId);
    }

    @Override
    public int newProject(Project project, boolean hasRootNode,int userId) {
        int projectId = projectDao.insertOne(project);
        if(projectId==0){
            return projectId;
        }else {
            //这里可以用多线程
            project.setId(projectId);
            if(hasRootNode) {
                Node node = new Node(project);
                node.setLastEditTime(System.currentTimeMillis()+"");
                node.setEditable(true);
                int headNodeId = DaoFactory.getNodeDao().insertOne(node);
                project.setHeadNodeId(headNodeId);
            }
            projectDao.updateOne(project);
            contributorDao.insertOne(new Contributor(project));
            recentProjectDao.insertOne(new RecentProject(userId,projectId));
        }
        return projectId;
    }

    @Override
    public int delProject(int projectId, int operatorId) {
        Project project = projectDao.selectOne(new Project(projectId));
        if(project.getAuthor()==operatorId) {
            doDelete(projectId, operatorId);
            return StatusCode.OK;
        }
        return StatusCode.ERROR;
    }

    private void doDelete(int projectId, int operatorId){
        projectDao.deleteOne(projectId);
        contributorDao.deleteOne(projectId);
        recentProjectDao.insertOne(new RecentProject(operatorId,projectId));
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
        User author = userDao.selectOne(new User(project.getAuthor()));
        project.setCreatorName(author.getName());
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

    @Override
    public List<Project> getRecentProjectList(int userId) {
        List<RecentProject> recentProjects = recentProjectDao.selectObjectList(new RecentProject(userId));
        Iterator<RecentProject> iterator = recentProjects.iterator();
        List<Project> res = new ArrayList<Project>();
        while (iterator.hasNext()){
            res.add(projectDao.selectOne(new Project(iterator.next().getProjectId())));
        }
        return res;
    }
}
