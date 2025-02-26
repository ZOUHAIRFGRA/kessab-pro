package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
public record AnimalDTORequest(
        @NotBlank(message = "Tag must be filled") String tag,
        BigDecimal price,
        @NotBlank(message = "Category must be filled") String category,
        Boolean isPickedUp
) {}
