package dao.auxiliary.impl;

import common.util.JdbcUtil;
import dao.BaseDao;
import dao.BaseDaoImpl;
import org.apache.commons.dbutils.QueryRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.auxiliary.RecentProject;

import java.sql.SQLException;
import java.text.MessageFormat;

/**
 * 处理用户最近使用的项目表
 * @author yohoyes
 */
public class RecentProjectDaoImpl extends BaseDaoImpl<RecentProject> implements BaseDao<RecentProject> {
    Logger logger = LoggerFactory.getLogger(RecentProjectDaoImpl.class);
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

    @Override
    public int deleteOne(int projectId) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "delete from {0} where project_id = ?";
        String sql = MessageFormat.format(base,getTableName());
        int update = 0;
        try {
            update = queryRunner.update(sql,new Object[]{projectId});
        } catch (SQLException e) {
            logger.error(e.getMessage());
        }
        return update;
    }
}
