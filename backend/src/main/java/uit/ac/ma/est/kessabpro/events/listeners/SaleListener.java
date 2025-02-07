package uit.ac.ma.est.kessabpro.events.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.TransactionCreatedEvent;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
            // Print to confirm that the listener was triggered
            System.out.println("SaleListener triggered for sale: " + sale.getId());

            updatePaymentStatus(sale);  // Ensure that payment status is being updated

            // Print to confirm the payment status has been updated
            System.out.println("Updated payment status for sale " + sale.getId() + ": " + sale.getPaymentStatus());

            saleRepository.save(sale);  // Ensure the sale is being saved with the updated status
        } else {
            // Print if the sale is null (which should not happen if the event is valid)
            System.out.println("Sale was null, listener not triggered correctly.");
        }
    }

    private void updatePaymentStatus(Sale sale) {
        List<BigDecimal> amounts = transactionRepository.findAmountsBySaleId(sale.getId());
        BigDecimal totalPaid = amounts.stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalPaid.compareTo(BigDecimal.ZERO) == 0) {
            sale.setPaymentStatus(PaymentStatus.NOT_PAID);
        } else if (totalPaid.compareTo(sale.getAgreedAmount()) < 0) {
            sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        } else {
            sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        }

        // Print to confirm the new payment status decision
        System.out.println("Calculated payment status for sale " + sale.getId() + ": " + sale.getPaymentStatus());
    }
}
