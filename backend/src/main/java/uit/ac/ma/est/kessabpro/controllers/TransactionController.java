package uit.ac.ma.est.kessabpro.controllers;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import uit.ac.ma.est.kessabpro.events.buyer.BuyerGlobalTransactionCreated;
import uit.ac.ma.est.kessabpro.mappers.TransactionMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.TransactionDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.TransactionDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.implementations.BuyerService;
import uit.ac.ma.est.kessabpro.services.interfaces.ITransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final ITransactionService transactionService;
    private final BuyerService buyerService;
    private final ApplicationEventPublisher eventPublisher;

    public TransactionController(ITransactionService transactionService, BuyerService buyerService,ApplicationEventPublisher eventPublisher) {
        this.transactionService = transactionService;
        this.buyerService = buyerService;
        this.eventPublisher = eventPublisher;
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
    public ResponseEntity<?> createTransaction(@Valid @RequestBody TransactionDTORequest transactionDTO) {
        Transaction createdTransaction = transactionService.createTransaction(TransactionMapper.toTransactionEntity(transactionDTO));
//        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(createdTransaction));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PostMapping(value = "/buyer/{id}")
    @Transactional
    public ResponseEntity<?> consumeTransaction(@PathVariable  UUID id,@Validated @RequestBody TransactionDTORequest transactionDTO) {
        Buyer buyer = buyerService.getBuyerById(id);
        Transaction transaction = TransactionMapper.toTransactionEntity(transactionDTO);
        eventPublisher.publishEvent(new BuyerGlobalTransactionCreated(this,buyer,transaction));
        return ResponseEntity.ok(transaction);
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
    public ResponseEntity<?> deleteTransaction(@PathVariable UUID id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
