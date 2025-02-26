package uit.ac.ma.est.kessabpro.helpers;

import java.util.UUID;

public class ValidationHelper {
    public static boolean isValidUUID(String value) {
        try {
            UUID.fromString(value);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

}
