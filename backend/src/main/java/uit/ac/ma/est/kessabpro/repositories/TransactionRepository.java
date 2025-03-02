package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    @Query("SELECT t.amount FROM Transaction t WHERE t.sale.id = :saleId")
    List<Double> findAmountsBySaleId(UUID saleId);

    List<Transaction> getTransactionBySaleId(UUID saleId);
    @Query("SELECT t FROM Transaction t JOIN t.sale s WHERE s.buyer.id = :buyerId")
    List<Transaction> getTransactionByBuyerId(UUID buyerId);

    Double sumAmountBySaleIdIn(List<UUID> saleIds);


}
