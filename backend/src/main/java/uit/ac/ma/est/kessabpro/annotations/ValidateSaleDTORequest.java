package uit.ac.ma.est.kessabpro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import uit.ac.ma.est.kessabpro.validators.SaleDTORequestValidator;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SaleDTORequestValidator.class)
public @interface ValidateSaleDTORequest {

    public String message() default "Invalid sale DTO";
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
