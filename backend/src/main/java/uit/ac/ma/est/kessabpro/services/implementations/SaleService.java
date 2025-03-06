package uit.ac.ma.est.kessabpro.services.implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.sale.SaleClosedEvent;
import uit.ac.ma.est.kessabpro.events.sale.SaleCreatedEvent;
import uit.ac.ma.est.kessabpro.helpers.DateHelper;
import uit.ac.ma.est.kessabpro.mappers.BuyerMapper;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.*;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.BuyerRepository;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAuthService;
import uit.ac.ma.est.kessabpro.services.contracts.ISaleService;

import java.nio.file.AccessDeniedException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@NoArgsConstructor
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

    IAuthService authService;
    @Autowired
    private AnimalService animalService;
    @Autowired
    private AnimalCategoryService animalCategoryService;
    @Autowired
    private BuyerService buyerService;


    @Autowired
    public SaleService(IAuthService authService) {
        this.authService = authService;
    }


    @Override
    public Sale createSale(SaleDTORequest saleDTORequest) throws AccessDeniedException {
        Sale sale = Sale.builder()
                .saleDate(DateHelper.parseStringDate(saleDTORequest.saleDate()))
                .agreedAmount(saleDTORequest.agreedAmount())
                .paymentStatus(PaymentStatus.NOT_PAID)
                .build();

        List<Animal> animals = new ArrayList<>();
        saleDTORequest.animals().forEach(
                animalDTORequest -> {
                    if (animalDTORequest.id() != null) {
                        Animal animal = animalRepository.getReferenceById(animalDTORequest.id());
                        animal.setPrice(animalDTORequest.price());
                        animal.setPickUpDate(animalDTORequest.isPickedUp() ? (LocalDate.parse(saleDTORequest.saleDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"))) : null);
                        animal.setSale(sale);
                        animals.add(animalService.createAnimal(animal));
                    } else {
                        Animal animal = new Animal();
                        animal.setTag(animalDTORequest.tag());
                        animal.setPrice(animalDTORequest.price());
                        AnimalCategory category = animalCategoryService.getCategoryById(UUID.fromString(animalDTORequest.category())).get();
                        animal.setCategory(category);
                        animal.setSex("-");
                        animal.setPickUpDate(animalDTORequest.isPickedUp() ? (LocalDate.parse(saleDTORequest.saleDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"))) : null);
                        animal.setSale(sale);
                        try {
                            animal.addImagePath(category.getIcon().getIconPath());
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                        animals.add(animalService.createAnimal(animal));
                    }

                }
        );
        //buyer
        Buyer buyer = Optional.ofNullable(saleDTORequest.buyer().id())
                .map(buyerService::getBuyerById)
                .orElseGet(() -> {
                    Buyer newBuyer = BuyerMapper.toBuyerEntity(saleDTORequest.buyer());
                    return buyerRepository.save(newBuyer);
                });
        //saleDetail
        sale.setBuyer(buyer);
        sale.setAnimals(animals);
        Sale newSale = saleRepository.save(sale);
        //sale transactions
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
        eventPublisher.publishEvent(new SaleClosedEvent(this, sale));
    }

    @Override
    public List<Sale> getSalesByBuyerId(UUID buyerId) {
        return saleRepository.findByBuyerId(buyerId);
    }

    public boolean isPartiallyPaid(Sale sale) {
        return (getPaidAmount(sale) < sale.getAgreedAmount()) && (getPaidAmount(sale) > 0);
    }

    public boolean isFullyPaid(Sale sale) {
        return getPaidAmount(sale) >= sale.getAgreedAmount();
    }

    public Page<Sale> getFilteredSales(String fullName, UUID categoryId, PaymentStatus paymentStatus, LocalDate saleDate, Pageable pageable) {
        return saleRepository.findFilteredSales(fullName, categoryId, paymentStatus, saleDate, pageable);
    }

    public boolean isNotPaid(Sale sale) {
        return getPaidAmount(sale) == 0.0;
    }

    public void updatePaymentStatus(Sale sale, Double transactionAmount) {

        double paidAmount = (double) getPaidAmount(sale);
        double agreedAmount = sale.getAgreedAmount();

        if ((paidAmount + transactionAmount) == agreedAmount) sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        if ((paidAmount + transactionAmount) < agreedAmount) sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        if ((paidAmount + transactionAmount) == 0) sale.setPaymentStatus(PaymentStatus.NOT_PAID);

    }

    @Override
    public Long getAllCount() {
        return saleRepository.count();
    }
}
