package common.util;

import org.xmind.core.*;
import pojo.Node;
import pojo.Project;
import service.NodeService;
import service.ProjectService;
import service.impl.NodeServiceImpl;
import service.impl.ProjectServiceImpl;
import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;

public class XmindUtil {
    static NodeService nodeService = new NodeServiceImpl();
    static ProjectService projectService = new ProjectServiceImpl();
    static IWorkbookBuilder builder = null;
    static int projectId;
    static int userId;

    static {
        builder = Core.getWorkbookBuilder();
    }

    public static int getWorkBook(String path, int id){
       userId = id;
        IWorkbook workbook = null;
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
        IWorkbook workbook = null;
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
        //project.setIntroduction(sheet.getRootTopic().getNotes().toString());
        project.setDeadline(System.currentTimeMillis()+"");
        return projectService.newProject(project,false);
    }
}
