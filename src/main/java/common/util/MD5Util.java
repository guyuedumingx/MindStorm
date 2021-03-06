package common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * md5加密
 * @author yohoyes
 */
public class MD5Util {

    static Logger logger = LoggerFactory.getLogger(MD5Util.class);
    /**
     * 加密
     * @param in
     * @return
     */
    public static String getResult(String in) {
        byte[] b = in.getBytes();
        StringBuffer sb = new StringBuffer();
        try {
            MessageDigest md5 = MessageDigest.getInstance("md5");
            byte[] digest = md5.digest(b);
            char[] chars = new char[] { '0', '1', '2', '3', '4', '5',
                    '6', '7' , '8', '9', 'A', 'B', 'C', 'D', 'E','F' };
            for (byte bb : digest) {
                sb.append(chars[(bb >> 4) & 15]);
                sb.append(chars[bb & 15]);
            }
        } catch (NoSuchAlgorithmException e) {
            logger.error(e.getMessage());
        }
        return sb.toString();
    }
}
