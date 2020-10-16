package common.util;

import org.xmind.core.*;
import pojo.Node;
import pojo.Project;
import service.NodeService;
import service.ProjectService;
import service.impl.NodeServiceImpl;
import service.impl.ProjectServiceImpl;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Iterator;

public class XmindUtil {
    static NodeService nodeService = new NodeServiceImpl();
    static ProjectService projectService = new ProjectServiceImpl();
    static IWorkbookBuilder builder = null;
    static IWorkbook workbook;
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
        Project project = projectService.getProject(projectId);
        project.setHeadNodeId(rootId);
        projectService.chProject(project);
        return projectId;
    }

    public static int getWorkBook(HttpServletRequest req) {
        userId = Integer.valueOf(req.getParameter("user_id"));
        try {
            workbook = builder.loadFromStream(req.getInputStream());
        }catch (Exception e) {
            e.printStackTrace();
        }
        ISheet primarySheet = workbook.getPrimarySheet();
        projectId = addProject(primarySheet);
        ITopic rootTopic = primarySheet.getRootTopic();
        int rootId = createNodes(rootTopic, 0);
        Project project = projectService.getProject(projectId);
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
        return nodeService.newNode(node);
    }

    private static int addProject(ISheet sheet){
        Project project = new Project();
        project.setAuthor(userId);
        project.setCreateTime(System.currentTimeMillis()+"");
        project.setName(sheet.getRootTopic().getTitleText());
        project.setPublic(false);
        project.setRank(1);
        project.setIntroduction(sheet.getRootTopic().getNotes().toString());
        project.setDeadline(System.currentTimeMillis()+"");
        return projectService.newProject(project,false);
    }

    public static void writToXmind(int projectId) {
        Project project = projectService.getProject(projectId);
        int rootId = project.getHeadNodeId();
        workbook = builder.createWorkbook();
        ISheet sheet = workbook.createSheet();
        Node rootNode = nodeService.getNode(rootId);
        ITopic rootTopic = sheet.getRootTopic();
        rootTopic.setTitleText(rootNode.getTheme());
        writeITopics(rootTopic,rootNode);
        try {
            workbook.save(project.getName() + ".xmind");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void writeITopics(ITopic root, Node node){
        int[] children = node.getChildren();
        if(children==null){return;}

        for (int n : children) {
            Node child = nodeService.getNode(n);
            ITopic topic = workbook.createTopic();
            topic.setTitleText(child.getTheme());
            root.add(topic);
            writeITopics(topic,child);
        }
    }
}
