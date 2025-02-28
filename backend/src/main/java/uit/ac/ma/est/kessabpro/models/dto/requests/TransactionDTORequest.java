package uit.ac.ma.est.kessabpro.models.dto.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import uit.ac.ma.est.kessabpro.annotations.EntityExists;
import uit.ac.ma.est.kessabpro.annotations.ValidateSaleID;
import uit.ac.ma.est.kessabpro.annotations.ValidateTransactionAmount;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.time.LocalDate;
import java.util.UUID;

public record TransactionDTORequest(
        @NotNull
        PaymentMethod method ,
        @NotNull
        @EntityExists(entityClass = Sale.class)
        UUID sale_id,
        @NotNull
        @Positive
        @DecimalMin("0.01")
        @ValidateTransactionAmount
        double amount,
        @JsonFormat(pattern = "dd-MM-yyyy")
        LocalDate transactionDate
) {
}
