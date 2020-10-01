package pojo;

import common.annontation.DbField;
import common.annontation.DbFieldId;

/**
 * 用户类
 * @author yohoyes
 */
public class User {
    @DbFieldId
    @DbField("user_id")
    private int userId;
    @DbField("exp")
    private int exp;
    @DbField("token")
    private int token;
    @DbField("recent_project")
    private int[] recentProject;
    @DbField("following")
    private int[] following;
    @DbField("follower")
    private int[] follower;
    @DbField("user_name")
    private String userName = "";
    @DbField("password")
    private String password = "";
    @DbField("user_avatar")
    private String userAvatar = "";
    @DbField("user_signature")
    private String userSignature = "";

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public int[] getRecentProject() {
        return recentProject;
    }

    public void setRecentProject(int[] recentProject) {
        this.recentProject = recentProject;
    }

    public int[] getFollowing() {
        return following;
    }

    public void setFollowing(int[] following) {
        this.following = following;
    }

    public int[] getFollower() {
        return follower;
    }

    public void setFollower(int[] follower) {
        this.follower = follower;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
    }
}
