package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalMedicalLogService {

    AnimalMedicalLogDTO save(AnimalMedicalLogDTO dto);

    Optional<AnimalMedicalLogDTO> findById(UUID id);

    List<AnimalMedicalLogDTO> findAll();

    List<AnimalMedicalLogDTO> findByAnimalId(UUID animalId);

    void deleteById(UUID id);

    AnimalMedicalLogDTO update(UUID id, AnimalMedicalLogDTO dto);
}
