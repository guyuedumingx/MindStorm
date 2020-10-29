package common.dto;

import java.io.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class SensitiveWordInit {
    // 字符编码
    private String ENCODING = "UTF-8";

    /**
     * 初始化敏感字库
     * @return
     */
    public Map initKeyWord() {
        // 读取敏感词库 ,存入Set中
        Set<String> wordSet = readSensitiveWordFile();
        // 将敏感词库加入到HashMap中
        return addSensitiveWordToHashMap(wordSet);
    }

    /**
     * 读取敏感词库 ,存入HashMap中
     * @return
     */
    private Set<String> readSensitiveWordFile() {
    Set<String> wordSet = null;
        //敏感词库
        InputStream is = SensitiveWordInit.class.getClassLoader().getResourceAsStream("keywords");
        try {

            // 读取文件输入流
            InputStreamReader read = new InputStreamReader(is,ENCODING);
            wordSet = new HashSet<String>();
            BufferedReader br = new BufferedReader(read);
            String txt = null;
            // 读取文件，将文件内容放入到set中
            while ((txt = br.readLine()) != null) {
                wordSet.add(txt);
            }
            br.close();
            // 关闭文件流
            read.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return wordSet;
    }


    /**
     * 将HashSet中的敏感词,存入HashMap中
     * @param wordSet
     * @return
     */
    private Map addSensitiveWordToHashMap(Set<String> wordSet) {
        // 初始化敏感词容器，减少扩容操作
        Map wordMap = new HashMap(wordSet.size());
        for (String word : wordSet) {
            Map nowMap = wordMap;
            for (int i = 0; i < word.length(); i++) {
                // 转换成char型
                char keyChar = word.charAt(i);
                // 获取
                Object tempMap = nowMap.get(keyChar);
                // 如果存在该key，直接赋值
                if (tempMap != null) {
                    nowMap = (Map) tempMap;
                }
                // 不存在则，则构建一个map，同时将isEnd设置为0，因为他不是最后一个
                else {
                    // 设置标志位
                    Map<String, String> newMap = new HashMap<String, String>();
                    newMap.put("isEnd", "0");
                    // 添加到集合
                    nowMap.put(keyChar, newMap);
                    nowMap = newMap;
                }
                // 最后一个
                if (i == word.length() - 1) {
                    nowMap.put("isEnd", "1");
                }
            }
        }
        return wordMap;
    }
}
