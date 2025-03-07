package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.constraints.*;
import uit.ac.ma.est.kessabpro.annotations.ValidDateFormat;
import uit.ac.ma.est.kessabpro.annotations.ValidEnum;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.validators.groups.onCreate;

public record TransactionDTORequest(
        @NotNull
        @ValidEnum(enumClass = PaymentMethod.class)
        String method,
        @NotNull(groups = onCreate.class)
        @org.hibernate.validator.constraints.UUID(message = "must be a valid UUID",groups = onCreate.class)
        String sale_id,
        @NotNull
        @Positive
        @DecimalMin("0.01")
        double amount,
        @NotNull
        @ValidDateFormat(pattern = "dd-MM-yyyy",check ="PastOrPresent")
        String transactionDate
) {
}
