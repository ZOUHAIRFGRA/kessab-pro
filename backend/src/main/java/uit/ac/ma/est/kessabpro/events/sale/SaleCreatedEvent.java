package uit.ac.ma.est.kessabpro.events.sale;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.Sale;


@Getter
public class SaleCreatedEvent extends ApplicationEvent {
    Sale sale;
    SaleDTORequest saleDTO;

    public SaleCreatedEvent(Object source, Sale sale, SaleDTORequest saleDTO) {
        super(source);
        this.sale = sale;
        this.saleDTO = saleDTO;
    }

}

