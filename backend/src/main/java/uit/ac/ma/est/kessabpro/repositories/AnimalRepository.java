package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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
}