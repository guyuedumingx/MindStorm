package common.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 状态码
 * @author yohoyes
 */
public class StatusCode {
    public static final int OK = 200;
    public static final int LOST = 400;
    public static final int ERROR = 500;

    /**
     * 如果传入对象是null，则返回400
     * 否则返回200
     * @param object
     * @param <T>
     * @return
     */
    public static <T> int nullObjcet(T object){
        if(object==null){return LOST;}
        return OK;
    }

    public static int isZero(int id) {
        return id==0 ? LOST : OK;
    }
}
