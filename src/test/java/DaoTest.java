import dao.NodeDao;
import dao.ProjectDao;
import dao.auxiliary.StarDao;
import dao.impl.NodeDaoImpl;
import dao.auxiliary.impl.StarDaoImpl;
import dao.impl.ProjectDaoImpl;
import org.junit.Test;
import pojo.Node;
import pojo.Project;
import pojo.auxiliary.Star;
import java.util.Date;

public class DaoTest {
    @Test
    public void BaseDaoImplTest() {

       NodeDao dao = new NodeDaoImpl();
       Node n = new Node(1,1,1,true,true,"google","google is");
       int i = dao.insertOne(n);
       Node node = new Node();
       node.setId(i);
       dao.selectById(node);
       node.setAuthor(3);
       node.setLastEditTime(null);
       dao.updateOne(node);
       dao.deleteOne(node.getId());
    }

    @Test
    public void projectDaoImplTest() {
        ProjectDao projectDao = new ProjectDaoImpl();
        String time = new Date().toString();
        Project p = new Project(1,1,1,true,"google","name name",time,time);
        int i = projectDao.insertOne(p);
    }

    @Test
    public void StarDaoTest() {
        StarDao dao = new StarDaoImpl();
        Star star = new Star();
        star.setNodeId(1);
        star.setUserId(1);
        dao.insertOne(star);
        dao.selectById(star);
    }
}
