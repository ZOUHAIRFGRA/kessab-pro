package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ITransactionService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService implements ITransactionService {

    private final TransactionRepository transactionRepository;

    private final ApplicationEventPublisher eventPublisher;
    private final SaleService saleService;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository,  ApplicationEventPublisher eventPublisher, @Lazy SaleService saleService) {
        this.transactionRepository = transactionRepository;
        this.eventPublisher = eventPublisher;
        this.saleService = saleService;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(UUID id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public List<Transaction> getTransactionBySaleId(UUID saleId) {
        return transactionRepository.getTransactionBySaleId(saleId);
    }

    @Override
    public List<Transaction> getTransactionByBuyerId(UUID buyerId) {
        return transactionRepository.getTransactionByBuyerId(buyerId);
    }

    @Override
    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        System.out.println("Transaction created");
        System.out.println(transaction);
        //validate sale exists
        Sale sale = saleService.getSaleById(transaction.getSale().getId());
        //validate paid amount
        if (saleService.getRemainingAmount(sale) < transaction.getAmount()){
            throw new IllegalArgumentException("Amount exceeds maximum amount of transaction");
        }

        Transaction savedTransaction = transactionRepository.save(transaction);
        transaction.setSale(sale);

        publishTransactionCreatedEvent(savedTransaction);
        return savedTransaction;
    }

    @Override
    @Transactional
    public Transaction updateTransaction(UUID id, Transaction updatedTransaction) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setAmount(updatedTransaction.getAmount());
        transaction.setMethod(updatedTransaction.getMethod());
        transaction.setTransactionDate(updatedTransaction.getTransactionDate());

        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public List<Double> testFindAmountsBySaleId(UUID saleId) {
        return transactionRepository.findAmountsBySaleId(saleId);
    }

    @Override
    public void publishTransactionCreatedEvent(Transaction transaction) {
        eventPublisher.publishEvent(new TransactionCreatedEvent(this, transaction));
    }
}
