package uit.ac.ma.est.kessabpro.listeners.transaction;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.events.transaction.TransactionDeletedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;

@Component
public class TransactionDeletedEventListener {

    private final SaleService saleService;
    private final SaleRepository saleRepository;

    public TransactionDeletedEventListener(SaleService saleService, SaleRepository saleRepository) {
        this.saleService = saleService;
        this.saleRepository = saleRepository;
    }

    @EventListener
    public void afterTransactionDelete(TransactionDeletedEvent event){
        Sale sale = saleService.getSaleById(event.getSaleId()) ;
        Double transactionAmount = event.getTransactionAmount();
        saleService.updatePaymentStatus(sale, -transactionAmount);
        saleRepository.save(sale);
    }

}
