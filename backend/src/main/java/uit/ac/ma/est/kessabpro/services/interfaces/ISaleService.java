package uit.ac.ma.est.kessabpro.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

public interface ISaleService extends IEntityService<Buyer> {
    Sale createSale(SaleDTORequest saleDTO) throws AccessDeniedException;
    Sale getSaleById(UUID id);
    List<Sale> getAllSales();
    Sale updateSale(UUID id, Sale updatedSale, List<UUID> newAnimalIds);
    void deleteSale(UUID id);
    void closeSale(Sale sale);
    List<Sale> getSalesByBuyerId(UUID buyerId);
    public Page<Sale> getFilteredSales(String fullName, UUID categoryId, PaymentStatus paymentStatus, Pageable pageable);
}
