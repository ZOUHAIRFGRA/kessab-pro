package uit.ac.ma.est.kessabpro.events.Transaction;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

@Getter
public class TransactionCreatedEvent extends ApplicationEvent {
    private final Transaction transaction;

    public TransactionCreatedEvent(Object source, Transaction transaction) {
        super(source);
        this.transaction = transaction;
    }
}

