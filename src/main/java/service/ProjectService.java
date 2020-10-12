package service;

import pojo.Project;

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
     int newProject(Project project);

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
}
