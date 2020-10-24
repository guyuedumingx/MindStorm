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
    public List<Project> selectProjectsFormPage(int page) {
        return null;
    }
}
