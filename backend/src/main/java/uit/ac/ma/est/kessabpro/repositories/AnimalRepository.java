package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, UUID> {
    Page<Animal> findByTagContainingIgnoreCase(String tag, Pageable pageable);

    Page<Animal> findByCategory_TypeNameContainingIgnoreCase(String category, Pageable pageable);

    Page<Animal> findByWeight(BigDecimal weight, Pageable pageable);

    Page<Animal> findBySexIgnoreCase(String sex, Pageable pageable);

    List<Animal> findBySale_Id(UUID saleId);
    List<Animal> findBySale_Buyer_Id(UUID buyerId);

}
