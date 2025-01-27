package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalActivitiesLogService {

    AnimalActivitiesLog save(AnimalActivitiesLog animalActivitiesLog);

    Optional<AnimalActivitiesLog> findById(UUID id);

    List<AnimalActivitiesLog> findAll();

    List<AnimalActivitiesLog> findByAnimalId(UUID animalId);

    void deleteById(UUID id);

    AnimalActivitiesLog update(UUID id, AnimalActivitiesLog animalActivitiesLog);
}
