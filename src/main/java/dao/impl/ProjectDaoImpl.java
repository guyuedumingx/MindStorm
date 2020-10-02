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
    public int insertOne(Project object) {
        return 0;
    }

    @Override
    public int updateOne(Project object) {
        return super.updateOne(object);
    }

    @Override
    public int deleteOne(int id) {
        return super.deleteOne(id);
    }

    @Override
    public Project selectById(Project object) {
        return super.selectById(object);
    }

}
