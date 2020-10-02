package dao.auxiliary.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.auxiliary.FollowDao;
import org.apache.commons.dbutils.QueryRunner;
import pojo.auxiliary.Follow;

import java.sql.SQLException;
import java.text.MessageFormat;

public class FollowDaoImpl extends BaseDaoImpl<Follow> implements FollowDao {
    @Override
    public String getTableName() {
        return "t_follow";
    }

    @Override
    public String getQueryCondition(Follow po) {
        String base = "follow = {0} and following = {1}";
        String format = MessageFormat.format(base, po.getFollower(),po.getFollowing());
        return format;
    }

    @Override
    public int insertOne(Follow object) {
        String base = "insert into {0}(follower_id,following_id) values(?,?)";
        String sql = MessageFormat.format(base, getTableName());
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        int update = 0;
        try {
            update = queryRunner.update(sql, new Object[]{object.getFollower(), object.getFollowing()});
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }
}
