package pojo.auxiliary;

import common.annontation.DbField;

public class RecentEdit {
    @DbField("user_Id")
    private int userId;
    @DbField("node_id")
    private int nodeId;
    @DbField("edit_type")
    private String editType;
    @DbField("edit_time")
    private String eidtTime;

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

    public String getEditType() {
        return editType;
    }

    public void setEditType(String editType) {
        this.editType = editType;
    }

    public String getEidtTime() {
        return eidtTime;
    }

    public void setEidtTime(String eidtTime) {
        this.eidtTime = eidtTime;
    }
}
