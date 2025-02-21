package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.TransactionDTO;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ITransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(UUID id);
    List<Transaction> getTransactionBySaleId(UUID saleId);
    Transaction createTransaction(Transaction transactionDTO);
    Transaction updateTransaction(UUID id, Transaction updatedTransaction);
    void deleteTransaction(UUID id);

    List<Double> testFindAmountsBySaleId(UUID saleId);

    void publishTransactionCreatedEvent(Transaction transactionDTO);
}
