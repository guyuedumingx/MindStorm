import dao.NodeDao;
import dao.ProjectDao;
import dao.UserDao;
import dao.auxiliary.impl.RecentEditDaoImpl;
import dao.impl.NodeDaoImpl;
import dao.auxiliary.impl.StarDaoImpl;
import dao.impl.ProjectDaoImpl;
import dao.impl.UserDaoImpl;
import org.junit.Test;
import pojo.Node;
import pojo.Project;
import pojo.User;
import pojo.auxiliary.RecentEdit;
import pojo.auxiliary.Star;
import java.util.Date;
import java.util.List;

public class DaoTest {
    @Test
    public void BaseDaoImplTest() {

       NodeDao dao = new NodeDaoImpl();
       Node n = new Node(1,1,1,true,true,"google","google is");
       int i = dao.insertOne(n);
       Node node = new Node();
       node.setId(i);
       dao.selectOne(node);
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
        Project project = new Project();
        project.setId(i);
        projectDao.selectOne(project);
        project.setAuthor(2);
        projectDao.updateOne(project);
        projectDao.deleteOne(project.getId());
    }

    @Test
    public void userDaoImplTest() {
        UserDao dao = new UserDaoImpl();
        User user = new User(0, 1, "yohoyes", "111", "default.png", "gooel","11@qq.com");
        int i = dao.insertOne(user);
        User u = new User(i);
        u.setId(20);
        dao.selectOne(u);
        u.setExp(1);
        dao.updateOne(u);
        dao.deleteOne(u);
    }

    @Test
    public void StarDaoTest() {
        StarDaoImpl dao = new StarDaoImpl();
        Star star = new Star(1,1);
        dao.insertOne(star);
        dao.selectOne(star);
        Star s = new Star(1);
        List<Star> stars = dao.selectObjectList(s);
        dao.deleteOne(star);
    }

    @Test
    public void RecentEditDaoTest(){
        RecentEdit edit = new RecentEdit(1,1,"insert",new Date().toString());
        RecentEditDaoImpl dao = new RecentEditDaoImpl();
        dao.insertOne(edit);
        dao.selectOne(edit);
    }
}
