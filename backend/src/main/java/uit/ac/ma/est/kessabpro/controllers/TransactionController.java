package uit.ac.ma.est.kessabpro.controllers;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.groups.Default;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import uit.ac.ma.est.kessabpro.validators.groups.onCreate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final ITransactionService transactionService;
    private final BuyerService buyerService;
    private final ApplicationEventPublisher eventPublisher;

    public TransactionController(ITransactionService transactionService, BuyerService buyerService, ApplicationEventPublisher eventPublisher) {
        this.transactionService = transactionService;
        this.buyerService = buyerService;
        this.eventPublisher = eventPublisher;
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
    public ResponseEntity<Page<TransactionDTOResponse>> getTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "transactionDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Transaction> transactions = transactionService.getAllTransactions(pageable);
        Page<TransactionDTOResponse> transactionsDTOs = transactionService.getAllTransactions(pageable).map(TransactionMapper::toTransactionDTO);
        return ResponseEntity.ok(transactionsDTOs);
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@Validated({Default.class, onCreate.class}) @RequestBody TransactionDTORequest transactionDTO) {
        Transaction createdTransaction = transactionService.createTransaction(TransactionMapper.toTransactionEntity(transactionDTO));
        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(createdTransaction));
    }

    @PostMapping(value = "/buyer/{id}")
    @Transactional
    public ResponseEntity<?> consumeTransaction(@PathVariable UUID id, @Validated @RequestBody TransactionDTORequest transactionDTO) {
        Buyer buyer = buyerService.getBuyerById(id);
        Transaction transaction = TransactionMapper.toTransactionEntity(transactionDTO);
        eventPublisher.publishEvent(new BuyerGlobalTransactionCreated(this, buyer, transaction));
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String,Long>> getAllCount() {
        Map<String,Long> response = new HashMap<>();
        response.put("count",transactionService.getAllCount());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTOResponse> getTransactionById(@PathVariable UUID id) {
        Transaction transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(TransactionMapper.toTransactionDTO(transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable UUID id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
