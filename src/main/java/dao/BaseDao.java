package dao;


/**
 * 所有dao层的公共接口
 * 负责定义一些通用的接口
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
    T selectOne(T object);
}
