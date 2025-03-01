package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.mappers.BuyerMapper;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
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
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionService transactionService;

    @Override
    public Sale createSale(SaleDTORequest saleDTORequest) {
        Sale.SaleBuilder sale = Sale.builder();
        //animals
        List<Animal> animals = animalRepository.saveAll(AnimalMapper.toAnimalEntityList(saleDTORequest.animals()));
        //buyer
        Buyer buyer = buyerRepository.save(BuyerMapper.toBuyerEntity(saleDTORequest.buyer()));
        //saleDetail
        sale.buyer(buyer);
        sale.animals(animals);
        sale.saleDate(saleDTORequest.saleDate());
        sale.agreedAmount(saleDTORequest.agreedAmount());
        sale.paymentStatus(PaymentStatus.NOT_PAID);
        Sale newSale = saleRepository.save(sale.build());
        //transaction
//        Transaction transaction = transactionService.createTransaction(
//                new Transaction(null,null,)
//        )

        //sale to animal
        animals.forEach(animal -> animal.setSale(newSale));
//        transaction.setSale(newSale);
        return newSale;
    }




    @Override
    public Sale getSaleById(UUID id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found"));
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
