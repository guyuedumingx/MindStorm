package pojo.auxiliary;

import common.annontation.DbField;
import pojo.Project;

/**
 * 贡献者表对应的bean
 * @author yohoyes
 */
public class Contributor {
    @DbField("project_id")
    private int projectId;
    @DbField("contributor_id")
    private int contributorId;

    public Contributor(int projectId, int contributorId) {
        this.projectId = projectId;
        this.contributorId = contributorId;
    }

    public Contributor(){}

    public Contributor(int projectId) {
        this.projectId = projectId;
    }
    public Contributor(Project project){
        this.contributorId = project.getAuthor();
        this.projectId = project.getId();
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getContributorId() {
        return contributorId;
    }

    public void setContributorId(int contributorId) {
        this.contributorId = contributorId;
    }
}
