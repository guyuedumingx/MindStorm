package common.util;

import common.annontation.DbField;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.*;

/**
 * 反射工具类
 * @author yohoyes
 */
public class ReflectUtil {
    static Logger logger = LoggerFactory.getLogger(ReflectUtil.class);

    /**
     * 通过反射获取pojo类的含有注解的方法
     * @param po
     * @param <T>
     * @return
     * @throws IllegalAccessException 抛出非法权限异常
     */
    public static <T> Map<String,Object> getParas(T po) throws IllegalAccessException {
        Class clazz = po.getClass();
        Map<String, Object> map = new HashMap<String, Object>();
        return getFieldsMapForInsert(po, clazz, map);
    }

    /**
     * 通过反射获取pojo类的含有注解的方法
     * 包含父类
     * @param object
     * @param <T>
     * @return
     */
    public static <T> Field[] getAllFields(T object){
        Class clazz = object.getClass();
        List<Field> fieldList = new ArrayList<Field>();
        while (clazz != null){
            fieldList.addAll(new ArrayList(Arrays.asList(clazz.getDeclaredFields())));
            clazz = clazz.getSuperclass();
        }
        Field[] fields = new Field[fieldList.size()];
        fieldList.toArray(fields);
        return fields;
    }

    /**
     * 获取插入时需要的简直对列表
     * @param po
     * @param <T>
     * @return
     * @throws IllegalAccessException
     */
    public static <T> Map<String,Object> getParaForInsert(T po) throws IllegalAccessException {
        Class clazz = po.getClass();
        Map<String, Object> map = new HashMap<String, Object>(16);
        return getFieldsMapForInsert(po, clazz, map);
    }

    /**
     * 获取更新时需要的简直对列表
     * @param po
     * @param <T>
     * @return
     * @throws IllegalAccessException
     */
    public static <T> Map<String,Object> getParaForUpdate(T po) throws IllegalAccessException {
        Class clazz = po.getClass();
        Map<String, Object> map = new HashMap<String, Object>(16);
        return getFieldsMapForUpdate(po, clazz, map);
    }


    /**
     *拼接修改时的sql
     * @param po
     * @param list
     * @param <T>
     * @return
     */
    public static <T> String getSqlFragment(T po,List<Object> list) {
        StringBuilder sb = new StringBuilder(" set ");
        try {
            Map<String, Object> paraForUpdate = getParaForUpdate(po);
            Set<Map.Entry<String,Object>> set = paraForUpdate.entrySet();
            Iterator<Map.Entry<String, Object>> iterator = set.iterator();
            while (iterator.hasNext()) {
                Map.Entry<String, Object> cur = iterator.next();
                sb.append(DbSqlUtil.setSql(cur.getKey(), cur.getValue(), list));
                if (iterator.hasNext()) {
                    sb.append(" , ");
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return sb.toString();
    }

    /**
     * 拼接插入时的sql
     * @param po
     * @param list
     * @param <T>
     * @return
     */
    public static <T> String getSqlForInsert(T po, List<Object> list) {
        StringBuilder sb = new StringBuilder();
        try {
            Map<String, Object> paraForUpdate = getParaForInsert(po);
            Set<Map.Entry<String,Object>> set = paraForUpdate.entrySet();
            Iterator<Map.Entry<String, Object>> iterator = set.iterator();
            while (iterator.hasNext()) {
                Map.Entry<String, Object> cur = iterator.next();
                list.add(cur.getValue());
                sb.append(cur.getKey());
                if (iterator.hasNext()) {
                    sb.append(" , ");
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return sb.toString();
    }

    private static <T> Map<String, Object> getFieldsMapForInsert(T po, Class clazz, Map<String, Object> map) throws IllegalAccessException {
        for (Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            DbField dbField = f.getAnnotation(DbField.class);
            if(dbField!=null) {
                getFieldsMap(f, dbField, po, clazz, map, !dbField.insertIgnore());
            }
        }
        return map;
    }

    private static <T> Map<String, Object> getFieldsMapForUpdate(T po, Class clazz, Map<String, Object> map) throws IllegalAccessException {
        for (Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            DbField dbField = f.getAnnotation(DbField.class);
            if(dbField!=null) {
                getFieldsMap(f, dbField, po, clazz, map, dbField.update());
            }
        }
        return map;
    }


    private static <T> void getFieldsMap(Field f,DbField dbField,T po, Class clazz, Map<String, Object> map,boolean condition) throws IllegalAccessException {
        Object value = f.get(po);
        if(value!=null) {
            if(dbField!=null&&condition) {
                map.put(dbField.value(),value);
            }
        }
    }
}
