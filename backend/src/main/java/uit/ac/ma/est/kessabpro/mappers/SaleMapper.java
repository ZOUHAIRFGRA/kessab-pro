package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static uit.ac.ma.est.kessabpro.mappers.BuyerMapper.toBuyerDTO;

@Component
public class SaleMapper {

    SaleService saleService = new SaleService();

    public SaleDTOResponse toSaleDTO(Sale sale) {
        return new SaleDTOResponse(
                sale.getId(),
                toBuyerDTO(sale.getBuyer()),
                sale.getSaleDate(),
                sale.getAgreedAmount() + "DH",
                sale.getPaymentStatus(),
                AnimalMapper.toAnimalDTOList(sale.getAnimals()),
               new HashMap<String,String>(){{
                   put("remainingAmount",saleService.getRemainingAmount(sale) + "DH");
                   put("paidAmount",saleService.getPaidAmount(sale) + "DH");
               }}
        );
    }



    public List<SaleDTOResponse> toSaleDTOList(List<Sale> sales) {
        return sales.stream()
                .map(this::toSaleDTO)
                .collect(Collectors.toList());
    }
}
