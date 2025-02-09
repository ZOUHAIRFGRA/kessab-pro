package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private SaleMapper saleMapper; // Inject SaleMapper

    @Override
    public SaleDTO createSale(SaleDTO saleDTO) {
        // Fetch the animals by their IDs
        List<Animal> animals = animalRepository.findAllById(saleDTO.getAnimalIds());

        if (animals.isEmpty()) {
            throw new RuntimeException("No animals found for the provided IDs.");
        }

        // Fetch the Buyer entity using the buyerId from SaleDTO
        Buyer buyer = buyerRepository.findById(saleDTO.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        // Create a new Sale entity
        Sale sale = Sale.builder()
                .saleDate(saleDTO.getSaleDate())
                .agreedAmount(saleDTO.getAgreedAmount())
                .paymentStatus(saleDTO.getPaymentStatus() != null ? saleDTO.getPaymentStatus() : PaymentStatus.NOT_PAID)
                .buyer(buyer)
                .animals(new ArrayList<>())  // Initialize the animals list
                .build();

        // Link the animals to the sale
        for (Animal animal : animals) {
            animal.setSale(sale);  // Set the sale reference on each animal
            sale.getAnimals().add(animal);  // Add the animal to the sale's animals list
        }

        // Save the Sale entity
        Sale savedSale = saleRepository.save(sale);

        // Save the animals with the updated sale reference
        animalRepository.saveAll(animals);

        // Return the DTO representation of the saved sale
        return saleMapper.toSaleDTO(savedSale);
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
