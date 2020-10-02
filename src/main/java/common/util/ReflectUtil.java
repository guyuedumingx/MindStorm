package common.util;

import common.annontation.DbField;
import java.lang.reflect.Field;
import java.util.*;

/**
 * @author yohoyes
 */
public class ReflectUtil {

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
        return getFieldsMap(po, clazz, map);
    }

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

    public static <T> Map<String,Object> getParaForUpdate(T po) throws IllegalAccessException {
        Class clazz = po.getClass();
        Map<String, Object> map = new HashMap<String, Object>(16);
        return getFieldsMap(po, clazz, map);
    }

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
           e.printStackTrace();
        }
        return sb.toString();
    }

    private static <T> Map<String, Object> getFieldsMap(T po, Class clazz, Map<String, Object> map) throws IllegalAccessException {
        for (Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            Object value = f.get(po);
            if(value!=null) {
                DbField dbField = f.getAnnotation(DbField.class);
                if(dbField!=null) {
                    map.put(dbField.value(),value);
                }
            }
        }
        return map;
    }
}
