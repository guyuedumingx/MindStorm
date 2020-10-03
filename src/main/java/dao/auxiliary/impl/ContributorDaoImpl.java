package dao.auxiliary.impl;
import dao.BaseDao;
import dao.BaseDaoImpl;
import pojo.auxiliary.Contributor;

import java.text.MessageFormat;

/**
 * 处理贡献者表
 * @author yohoyes
 */
public class ContributorDaoImpl extends BaseDaoImpl<Contributor> implements BaseDao<Contributor> {
    @Override
    public String getTableName() {
        return "t_contributor";
    }

    @Override
    public String getQueryCondition(Contributor po) {
        String base = "project_id = {0}";
        String format = MessageFormat.format(base, po.getProjectId());
        return format;
    }
}
