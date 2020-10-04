package dao;


import java.sql.SQLException;
import java.util.List;

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
    int insertOne(T object) throws SQLException;

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

    /**
     *根据对象获取一堆数据并返回
     * @param po
     * @return
     */
    List<T> selectObjectList(T po) throws Exception;
}
