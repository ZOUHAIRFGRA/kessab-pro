package uit.ac.ma.est.kessabpro.models.dto.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
import jakarta.annotation.Nullable;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record SaleDTOResponse(
        UUID id,
         BuyerDTOResponse buyer,
        @JsonFormat(pattern = "dd-MM-yyyy")
        LocalDate saleDate,
         BigDecimal agreedAmount,
         PaymentStatus paymentStatus,
         List<AnimalDTOResponse> animals
){

}
