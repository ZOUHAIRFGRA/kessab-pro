package uit.ac.ma.est.kessabpro.events.transaction;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.util.UUID;

@Getter
public class TransactionDeletedEvent extends ApplicationEvent {

    UUID SaleId;
    Double transactionAmount;
    public TransactionDeletedEvent(Object context, UUID saleId, Double transactionAmount) {
        super(context);
        SaleId = saleId;
        this.transactionAmount = transactionAmount;
    }
}
