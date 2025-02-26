package uit.ac.ma.est.kessabpro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import uit.ac.ma.est.kessabpro.validators.BuyerDTORequestValidator;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = BuyerDTORequestValidator.class)
public @interface ValidateBuyerDTORequest {

    public String message() default "Invalid Buyer DTO";
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
