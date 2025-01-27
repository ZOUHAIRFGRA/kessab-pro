package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;
import uit.ac.ma.est.kessabpro.repositories.AnimalActivitiesLogRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalActivitiesLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalActivitiesLogService implements IAnimalActivitiesLogService {

    @Autowired
    private AnimalActivitiesLogRepository animalActivitiesLogRepository;

    @Override
    public AnimalActivitiesLog save(AnimalActivitiesLog animalActivitiesLog) {
        return animalActivitiesLogRepository.save(animalActivitiesLog);
    }

    @Override
    public Optional<AnimalActivitiesLog> findById(UUID id) {
        return animalActivitiesLogRepository.findById(id);
    }

    @Override
    public List<AnimalActivitiesLog> findAll() {
        return animalActivitiesLogRepository.findAll();
    }

    @Override
    public List<AnimalActivitiesLog> findByAnimalId(UUID animalId) {
        return animalActivitiesLogRepository.findByAnimalId(animalId);
    }

    @Override
    public void deleteById(UUID id) {
        animalActivitiesLogRepository.deleteById(id);
    }

    @Override
    public AnimalActivitiesLog update(UUID id, AnimalActivitiesLog animalActivitiesLog) {
        Optional<AnimalActivitiesLog> existingLogOptional = animalActivitiesLogRepository.findById(id);

        if (existingLogOptional.isPresent()) {
            AnimalActivitiesLog existingLog = existingLogOptional.get();

            // Update fields of the existing log
            existingLog.setLogDate(animalActivitiesLog.getLogDate());  // Ensure Lombok generates this getter/setter
            existingLog.setActivity(animalActivitiesLog.getActivity());  // Ensure Lombok generates this getter/setter

            // Save the updated entity
            return animalActivitiesLogRepository.save(existingLog);
        }
        return null; // Or throw an exception
    }


}
