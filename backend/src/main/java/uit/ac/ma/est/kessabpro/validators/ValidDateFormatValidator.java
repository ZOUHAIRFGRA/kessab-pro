package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import uit.ac.ma.est.kessabpro.annotations.ValidDateFormat;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class ValidDateFormatValidator implements ConstraintValidator<ValidDateFormat, String> {

    private String pattern;
    private String check;

    @Override
    public void initialize(ValidDateFormat constraintAnnotation) {
        this.pattern = constraintAnnotation.pattern();
        this.check = constraintAnnotation.check();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        if (s == null) {
            return true;
        }

        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        sdf.setLenient(false);

        try {
            Date parsedDate = sdf.parse(s);

            Calendar today = Calendar.getInstance();
            today.set(Calendar.HOUR_OF_DAY, 0);
            today.set(Calendar.MINUTE, 0);
            today.set(Calendar.SECOND, 0);
            today.set(Calendar.MILLISECOND, 0);
            Date todayMidnight = today.getTime();

            if ("PastOrPresent".equals(check)) {
                if (parsedDate.after(todayMidnight)) {
                    context.disableDefaultConstraintViolation();
                    context.buildConstraintViolationWithTemplate("The date must be in the past or present")
                            .addConstraintViolation();
                    return false;
                }
            } else if ("FutureOrPresent".equals(check)) {
                if (parsedDate.before(todayMidnight)) {
                    context.disableDefaultConstraintViolation();
                    context.buildConstraintViolationWithTemplate("The date must be in the future or present")
                            .addConstraintViolation();
                    return false;
                }
            }

            return true;
        } catch (Exception e) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Invalid date format. Expected format: " + pattern)
                    .addConstraintViolation();
            return false;
        }
    }
}
