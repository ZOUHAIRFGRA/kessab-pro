package uit.ac.ma.est.kessabpro.mappers;

import uit.ac.ma.est.kessabpro.models.dto.responses.TransactionDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.util.List;

public class TransactionMapper {

    public static TransactionDTOResponse toTransactionDTO(Transaction transaction) {
        return new TransactionDTOResponse(
                transaction.getId(),
                transaction.getTransactionDate(),
                transaction.getAmount(),
                transaction.getMethod() != null ? transaction.getMethod().name() : null
        );
    }

    public static List<TransactionDTOResponse> toTransactionDTOList(List<Transaction> transactions) {
        return transactions.stream()
                .map(TransactionMapper::toTransactionDTO)
                .toList();
    }
}
