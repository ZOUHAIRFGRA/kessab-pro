package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;

import java.util.UUID;

public interface BuyerRepository extends UserAwareRepository<Buyer,UUID> {
    @Query("SELECT b FROM Buyer b WHERE " +
            "(:fullName IS NULL OR b.fullName LIKE %:fullName%) " +
            "OR (:cin IS NULL OR b.CIN LIKE %:cin%)")
    Page<Buyer> findByFullNameOrCin(
            @Param("fullName") String fullName,
            @Param("cin") String cin,
            Pageable pageable);
}