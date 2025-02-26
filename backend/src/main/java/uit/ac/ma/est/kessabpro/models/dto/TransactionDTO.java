package uit.ac.ma.est.kessabpro.models.dto;

import java.math.BigDecimal;
import java.util.UUID;

public class TransactionDTO {

    private UUID id;
    private UUID saleId;
    private BigDecimal amount;
    private String method;
    private String transactionDate;

    public TransactionDTO(UUID id, UUID saleId, BigDecimal amount, String method, String transactionDate) {
        this.id = id;
        this.saleId = saleId;
        this.amount = amount;
        this.method = method;
        this.transactionDate = transactionDate;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getSaleId() {
        return saleId;
    }

    public void setSaleId(UUID saleId) {
        this.saleId = saleId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }
}
