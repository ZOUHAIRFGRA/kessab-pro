package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import uit.ac.ma.est.kessabpro.mappers.AnimalActivitiesLogMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;
import uit.ac.ma.est.kessabpro.models.entities.User;
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

    private UUID getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();
        return loggedInUser.getId();
    }

    @Override
    public AnimalActivitiesLogDTO save(AnimalActivitiesLogDTO dto) {
        UUID userId = getLoggedInUserId();
        AnimalActivitiesLog log = logMapper.toEntity(dto);

        // Verify the animal exists and belongs to the logged-in user
        Optional<Animal> animalOpt = animalRepository.findByIdAndUser_Id(dto.getAnimalId(), userId);

        if (animalOpt.isPresent()) {
            log.setAnimal(animalOpt.get());
            return logMapper.toDTO(animalActivitiesLogRepository.save(log));
        }
        throw new RuntimeException("Animal not found or does not belong to the logged-in user");
    }

    @Override
    public Optional<AnimalActivitiesLogDTO> findById(UUID id) {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.findByIdAndAnimalUserId(id, userId).map(logMapper::toDTO);
    }

    @Override
    public List<AnimalActivitiesLogDTO> findAll() {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.findByAnimalUserId(userId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AnimalActivitiesLogDTO> findAll(Pageable pageable) {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.findByAnimalUserId(userId, pageable)
                .map(logMapper::toDTO);
    }

    @Override
    public List<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId) {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.findByAnimalIdAndAnimalUserId(animalId, userId)
                .stream()
                .map(logMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AnimalActivitiesLogDTO> findByAnimalId(UUID animalId, Pageable pageable) {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.findByAnimalIdAndAnimalUserId(animalId, userId, pageable)
                .map(logMapper::toDTO);
    }

    @Override
    public void deleteById(UUID id) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalActivitiesLog> logOpt = animalActivitiesLogRepository.findByIdAndAnimalUserId(id, userId);
        if (logOpt.isPresent()) {
            animalActivitiesLogRepository.deleteById(id);
        } else {
            throw new RuntimeException("Log not found or does not belong to an animal owned by the logged-in user");
        }
    }

    @Override
    public AnimalActivitiesLogDTO update(UUID id, AnimalActivitiesLogDTO dto) {
        UUID userId = getLoggedInUserId();
        Optional<AnimalActivitiesLog> existingLogOpt = animalActivitiesLogRepository.findByIdAndAnimalUserId(id, userId);

        if (!existingLogOpt.isPresent()) {
            throw new RuntimeException("Log not found or does not belong to an animal owned by the logged-in user");
        }

        // Verify the animal exists and belongs to the logged-in user
        Optional<Animal> animalOpt = animalRepository.findByIdAndUser_Id(dto.getAnimalId(), userId);

        if (animalOpt.isPresent()) {
            AnimalActivitiesLog existingLog = existingLogOpt.get();
            existingLog.setAnimal(animalOpt.get());
            existingLog.setLogDate(dto.getLogDate());
            existingLog.setActivity(dto.getActivity());
            return logMapper.toDTO(animalActivitiesLogRepository.save(existingLog));
        }
        throw new RuntimeException("Animal not found or does not belong to the logged-in user");
    }

    @Override
    public Long getLogsCount() {
        UUID userId = getLoggedInUserId();
        return animalActivitiesLogRepository.countByAnimalUserId(userId);
    }
}