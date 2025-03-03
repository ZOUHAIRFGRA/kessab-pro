package uit.ac.ma.est.kessabpro.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uit.ac.ma.est.kessabpro.models.dto.TransactionDTO;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ITransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(UUID id);
    List<Transaction> getTransactionBySaleId(UUID saleId);
    List<Transaction> getTransactionByBuyerId(UUID buyerId);
    Transaction createTransaction(Transaction transactionDTO);
    void deleteTransaction(UUID id);
    public Page<Transaction> getAllTransactions(Pageable pageable);

}
