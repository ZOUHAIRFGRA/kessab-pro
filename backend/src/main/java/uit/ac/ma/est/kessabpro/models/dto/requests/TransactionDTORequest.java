package uit.ac.ma.est.kessabpro.models.dto.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;
import uit.ac.ma.est.kessabpro.annotations.EntityExists;
import uit.ac.ma.est.kessabpro.annotations.ValidDateFormat;
import uit.ac.ma.est.kessabpro.annotations.ValidEnum;
import uit.ac.ma.est.kessabpro.annotations.ValidateTransactionAmount;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.time.LocalDate;
import java.util.UUID;

public record TransactionDTORequest(
        @NotNull
        @ValidEnum(enumClass = PaymentMethod.class)
        String method,
        @NotNull
        @org.hibernate.validator.constraints.UUID(message = "must be a valid UUID")
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
