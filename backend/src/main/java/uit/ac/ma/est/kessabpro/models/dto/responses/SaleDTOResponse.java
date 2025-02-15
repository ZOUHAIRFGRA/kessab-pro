package uit.ac.ma.est.kessabpro.models.dto.responses;

import uit.ac.ma.est.kessabpro.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record SaleDTOResponse(
        UUID id,
         BuyerDTOResponse buyer,
         LocalDate saleDate,
         BigDecimal agreedAmount,
         PaymentStatus paymentStatus,
         List<AnimalDTOResponse> animals
){

}
