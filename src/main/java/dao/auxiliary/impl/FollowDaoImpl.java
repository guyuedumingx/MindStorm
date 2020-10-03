package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.Follow;
import java.text.MessageFormat;

/**
 * 处理关注表
 * @author yohoyes
 */
public class FollowDaoImpl extends BaseDaoImpl<Follow> implements BaseDao<Follow> {
    @Override
    public String getTableName() {
        return "t_follow";
    }

    @Override
    public String getQueryCondition(Follow po) {
        String base;
        String format;
        if(po.getFollower()!=0 && po.getFollowing()==0) {
            base = "follower_id = {0}";
            format = MessageFormat.format(base, po.getFollower());
        }else if(po.getFollowing()!=0 && po.getFollower()==0){
            base = "following_id = {0}";
            format = MessageFormat.format(base, po.getFollowing());
        }else {
            base = "follower_id = {0} and following_id = {1}";
            format = MessageFormat.format(base,po.getFollower(),po.getFollowing());
        }
        return format;
    }
}
