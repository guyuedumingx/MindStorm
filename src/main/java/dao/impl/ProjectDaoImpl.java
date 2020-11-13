package dao.impl;

import dao.BaseDaoImpl;
import dao.ProjectDao;
import pojo.Project;
import java.util.List;

/**
 * @author yohoyes
 */
public class ProjectDaoImpl extends BaseDaoImpl<Project> implements ProjectDao {

    @Override
    public String getTableName() {
        return "t_project";
    }

    @Override
    public String getQueryCondition(Project po) {
        String base = "id = " + po.getId();
        return base;
    }

    @Override
    public List<Project> searchProjects(String key, int operaId) {
        String sql = "select * from t_project where (public=true or author_id = "+operaId+") and (project_name like '%" + key + "%' or" +
                " introduction like '%" + key + "%')";
        return this.select(new Project(), sql);
    }

    @Override
    public List<Project> getPublicProjectsFromPages(int pages, int numsForPage) {
        int index = pages*numsForPage-numsForPage;
        String sql = "select * from t_project as p where public=true order by (select count(*) from t_star where node_id" +
                " = p.head_id) limit "+index+" ,"+(index+numsForPage);
        return this.select(new Project(), sql);
    }
}
