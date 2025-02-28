package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.annotations.EntityExists;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;

import java.util.UUID;

public class EntityExistsValidator implements ConstraintValidator<EntityExists, UUID> {

    @Autowired
    SaleRepository saleRepository;
    @Override
    public boolean isValid(UUID uuid, ConstraintValidatorContext constraintValidatorContext) {
        boolean isValid = true;
        if (saleRepository.findById(uuid).isEmpty()) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("Sale ID not found").addPropertyNode("sale_id").addConstraintViolation();
            isValid = false;
        }
        return isValid;

    }
}
