package pojo.auxiliary;

import common.annontation.DbField;

/**
 * 最近修改表对应的bean
 * @author yohoyes
 */
public class RecentEdit {
    @DbField("user_Id")
    private int userId;
    @DbField("node_id")
    private int nodeId;
    @DbField("edit_type")
    private String editType;
    @DbField("edit_time")
    private String editTime;

    public RecentEdit(int userId, int nodeId, String editType, String editTime) {
        this.userId = userId;
        this.nodeId = nodeId;
        this.editType = editType;
        this.editTime = editTime;
    }
    public RecentEdit(){}
    public RecentEdit(int userId){
        this.userId = userId;
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

    public String getEditType() {
        return editType;
    }

    public void setEditType(String editType) {
        this.editType = editType;
    }

    public String getEditTime() {
        return editTime;
    }

    public void setEditTime(String editTime) {
        this.editTime = editTime;
    }
}
