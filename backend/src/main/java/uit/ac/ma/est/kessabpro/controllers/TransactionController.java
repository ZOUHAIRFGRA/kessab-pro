package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.mappers.TransactionMapper;
import uit.ac.ma.est.kessabpro.models.dto.responses.TransactionDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.interfaces.ITransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final ITransactionService transactionService;

    public TransactionController(ITransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/amounts/{saleId}")
    public List<Double> getTransactionAmounts(@PathVariable UUID saleId) {
        return transactionService.testFindAmountsBySaleId(saleId);
    }

    @GetMapping("/sale/{saleId}")
    public ResponseEntity<List<TransactionDTOResponse>> getTransactionsBySaleId(@PathVariable UUID saleId) {
        List<Transaction> transactions = transactionService.getTransactionBySaleId(saleId);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTOList(transactions));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<TransactionDTOResponse>> getTransactionsByBuyerId(@PathVariable UUID buyerId) {
        List<Transaction> transactions = transactionService.getTransactionByBuyerId(buyerId);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTOList(transactions));
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTOResponse>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(TransactionMapper.toTransactionDTOList(transactions));
    }

    @PostMapping
    public ResponseEntity<TransactionDTOResponse> createTransaction(@RequestBody Transaction transaction) {
        Transaction createdTransaction = transactionService.createTransaction(transaction);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(createdTransaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTOResponse> updateTransaction(@PathVariable UUID id, @RequestBody Transaction updatedTransaction) {
        Transaction updated = transactionService.updateTransaction(id, updatedTransaction);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(updated));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTOResponse> getTransactionById(@PathVariable UUID id) {
        Transaction transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable UUID id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
