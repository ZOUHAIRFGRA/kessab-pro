package uit.ac.ma.est.kessabpro.models.dto.requests;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record BuyerDTORequest(
        UUID id,
        String cin,
         String fullName,
        String phone,
        String address
) {}