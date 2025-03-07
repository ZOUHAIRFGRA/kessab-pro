package uit.ac.ma.est.kessabpro.services.implementations;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAnimalIconService;
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

    @Override
    public Optional<AnimalIcon> findById(Long id) {
        return animalIconRepository.findById(id);
    }

    @Override
    public List<AnimalIcon> findAll() {
        return animalIconRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        animalIconRepository.deleteById(id);
    }

    @Override
    public AnimalIcon update(Long id, AnimalIcon animalIcon) {
        if (animalIconRepository.existsById(id)) {
            animalIcon.setId(id);
            return animalIconRepository.save(animalIcon);
        }
        return null;
    }
}
