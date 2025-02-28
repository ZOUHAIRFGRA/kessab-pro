package uit.ac.ma.est.kessabpro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import uit.ac.ma.est.kessabpro.validators.TransactionAmountValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.UUID;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TransactionAmountValidator.class)
public @interface ValidateTransactionAmount {
    public String message() default "Invalid amount DTO";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
