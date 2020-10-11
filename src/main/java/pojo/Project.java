package pojo;

import common.annontation.DbField;


/**
 * 项目类
 * @author yohoyes
 */
public class Project extends BaseModel{
    @DbField("project_rank")
    private int rank;
    @DbField("author_id")
    private int author;
    @DbField("head_id")
    private int headNodeId;
    private int[] contributors;
    @DbField("public")
    private boolean isPublic;
    @DbField("introduction")
    private String introduction = "请输入内容";
    @DbField("project_name")
    private String name = "请输入内容";
    @DbField("create_time")
    private String createTime = "";
    @DbField("deadline")
    private String deadline = "";

    public Project() {}
    public Project(int id) {this.id = id;}

    public Project(int rank, int author, int headNodeId, boolean isPublic, String introduction, String name, String createTime, String deadline) {
        this.rank = rank;
        this.author = author;
        this.headNodeId = headNodeId;
        this.isPublic = isPublic;
        this.introduction = introduction;
        this.name = name;
        this.createTime = createTime;
        this.deadline = deadline;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getAuthor() {
        return author;
    }

    public void setAuthor(int author) {
        this.author = author;
    }

    public int getHeadNodeId() {
        return headNodeId;
    }

    public void setHeadNodeId(int headNodeId) {
        this.headNodeId = headNodeId;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
