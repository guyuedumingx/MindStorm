package pojo;

import common.annontation.DbField;

/**
 * 项目类
 * @author yohoyes
 */
public class Project extends BaseModel{
    @DbField("project_rank")
    private int rank;
    @DbField("user_id")
    private int author;
    @DbField("head_id")
    private int headNodeId;
    @DbField("contributors")
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
    private String ddl = "";

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

    public String getDdl() {
        return ddl;
    }

    public void setDdl(String ddl) {
        this.ddl = ddl;
    }
}
