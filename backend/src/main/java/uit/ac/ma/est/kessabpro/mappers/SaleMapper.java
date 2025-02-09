package uit.ac.ma.est.kessabpro.mappers;

import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SaleMapper {

    public SaleDTO toSaleDTO(Sale sale) {
        return new SaleDTO(
                sale.getId(),
                sale.getAnimals().stream().map(animal -> animal.getId()).collect(Collectors.toList()),  // Convert Animal list to List<UUID>
                sale.getBuyer().getId(),
                sale.getSaleDate(),
                sale.getAgreedAmount(),
                sale.getPaymentStatus()
        );
    }

    public List<SaleDTO> toSaleDTOList(List<Sale> sales) {
        return sales.stream().map(this::toSaleDTO).collect(Collectors.toList());
    }
}
