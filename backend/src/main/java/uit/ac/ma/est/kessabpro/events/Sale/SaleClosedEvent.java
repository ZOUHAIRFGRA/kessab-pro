package uit.ac.ma.est.kessabpro.events.Sale;

import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

public class SaleClosedEvent extends ApplicationEvent {

    Sale sale;

    public SaleClosedEvent(Object source, Sale sale) {
        super(source);
        this.sale = sale;
    }
}
