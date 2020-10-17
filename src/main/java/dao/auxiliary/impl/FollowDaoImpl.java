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
        if(po.getFollower()!=0 && po.getFollowing()==0) {
            base = "follower_id = " + po.getFollower();
        }else if(po.getFollowing()!=0 && po.getFollower()==0){
            base = "following_id = " + po.getFollowing();
        }else {
            base = "follower_id = " + po.getFollower() + " and following_id = " + po.getFollowing();
        }
        return base;
    }
}
