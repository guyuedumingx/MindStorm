package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.RecentProject;
import java.text.MessageFormat;

/**
 * 处理用户最近使用的项目表
 * @author yohoyes
 */
public class RecentProjectDaoImpl extends BaseDaoImpl<RecentProject> implements BaseDao<RecentProject> {
    @Override
    public String getTableName() {
        return "t_recent_project";
    }

    @Override
    public String getQueryCondition(RecentProject po) {
        if(po.getProjectId()==0) {
            return "user_id = " + po.getUserId();
        }else {
            return "user_id = " + po.getUserId() + " and project_id = " + po.getProjectId();
        }
    }
}
