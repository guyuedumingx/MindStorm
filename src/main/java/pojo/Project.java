package pojo;

/**
 * 项目类
 */
public class Project {
    private int projectId;
    private int projectRank;
    private int userId;
    private int headId;
    private int[] contributors;
    private boolean isPublic;
    private String introduction;
    private String projectName;
    private String createTime;
    private String deadline;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getProjectRank() {
        return projectRank;
    }

    public void setProjectRank(int projectRank) {
        this.projectRank = projectRank;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getHeadId() {
        return headId;
    }

    public void setHeadId(int headId) {
        this.headId = headId;
    }

    public int[] getContributors() {
        return contributors;
    }

    public void setContributors(int[] contributors) {
        this.contributors = contributors;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }
}
