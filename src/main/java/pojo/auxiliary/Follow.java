package pojo.auxiliary;

import common.annontation.DbField;

/**
 * 关注表对应的pojo
 * @author yohoyes
 */
public class Follow {
    @DbField("follower_id")
    private int follower;
    @DbField("following_id")
    private int following;

    public Follow(int follower, int following) {
        this.follower = follower;
        this.following = following;
    }
    public Follow(){}

    public int getFollower() {
        return follower;
    }

    public void setFollower(int follower) {
        this.follower = follower;
    }

    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }
}
