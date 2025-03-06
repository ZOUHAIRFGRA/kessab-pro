package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.mappers.AnimalActivitiesLogMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;
import uit.ac.ma.est.kessabpro.repositories.AnimalActivitiesLogRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAnimalActivitiesLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnimalActivitiesLogService implements IAnimalActivitiesLogService {

    @Autowired
    private AnimalActivitiesLogRepository animalActivitiesLogRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalActivitiesLogMapper logMapper;

    @Override
    public AnimalActivitiesLogDTO save(AnimalActivitiesLogDTO dto) {
        AnimalActivitiesLog log = logMapper.toEntity(dto);
        Optional<Animal> animal = animalRepository.findById(dto.getAnimalId());

        if (animal.isPresent()) {
            log.setAnimal(animal.get());
            return logMapper.toDTO(animalActivitiesLogRepository.save(log));
        }
        throw new RuntimeException("Animal not found");
    }

    @Override
    public Optional<AnimalActivitiesLogDTO> findById(UUID id) {
        return animalActivitiesLogRepository.findById(id).map(logMapper::toDTO);
    }

    @Override
    public List<AnimalActivitiesLogDTO> findAll() {
        return animalActivitiesLogRepository.findAll().stream().map(logMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId) {
        return animalActivitiesLogRepository.findByAnimalId(animalId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        animalActivitiesLogRepository.deleteById(id);
    }

    @Override
    public AnimalActivitiesLogDTO update(UUID id, AnimalActivitiesLogDTO dto) {
        Optional<AnimalActivitiesLog> existingLogOpt = animalActivitiesLogRepository.findById(id);
        Optional<Animal> animalOpt = animalRepository.findById(dto.getAnimalId());

        if (existingLogOpt.isPresent() && animalOpt.isPresent()) {
            AnimalActivitiesLog existingLog = existingLogOpt.get();
            existingLog.setAnimal(animalOpt.get());
            existingLog.setLogDate(dto.getLogDate());
            existingLog.setActivity(dto.getActivity());

            return logMapper.toDTO(animalActivitiesLogRepository.save(existingLog));
        }
        throw new RuntimeException("Animal or Log not found");
    }
}
