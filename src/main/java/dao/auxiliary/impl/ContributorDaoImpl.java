package dao.auxiliary.impl;
import dao.BaseDaoImpl;
import dao.auxiliary.ContributorDao;
import pojo.auxiliary.Contributor;

import java.text.MessageFormat;

/**
 * @author yohoyes
 */
public class ContributorDaoImpl extends BaseDaoImpl<Contributor> implements ContributorDao {
    @Override
    public String getTableName() {
        return "t_contributor";
    }

    @Override
    public String getQueryCondition(Contributor po) {
        String base = "project_id = {0} and contributor_id = {1}";
        String format = MessageFormat.format(base, po.getProjectId(),po.getContributorId());
        return format;
    }

    @Override
    public int insertOne(Contributor object) {
        return 0;
    }
}
