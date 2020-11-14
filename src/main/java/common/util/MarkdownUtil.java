package common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pojo.Node;
import pojo.Project;
import service.NodeService;
import service.ProjectService;
import service.impl.NodeServiceImpl;
import service.impl.ProjectServiceImpl;
import service.impl.UserServiceImpl;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 生成markdown
 * @author yohoyes
 */
public class MarkdownUtil {

    static NodeService nodeService = new NodeServiceImpl();
    static ProjectService projectService = new ProjectServiceImpl();
    static Logger logger = LoggerFactory.getLogger(MarkdownUtil.class);
    static Project project;

    public static void write(int nodeId, int userId){
        File file = new File("1.md");
        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
            String md = createMd(nodeId, userId);
            byte[] bytes = md.getBytes();
            bos.write(bytes);
            bos.flush();
            bos.close();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }

    private static void back(HttpServletResponse resp,String md){
        try {
            ServletOutputStream outputStream = resp.getOutputStream();
            String fileName = project.getName();
            Pattern pattern;
            pattern = Pattern.compile("[\u4E00-\u9FA5|\\！|\\,|\\。|\\（|\\）|\\《|\\》|\\“|\\”|\\？|\\：|\\；|\\【|\\】]+");
            Matcher matcher = pattern.matcher(fileName);
            while (matcher.find()) {
                String mStr = matcher.group();
                try {
                    fileName = fileName.replaceFirst(mStr, URLEncoder.encode(mStr, "UTF-8"));
                } catch (Exception e) {

                }
            }
            resp.setContentType("multipart/form-data;charset=UTF-8;");
            resp.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xmind");
            byte[] bytes = md.getBytes();
            outputStream.write(bytes);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }

    public static void writePart(int nodeId, int userId, HttpServletResponse resp){
        String md = createMd(nodeId, userId);
        back(resp,md);
    }

    public static void writeProject(int projectId, int userId, HttpServletResponse resp){
        project = projectService.getProject(projectId);
        String md = build(project.getHeadNodeId(), userId, 1);
        back(resp,md+addFootNote());
    }

    public static String writeProject(int projectId, int userId){
        project = projectService.getProject(projectId);
        return build(project.getHeadNodeId(), userId, 1)+addFootNote();
    }

    private static String build(int root,int userId, int level){
        Node node = nodeService.getNode(root, userId);
        if(node==null){
            return "";
        }
        int[] children = node.getChildren();
        String s = oneNodeString(node, level);
        for(int child : children){
           s += build(child,userId,++level);
        }
        return s;
    }

    private static String oneNodeString(Node node, int level){
        StringBuilder sb = new StringBuilder();
        sb.append(prefix(level,node.getTheme()));
        sb.append("\n");
        sb.append("> "+node.getContent()+"  ");
        sb.append("\n");
        sb.append("\n");
        return sb.toString();
    }

    private static String createMd(int nodeId, int userId){
        Stack<Node> stack = new Stack<>();
        Node root = nodeService.getNode(nodeId,userId);
        Node leaf = root;
        while (leaf!=null){
            stack.push(leaf);
            leaf = nodeService.getNode(leaf.getParentId(),userId);
        }
        StringBuilder sb = new StringBuilder();
        for (int level=1;!stack.isEmpty();level++){
            Node pop = stack.pop();
            String s = oneNodeString(pop, level);
            sb.append(s);
        }
        project = projectService.getProject(root.getProjectId());
        sb.append(addFootNote());
        return sb.toString();
    }

    /**
     * 添加项目脚注
     * @return
     */
    private static String addFootNote(){
        StringBuilder sb = new StringBuilder();
        sb.append("-----\n");
        sb.append("作者: `"+new UserServiceImpl().getUser(project.getAuthor()).getName() +"`  \n");
        Date date = new Date();
        date.setTime(Long.valueOf(project.getCreateTime()));
        sb.append("项目创建时间: `"+new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date)+"`  \n");
        if(project.isPublic()){
            sb.append("** 此为开源项目,未经作者同意不得用于商业用途! **  \n");
        }
        return sb.toString();
    }


    /**
     * 加markdown修饰符
     * @param level
     * @param msg
     * @return
     */
    private static String prefix(int level,String msg){
        switch (level){
            case 1:
                return "## " + msg + "  ";
            case 2:
                return "### " + msg + "  ";
            case 3:
                return "#### " + msg + "  ";
            case 4:
                return "##### " + msg + "  ";
            case 5:
                return "###### " + msg + "  ";
            case 6:
                return "** " + msg + " **  ";
            default:
                return "* " + msg + " *  ";
        }
    }
}
