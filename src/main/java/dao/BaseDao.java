package dao;

/**
 * @param <T>
 * @author yohoyes
 */
public interface BaseDao<T> {

    /**
     * 插入
     * @param object
     * @return
     */
    T insertOne(T object);

    /**
     * 更新
     * @param object
     * @return
     */
    T updateOne(T object);

    /**
     * 获取
     * @param object
     * @return
     */
    T selectOne(T object);

    /**
     * 根据id获取
     * @param object
     * @return
     */
    T selectById(T object);

    /**
     * 根据id获取
     * @param id
     * @return
     */
    T selectById(int id);
}
