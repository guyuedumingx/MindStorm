package dao.impl;

import dao.BaseDaoImpl;
import dao.ProjectDao;
import pojo.Project;

import java.text.MessageFormat;

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
        String base = "id = {0}";
        String format = MessageFormat.format(base,po.getId());
        return format;
    }

    @Override
    public int insertOne(Project object) {
        return 0;
    }
}
