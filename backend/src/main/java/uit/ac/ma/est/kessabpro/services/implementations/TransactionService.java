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

        // Create new transaction without manually setting the ID
        Transaction transaction = new Transaction();
        transaction.setSale(sale);
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setMethod(PaymentMethod.valueOf(transactionDTO.getMethod()));
        transaction.setTransactionDate(LocalDate.parse(transactionDTO.getTransactionDate()));

        // Save transaction - Hibernate will automatically generate the ID and handle versioning
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Update sale payment status after transaction is created
        updateSalePaymentStatus(sale);

        // Publish event
        publishTransactionCreatedEvent(mapToDTO(savedTransaction));

        return mapToDTO(savedTransaction);
    }

    @Override
    @Transactional
    public TransactionDTO updateTransaction(UUID id, TransactionDTO updatedTransactionDTO) {
        // Fetch the existing transaction from the database (this ensures it is attached)
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Update fields
        transaction.setAmount(updatedTransactionDTO.getAmount());
        transaction.setMethod(PaymentMethod.valueOf(updatedTransactionDTO.getMethod()));
        transaction.setTransactionDate(LocalDate.parse(updatedTransactionDTO.getTransactionDate()));

        // Save the updated transaction (this will also take care of versioning)
        Transaction updatedTransaction = transactionRepository.save(transaction);

        // Update sale payment status after transaction is updated
        updateSalePaymentStatus(transaction.getSale());

        return mapToDTO(updatedTransaction);
    }

    private void updateSalePaymentStatus(Sale sale) {
        List<BigDecimal> transactionAmounts = transactionRepository.findAmountsBySaleId(sale.getId());
        BigDecimal totalPaid = transactionAmounts.stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalPaid.compareTo(BigDecimal.ZERO) == 0) {
            sale.setPaymentStatus(PaymentStatus.NOT_PAID);
        } else if (totalPaid.compareTo(sale.getAgreedAmount()) < 0) {
            sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        } else {
            sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        }

        saleRepository.save(sale);
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
