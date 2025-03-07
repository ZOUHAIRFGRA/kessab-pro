package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import uit.ac.ma.est.kessabpro.annotations.ValidEnum;

import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ValidEnumValidator implements ConstraintValidator<ValidEnum,String> {

    private Class<? extends Enum<?>> enumClass;

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        this.enumClass = constraintAnnotation.enumClass();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return true;
        }
        try {
            Enum<?> enumValue = Enum.valueOf((Class<? extends Enum>) enumClass, s);
            return enumValue != null;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
