package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import uit.ac.ma.est.kessabpro.annotations.ValidateBuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;

public class ValidateSaleDTORequest implements ConstraintValidator<SaleDTORequestValidator, SaleDTORequest> {


    @Override
    public boolean isValid(SaleDTORequest saleDTORequest, ConstraintValidatorContext constraintValidatorContext) {
        return false;
    }
}
