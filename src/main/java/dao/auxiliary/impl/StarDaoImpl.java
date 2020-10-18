package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.Star;
import java.text.MessageFormat;

/**
 * 点赞表
 * @author yohoyes
 */
public class StarDaoImpl extends BaseDaoImpl<Star> implements BaseDao<Star> {
    @Override
    public String getTableName() {
        return "t_star";
    }

    @Override
    public String getQueryCondition(Star po) {
       String base;
        if(po.getNodeId()!=0 && po.getUserId()==0) {
            base = "node_id = " + po.getNodeId();
        }else {
            base = "user_id = " + po.getUserId() + " and node_id = " + po.getNodeId();
        }
        return base;
    }
}
