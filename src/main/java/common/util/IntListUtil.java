package common.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 把对象的某个字段转成int[]
 * @author yohoyes
 */
public class IntListUtil {
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
         e.printStackTrace();
      }
      return res.toArray(new Integer[0]);
   }
}
