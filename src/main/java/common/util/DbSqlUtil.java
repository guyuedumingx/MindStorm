package common.util;

import java.util.List;

/**
 * @author yohoyes
 */
public class DbSqlUtil {

    public static String setSql(String name, Object value, List<Object> list) {
        list.add(value);
        return name+" = ?";
    }
}
