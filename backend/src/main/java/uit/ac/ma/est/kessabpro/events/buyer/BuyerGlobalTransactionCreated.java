package uit.ac.ma.est.kessabpro.events.listeners.Buyer;

import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

public class BuyerGlobalTransactionCreated extends ApplicationEvent {

    Buyer buyer;
    Transaction transaction;

    public BuyerGlobalTransactionCreated(Object source, Buyer buyer, Transaction transaction ) {
        super(source);
        this.buyer = buyer;
        this.transaction = transaction;
    }
}
