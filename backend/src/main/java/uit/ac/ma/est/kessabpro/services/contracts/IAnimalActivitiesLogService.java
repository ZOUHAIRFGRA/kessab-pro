package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalActivitiesLogService {

    AnimalActivitiesLogDTO save(AnimalActivitiesLogDTO dto);

    Optional<AnimalActivitiesLogDTO> findById(UUID id);

    List<AnimalActivitiesLogDTO> findAll();

    List<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId);

    void deleteById(UUID id);

    AnimalActivitiesLogDTO update(UUID id, AnimalActivitiesLogDTO dto);
}
