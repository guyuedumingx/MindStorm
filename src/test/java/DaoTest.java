import dao.NodeDao;
import dao.impl.NodeDaoImpl;
import org.junit.Test;

public class DaoTest {
    @Test
    public void BaseDaoImplTest() {
       NodeDao dao = new NodeDaoImpl();
       dao.selectById(111);
    }
}
