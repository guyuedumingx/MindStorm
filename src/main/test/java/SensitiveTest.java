import common.util.SensitiveWordUtil;
import org.junit.Test;

public class SensitiveTest {
    @Test
    public void filter(){
        SensitiveWordUtil filter = SensitiveWordUtil.getInstance();
        String txt = "法论共法埨功法溣功法xx需要神进行检测的傻逼字符串神xxx";
        //如果需要过滤则用“”替换
        //如果需要屏蔽，则用“*”替换
        String hou = filter.replaceSensitiveWord(txt, 1, "*");
        System.out.println("替换前的文字为：" + txt);
        System.out.println("替换后的文字为：" + hou);
    }
}
