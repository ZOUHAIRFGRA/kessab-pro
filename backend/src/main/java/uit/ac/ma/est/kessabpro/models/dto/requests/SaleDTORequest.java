package uit.ac.ma.est.kessabpro.models.dto.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.*;
import uit.ac.ma.est.kessabpro.annotations.ValidDateFormat;
import uit.ac.ma.est.kessabpro.annotations.ValidEnum;
import uit.ac.ma.est.kessabpro.annotations.ValidateSaleDTORequest;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;

@ValidateSaleDTORequest
public record SaleDTORequest(
        @NotEmpty(message = "At least one animal is required")
        @Valid
        List<AnimalDTORequest> animals,

        @NotNull(message = "details information must be provided")
        BuyerDTORequest buyer,

        @NotNull(message = "must be provided")
        @ValidDateFormat(pattern = "dd-MM-yyyy",check = "PastOrPresent")
        String saleDate,

        @NotNull(message = "must be provided")
        @PositiveOrZero(message = "must be zero or positive")
        Double agreedAmount,

        @NotNull(message = "Paid amount must be provided")
        @PositiveOrZero(message = "Paid amount must be zero or positive")
        Double paidAmount,

        @NotNull
        @ValidEnum(enumClass = PaymentMethod.class)
        String method
) {


}