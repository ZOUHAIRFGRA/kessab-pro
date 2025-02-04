package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.Sale;
import java.util.List;
import java.util.UUID;

public interface ISaleService {
    Sale createSale(Sale sale);
    Sale getSaleById(UUID id);
    List<Sale> getAllSales();
    Sale updateSale(UUID id, Sale sale);
    void deleteSale(UUID id);
}
