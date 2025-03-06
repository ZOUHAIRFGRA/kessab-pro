package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalActivitiesLogRepository extends JpaRepository<AnimalActivitiesLog, UUID> {

    // Find logs by animal ID
    List<AnimalActivitiesLog> findByAnimalId(UUID animalId);

    // Find logs by animal ID and user ID (animal.user.id)
    List<AnimalActivitiesLog> findByAnimalIdAndAnimalUserId(UUID animalId, UUID userId);

    // Find logs by animal ID and user ID with pagination
    Page<AnimalActivitiesLog> findByAnimalIdAndAnimalUserId(UUID animalId, UUID userId, Pageable pageable);

    // Find all logs for a user (animal.user.id)
    List<AnimalActivitiesLog> findByAnimalUserId(UUID userId);

    // Find all logs for a user with pagination
    Page<AnimalActivitiesLog> findByAnimalUserId(UUID userId, Pageable pageable);

    // Find a log by ID and user ID
    Optional<AnimalActivitiesLog> findByIdAndAnimalUserId(UUID id, UUID userId);

    // Count logs for a user
    Long countByAnimalUserId(UUID userId);
}