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
    private String token;
    private Integer[] recentProject;
    private Integer[] following;
    private Integer[] follower;
    @DbField("user_name")
    private String name = "";
    @DbField("user_email")
    private String email = "";
    @DbField("password")
    private String password = "";
    @DbField("user_avatar")
    private String userAvatar = "";
    @DbField("user_signature")
    private String userSignature = "";

    public User() {}

    public User(int id){
        this.setId(id);
    }

    public User(String email) {this.email = email;}

    public User(int exp, String token, String name, String password, String userAvatar, String userSignature, String email) {
        this.exp = exp;
        this.token = token;
        this.name = name;
        this.password = password;
        this.userAvatar = userAvatar;
        this.userSignature = userSignature;
        this.email = email;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer[] getRecentProject() {
        return recentProject;
    }

    public void setRecentProject(Integer[] recentProject) {
        this.recentProject = recentProject;
    }

    public Integer[] getFollowing() {
        return following;
    }

    public void setFollowing(Integer[] following) {
        this.following = following;
    }

    public Integer[] getFollower() {
        return follower;
    }

    public void setFollower(Integer[] follower) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
