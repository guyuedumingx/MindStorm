package common.util;

import common.annontation.DbField;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public static <T> List<String> getParasName(T po) {
        Class<?> clazz = po.getClass();
        List<String> list = new ArrayList<String>();
        for(Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            DbField dbField = f.getAnnotation(DbField.class);
            if (dbField!=null) {
                list.add(dbField.value());
            }
        }
        return list;
    }
}
