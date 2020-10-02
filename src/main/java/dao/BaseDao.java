package dao;

import pojo.BaseModel;

/**
 * @param <T>
 * @author yohoyes
 */
public interface BaseDao<T extends BaseModel> {

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
    T updateOne(T object);

    /**
     * 获取
     * @param object
     * @return
     */
    T deleteOne(T object);

    /**
     * 根据id获取
     * @param object
     * @return
     */
    T selectById(T object);
}
