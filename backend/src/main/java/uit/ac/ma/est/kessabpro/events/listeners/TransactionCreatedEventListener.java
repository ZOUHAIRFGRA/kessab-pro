package uit.ac.ma.est.kessabpro.events.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;

import java.util.List;

@Component
public class TransactionCreatedEventListener {

    private final SaleRepository saleRepository;
    private final SaleService saleService;

    @Autowired
    public TransactionCreatedEventListener( SaleRepository saleRepository, SaleService saleService) {
        this.saleService = saleService;
        this.saleRepository = saleRepository;
    }

    @EventListener
    public void afterTransactionChange(TransactionCreatedEvent event) {
        Sale sale = event.getTransaction().getSale();
        Transaction transaction = event.getTransaction();
        saleService.updatePaymentStatus(sale);

        System.out.println(sale.getPaymentStatus());
        saleRepository.save(sale);
    }



}
