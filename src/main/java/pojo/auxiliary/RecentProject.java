package pojo.auxiliary;

import common.annontation.DbField;

/**
 * 最近项目表对应的pojo
 * @author yohoyes
 */
public class RecentProject {
    @DbField("user_id")
    private int userId;
    @DbField("project_id")
    private int projectId;

    public RecentProject(int userId, int projectId) {
        this.userId = userId;
        this.projectId = projectId;
    }

    public RecentProject(){}

    public RecentProject(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
}
