package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {
    Page<Animal> findByUser_Id(UUID userId, Pageable pageable);
    Page<Animal> findByUser_IdAndTagContainingIgnoreCase(UUID userId, String tag, Pageable pageable);
    Page<Animal> findByUser_IdAndCategory_TypeNameContainingIgnoreCase(UUID userId, String typeName, Pageable pageable);
    Page<Animal> findByUser_IdAndWeight(UUID userId, BigDecimal weight, Pageable pageable);
    Page<Animal> findByUser_IdAndSexIgnoreCase(UUID userId, String sex, Pageable pageable);
    Optional<Animal> findByIdAndUser_Id(UUID id, UUID userId);
    List<Animal> findByUser_IdAndSale_Id(UUID userId, UUID saleId);
    List<Animal> findByUser_IdAndSale_Buyer_Id(UUID userId, UUID buyerId);
    List<Animal> findByUser_IdAndSaleNull(UUID userId);
    Long countByUser_Id(UUID userId);
    @Modifying
    @Query("UPDATE Animal a SET a.category = null WHERE a.category.id = :categoryId")
    void setCategoryToNullForAnimals(UUID categoryId);

    @Modifying
    @Query("UPDATE Animal a SET a.category.id = :newCategoryId WHERE a.category.id = :oldCategoryId")
    void reassignCategoryToLivestock(UUID oldCategoryId, UUID newCategoryId);
}