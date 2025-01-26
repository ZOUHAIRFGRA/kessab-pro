package uit.ac.ma.est.kessabpro.repositories;

import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, UUID> {
}
