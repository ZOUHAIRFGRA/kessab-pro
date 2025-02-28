package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import uit.ac.ma.est.kessabpro.annotations.ValidateTransactionAmount;

public class TransactionAmountValidator implements ConstraintValidator<ValidateTransactionAmount,> {
    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        return false;
    }
}
