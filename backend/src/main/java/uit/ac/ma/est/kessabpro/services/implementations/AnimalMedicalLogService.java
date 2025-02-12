package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.mappers.AnimalMedicalLogMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import uit.ac.ma.est.kessabpro.repositories.AnimalMedicalLogRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalMedicalLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnimalMedicalLogService implements IAnimalMedicalLogService {

    @Autowired
    private AnimalMedicalLogRepository animalMedicalLogRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalMedicalLogMapper logMapper;

    @Override
    public AnimalMedicalLogDTO save(AnimalMedicalLogDTO dto) {
        AnimalMedicalLog log = logMapper.toEntity(dto);

        Optional<Animal> animal = animalRepository.findById(dto.getAnimalId());
        if (animal.isPresent()) {
            log.setAnimal(animal.get());
            return logMapper.toDTO(animalMedicalLogRepository.save(log));
        }
        throw new RuntimeException("Animal not found");
    }



    @Override
    public Optional<AnimalMedicalLogDTO> findById(UUID id) {
        return animalMedicalLogRepository.findById(id).map(logMapper::toDTO);
    }

    @Override
    public List<AnimalMedicalLogDTO> findAll() {
        return animalMedicalLogRepository.findAll().stream().map(logMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<AnimalMedicalLogDTO> findByAnimalId(UUID animalId) {
        return animalMedicalLogRepository.findByAnimalId(animalId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        animalMedicalLogRepository.deleteById(id);
    }

    @Override
    public AnimalMedicalLogDTO update(UUID id, AnimalMedicalLogDTO dto) {
        Optional<AnimalMedicalLog> existingLogOptional = animalMedicalLogRepository.findById(id);
        Optional<Animal> animalOpt = animalRepository.findById(dto.getAnimalId());

        if (existingLogOptional.isPresent() && animalOpt.isPresent()) {
            AnimalMedicalLog existingLog = existingLogOptional.get();
            existingLog.setAnimal(animalOpt.get());
            existingLog.setDescription(dto.getDescription());
            existingLog.setVetName(dto.getVetName());
            existingLog.setLogDate(dto.getLogDate());

            return logMapper.toDTO(animalMedicalLogRepository.save(existingLog));
        }
        return null;
    }

    private AnimalMedicalLogDTO convertToDTO(AnimalMedicalLog log) {
        return new AnimalMedicalLogDTO(log.getId(), log.getAnimal().getId(), log.getLogDate(), log.getDescription(), log.getVetName());
    }
}
