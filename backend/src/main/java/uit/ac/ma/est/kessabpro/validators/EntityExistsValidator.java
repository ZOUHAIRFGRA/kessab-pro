package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.annotations.EntityExists;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.implementations.GenericRepositoryService;

import java.util.Optional;
import java.util.UUID;

public class EntityExistsValidator implements ConstraintValidator<EntityExists, UUID> {

    @Autowired
    SaleRepository saleRepository;
    @Autowired
    GenericRepositoryService genericRepositoryService;

    Class<?> entityClass;

    @Override
    public void initialize(EntityExists constraintAnnotation) {
        entityClass = constraintAnnotation.entityClass();
    }

    @Override
    public boolean isValid(UUID uuid, ConstraintValidatorContext constraintValidatorContext) {
        boolean isValid = true;
        if (uuid == null) return isValid;

        if (genericRepositoryService.getRepository(entityClass).findById(uuid).isEmpty()) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("sale_id is not valid");
            isValid = false;
        }
        ;
        return isValid;

    }
}
