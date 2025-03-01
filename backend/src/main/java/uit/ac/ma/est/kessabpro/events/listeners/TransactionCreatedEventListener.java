package uit.ac.ma.est.kessabpro.events.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import java.math.BigDecimal;
import java.util.List;

@Component
public class SaleListener {

    private final TransactionRepository transactionRepository;
    private final SaleRepository saleRepository;

    @Autowired
    public SaleListener(TransactionRepository transactionRepository, SaleRepository saleRepository) {
        this.transactionRepository = transactionRepository;
        this.saleRepository = saleRepository;
    }

    @EventListener
    public void afterTransactionChange(TransactionCreatedEvent event) {
        Sale sale = event.getTransaction().getSale();
        if (sale != null) {
            System.out.println("SaleListener triggered for sale: " + sale.getId());
            updatePaymentStatus(sale);
            System.out.println("Updated payment status for sale " + sale.getId() + ": " + sale.getPaymentStatus());
            saleRepository.save(sale);
        } else {
            System.out.println("Sale was null, listener not triggered correctly.");
        }
    }

    private void updatePaymentStatus(Sale sale) {
        List<Double> amounts = transactionRepository.findAmountsBySaleId(sale.getId());
        double totalPaid = amounts.stream().mapToDouble(Double::doubleValue).sum();

        if (totalPaid == 0) {
            sale.setPaymentStatus(PaymentStatus.NOT_PAID);
        } else if (totalPaid < sale.getAgreedAmount()) {
            sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        } else {
            sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        }
        System.out.println("Calculated payment status for sale " + sale.getId() + ": " + sale.getPaymentStatus());
    }

}
