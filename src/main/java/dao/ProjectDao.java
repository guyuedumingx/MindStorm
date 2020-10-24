package dao;

import pojo.Project;

import java.util.List;

/**
 * project的dao层接口
 * @author yohoyes
 */
public interface ProjectDao extends BaseDao<Project>{

    /**
     * 根据页数获取项目
     * @param page
     * @return
     */
    List<Project> selectProjectsFormPage(int page);
}
