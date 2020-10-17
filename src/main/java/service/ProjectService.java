package service;

import pojo.Node;
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
     int chProject(Project project);

    /**
     * 获取项目
     * @param projectId
     * @return
     */
     Project getProject(int projectId);

    /**
     * 项目是否存在
     */
    int existProject(int projectId);

    List<Project> getRecentProjectList(int userId);
}
