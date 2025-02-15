package uit.ac.ma.est.kessabpro.models.dto.responses;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record AnimalDTOResponse(
         UUID id,
         String tag,
         String sex,
         LocalDate birthDate,
         BigDecimal price,
         BigDecimal weight,
         List<String> gallery
//         SaleDTOResponse sale
) {
}
