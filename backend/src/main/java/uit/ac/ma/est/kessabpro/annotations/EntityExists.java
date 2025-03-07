package uit.ac.ma.est.kessabpro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import uit.ac.ma.est.kessabpro.validators.EntityExistsValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EntityExistsValidator.class)
public @interface EntityExists {
    String message() default "Entity does not exist";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    Class<?> entityClass();

}
