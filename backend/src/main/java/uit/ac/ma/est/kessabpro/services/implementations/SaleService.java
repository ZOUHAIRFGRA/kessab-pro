package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.sale.SaleClosedEvent;
import uit.ac.ma.est.kessabpro.events.sale.SaleCreatedEvent;
import uit.ac.ma.est.kessabpro.helpers.DateHelper;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.mappers.BuyerMapper;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
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
    private BuyerRepository buyerRepository;

    @Autowired
    private SaleMapper saleMapper;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Override
    public Sale createSale(SaleDTORequest saleDTORequest) {
        Sale.SaleBuilder sale = Sale.builder()
                .saleDate(DateHelper.parseStringDate(saleDTORequest.saleDate()))
                .agreedAmount(saleDTORequest.agreedAmount())
                .paymentStatus(PaymentStatus.NOT_PAID);

        //animals
        List<Animal> animals = animalRepository.saveAll(AnimalMapper.toAnimalEntityList(saleDTORequest.animals()));
        //buyer
        Buyer buyer = buyerRepository.save(BuyerMapper.toBuyerEntity(saleDTORequest.buyer()));
        //saleDetail
        sale.buyer(buyer);
        sale.animals(animals);
        Sale newSale = saleRepository.save(sale.build());
        //sale to animal
        animals.forEach(animal -> animal.setSale(newSale));
        //transaction for sale
        eventPublisher.publishEvent(new SaleCreatedEvent(this, newSale, saleDTORequest));
        return newSale;
    }


    @Override
    public Sale getSaleById(UUID id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found"));
    }

    public Double getPaidAmount(Sale sale) {
        double paidAmount = 0;
        if (sale.getPaymentStatus() == PaymentStatus.PARTIALLY_PAID) {
            for (Transaction transaction : sale.getTransactions()) {
                System.out.println(transaction);
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

        if (sale.getPaymentStatus() == PaymentStatus.PARTIALLY_PAID) {
            return sale.getAgreedAmount() - getPaidAmount(sale);
        }

        if (sale.getPaymentStatus() == PaymentStatus.NOT_PAID) {
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

    @Override
    public void closeSale(Sale sale) {
        if (sale.getPaymentStatus().equals(PaymentStatus.FULLY_PAID)) return;
        eventPublisher.publishEvent(new SaleClosedEvent(this,sale));
    }

    public boolean isPartiallyPaid(Sale sale) {
        return (getPaidAmount(sale) < sale.getAgreedAmount()) && (getPaidAmount(sale) > 0);
    }

    public boolean isFullyPaid(Sale sale) {
        return getPaidAmount(sale) >= sale.getAgreedAmount();
    }

    public Page<Sale> getFilteredSales(String fullName, UUID categoryId, PaymentStatus paymentStatus, Pageable pageable) {
        return saleRepository.findFilteredSales(fullName, categoryId, paymentStatus, pageable);
    }

    public boolean isNotPaid(Sale sale) {
        return getPaidAmount(sale) == 0.0;
    }

    public void updatePaymentStatus(Sale sale,Double transactionAmount) {

        double paidAmount = (double) getPaidAmount(sale);
        double agreedAmount = sale.getAgreedAmount();

        if ((paidAmount + transactionAmount) == agreedAmount ) sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        if ((paidAmount + transactionAmount) < agreedAmount ) sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        if ((paidAmount + transactionAmount) == 0 ) sale.setPaymentStatus(PaymentStatus.NOT_PAID);

    }

    @Override
    public Long getAllCount() {
        return saleRepository.count();
    }
}
