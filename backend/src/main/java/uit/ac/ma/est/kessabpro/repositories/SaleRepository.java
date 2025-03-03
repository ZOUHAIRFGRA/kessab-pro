package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.List;
import java.util.UUID;

public interface SaleRepository extends UserAwareRepository<Sale, UUID> {

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.sale.id IN :saleIds")
    Double sumAmountBySaleIdIn(List<UUID> saleIds);

    @Query("SELECT SUM(s.agreedAmount - COALESCE((SELECT SUM(t.amount) FROM Transaction t WHERE t.sale = s), 0)) " +
            "FROM Sale s WHERE s.buyer.id = :buyerId")
    Double sumRemainingAmountByBuyerId(UUID buyerId);

    @Query("SELECT COUNT(a) FROM Sale s JOIN s.animals a WHERE s.buyer.id = :buyerId")
    Integer countAnimalsByBuyerId(UUID buyerId);

    @Query("SELECT COUNT(a) FROM Sale s JOIN s.animals a WHERE s.buyer.id = :buyerId AND a.pickUpDate IS NULL")
    Integer countAnimalsNotPickedUpByBuyerId(UUID buyerId);

    @Query("SELECT DISTINCT s FROM Sale s " +
            "LEFT JOIN s.buyer b " +
            "LEFT JOIN s.animals a " +
            "LEFT JOIN a.category c " +
            "WHERE (:fullName IS NULL OR b.fullName LIKE %:fullName%) " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:paymentStatus IS NULL OR s.paymentStatus = :paymentStatus)")
    Page<Sale> findFilteredSales(
            @Param("fullName") String fullName,
            @Param("categoryId") UUID categoryId,
            @Param("paymentStatus") PaymentStatus paymentStatus,
            Pageable pageable);

}
