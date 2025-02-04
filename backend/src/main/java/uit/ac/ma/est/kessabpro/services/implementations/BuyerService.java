package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IBuyerService;

import java.util.List;
import java.util.UUID;

@Service
public class BuyerService implements IBuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Override
    public Buyer createBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    @Override
    public Buyer getBuyerById(UUID id) {
        return buyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
    }

    @Override
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    @Override
    public Buyer updateBuyer(UUID id, Buyer buyer) {
        Buyer existingBuyer = getBuyerById(id);
        existingBuyer.setFullName(buyer.getFullName());
        existingBuyer.setCIN(buyer.getCIN());
        existingBuyer.setPhone(buyer.getPhone());
        existingBuyer.setAddress(buyer.getAddress());
        return buyerRepository.save(existingBuyer);
    }

    @Override
    public void deleteBuyer(UUID id) {
        Buyer existingBuyer = getBuyerById(id);
        buyerRepository.delete(existingBuyer);
    }
}
