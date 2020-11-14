package dao.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.NodeDao;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.Node;

import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;

/**
 * @author yohoyes
 */
public class NodeDaoImpl extends BaseDaoImpl<Node> implements NodeDao {
    Logger logger = LoggerFactory.getLogger(NodeDaoImpl.class);

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
    public Node selectOne(Node object) {
        return super.selectOne(object,createSql(object));
    }

    private String createSql(Node node){
        String sql = "select *,count(user_id) as 'star' from t_node left join t_star " +
                "on id=node_id group by id having id = "+node.getId();
        return sql;
    }

    @Override
    public int updateId(int preId, int afterId){
        String sql = "update "+getTableName()+" set id = ? where id = ?";
        Object[] objects = new Object[]{preId,afterId};
        QueryRunner runner = new QueryRunner();
        int update = 0;
        try {
            update = runner.update(sql, objects);
        }catch (SQLException e){
            logger.error(e.getMessage());
        }
        return update;
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
            logger.error(e.getMessage());
        }
        int[] res = new int[query.size()];
        Iterator<Object[]> iterator = query.iterator();
        for(int i=0; i<query.size(); i++){
            res[i] = (Integer)iterator.next()[0];
        }
        return res;
    }
}
