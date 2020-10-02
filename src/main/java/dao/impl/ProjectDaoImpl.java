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
        return "project";
    }

    @Override
    public int insertOne(Project object) {
        return 0;
    }

    @Override
    public Project updateOne(Project object) {
        return super.updateOne(object);
    }

    @Override
    public Project deleteOne(Project object) {
        return super.deleteOne(object);
    }

    @Override
    public Project selectById(Project object) {
        return super.selectById(object);
    }

}
