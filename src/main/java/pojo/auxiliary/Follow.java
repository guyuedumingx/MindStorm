package pojo.auxiliary;

import common.annontation.DbField;

public class Follow {
    @DbField("follow_id")
    private int follower;
    @DbField("following_id")
    private int following;

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
