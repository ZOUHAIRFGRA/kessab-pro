package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalMedicalLogRepository extends JpaRepository<AnimalMedicalLog, UUID> {

    List<AnimalMedicalLog> findByAnimalId(UUID animalId);

    List<AnimalMedicalLog> findByAnimalIdAndAnimalUserId(UUID animalId, UUID userId);

    Page<AnimalMedicalLog> findByAnimalIdAndAnimalUserId(UUID animalId, UUID userId, Pageable pageable);

    List<AnimalMedicalLog> findByAnimalUserId(UUID userId);

    Page<AnimalMedicalLog> findByAnimalUserId(UUID userId, Pageable pageable);

    Optional<AnimalMedicalLog> findByIdAndAnimalUserId(UUID id, UUID userId);

    Long countByAnimalUserId(UUID userId);
}