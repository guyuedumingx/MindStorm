package dao;

import common.util.JdbcUtil;
import common.util.MapUtil;
import common.util.ReflectUtil;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import pojo.BaseModel;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.Map;

/**
 * 所有Dao类的公有父类
 * @param <T>
 * @author yohoyes
 */
public abstract class BaseDaoImpl<T extends BaseModel> implements BaseDao<T>{

    /**
     * 获取表名
     * @return
     */
    public abstract String getTableName();

    @Override
    public T updateOne(T object) {
        return null;
    }

    @Override
    public T deleteOne(T object) {
        return null;
    }

    /**
     * 查
     * @param object
     * @return
     */
    @Override
    public T selectById(T object) {
        QueryRunner queryRunner = new QueryRunner(JdbcUtil.getDataSource());
        String base = "select * from {0} where id = {1} limit 1";
        String realSql = MessageFormat.format(base, getTableName(),object.getId());
        try {
            Map<String, Object> query = queryRunner.query(realSql, new MapHandler());
            object = MapUtil.ModelMapper(object, ReflectUtil.getAllFields(object), query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return object;
    }
}
