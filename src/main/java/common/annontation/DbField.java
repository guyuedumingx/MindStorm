package common.annontation;

import java.lang.annotation.*;

/**
 * 定义该注解，使bean对象的成员变量与对应表中的字段相对应
 * @author yohoyes
 */

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface DbField {
    String value();
    boolean insertIgnore() default false;
    boolean update() default true;
}
