package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
                .orElseThrow(() -> new EntityNotFoundException("Buyer not found"));
    }

    @Override
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    @Override
    public Buyer updateBuyer(UUID id, Buyer buyer) {
        Buyer existingBuyer = getBuyerById(id);
        if (buyer.getFullName() != null) {
            existingBuyer.setFullName(buyer.getFullName());
        }
        if (buyer.getCIN() != null) {
            existingBuyer.setCIN(buyer.getCIN());
        }
        if (buyer.getPhone() != null) {
            existingBuyer.setPhone(buyer.getPhone());
        }
        if (buyer.getAddress() != null) {
            existingBuyer.setAddress(buyer.getAddress());
        }

        return buyerRepository.save(existingBuyer);
    }

    @Override
    public void deleteBuyer(UUID id) {
        Buyer existingBuyer = getBuyerById(id);
        buyerRepository.delete(existingBuyer);
    }

    @Override
    public Page<Buyer> findByFullNameOrCin(String fullName, String cin, Pageable pageable) {
        return buyerRepository.findByFullNameOrCin(fullName, cin, pageable);
    }
}
