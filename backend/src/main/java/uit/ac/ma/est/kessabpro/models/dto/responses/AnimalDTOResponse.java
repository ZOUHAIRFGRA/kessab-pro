package uit.ac.ma.est.kessabpro.models.dto.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.cglib.core.Local;
import uit.ac.ma.est.kessabpro.models.dto.AnimalCategoryDTO;

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
         List<String> gallery,
         AnimalCategoryDTOResponse category,
         @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
         LocalDate pickUpDate
//         SaleDTOResponse sale
) {
}
