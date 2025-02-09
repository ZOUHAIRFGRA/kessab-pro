package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;
import uit.ac.ma.est.kessabpro.repositories.AnimalMedicalLogRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalMedicalLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalMedicalLogService implements IAnimalMedicalLogService {

    @Autowired
    private AnimalMedicalLogRepository animalMedicalLogRepository;

    @Override
    public AnimalMedicalLog save(AnimalMedicalLog animalMedicalLog) {
        return animalMedicalLogRepository.save(animalMedicalLog);
    }

    @Override
    public Optional<AnimalMedicalLog> findById(UUID id) {
        return animalMedicalLogRepository.findById(id);
    }

    @Override
    public List<AnimalMedicalLog> findAll() {
        return animalMedicalLogRepository.findAll();
    }

    @Override
    public List<AnimalMedicalLog> findByAnimalId(UUID animalId) {
        return animalMedicalLogRepository.findByAnimalId(animalId);
    }

    @Override
    public void deleteById(UUID id) {
        animalMedicalLogRepository.deleteById(id);
    }

    @Override
    public AnimalMedicalLog update(UUID id, AnimalMedicalLog animalMedicalLog) {
        if (animalMedicalLogRepository.existsById(id)) {
            animalMedicalLog.setId(id);
            return animalMedicalLogRepository.save(animalMedicalLog);
        }
        return null;
    }
}
