package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;  // Import SaleDTO
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.List;
import java.util.UUID;

public interface ISaleService {
    SaleDTO createSale(Sale sale);  // Now returns SaleDTO
    SaleDTO getSaleById(UUID id);  // Now returns SaleDTO
    List<SaleDTO> getAllSales();   // Now returns List<SaleDTO>
    SaleDTO updateSale(UUID id, Sale sale);  // Now returns SaleDTO
    void deleteSale(UUID id);
}
