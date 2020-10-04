package common.util;

/**
 * 生成验证码
 */
public class AuthCodeUtil {

    public static String getAuthCodeUtil() {
        double v = 1 + Math.random() * 1000000 ;
        return (int)v+"";
    }
}
