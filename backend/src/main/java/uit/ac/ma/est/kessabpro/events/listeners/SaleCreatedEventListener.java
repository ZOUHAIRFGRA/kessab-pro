package uit.ac.ma.est.kessabpro.events.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.events.SaleCreatedEvent;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.helpers.DateHelper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;

@Component
public class SaleCreatedEventListener {


    private final TransactionRepository transactionRepository;
    private final TransactionService transactionService;
    private final SaleService saleService;
    private final SaleRepository saleRepository;

    @Autowired
    public SaleCreatedEventListener(SaleRepository saleRepository, TransactionRepository transactionRepository, TransactionService transactionService, SaleService saleService) {
        this.transactionRepository = transactionRepository;
        this.transactionService = transactionService;
        this.saleService = saleService;
        this.saleRepository = saleRepository;
    }

    @EventListener
    public void afterSaleCreated(SaleCreatedEvent event) {
        Sale sale = event.getSale();
        SaleDTORequest saleDTO = event.getSaleDTO();

        if (!(saleDTO.paidAmount()> 0)) {
            return;
        }

        transactionService.createTransaction(
                Transaction.builder()
                        .method(PaymentMethod.valueOf(saleDTO.method()))
                        .amount(saleDTO.paidAmount())
                        .sale(sale)
                        .transactionDate(DateHelper.parseStringDate(saleDTO.saleDate()))
                        .build()
        );



    }


}
