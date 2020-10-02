package dao.auxiliary.impl;

import dao.BaseDaoImpl;
import dao.auxiliary.RecentEditDao;
import pojo.auxiliary.RecentEdit;

import java.text.MessageFormat;

public class RecentEditDaoImpl extends BaseDaoImpl<RecentEdit> implements RecentEditDao {
    @Override
    public String getTableName() {
        return "t_edit";
    }

    @Override
    public String getQueryCondition(RecentEdit po) {
        return "";
    }
}
