package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import java.util.UUID;

public interface AnimalMedicalLogRepository extends JpaRepository<AnimalMedicalLog, UUID> {
}
