package uit.ac.ma.est.kessabpro.events.sale;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

@Getter
public class SaleClosedEvent extends ApplicationEvent {

    Sale sale;

    public SaleClosedEvent(Object source, Sale sale) {
        super(source);
        this.sale = sale;
    }
}
