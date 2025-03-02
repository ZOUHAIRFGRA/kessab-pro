package uit.ac.ma.est.kessabpro.listeners.buyer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.events.buyer.BuyerGlobalTransactionCreated;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.implementations.BuyerService;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;

import java.util.List;

@Component
public class BuyerGlobalTransactionCreatedListener {
    private final TransactionService transactionService;
    Buyer buyer;
    Transaction transaction;

    SaleService saleService;

    @Autowired
    BuyerGlobalTransactionCreatedListener(SaleService ss, TransactionService transactionService) {
        saleService = ss;
        this.transactionService = transactionService;
    }

    @EventListener
    public void onBuyerGlobalTransactionCreated(BuyerGlobalTransactionCreated buyerGlobalTransactionCreated) {
        System.out.println("event started");
        buyer = buyerGlobalTransactionCreated.getBuyer();
        transaction = buyerGlobalTransactionCreated.getTransaction();

        List<Sale> sales = buyer.getSales();
        Double transactionAmount = transaction.getAmount();
        for (Sale sale : sales) {
            Double saleRemainingAmount = saleService.getRemainingAmount(sale);
            if (sale.getPaymentStatus().equals(PaymentStatus.FULLY_PAID)) continue;
            if (saleRemainingAmount >= transactionAmount) {
                transactionService.createTransaction(buildTransaction(transaction, transactionAmount, sale));
                transactionAmount = (double) 0;
            }
            if (saleRemainingAmount <= transactionAmount) {
                transactionService.createTransaction(buildTransaction(transaction, saleRemainingAmount, sale)
                );
                transactionAmount -= saleRemainingAmount;
            }
            if (transactionAmount.equals((double) 0)) break;
        }
    }

    public Transaction buildTransaction(Transaction transaction, Double transactionAmount, Sale sale) {
        return Transaction.builder().transactionDate(transaction.getTransactionDate()).method(transaction.getMethod()).amount(transactionAmount).sale(sale).build();
    }

}
