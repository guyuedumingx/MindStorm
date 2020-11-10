package service;

import pojo.Project;
import java.util.List;

/**
 * project service
 * @author  yohoyes
 */
 public interface ProjectService {

    /**
     * 新建项目
     * @param project
     * @return
     */
     int newProject(Project project, int id);

    /**
     * 新建项目
     * @param project
     * @param hasRootNode 是否生成根节点
     * @param id
     * @return
     */
     int newProject(Project project, boolean hasRootNode, int id);

    /**
     * 删除项目
     * @param projectId
     * @param operatorId
     * @return
     */
     int delProject(int projectId,int operatorId);

    /**
     * 修改项目
     * 谁都能改
     * @param project
     * @return
     */
     int updateProject(Project project);

    /**
     * 获取项目
     * @param projectId
     * @return
     */
     Project getProject(int projectId);

    /**
     * 获取公有项目
     * @param pages
     * @return
     */
     List<Project> getPublicProjectsFromPages(int pages);

    /**
     * 项目是否存在
     */
    int existProject(int projectId);

    /**
     * 根据关键词搜索项目
     * @param key
     * @return
     */
    List<Project> search(String key);

    List<Project> getRecentProjectList(int userId);

    /**
     * 删除项目记录,用户退出项目
     * @param projectId
     * @return
     */
    int delPrecentProject(int projectId);
}
