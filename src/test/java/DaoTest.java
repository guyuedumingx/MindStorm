import dao.NodeDao;
import dao.auxiliary.StarDao;
import dao.impl.NodeDaoImpl;
import dao.auxiliary.impl.StarDaoImpl;
import org.junit.Test;
import pojo.Node;
import pojo.auxiliary.Star;

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
    public void StarDaoTest() {
        StarDao dao = new StarDaoImpl();
        Star star = new Star();
        star.setNodeId(1);
        star.setUserId(1);
        dao.insertOne(star);
        dao.selectById(star);
    }
}
