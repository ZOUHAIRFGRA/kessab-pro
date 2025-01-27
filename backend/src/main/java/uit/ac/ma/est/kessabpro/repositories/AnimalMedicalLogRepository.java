package uit.ac.ma.est.kessabpro.repositories;

import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnimalMedicalLogRepository extends JpaRepository<AnimalMedicalLog, UUID> {

    List<AnimalMedicalLog> findByAnimalId(UUID animalId);
}
