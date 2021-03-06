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
    User user = null;

    public ProjectServiceImpl(){}

    public ProjectServiceImpl(User user){
        this.user = user;
    }

    @Override
    public int newProject(Project project,int userId) {
        return newProject(project, true, userId);
    }

    @Override
    public int newProject(Project project, boolean hasRootNode,int userId) {
        int projectId = projectDao.insertOne(project);
        if(projectId==0){
            return projectId;
        }else {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    project.setId(projectId);
                    contributorDao.insertOne(new Contributor(projectId,userId));
                    if(hasRootNode) {
                        Node node = new Node(project);
                        node.setLastEditTime(System.currentTimeMillis()+"");
                        node.setBanAppend(false);
                        int headNodeId = new NodeServiceImpl().newNode(node);
                        project.setHeadNodeId(headNodeId);
                    }
                    projectDao.updateOne(project);
                    contributorDao.insertOne(new Contributor(project));
                    recentProjectDao.insertOne(new RecentProject(userId,projectId));
                }
            }).start();
        }
        return projectId;
    }

    @Override
    public int delProject(int projectId, int operatorId) {
        Project project = projectDao.selectOne(new Project(projectId));
        if(project.getAuthor()==operatorId) {
            doDelete(projectId);
            return StatusCode.OK;
        }
        return StatusCode.ERROR;
    }

    private void doDelete(int projectId){
        projectDao.deleteOne(projectId);
        contributorDao.deleteOne(new Contributor(projectId));
        recentProjectDao.deleteOne(projectId);
    }

    @Override
    public int updateProject(Project project) {
        int i = projectDao.updateOne(project);
        return i==0 ? StatusCode.ERROR : StatusCode.OK;
    }

    @Override
    public Project getProject(int projectId) {
        Project project = projectDao.selectOne(new Project(projectId));
        if(project==null){
            return null;
        }
        List<Contributor> contributors = contributorDao.selectObjectList(new Contributor(projectId));
        Iterator<Contributor> iterator = contributors.iterator();
        User author = userDao.selectOne(new User(project.getAuthor()));
        project.setCreatorName(author.getName());
        project.setNumbers(contributors.size());
        int[] cons = new int[contributors.size()];
        for(int i=0; iterator.hasNext();i++){
            cons[i] = iterator.next().getContributorId();
        }
        project.setContributors(cons);
        return project;
    }

    @Override
    public List<Project> getPublicProjectsFromPages(int pages) {
        List<Project> publicProjectsFromPages = projectDao.getPublicProjectsFromPages(pages, 6);
        List<Project> back = new ArrayList<>();
        List<Project> projects = publicProjectsFromPages;
        Iterator<Project> iterator = projects.iterator();
        while (iterator.hasNext()){
            Project in = iterator.next();
            Project project = getProject(in.getId());
            back.add(project);
        }
        return back;
    }

    @Override
    public Project existProject(int projectId) {
        Project project = projectDao.selectOne(new Project(projectId));
        return project;
    }

    @Override
    public List<Project> getRecentProjectList(int userId) {
        List<RecentProject> recentProjects = recentProjectDao.selectObjectList(new RecentProject(userId));
        Iterator<RecentProject> iterator = recentProjects.iterator();
        List<Project> res = new ArrayList<Project>();
        while (iterator.hasNext()){
            res.add(this.getProject(iterator.next().getProjectId()));
        }
        return res;
    }

    @Override
    public int delPrecentProject(int projectId){
        return recentProjectDao.deleteOne(new RecentProject(user.getId(), projectId));
    }

    @Override
    public List<Project> search(String key) {
        List<Project> back = new ArrayList<>();
        List<Project> projects = projectDao.searchProjects(key,user.getId());
        Iterator<Project> iterator = projects.iterator();
        while (iterator.hasNext()){
            Project in = iterator.next();
            Project project = getProject(in.getId());
            back.add(project);
        }
       return back;
    }
}
