package dao.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.NodeDao;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import pojo.Node;
import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;

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
        String base = "id = " + po.getId();
        return base;
    }

    @Override
    public int[] selectChildren(int id) {
        String base = "select id from {0} where parent_id = " + id;
        String sql = MessageFormat.format(base, getTableName());
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        List<Object[]> query = null;
        try {
            query = queryRunner.query(sql, new ArrayListHandler());
        }catch (Exception e) {
            e.printStackTrace();
        }
        int[] res = new int[query.size()];
        Iterator<Object[]> iterator = query.iterator();
        for(int i=0; i<query.size(); i++){
            res[i] = (Integer)iterator.next()[0];
        }
        return res;
    }
}
