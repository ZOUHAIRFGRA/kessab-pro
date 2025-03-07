package uit.ac.ma.est.kessabpro.seeders.factory;

import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

public class TransactionSeederFactory implements SeederFactory<Transaction> {

    private static final Random RANDOM = new Random();
    private static final PaymentMethod[] METHODS = PaymentMethod.values();

    public List<Transaction> create(Sale sale, int count, User user) {
        List<Transaction> transactions = new ArrayList<>();
        double agreed = sale.getAgreedAmount();

        if (sale.getPaymentStatus() == PaymentStatus.NOT_PAID) {
            int option = RANDOM.nextInt(3);
            if (option == 0) {
                transactions.add(buildTransaction(sale, user, agreed * 0.30));
                // Update sale to partially paid
                updateSalePaymentStatus(sale, agreed * 0.30, agreed);
            } else if (option == 1) {
                transactions.add(buildTransaction(sale, user, agreed));
                // Update sale to fully paid
                updateSalePaymentStatus(sale, agreed, agreed);
            }
            return transactions;
        }

        double totalPaid = sale.getPaymentStatus() == PaymentStatus.FULLY_PAID ? agreed
                : agreed * (0.3 + RANDOM.nextDouble() * 0.3);

        double remaining = totalPaid;
        double totalTransactionAmount = 0;

        for (int i = 0; i < count; i++) {
            double amount;
            if (i == count - 1) {
                amount = remaining;
            } else {
                double maxPossible = remaining - (count - i - 1) * 1;
                amount = 1 + RANDOM.nextDouble() * (maxPossible - 1);
            }
            remaining -= amount;
            totalTransactionAmount += amount;
            transactions.add(buildTransaction(sale, user, amount));
        }

        updateSalePaymentStatus(sale, totalTransactionAmount, agreed);

        return transactions;
    }

    private Transaction buildTransaction(Sale sale, User user, double amount) {
        double formattedAmount = BigDecimal.valueOf(amount)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        return Transaction.builder()
                .sale(sale)
                .user(user)
                .amount(formattedAmount)
                .method(METHODS[RANDOM.nextInt(METHODS.length)])
                .transactionDate(sale.getSaleDate().plusDays(RANDOM.nextInt(30)))
                .build();
    }

    private void updateSalePaymentStatus(Sale sale, double paidAmount, double agreedAmount) {
        BigDecimal paid = BigDecimal.valueOf(paidAmount).setScale(2, RoundingMode.HALF_UP);
        BigDecimal agreed = BigDecimal.valueOf(agreedAmount).setScale(2, RoundingMode.HALF_UP);

        if (paid.compareTo(BigDecimal.ZERO) <= 0) {
            sale.setPaymentStatus(PaymentStatus.NOT_PAID);
        } else if (paid.compareTo(agreed) >= 0) {
            sale.setPaymentStatus(PaymentStatus.FULLY_PAID);
        } else {
            sale.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        }
    }

    @Override
    public List<Transaction> create(int count) {
        throw new UnsupportedOperationException("Use create(Sale, int, User) instead.");
    }
}