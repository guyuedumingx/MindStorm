import common.util.ReflectUtil;
import org.junit.Test;
import pojo.Node;

import java.util.Map;

public class ReflectUtilTest {
    @Test
    public void getFieldTest() {
        try {
            Map<String, Object> fields = ReflectUtil.getParas(new Node());
            System.out.printf("ggoole");
        }catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
