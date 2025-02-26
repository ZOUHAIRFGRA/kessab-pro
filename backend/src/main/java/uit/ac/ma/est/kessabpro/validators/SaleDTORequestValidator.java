package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.annotations.ValidateSaleDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.services.implementations.BuyerService;


public class SaleDTORequestValidator implements ConstraintValidator<ValidateSaleDTORequest, SaleDTORequest> {

    @Autowired
    BuyerRepository buyerRepository;


    @Override
    public boolean isValid(SaleDTORequest saleDTORequest, ConstraintValidatorContext constraintValidatorContext) {

        boolean isValid = true;

        if (saleDTORequest.buyer().fullName() == null  && saleDTORequest.buyer().id() == null) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("a buyer name or id must be provided.")
                    .addPropertyNode("buyer_id")
                    .addConstraintViolation();
            return false;
        }

        if (saleDTORequest.buyer().id() != null && buyerRepository.findById(saleDTORequest.buyer().id()).isEmpty()) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("the buyer id is not valid.")
                    .addPropertyNode("buyer_id")
                    .addConstraintViolation();
            isValid = false;
        }

        return isValid;

    }
}
