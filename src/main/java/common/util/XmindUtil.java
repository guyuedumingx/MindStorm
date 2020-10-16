package common.util;

import org.xmind.core.*;
import pojo.Node;
import pojo.Project;
import service.NodeService;
import service.ProjectService;
import service.impl.NodeServiceImpl;
import service.impl.ProjectServiceImpl;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.Iterator;
import java.util.Set;

/**
 * 与xmind互转工具类
 * @author yohoyes
 */
public class XmindUtil {
    static NodeService nodeService = new NodeServiceImpl();
    static ProjectService projectService = new ProjectServiceImpl();
    static IWorkbookBuilder builder = null;
    static IWorkbook workbook;
    static Project project;
    static int projectId;
    static int userId;

    static {
        builder = Core.getWorkbookBuilder();
    }

    public static int getWorkBook(String path, int id){
       userId = id;
        try {
            workbook = builder.loadFromPath(path);
        }catch (Exception e) {
            e.printStackTrace();
        }
        ISheet primarySheet = workbook.getPrimarySheet();
        projectId = addProject(primarySheet);
        ITopic rootTopic = primarySheet.getRootTopic();
        int rootId = createNodes(rootTopic, 0);
        project = projectService.getProject(projectId);
        project.setHeadNodeId(rootId);
        projectService.chProject(project);
        return projectId;
    }

    public static int getWorkBook(InputStream in) {
        //userId = Integer.valueOf(req.getParameter("user_id"));
        userId = 1;
        try {
            workbook = builder.loadFromStream(in);
        }catch (Exception e) {
            e.printStackTrace();
        }
        ISheet primarySheet = workbook.getPrimarySheet();
        projectId = addProject(primarySheet);
        ITopic rootTopic = primarySheet.getRootTopic();
        int rootId = createNodes(rootTopic, 0);
        project = projectService.getProject(projectId);
        project.setHeadNodeId(rootId);
        projectService.chProject(project);
        return projectId;
    }

    private static int createNodes(ITopic topic, int parentId){
        int nodeId = addNode(topic, parentId);
        Iterator<ITopic> iterator = topic.getAllChildrenIterator();
        while (iterator.hasNext()){
            createNodes(iterator.next(),nodeId);
        }
        return nodeId;
    }

    private static int addNode(ITopic topic, int parendId) {
        Node node = new Node();
        node.setTheme(topic.getTitleText());
        node.setAuthor(userId);
        node.setLastEditTime(System.currentTimeMillis()+"");
        node.setEditable(true);
        node.setProjectId(projectId);
        node.setParentId(parendId);
        node.setNameless(false);
        node.setLastEditId(userId);
        node.setContent(lablesToString(topic));
        return nodeService.newNode(node);
    }

    private static String lablesToString(ITopic topic){
        Set<String> labels = topic.getLabels();
        Iterator<String> iterator = labels.iterator();
        StringBuilder str = new StringBuilder();
        while (iterator.hasNext()){
            str.append(iterator.next());
        }
        return str.toString();
    }

    private static int addProject(ISheet sheet){
        project = new Project();
        project.setAuthor(userId);
        project.setCreateTime(System.currentTimeMillis()+"");
        project.setName(sheet.getRootTopic().getTitleText());
        project.setPublic(false);
        project.setRank(1);
        project.setIntroduction(sheet.getRootTopic().getNotes().toString());
        project.setDeadline(System.currentTimeMillis()+"");
        return projectService.newProject(project,false);
    }

    private static void createXmind(int projectId) {
        project = projectService.getProject(projectId);
        int rootId = project.getHeadNodeId();
        workbook = builder.createWorkbook();
        ISheet sheet = workbook.getPrimarySheet();
        Node rootNode = nodeService.getNode(rootId);
        ITopic rootTopic = sheet.getRootTopic();
        rootTopic.setTitleText(rootNode.getTheme());
        writeITopics(rootTopic, rootNode);
    }

    public static void write(int projectId, HttpServletResponse resp){
        createXmind(projectId);
        resp.setContentType("multipart/form-data");
        resp.setHeader("Content-Disposition", "attachment;filename=" + project.getName() + ".xmind");
        try {
            workbook.save(resp.getOutputStream());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void write(int projectId, String path){
        createXmind(projectId);
        try {
            workbook.save(path + project.getName() + ".xmind");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static ITopic writeITopics(ITopic root, Node node){
        int[] children = node.getChildren();
        if(children==null){return root;}

        for (int n : children) {
            Node child = nodeService.getNode(n);
            ITopic topic = workbook.createTopic();
            topic.setTitleText(child.getTheme());
            topic.addLabel(child.getContent());
            root.add(topic);
            writeITopics(topic,child);
        }
        return root;
    }
}
