package uit.ac.ma.est.kessabpro.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalMedicalLogService {

    AnimalMedicalLogDTO save(AnimalMedicalLogDTO dto);

    Optional<AnimalMedicalLogDTO> findById(UUID id);

    List<AnimalMedicalLogDTO> findAll();

    Page<AnimalMedicalLogDTO> findAll(Pageable pageable);

    List<AnimalMedicalLogDTO> findByAnimalId(UUID animalId);

    Page<AnimalMedicalLogDTO> findByAnimalId(UUID animalId, Pageable pageable);

    void deleteById(UUID id);

    AnimalMedicalLogDTO update(UUID id, AnimalMedicalLogDTO dto);

    Long getLogsCount();
}