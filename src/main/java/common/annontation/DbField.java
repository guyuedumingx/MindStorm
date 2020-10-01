package common.annontation;

import java.lang.annotation.*;

/**
 * @author yohoyes
 */

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface DbField {
    String value();
}
