package dao.auxiliary.impl;

import dao.BaseDaoImpl;
import dao.auxiliary.RecentProjectDao;
import pojo.auxiliary.RecentProject;

import java.text.MessageFormat;

public class RecentProjectDaoImpl extends BaseDaoImpl<RecentProject> implements RecentProjectDao {
    @Override
    public String getTableName() {
        return "t_recent_project";
    }

    @Override
    public String getQueryCondition(RecentProject po) {
        String base = "user_id = {0} and project_id = {1}";
        String format = MessageFormat.format(base, po.getUserId(),po.getProjectId());
        return format;
    }

    @Override
    public int insertOne(RecentProject object) {
        return 0;
    }
}
