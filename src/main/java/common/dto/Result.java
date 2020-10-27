package common.dto;

import java.util.HashMap;

/**
 * 返回给前端的对象
 * @author yohoyes
 */
public class Result extends HashMap<String,String>{

    public void setStatus_code(int statusCode) {
        this.put("status_code",statusCode+"");
    }

    public String put(String key, int value) {
        return super.put(key, value+"");
    }
}
