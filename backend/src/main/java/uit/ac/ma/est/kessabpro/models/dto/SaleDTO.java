package uit.ac.ma.est.kessabpro.models.dto;

import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDTO {
    private UUID id;
    private UUID animalId; // Reference to the Animal
    private UUID buyerId;  // Reference to the Buyer
    private LocalDate saleDate;
    private BigDecimal agreedAmount;
    private PaymentStatus paymentStatus;
}
