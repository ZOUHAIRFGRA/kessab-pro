package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.dto.TransactionDTO;
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
    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO getTransactionById(UUID id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return mapToDTO(transaction);
    }

    @Override
    @Transactional
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        Sale sale = saleRepository.findById(transactionDTO.getSaleId())
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        Transaction transaction = new Transaction();
        transaction.setSale(sale);
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setMethod(PaymentMethod.valueOf(transactionDTO.getMethod()));
        transaction.setTransactionDate(LocalDate.parse(transactionDTO.getTransactionDate()));

        Transaction savedTransaction = transactionRepository.save(transaction);
        publishTransactionCreatedEvent(mapToDTO(savedTransaction));
        return mapToDTO(savedTransaction);
    }

    @Override
    @Transactional
    public TransactionDTO updateTransaction(UUID id, TransactionDTO updatedTransactionDTO) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setAmount(updatedTransactionDTO.getAmount());
        transaction.setMethod(PaymentMethod.valueOf(updatedTransactionDTO.getMethod()));
        transaction.setTransactionDate(LocalDate.parse(updatedTransactionDTO.getTransactionDate()));

        Transaction updatedTransaction = transactionRepository.save(transaction);
        return mapToDTO(updatedTransaction);
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
    public void publishTransactionCreatedEvent(TransactionDTO transactionDTO) {
        Transaction transaction = transactionRepository.findById(transactionDTO.getId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        eventPublisher.publishEvent(new TransactionCreatedEvent(this, transaction));
    }

    private TransactionDTO mapToDTO(Transaction transaction) {
        return new TransactionDTO(
                transaction.getId(),
                transaction.getSale().getId(),
                transaction.getAmount(),
                transaction.getMethod().name(),
                transaction.getTransactionDate().toString()
        );
    }
}