import common.util.EmailUtil;
import org.junit.Test;

public class EmailTest {
    @Test
    public void sendEmailTest() {
        EmailUtil.sendRegisterEmail("1131993675@qq.com","449034");
    }
}
