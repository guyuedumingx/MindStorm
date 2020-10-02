package dao.auxiliary.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.auxiliary.StarDao;
import org.apache.commons.dbutils.QueryRunner;
import pojo.auxiliary.Star;

import java.sql.SQLException;
import java.text.MessageFormat;

/**
 * 点赞表
 * @author yohoyes
 */
public class StarDaoImpl extends BaseDaoImpl<Star> implements StarDao {
    @Override
    public String getTableName() {
        return "t_star";
    }

    @Override
    public String getQueryCondition(Star po) {
        String base = "user_id = {0} and node_id = {1}";
        String format = MessageFormat.format(base, po.getUserId(),po.getNodeId());
        return format;
    }
}
