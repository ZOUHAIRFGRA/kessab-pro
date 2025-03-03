package uit.ac.ma.est.kessabpro.mappers;

import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.helpers.DateHelper;
import uit.ac.ma.est.kessabpro.models.dto.requests.TransactionDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.TransactionDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class TransactionMapper {

    public static TransactionDTOResponse toTransactionDTO(Transaction transaction) {
        return new TransactionDTOResponse(
                transaction.getId(),
                transaction.getTransactionDate(),
                transaction.getAmount() + "DH",
                transaction.getMethod() != null ? transaction.getMethod().name() : null
        );
    }

    public static List<TransactionDTOResponse> toTransactionDTOList(List<Transaction> transactions) {
        return transactions.stream()
                .map(TransactionMapper::toTransactionDTO)
                .collect(Collectors.toList());
    }


    public static Transaction toTransactionEntity(TransactionDTORequest transaction) {
        Transaction.TransactionBuilder transactionBuilder = Transaction.builder();
        transactionBuilder.method(PaymentMethod.valueOf(transaction.method()))
                .amount(transaction.amount())
                .transactionDate(DateHelper.parseStringDate(transaction.transactionDate()));
        if (transaction.sale_id() != null) {
            transactionBuilder.sale(Sale.builder().id(UUID.fromString(transaction.sale_id())).build());

        }
        return transactionBuilder.build();

    }


    public static List<Transaction> toTransactionEntityList(List<TransactionDTORequest> transactions) {
        return transactions.stream()
                .map(TransactionMapper::toTransactionEntity)
                .collect(Collectors.toList());
    }
}