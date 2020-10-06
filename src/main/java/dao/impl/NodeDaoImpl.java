package dao.impl;

import dao.BaseDaoImpl;
import dao.NodeDao;
import pojo.Node;
import java.text.MessageFormat;

/**
 * @author yohoyes
 */
public class NodeDaoImpl extends BaseDaoImpl<Node> implements NodeDao {

    @Override
    public String getTableName() {
        return "t_node";
    }

    @Override
    public String getQueryCondition(Node po) {
        String base = "id = {0}";
        String format = MessageFormat.format(base,po.getId());
        return format;
    }
}
