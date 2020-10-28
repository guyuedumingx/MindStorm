package common.dto;


/**
 * 定义状态码
 * @author yohoyes
 */
public class StatusCode {
    /**
     * 成功的状态码
     */
    public static final int OK = 200;
    /**
     * 失败的状态码
     */
    public static final int LOST = 400;
    /**
     * 服务器内部错误的状态码
     */
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

    /**
     * 检测传入的值是不是0
     * 如果是0则证明操作失败
     * @param id
     * @return
     */
    public static int isZero(int id) {
        return id==0 ? LOST : OK;
    }
}
