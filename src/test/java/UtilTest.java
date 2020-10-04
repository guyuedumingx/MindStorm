import common.util.AuthCodeUtil;
import org.junit.Test;

public class UtilTest {

    @Test
    public void getAuthCodeTest() {
        String authCodeUtil = AuthCodeUtil.getAuthCodeUtil();
        System.out.println(authCodeUtil);
    }
}
