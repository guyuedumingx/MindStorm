import common.util.AuthCodeUtil;
import common.util.MD5Util;
import common.util.XmindUtil;
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

    @Test
    public void xmindTest(){
        XmindUtil.getWorkBook("2.xmind",1);
    }

    @Test
    public void saveXmindTest(){
        XmindUtil.write(19,"");
    }
}
