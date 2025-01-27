package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalMedicalLogService {

    AnimalMedicalLog save(AnimalMedicalLog animalMedicalLog);

    Optional<AnimalMedicalLog> findById(UUID id);

    List<AnimalMedicalLog> findAll();

    List<AnimalMedicalLog> findByAnimalId(UUID animalId);

    void deleteById(UUID id);

    AnimalMedicalLog update(UUID id, AnimalMedicalLog animalMedicalLog);
}
