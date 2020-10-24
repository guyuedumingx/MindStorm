import org.junit.Test;
import pojo.Node;
import service.NodeService;
import service.impl.NodeServiceImpl;

public class ServiceTest {
    NodeService service = new NodeServiceImpl();

    @Test
    public void getNodeTest(){
        Node node = service.getNode(100102, 47);
        System.out.println(node.isStared());
    }
}
