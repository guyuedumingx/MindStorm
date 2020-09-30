package dao;

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

    @Override
    public T insertOne(T object) {
        return null;
    }

    @Override
    public T updateOne(T object) {
        return null;
    }

    @Override
    public T selectOne(T object) {
        return null;
    }

    @Override
    public T selectById(T object) {
        return null;
    }

    @Override
    public T selectById(int id) {
        return null;
    }
}
