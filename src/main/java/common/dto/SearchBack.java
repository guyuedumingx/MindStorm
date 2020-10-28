package common.dto;

import pojo.Project;

import java.util.List;

public class SearchBack {
    private int status_code;
    private List<Project> result = null;

    public int getStatus_code() {
        return status_code;
    }

    public void setStatus_code(int status_code) {
        this.status_code = status_code;
    }

    public List<Project> getResult() {
        return result;
    }

    public void setResult(List<Project> result) {
        this.result = result;
    }
}
