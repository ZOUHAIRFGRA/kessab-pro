package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.util.UUID;

import java.util.List;

public interface ITransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(UUID id);
    Transaction createTransaction(Transaction transaction);
    Transaction updateTransaction(UUID id, Transaction transaction);
    void deleteTransaction(UUID id);
}
