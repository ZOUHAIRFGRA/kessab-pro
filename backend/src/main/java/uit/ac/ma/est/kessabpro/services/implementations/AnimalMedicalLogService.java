package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import uit.ac.ma.est.kessabpro.mappers.AnimalMedicalLogMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.AnimalMedicalLogRepository;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAnimalMedicalLogService;
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

    private UUID getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();
        return loggedInUser.getId();
    }

    @Override
    public AnimalMedicalLogDTO save(AnimalMedicalLogDTO dto) {
        UUID userId = getLoggedInUserId();
        AnimalMedicalLog log = logMapper.toEntity(dto);

        Optional<Animal> animalOpt = animalRepository.findByIdAndUser_Id(dto.getAnimalId(), userId);

        if (animalOpt.isPresent()) {
            log.setAnimal(animalOpt.get());
            return logMapper.toDTO(animalMedicalLogRepository.save(log));
        }
        throw new RuntimeException("Animal not found or does not belong to the logged-in user");
    }

    @Override
    public Optional<AnimalMedicalLogDTO> findById(UUID id) {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.findByIdAndAnimalUserId(id, userId).map(logMapper::toDTO);
    }

    @Override
    public List<AnimalMedicalLogDTO> findAll() {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.findByAnimalUserId(userId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AnimalMedicalLogDTO> findAll(Pageable pageable) {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.findByAnimalUserId(userId, pageable)
                .map(logMapper::toDTO);
    }

    @Override
    public List<AnimalMedicalLogDTO> findByAnimalId(UUID animalId) {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.findByAnimalIdAndAnimalUserId(animalId, userId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AnimalMedicalLogDTO> findByAnimalId(UUID animalId, Pageable pageable) {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.findByAnimalIdAndAnimalUserId(animalId, userId, pageable)
                .map(logMapper::toDTO);
    }

    @Override
    public void deleteById(UUID id) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalMedicalLog> logOpt = animalMedicalLogRepository.findByIdAndAnimalUserId(id, userId);
        if (logOpt.isPresent()) {
            animalMedicalLogRepository.deleteById(id);
        } else {
            throw new RuntimeException("Log not found or does not belong to an animal owned by the logged-in user");
        }
    }

    @Override
    public AnimalMedicalLogDTO update(UUID id, AnimalMedicalLogDTO dto) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalMedicalLog> existingLogOpt = animalMedicalLogRepository.findByIdAndAnimalUserId(id, userId);

        if (!existingLogOpt.isPresent()) {
            throw new RuntimeException("Log not found or does not belong to an animal owned by the logged-in user");
        }

        Optional<Animal> animalOpt = animalRepository.findByIdAndUser_Id(dto.getAnimalId(), userId);

        if (animalOpt.isPresent()) {
            AnimalMedicalLog existingLog = existingLogOpt.get();
            existingLog.setAnimal(animalOpt.get());
            existingLog.setDescription(dto.getDescription());
            existingLog.setVetName(dto.getVetName());
            existingLog.setLogDate(dto.getLogDate());
            return logMapper.toDTO(animalMedicalLogRepository.save(existingLog));
        }
        throw new RuntimeException("Animal not found or does not belong to the logged-in user");
    }

    @Override
    public Long getLogsCount() {
        UUID userId = getLoggedInUserId();
        return animalMedicalLogRepository.countByAnimalUserId(userId);
    }
}