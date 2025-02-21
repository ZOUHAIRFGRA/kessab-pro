package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.util.ArrayList;
import java.util.HashMap;
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
    private SaleMapper saleMapper;

    @Override
    public Sale createSale(SaleDTO saleDTO) {
        List<Animal> animals = animalRepository.findAllById(saleDTO.getAnimalIds());

        if (animals.isEmpty()) {
            throw new RuntimeException("No animals found for the provided IDs.");
        }

        Buyer buyer = buyerRepository.findById(saleDTO.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Sale sale = Sale.builder()
                .saleDate(saleDTO.getSaleDate())
                .agreedAmount(saleDTO.getAgreedAmount())
                .paymentStatus(saleDTO.getPaymentStatus() != null ? saleDTO.getPaymentStatus() : PaymentStatus.NOT_PAID)
                .buyer(buyer)
                .animals(new ArrayList<>())
                .build();

        for (Animal animal : animals) {
            animal.setSale(sale);
            sale.getAnimals().add(animal);
        }

        Sale savedSale = saleRepository.save(sale);

        animalRepository.saveAll(animals);

        return savedSale;
    }




    @Override
    public Sale getSaleById(UUID id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
    }

    public Double getPaidAmount(Sale sale) {
        double paidAmount = 0;
        if (sale.getPaymentStatus() == PaymentStatus.PARTIALLY_PAID){
            for (Transaction transaction : sale.getTransactions()) {
                paidAmount += transaction.getAmount();
            }
            return paidAmount;
        }

        if (sale.getPaymentStatus() == PaymentStatus.FULLY_PAID) {
           return sale.getAgreedAmount();
        }

        return paidAmount;
    }
    public Double getRemainingAmount(Sale sale) {
        double remainingAmount = 0;

        if (sale.getPaymentStatus() == PaymentStatus.PARTIALLY_PAID){
            return sale.getAgreedAmount() - getPaidAmount(sale);
        }

        if (sale.getPaymentStatus() == PaymentStatus.NOT_PAID){
          return sale.getAgreedAmount();
        }

        return remainingAmount;
    }




    @Override
    public List<Sale> getAllSales() {
        List<Sale> sales = saleRepository.findAll();
        return sales;
    }

    @Override
    public Sale updateSale(UUID id, Sale updatedSale, List<UUID> newAnimalIds) {
        Sale existingSale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        existingSale.setSaleDate(updatedSale.getSaleDate());
        existingSale.setAgreedAmount(updatedSale.getAgreedAmount());
        existingSale.setPaymentStatus(updatedSale.getPaymentStatus());
        existingSale.setBuyer(updatedSale.getBuyer());

        List<Animal> newAnimals = animalRepository.findAllById(newAnimalIds);
        existingSale.setAnimals(newAnimals);

        return saleRepository.save(existingSale);

    }

    @Override
    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }
}
