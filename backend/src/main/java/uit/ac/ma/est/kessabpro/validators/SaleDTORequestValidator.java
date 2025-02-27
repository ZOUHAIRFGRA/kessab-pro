package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.annotations.ValidateSaleDTORequest;
import uit.ac.ma.est.kessabpro.helpers.ValidationHelper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.AnimalDTORequest;
import uit.ac.ma.est.kessabpro.repositories.AnimalCategoryRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;

import java.util.UUID;

public class SaleDTORequestValidator implements ConstraintValidator<ValidateSaleDTORequest, SaleDTORequest> {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalCategoryRepository animalCategoryRepository;

    @Override
    public boolean isValid(SaleDTORequest saleDTORequest, ConstraintValidatorContext constraintValidatorContext) {
        boolean isValid = true;

        if (saleDTORequest == null || saleDTORequest.buyer() == null || saleDTORequest.animals() == null || saleDTORequest.animals().isEmpty()) {
            return isValid ;
        }

        if (saleDTORequest.buyer().fullName() == null && saleDTORequest.buyer().id() == null) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("A buyer name or id must be provided.")
                    .addPropertyNode("buyer_id")
                    .addConstraintViolation();
            return false;
        }

        if (saleDTORequest.buyer().id() != null && buyerRepository.findById(saleDTORequest.buyer().id()).isEmpty()) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("The buyer id is not valid.")
                    .addPropertyNode("buyer_id")
                    .addConstraintViolation();
            isValid = false;
        }

        for (AnimalDTORequest animal : saleDTORequest.animals()) {
            if (animal.id() == null && animal.tag() == null) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("An animal id or tag must be provided.")
                        .addPropertyNode("animals")
                        .addConstraintViolation();
                isValid = false;
            }

            if (animal.id() == null && animal.category() == null) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("The category  is required.")
                        .addPropertyNode("animals")
                        .addConstraintViolation();
                isValid = false;
            }

            if (animal.category() != null && ValidationHelper.isValidUUID(String.valueOf(animal.category())) && animalCategoryRepository.findById(animal.category()).isEmpty()) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("The category  is not valid.")
                        .addPropertyNode("animals")
                        .addConstraintViolation();
                isValid = false;
            }

            if (animal.id() != null && animalRepository.findById(animal.id()).isEmpty() && animalRepository.findById(animal.id()).get().getPickUpDate() != null) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("The animal id is not valid.")
                        .addPropertyNode("animals")
                        .addConstraintViolation();
                isValid = false;
            }




        }


        if (saleDTORequest.paidAmount().doubleValue() > saleDTORequest.agreedAmount()){
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("paid amount should not surpass agreed amount.")
                    .addPropertyNode("sale_detail")
                    .addConstraintViolation();
             isValid = false;
        }



        return isValid;
    }
}