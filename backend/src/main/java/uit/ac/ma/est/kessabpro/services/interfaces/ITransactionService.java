package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.TransactionDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ITransactionService {
    List<TransactionDTO> getAllTransactions();
    TransactionDTO getTransactionById(UUID id);
    TransactionDTO createTransaction(TransactionDTO transactionDTO);
    TransactionDTO updateTransaction(UUID id, TransactionDTO updatedTransactionDTO);
    void deleteTransaction(UUID id);

    List<BigDecimal> testFindAmountsBySaleId(UUID saleId);

    void publishTransactionCreatedEvent(TransactionDTO transactionDTO);
}
