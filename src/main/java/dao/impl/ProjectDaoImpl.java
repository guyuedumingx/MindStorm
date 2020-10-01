package dao.impl;

import dao.BaseDaoImpl;
import dao.ProjectDao;
import pojo.Project;

/**
 * @author yohoyes
 */
public class ProjectDaoImpl extends BaseDaoImpl<Project> implements ProjectDao {

    @Override
    public String getTableName() {
        return "t_project";
    }

    @Override
    public Project insertOne(Project object) {
        return null;
    }

    @Override
    public Project updateOne(Project object) {
        return super.updateOne(object);
    }

    @Override
    public Project selectOne(Project object) {
        return super.selectOne(object);
    }

    @Override
    public Project selectById(Project object) {
        return super.selectById(object);
    }

    @Override
    public Project selectById(int id) {
        return super.selectById(id);
    }
}
