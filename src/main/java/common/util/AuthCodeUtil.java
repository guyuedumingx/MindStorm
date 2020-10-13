package common.util;

/**
 * 生成验证码
 */
public class AuthCodeUtil {

    public static String getAuthCodeUtil() {
        double v = 100000 + Math.random() * 900000 ;
        return (int)v+"";
    }
}
