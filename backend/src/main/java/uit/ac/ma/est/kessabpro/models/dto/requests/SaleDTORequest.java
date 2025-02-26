package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import uit.ac.ma.est.kessabpro.annotations.ValidateSaleDTORequest;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@ValidateSaleDTORequest
public record SaleDTORequest(
        @NotEmpty(message = "At least one animal is required")
        @Valid
        List<AnimalDTORequest> animals,

        @NotNull(message = "Buyer information must be provided")
        @Valid
        BuyerDTORequest buyer,

        @NotNull(message = "Sale date must be provided")
        @PastOrPresent(message = "Sale date cannot be in the future")
        LocalDate saleDate,

        @NotNull(message = "Agreed amount must be provided")
        @PositiveOrZero(message = "Agreed amount must be zero or positive")
        @Digits(integer = 10, fraction = 2, message = "Invalid agreed amount format")
        BigDecimal agreedAmount,

        @NotNull(message = "Paid amount must be provided")
        @PositiveOrZero(message = "Paid amount must be zero or positive")
        @Digits(integer = 10, fraction = 2, message = "Invalid paid amount format")
        BigDecimal paidAmount
) {

//        @AssertTrue(message = "Paid amount cannot exceed agreed amount")
//        public boolean isValidPaidAmount() {
//                if (paidAmount == null || agreedAmount == null) {
//                        return true; // Let @NotNull handle this case
//                }
//                return paidAmount.compareTo(agreedAmount) <= 0;
//        }
}