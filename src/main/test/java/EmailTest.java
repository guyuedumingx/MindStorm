import common.util.AuthCodeUtil;
import common.util.EmailUtil;
import org.junit.Test;
import service.impl.ProjectServiceImpl;

public class EmailTest {
    @Test
    public void sendEmailTest() {
        String str = "1808078515@qq.com";
        String str2 = "1131993675@qq.com";
        EmailUtil.sendChPasswordEmail(str, AuthCodeUtil.getAuthCodeUtil());
        EmailUtil.sendRegisterEmail(str, AuthCodeUtil.getAuthCodeUtil());
//        EmailUtil.sendEmailForDeadline(str2,new ProjectServiceImpl().getProject(100112));
    }

    public static void main(String[] args) {
        new EmailTest().sendEmailTest();
    }
}
