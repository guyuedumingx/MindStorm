package common.util;

import common.annontation.DbField;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author hoyoyes
 */
public class MapUtil {
    static Logger logger = LoggerFactory.getLogger(MapUtil.class);

    public static <T> T ModelMapper(T po,Field[] list, Map map) throws Exception{
         T o = (T)po.getClass().newInstance();
        for(Field f : list) {
            DbField dbField = f.getAnnotation(DbField.class);
           if(dbField!=null && map.containsKey(dbField.value())) {
               try {
                   f.setAccessible(true);
                   f.set(o,map.get(dbField.value()));
               } catch (Exception e) {
                   logger.error(e.getMessage());
               }
           }
       }
        return o;
    }
    public static <T> List<T> ModelMapperForList(T po,Field[] f, List<Map<String,Object>> list) throws Exception {
        Iterator<Map<String, Object>> iterator = list.iterator();
        List<T> res = new ArrayList<T>();
        while (iterator.hasNext()) {
            T t = ModelMapper(po, f, iterator.next());
            res.add(t);
        }
        return res;
    }
}
