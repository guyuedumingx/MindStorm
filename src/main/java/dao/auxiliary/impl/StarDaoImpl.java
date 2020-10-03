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
       String format;
        if(po.getNodeId()!=0 && po.getUserId()==0) {
            base = "node_id = {0}";
            format = MessageFormat.format(base,po.getNodeId());
        }else {
            base = "user_id = {0} and node_id = {1}";
            format = MessageFormat.format(base, po.getUserId(),po.getNodeId());
        }
        return format;
    }
}
