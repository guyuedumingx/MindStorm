package pojo.auxiliary;

import common.annontation.DbField;

/**
 * @author hoyoyes
 */
public class Star {
    @DbField("user_id")
    private int userId;
    @DbField("node_id")
    private int nodeId;

    public Star(int userId, int nodeId) {
        this.userId = userId;
        this.nodeId = nodeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getNodeId() {
        return nodeId;
    }

    public void setNodeId(int nodeId) {
        this.nodeId = nodeId;
    }
}
