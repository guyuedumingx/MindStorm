package common.util;

import java.text.MessageFormat;
import java.util.List;

/**
 * @author yohoyes
 */
public class DbSqlUtil {

    public static String setSql(String name, Object value, List<Object> list) {
        list.add(value);
        return name+" = ?";
    }

    public static String andSql(String key, Object value, List<Object> list) {
        list.add(value);
        String base = "and {0} = ?";
        return MessageFormat.format(base, key);
    }
}
