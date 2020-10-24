package dao.impl;

import dao.BaseDaoImpl;
import dao.ProjectDao;
import pojo.Project;

import java.text.MessageFormat;
import java.util.List;

/**
 * @author yohoyes
 */
public class ProjectDaoImpl extends BaseDaoImpl<Project> implements ProjectDao {

    @Override
    public String getTableName() {
        return "t_project";
    }

    @Override
    public String getQueryCondition(Project po) {
        String base = "id = " + po.getId();
        return base;
    }

    @Override
    public List<Project> searchProjects(String key) {
        String sql = "select * from t_project where project_name like '%" + key + "%' or" +
                " introduction like '%" + key + "%'";
        return this.select(new Project(), sql);
    }
}
