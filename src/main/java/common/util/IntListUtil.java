package common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import service.impl.NodeServiceImpl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 考虑到从数据库中查询到的数据可能是List,本类可以将pojo类的某个标有
 * annontation的成员变量根据传入的List返回int[]
 * 把对象的某个字段转成int[]
 * @author yohoyes
 */
public class IntListUtil {
   static Logger logger = LoggerFactory.getLogger(NodeServiceImpl.class);

   public static <T> Integer[] getIntList(List<T> list, String pattern) {
      Iterator<T> iterator = list.iterator();
      List<Integer> res = new ArrayList<Integer>();
      try {
         while (iterator.hasNext()) {
            T next = iterator.next();
            Class po = next.getClass();
            Field f = po.getDeclaredField(pattern);
            f.setAccessible(true);
            res.add(f.getInt(next));
         }
      } catch (Exception e) {
         logger.error(e.getMessage());
      }
      return res.toArray(new Integer[0]);
   }
}
