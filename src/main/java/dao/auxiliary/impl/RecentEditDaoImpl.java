package dao.auxiliary.impl;

import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.RecentEdit;

/**
 * 处理用户最近修改表
 */
public class RecentEditDaoImpl extends BaseDaoImpl<RecentEdit> implements BaseDao<RecentEdit> {
    @Override
    public String getTableName() {
        return "t_edit";
    }

    @Override
    public String getQueryCondition(RecentEdit po) {
        String base = " = {0} and node_id = {1}";
        return null;
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
