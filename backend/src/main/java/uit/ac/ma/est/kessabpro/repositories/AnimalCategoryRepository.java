package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;

import java.util.Optional;
import java.util.UUID;

public interface AnimalCategoryRepository extends UserAwareRepository<AnimalCategory, UUID> {
    Optional<AnimalCategory> findByTypeName(String s);
}
