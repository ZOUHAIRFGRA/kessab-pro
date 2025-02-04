package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import java.util.List;
import java.util.UUID;

public interface IBuyerService {
    Buyer createBuyer(Buyer buyer);
    Buyer getBuyerById(UUID id);
    List<Buyer> getAllBuyers();
    Buyer updateBuyer(UUID id, Buyer buyer);
    void deleteBuyer(UUID id);
}
