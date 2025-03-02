package uit.ac.ma.est.kessabpro.helpers;

import java.time.LocalDate;

public class GlobalHelper {

    public static String formatDate(LocalDate date) {
        if (date == null) return "N/A";
        return date.toString();
    }

    public static String formatCurrency(double amount) {
        return String.format("%,.2f MAD", amount);
    }

    public static String translatePaymentMethod(String method) {
        switch (method) {
            case "CASH":
                return "Espèces";
            case "CARD":
                return "Carte";
            case "BANK_TRANSFER":
                return "Virement Bancaire";
            case "CHECK":
                return "Chèque";
            default:
                return method;
        }
    }

    public static String translatePaymentStatus(String status) {
        switch (status) {
            case "PAID":
                return "Payé";
            case "NOT_PAID":
                return "Non Payé";
            case "PARTIALLY_PAID":
                return "Partiellement Payé";
            default:
                return status;
        }
    }
}
