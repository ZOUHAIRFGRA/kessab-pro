package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final SaleRepository saleRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, SaleRepository saleRepository, ApplicationEventPublisher eventPublisher) {
        this.transactionRepository = transactionRepository;
        this.saleRepository = saleRepository;
        this.eventPublisher = eventPublisher;
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
    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        Sale sale = saleRepository.findById(transaction.getSale().getId())
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        transaction.setSale(sale);
        transaction.setTransactionDate(LocalDate.now());
        Transaction savedTransaction = transactionRepository.save(transaction);
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
    public List<BigDecimal> testFindAmountsBySaleId(UUID saleId) {
        return transactionRepository.findAmountsBySaleId(saleId);
    }

    @Override
    public void publishTransactionCreatedEvent(Transaction transaction) {
        eventPublisher.publishEvent(new TransactionCreatedEvent(this, transaction));
    }
}
