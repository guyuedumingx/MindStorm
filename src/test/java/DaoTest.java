import dao.NodeDao;
import dao.impl.NodeDaoImpl;
import org.junit.Test;
import pojo.Node;

public class DaoTest {
    @Test
    public void BaseDaoImplTest() {
       NodeDao dao = new NodeDaoImpl();
       Node node = new Node();
       node.setId(1);
       dao.selectById(node);
    }
}
