package pojo;

import common.annontation.DbField;
import common.annontation.DbFieldId;

/**
 * @author hoyoyes
 */
public class BaseModel {
    @DbFieldId
    @DbField("id")
    int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
