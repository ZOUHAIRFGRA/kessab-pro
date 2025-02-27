package uit.ac.ma.est.kessabpro.models.dto.responses;

import java.util.UUID;

public record BuyerDTOResponse(
        UUID id,
        String fullName,
        String CIN,
        String phone,
        String address
) {
}
