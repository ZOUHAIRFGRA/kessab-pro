package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.util.List;
import java.util.UUID;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private SaleMapper saleMapper; // Inject SaleMapper

    @Override
    public SaleDTO createSale(Sale sale, List<UUID> animalIds) {
        List<Animal> animals = animalRepository.findAllById(animalIds);
        sale.setAnimals(animals);

        Sale savedSale = saleRepository.save(sale);
        return saleMapper.toSaleDTO(savedSale); // Use mapper
    }

    @Override
    public SaleDTO getSaleById(UUID id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
        return saleMapper.toSaleDTO(sale); // Use mapper
    }

    @Override
    public List<SaleDTO> getAllSales() {
        List<Sale> sales = saleRepository.findAll();
        return saleMapper.toSaleDTOList(sales); // Use mapper
    }

    @Override
    public SaleDTO updateSale(UUID id, Sale updatedSale, List<UUID> newAnimalIds) {
        Sale existingSale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        existingSale.setSaleDate(updatedSale.getSaleDate());
        existingSale.setAgreedAmount(updatedSale.getAgreedAmount());
        existingSale.setPaymentStatus(updatedSale.getPaymentStatus());
        existingSale.setBuyer(updatedSale.getBuyer());

        List<Animal> newAnimals = animalRepository.findAllById(newAnimalIds);
        existingSale.setAnimals(newAnimals);

        Sale savedSale = saleRepository.save(existingSale);
        return saleMapper.toSaleDTO(savedSale); // Use mapper
    }

    @Override
    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }
}
