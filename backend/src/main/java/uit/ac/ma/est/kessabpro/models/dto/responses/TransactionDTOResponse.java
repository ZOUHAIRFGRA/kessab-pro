package uit.ac.ma.est.kessabpro.models.dto.responses;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record TransactionDTOResponse(
        UUID id,
        LocalDate transactionDate,
        BigDecimal amount,
        String method
) {

}
