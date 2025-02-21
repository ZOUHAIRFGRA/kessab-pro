package uit.ac.ma.est.kessabpro.models.dto;

import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDTO {
    private UUID id;
    private List<UUID> animalIds;
    private UUID buyerId;
    private LocalDate saleDate;
    private double agreedAmount;
    private PaymentStatus paymentStatus;
}
