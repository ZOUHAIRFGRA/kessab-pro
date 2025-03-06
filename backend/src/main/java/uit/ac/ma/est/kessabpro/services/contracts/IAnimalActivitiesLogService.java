package uit.ac.ma.est.kessabpro.services.contracts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalActivitiesLogService {

    AnimalActivitiesLogDTO save(AnimalActivitiesLogDTO dto);

    Optional<AnimalActivitiesLogDTO> findById(UUID id);

    List<AnimalActivitiesLogDTO> findAll();

    Page<AnimalActivitiesLogDTO> findAll(Pageable pageable);

    List<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId);

    Page<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId, Pageable pageable);

    void deleteById(UUID id);

    AnimalActivitiesLogDTO update(UUID id, AnimalActivitiesLogDTO dto);

    Long getLogsCount();
}