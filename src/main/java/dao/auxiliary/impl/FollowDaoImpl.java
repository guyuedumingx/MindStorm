package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.Follow;

import java.text.MessageFormat;

/**
 * 处理关注表
 */
public class FollowDaoImpl extends BaseDaoImpl<Follow> implements BaseDao<Follow> {
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
}
