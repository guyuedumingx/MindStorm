package pojo;

import common.annontation.DbField;


/**
 * 项目类
 * @author yohoyes
 */
public class Project extends BaseModel{
    @DbField("project_rank")
    private int rank;
    @DbField(value = "author_id",update = false)
    private int author;
    @DbField(value = "head_id")
    private int headNodeId;
    private int[] contributors;
    @DbField("public")
    private boolean isPublic;
    @DbField("introduction")
    private String introduction = "请输入内容";
    @DbField("project_name")
    private String name = "请输入内容";
    @DbField(value = "create_time",update = false)
    private String createTime = "";
    @DbField("deadline")
    private String deadline = "";
    private String creatorName = "";
    @DbField("password")
    private String password = "";
    private int numbers;

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
    public Project(int rank, int author, int headNodeId, boolean isPublic, String introduction, String name, String createTime, String deadline, String password) {
        this.rank = rank;
        this.author = author;
        this.headNodeId = headNodeId;
        this.isPublic = isPublic;
        this.introduction = introduction;
        this.name = name;
        this.createTime = createTime;
        this.deadline = deadline;
        this.password = password;
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

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public int getNumbers() {
        return numbers;
    }

    public void setNumbers(int numbers) {
        this.numbers = numbers;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

