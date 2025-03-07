package uit.ac.ma.est.kessabpro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import uit.ac.ma.est.kessabpro.validators.ValidEnumValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidEnumValidator.class)
public @interface ValidEnum {
    String message() default "Invalid enum value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    Class<? extends Enum<?>> enumClass();
}
