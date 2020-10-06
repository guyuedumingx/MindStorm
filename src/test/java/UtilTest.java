import common.util.AuthCodeUtil;
import common.util.MD5Util;
import org.junit.Test;

public class UtilTest {

    @Test
    public void getAuthCodeTest() {
        String authCodeUtil = AuthCodeUtil.getAuthCodeUtil();
        System.out.println(authCodeUtil);
    }
    @Test
    public void Md5Test() {
        String result = MD5Util.getResult("思维风暴");
    }
}
