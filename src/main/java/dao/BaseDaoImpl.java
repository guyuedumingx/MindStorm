package dao;

import common.util.DbSqlUtil;
import common.util.JdbcUtil;
import common.util.MapUtil;
import common.util.ReflectUtil;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import java.math.BigInteger;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 所有Dao类的公有父类
 * @param <T>
 * @author yohoyes
 */
public abstract class BaseDaoImpl<T> implements BaseDao<T>{

    /**
     * 获取表名
     * @return
     */
    public abstract String getTableName();

    /**
     * 查询条件
     * @param po
     * @return
     */
    public abstract String getQueryCondition(T po);
    /**
     * 改
     * @param object
     * @return
     */
    @Override
    public int updateOne(T object) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "update {0} {1} where {2}";
        List<Object> params = new ArrayList<Object>();
        String sql = MessageFormat.format(base, getTableName(), ReflectUtil.getSqlFragment(object, params), getQueryCondition(object));
        int update = 0;
        try {
            update = queryRunner.update(sql, params.toArray());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    @Override
    public int deleteOne(int id) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "delete from {0} where id = ?";
        String sql = MessageFormat.format(base,getTableName());
        int update = 0;
        try {
            update = queryRunner.update(sql,new Object[]{id});
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    @Override
    public int deleteOne(T po) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "delete from {0} where {1}";
        String sql = MessageFormat.format(base,getTableName(),getQueryCondition(po));
        int update = 0;
        try {
            update = queryRunner.update(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    /**
     * 查
     * @param object
     * @return
     */
    @Override
    public T selectById(T object) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "select * from {0} where {1} limit 1";
        String realSql = MessageFormat.format(base, getTableName(),getQueryCondition(object));
        try {
            Map<String, Object> query = queryRunner.query(realSql, new MapHandler());
            object = MapUtil.ModelMapper(object, ReflectUtil.getAllFields(object), query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return object;
    }

    @Override
    public int insertOne(T object) {
        String base = "insert into {0} ({1}) values ({2})";
        List<Object> list = new ArrayList<Object>();
        String sql = MessageFormat.format(base, getTableName(), ReflectUtil.getSqlForInsert(object, list), DbSqlUtil.getQuestionForInsert(list.size()));
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        BigInteger bigInteger = new BigInteger("0");
        try{
            Object[] insert = queryRunner.insert(sql, new ArrayHandler(), list.toArray());
            bigInteger = (BigInteger)insert[0];
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return bigInteger.intValue();
    }
}
