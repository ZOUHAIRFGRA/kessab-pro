package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.TransactionDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ITransactionService {
    List<TransactionDTO> getAllTransactions();
    TransactionDTO getTransactionById(UUID id);
    TransactionDTO createTransaction(TransactionDTO transactionDTO); // Updated to expect DTO
    TransactionDTO updateTransaction(UUID id, TransactionDTO updatedTransactionDTO); // Updated to expect DTO
    void deleteTransaction(UUID id);

    List<BigDecimal> testFindAmountsBySaleId(UUID saleId);

    void publishTransactionCreatedEvent(TransactionDTO transactionDTO);
}
