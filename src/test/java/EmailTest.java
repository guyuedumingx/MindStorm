import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import org.junit.Test;

public class EmailTest {
    @Test
    public void sendEmailTest() {
        EmailUtil.sendChPasswordEmail("1131993675@qq.com", AuthCodeUtil.getAuthCodeUtil());
    }
}
