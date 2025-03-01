package uit.ac.ma.est.kessabpro.helpers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateHelper {
    public static final String DEFAULT_PATTERN = "dd-MM-yyyy";
    public static LocalDate parseStringDate(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DateHelper.DEFAULT_PATTERN);
       return LocalDate.parse(dateString, formatter);
    }
}
