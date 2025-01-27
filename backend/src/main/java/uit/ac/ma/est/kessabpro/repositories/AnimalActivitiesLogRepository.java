package uit.ac.ma.est.kessabpro.repositories;

import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnimalActivitiesLogRepository extends JpaRepository<AnimalActivitiesLog, UUID> {

    List<AnimalActivitiesLog> findByAnimalId(UUID animalId);
}
