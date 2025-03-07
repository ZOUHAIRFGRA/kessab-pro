package uit.ac.ma.est.kessabpro.services.contracts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import java.util.List;
import java.util.UUID;

public interface IBuyerService extends IEntityService<Buyer> {
    Buyer createBuyer(Buyer buyer);
    Buyer getBuyerById(UUID id);
    List<Buyer> getAllBuyers();
    Buyer updateBuyer(UUID id, Buyer buyer);
    void deleteBuyer(UUID id);
    public Page<Buyer> findByFullNameOrCin(String fullName, String cin, Pageable pageable);

}
