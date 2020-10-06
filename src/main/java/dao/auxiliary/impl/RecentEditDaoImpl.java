package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.RecentEdit;

import java.text.MessageFormat;

/**
 * 处理用户最近修改表
 * @author yohoyes
 */
public class RecentEditDaoImpl extends BaseDaoImpl<RecentEdit> implements BaseDao<RecentEdit> {
    @Override
    public String getTableName() {
        return "t_edit";
    }

    @Override
    public String getQueryCondition(RecentEdit po) {
        String base = "user_id = {0} ";
        return MessageFormat.format(base,po.getUserId());
    }

    @Override
    public int updateOne(RecentEdit object) {
        throw new RuntimeException("历史记录不能修改");
    }

    @Override
    public int deleteOne(int id) {
        throw new RuntimeException("历史记录不能删除");
    }

    @Override
    public int deleteOne(RecentEdit po) {
        throw new RuntimeException("历史记录不能删除");
    }
}
