package common.factory;

import dao.NodeDao;
import dao.ProjectDao;
import dao.UserDao;
import dao.auxiliary.impl.*;
import dao.impl.NodeDaoImpl;
import dao.impl.ProjectDaoImpl;
import dao.impl.UserDaoImpl;

/**
 *
 * @author yohoyes
 */
public class DaoFactory {
    public static UserDao getUserDao() {
        return new UserDaoImpl();
    }
    public static StarDaoImpl getStarDao() {
        return new StarDaoImpl();
    }
    public static ProjectDao getProjectDao() {
        return new ProjectDaoImpl();
    }
    public static NodeDao getNodeDao() {
        return new NodeDaoImpl();
    }
    public static ContributorDaoImpl getContributor(){
        return new ContributorDaoImpl();
    }
    public static FollowDaoImpl getFollowDao() {
        return new FollowDaoImpl();
    }
    public static RecentEditDaoImpl getRecentEditDao() {
        return new RecentEditDaoImpl();
    }
    public static RecentProjectDaoImpl getRecentProjectDao() {
        return new RecentProjectDaoImpl();
    }
}
