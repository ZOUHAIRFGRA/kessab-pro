package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static uit.ac.ma.est.kessabpro.mappers.BuyerMapper.toBuyerDTO;

@Component
public class SaleMapper {


    public SaleDTOResponse toSaleDTO(Sale sale) {
        return new SaleDTOResponse(
                sale.getId(),
                toBuyerDTO(sale.getBuyer()),
                sale.getSaleDate(),
                sale.getAgreedAmount(),
                sale.getPaymentStatus(),
                AnimalMapper.toAnimalDTOList(sale.getAnimals())
        );
    }



    public List<SaleDTOResponse> toSaleDTOList(List<Sale> sales) {
        return sales.stream()
                .map(this::toSaleDTO)
                .collect(Collectors.toList());
    }
}
