package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.events.transaction.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.events.transaction.TransactionDeletedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ITransactionService;
import java.util.List;
import java.util.UUID;

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
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));
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
        Sale sale = saleService.getSaleById(transaction.getSale().getId());
        System.out.println(saleService.getRemainingAmount(sale));
        if (saleService.getRemainingAmount(sale) < transaction.getAmount()){
            throw new IllegalArgumentException("Amount exceeds maximum amount of transaction");
        }
        transaction.setSale(sale);
        Transaction savedTransaction = transactionRepository.save(transaction);
        eventPublisher.publishEvent(new TransactionCreatedEvent(this,savedTransaction));
        return savedTransaction;
    }

//    @Override
//    @Transactional
//    public Transaction updateTransaction(UUID id, Transaction updatedTransaction) {
//        Transaction transaction = transactionRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Transaction not found"));
//
//        transaction.setAmount(updatedTransaction.getAmount());
//        transaction.setMethod(updatedTransaction.getMethod());
//        transaction.setTransactionDate(updatedTransaction.getTransactionDate());
//
//        return transactionRepository.save(transaction);
//    }

    @Override
    @Transactional
    public void deleteTransaction(UUID id) {
        System.out.println("deleted + " + id);
        Transaction transaction = getTransactionById(id);
        eventPublisher.publishEvent(new TransactionDeletedEvent(this,transaction.getSale().getId(),transaction.getAmount()));
        transactionRepository.deleteById(id);
    }



    public Page<Transaction> getAllTransactions(Pageable pageable) {
        return transactionRepository.findAll(pageable);
    }


    @Override
    public Long getAllCount() {
        return transactionRepository.count();
    }
}
