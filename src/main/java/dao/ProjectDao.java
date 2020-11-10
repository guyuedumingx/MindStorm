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
     * 只能搜索到公有项目
     * @param key
     * @return
     */
    List<Project> searchProjects(String key,int operaId);

    /**
     * 根据页数,和传入的每页项目条数获取公有项目
     * @param pages
     * @param numsForPage
     * @return
     */
    List<Project> getPublicProjectsFromPages(int pages, int numsForPage);
}
