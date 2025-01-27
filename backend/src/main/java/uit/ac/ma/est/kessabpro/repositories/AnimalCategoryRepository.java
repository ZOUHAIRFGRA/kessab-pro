package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import java.util.UUID;

public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, UUID> {
}
