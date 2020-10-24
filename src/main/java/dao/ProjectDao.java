package dao;

import pojo.Project;

import java.util.List;

/**
 * project的dao层接口
 * @author yohoyes
 */
public interface ProjectDao extends BaseDao<Project>{

    /**
     * 根据标题获取项目
     * @param key
     * @return
     */
    List<Project> searchProjects(String key);
}
