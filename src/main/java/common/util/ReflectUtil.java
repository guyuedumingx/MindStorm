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
        for (Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            Object value = f.get(po);
            if (value != null) {
                DbField dbField = f.getAnnotation(DbField.class);
                if (dbField != null) {
                    map.put(dbField.value(), value);
                }
            }
        }
        return map;
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
}
