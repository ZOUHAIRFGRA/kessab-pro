package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalIconService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalIconService implements IAnimalIconService {

    @Autowired
    private AnimalIconRepository animalIconRepository;

    @Override
    public AnimalIcon save(AnimalIcon animalIcon) {
        return animalIconRepository.save(animalIcon);
    }

    // Modify the findById method to use Long instead of UUID
    @Override
    public Optional<AnimalIcon> findById(Long id) {
        return animalIconRepository.findById(id);  // Accept Long here
    }

    @Override
    public List<AnimalIcon> findAll() {
        return animalIconRepository.findAll();
    }

    // Modify deleteById to use Long instead of UUID
    @Override
    public void deleteById(Long id) {
        animalIconRepository.deleteById(id);  // Accept Long here
    }

    // Modify update to use Long instead of UUID
    @Override
    public AnimalIcon update(Long id, AnimalIcon animalIcon) {
        if (animalIconRepository.existsById(id)) {
            animalIcon.setId(id);  // Set Long ID here
            return animalIconRepository.save(animalIcon);
        }
        return null; // Or throw an exception
    }
}
