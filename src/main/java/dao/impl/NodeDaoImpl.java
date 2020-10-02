package dao.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.NodeDao;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import pojo.Node;
import java.math.BigInteger;
import java.sql.SQLException;
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

    @Override
    public int insertOne(Node node) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String sql = "insert into t_node(author_id,parent_id,theme,content,editable,nameless,last_edit_id,last_edit_time)" +
                " values (?,?,?,?,?,?,?,?)";
        Object[] os = new Object[]{
                node.getAuthor(),
                node.getParentId(),
                node.getTheme(),
                node.getContent(),
                node.isEditable(),
                node.isNameless(),
                node.getLastEditId(),
                node.getLastEditTime()};
        BigInteger update = new BigInteger("0");
        try {
            Object[] insert = queryRunner.insert(sql, new ArrayHandler(), os);
            update = (BigInteger)insert[0];
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update.intValue();
    }
}
