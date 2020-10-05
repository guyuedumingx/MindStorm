package common.dto;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回
 * @author yohoyes
 */
public class Result {
    private Map<String,String> map = new HashMap<String, String>();
    public void put(String key, String value) {
        map.put(key,value);
    }

    public void put(String key, int value) {
        map.put(key,value+"");
    }

    public Map<String, String> getMap() {
        return map;
    }
}
