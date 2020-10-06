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

    public static String getQuestionForInsert(int number) {
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<number;i++) {
           sb.append(i==number-1 ? "?":"?,");
        }
        return sb.toString();
    }
}
