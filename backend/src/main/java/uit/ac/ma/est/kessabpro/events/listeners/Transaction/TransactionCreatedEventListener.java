package uit.ac.ma.est.kessabpro.events.listeners.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.Transaction.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
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
        Transaction transaction = event.getTransaction();
        Sale sale = transaction.getSale();

        if (saleService.getRemainingAmount(sale) == transaction.getAmount()) sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        if (saleService.getRemainingAmount(sale) > transaction.getAmount()) sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);

        saleRepository.save(sale);
    }



}

