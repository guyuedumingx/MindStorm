package dao.impl;

import common.util.JdbcUtil;
import dao.BaseDaoImpl;
import dao.NodeDao;
import org.apache.commons.dbutils.QueryRunner;
import pojo.Node;
import java.sql.SQLException;

/**
 * @author yohoyes
 */
public class NodeDaoImpl extends BaseDaoImpl<Node> implements NodeDao {

    @Override
    public String getTableName() {
        return "node";
    }

    @Override
    public Node updateOne(Node object) {
        return null;
    }

    @Override
    public Node deleteOne(Node object) {
        return null;
    }

    @Override
    public Node selectById(Node object) {
        return super.selectById(object);
    }

    @Override
    public int insertOne(Node node) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String sql = "insert into node(id,author,parent_id,theme,content,editable,nameless,lastEditId,lastEditTime)" +
                " values (?,?,?,?,?,?,?,?,?)";
        Object[] os = new Object[]{
                node.getId(),
                node.getAuthor(),
                node.getParentId(),
                node.getTheme(),
                node.getContent(),
                node.isEditable(),
                node.isNameless(),
                node.getLastEditId(),
                node.getLastEditTime()};
        int update = 0;
        try {
            update = queryRunner.update(sql, os);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }
}
