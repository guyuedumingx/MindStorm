import common.util.MarkdownUtil;
import org.junit.Test;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

public class MarkdownTest {

    @Test
    public void writeToFileTest(){
        MarkdownUtil.write(488,88);
    }

    @Test
    public void writeProject(){
        File file = new File("1.md");
        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
            String md = MarkdownUtil.writeProject(100138, 88);
            byte[] bytes = md.getBytes();
            bos.write(bytes);
            bos.flush();
            bos.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
