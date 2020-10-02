package common.util;

import common.annontation.DbField;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

/**
 * @author hoyoyes
 */
public class MapUtil {

    public static <T> T ModelMapper(T po,Field[] list, Map<String,Object> map) {
        for(Field f : list) {
            DbField dbField = f.getAnnotation(DbField.class);
           if(map.containsKey(dbField.value())) {
               try {
                   f.setAccessible(true);
                   f.set(po,map.get(dbField.value()));
               } catch (Exception e) {
                  e.printStackTrace();
               }
           }
       }
        return po;
    }
}
