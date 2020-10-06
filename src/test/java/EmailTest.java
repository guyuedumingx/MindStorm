import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import org.junit.Test;

public class EmailTest {
    @Test
    public void sendEmailTest() {
        EmailUtil.sendChPasswordEmail("1808078515@qq.com", AuthCodeUtil.getAuthCodeUtil());
        EmailUtil.sendRegisterEmail("1808078515@qq.com", AuthCodeUtil.getAuthCodeUtil());
    }
}
