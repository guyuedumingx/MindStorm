package pojo;

import common.annontation.DbField;

/**
 * 用户类
 * @author yohoyes
 */
public class User extends BaseModel {
    @DbField("exp")
    private int exp;
    @DbField("token")
    private int token;
    private int[] recentProject;
    private int[] following;
    private int[] follower;
    @DbField("user_name")
    private String name = "";
    @DbField("password")
    private String password = "";
    @DbField("user_avatar")
    private String userAvatar = "";
    @DbField("user_signature")
    private String userSignature = "";

    public User(int exp, int token, String name, String password, String userAvatar, String userSignature) {
        this.exp = exp;
        this.token = token;
        this.name = name;
        this.password = password;
        this.userAvatar = userAvatar;
        this.userSignature = userSignature;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
