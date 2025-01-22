package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;

import java.util.UUID;

public interface AnimalActivitesLogRepository extends JpaRepository<AnimalActivitiesLog, UUID> {
}
