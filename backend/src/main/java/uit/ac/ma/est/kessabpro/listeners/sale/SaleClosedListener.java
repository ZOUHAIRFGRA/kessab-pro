package uit.ac.ma.est.kessabpro.listeners.sale;


import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.events.sale.SaleClosedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;

import java.time.LocalDate;

@Component
public class SaleClosedListener {

    private final SaleService saleService;
    private final TransactionService transactionService;

    public SaleClosedListener(SaleService saleService, TransactionService transactionService) {
        this.saleService = saleService;
        this.transactionService = transactionService;
    }

    @EventListener
    public void beforeSaleClose(SaleClosedEvent event){
        Sale sale = event.getSale();
        Double paid = saleService.getRemainingAmount(sale);
        transactionService.createTransaction(
                Transaction.builder()
                        .method(PaymentMethod.CASH)
                        .transactionDate(LocalDate.now())
                        .sale(sale)
                        .amount(paid)
                        .build()
        );
    }

}
