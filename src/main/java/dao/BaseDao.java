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
    int insertOne(T object);

    /**
     * 更新
     * @param object
     * @return
     */
    int updateOne(T object);

    /**
     * 获取
     * @param id
     */
    int deleteOne(int id);

    int deleteOne(T po);

    /**
     * 根据id获取
     * @param object
     * @return
     */
    T selectById(T object);
}
