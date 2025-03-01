package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.UUID;

public record AnimalDTORequest(
        UUID id,
        String tag,
        BigDecimal price,
        @org.hibernate.validator.constraints.UUID(message = "must be a valid UUID")
        String category,
        @NotNull(message = "isPickedUp must be provided")
        Boolean isPickedUp
) {}
