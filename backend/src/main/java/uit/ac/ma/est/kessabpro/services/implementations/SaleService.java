package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Override
    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    @Override
    public Sale getSaleById(UUID id) {
        return saleRepository.findById(id).orElseThrow(() -> new RuntimeException("Sale not found"));
    }

    @Override
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    @Override
    public Sale updateSale(UUID id, Sale updatedSale) {
        Sale existingSale = getSaleById(id);
        existingSale.setSaleDate(updatedSale.getSaleDate());
        existingSale.setAgreedAmount(updatedSale.getAgreedAmount());
        existingSale.setPaymentStatus(updatedSale.getPaymentStatus());
        existingSale.setAnimal(updatedSale.getAnimal());
        existingSale.setBuyer(updatedSale.getBuyer());
        return saleRepository.save(existingSale);
    }

    @Override
    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }
}
