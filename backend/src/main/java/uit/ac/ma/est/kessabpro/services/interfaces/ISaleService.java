package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.List;
import java.util.UUID;

public interface ISaleService {
    SaleDTO createSale(SaleDTO saleDTO);
    SaleDTO getSaleById(UUID id);
    List<SaleDTO> getAllSales();
    SaleDTO updateSale(UUID id, Sale updatedSale, List<UUID> newAnimalIds);
    void deleteSale(UUID id);
}
