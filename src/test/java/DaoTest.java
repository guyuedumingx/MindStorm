import dao.NodeDao;
import dao.impl.NodeDaoImpl;
import org.junit.Test;
import pojo.Node;

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
}
