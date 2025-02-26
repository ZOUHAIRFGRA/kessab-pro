package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BuyerMapper {

    public static BuyerDTOResponse toBuyerDTO(Buyer buyer) {
        return new BuyerDTOResponse(
                buyer.getId(),
                buyer.getUser() != null ? buyer.getUser().getId() : null, // Handle null user
                buyer.getFullName(),
                buyer.getCIN(),
                buyer.getPhone(),
                buyer.getAddress()
        );
    }

    public static List<BuyerDTOResponse> toBuyerDTOList(List<Buyer> buyers) {
        return buyers.stream()
                .map(BuyerMapper::toBuyerDTO)
                .collect(Collectors.toList());
    }
}
