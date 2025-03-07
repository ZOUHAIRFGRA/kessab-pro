package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record BuyerDTORequest(
        UUID id,
        String cin,
        @NotEmpty
        @NotNull
        @Size(min = 4, max = 50)
        String fullName,
        String phone,
        String address
) {
}