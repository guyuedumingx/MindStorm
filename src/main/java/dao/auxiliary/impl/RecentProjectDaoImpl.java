package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.RecentProject;
import java.text.MessageFormat;

/**
 * 处理用户最近使用的项目表
 */
public class RecentProjectDaoImpl extends BaseDaoImpl<RecentProject> implements BaseDao<RecentProject> {
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
}
