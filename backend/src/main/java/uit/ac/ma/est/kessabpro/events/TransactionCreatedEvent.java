package uit.ac.ma.est.kessabpro.events;

import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

public class TransactionCreatedEvent extends ApplicationEvent {
    private final Transaction transaction;

    public TransactionCreatedEvent(Object source, Transaction transaction) {
        super(source);
        this.transaction = transaction;
    }

    public Transaction getTransaction() {
        return transaction;
    }
}
