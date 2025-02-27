package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BuyerMapper {

    public static BuyerDTOResponse toBuyerDTO(Buyer buyer) {
        return new BuyerDTOResponse(
                buyer.getId(),
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

    public static  Buyer toBuyerEntity(BuyerDTORequest buyerDTORequest) {
        Buyer.BuyerBuilder buyer = Buyer.builder().id(buyerDTORequest.id());
        if (buyerDTORequest.fullName() != null){
            buyer.fullName(buyerDTORequest.fullName());
        }
        if (buyerDTORequest.cin() != null){
            buyer.CIN(buyerDTORequest.cin());
        }

        if (buyerDTORequest.phone() != null){
            buyer.phone(buyerDTORequest.phone());
        }

        if (buyerDTORequest.address() != null){
            buyer.address(buyerDTORequest.address());
        }

        return buyer.build();
    }
}
