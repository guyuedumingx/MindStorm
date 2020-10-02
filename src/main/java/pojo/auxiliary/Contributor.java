package pojo.auxiliary;

import common.annontation.DbField;

public class Contributor {
    @DbField("project_id")
    private int projectId;
    @DbField("contributor_id")
    private int contributorId;

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
