package common.dto;

import java.util.HashMap;

/**
 * 返回给前端的对象
 * @author yohoyes
 */
public class Result extends HashMap<String,String>{

    /**
     * 返回给前端的状态码
     * @param statusCode
     */
    public void setStatus_code(int statusCode) {
        this.put("status_code",statusCode+"");
    }

    public void setChangeType(String str){
        this.put("type",str);
    }
    
    public void setChangeId(int nodeId){
        this.put("node_id",nodeId+"");
    }

    /**
     * 存储需要返回给前端的键值对
     * @param key 键
     * @param value 值
     * @return
     */
    public String put(String key, int value) {
        return super.put(key, value+"");
    }
}
