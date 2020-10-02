package dao.auxiliary.impl;

import dao.BaseDaoImpl;
import dao.auxiliary.FollowDao;
import pojo.auxiliary.Follow;

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
}
