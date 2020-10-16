package common.util;


import org.xmind.core.*;

import java.io.IOException;

public class XmindUtil {
    IWorkbookBuilder builder = Core.getWorkbookBuilder();//初始化builder
    IWorkbook workbook = null;
    
   static {
       try {
           workbook = builder.loadFromPath(path);//打开XMind文件
       } catch (
               IOException e) {
           e.printStackTrace();
       } catch (
               CoreException e) {
           e.printStackTrace();
       }
       ISheet defSheet = workbook.getPrimarySheet();//获取主Sheet
       rootTopic = defSheet.getRootTopic(); //获取根Topic
   }
}
