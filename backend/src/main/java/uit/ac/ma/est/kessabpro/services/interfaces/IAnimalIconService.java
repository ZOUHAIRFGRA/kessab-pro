package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;

import java.util.List;
import java.util.Optional;

public interface IAnimalIconService {

    AnimalIcon save(AnimalIcon animalIcon);

    Optional<AnimalIcon> findById(Long id);

    List<AnimalIcon> findAll();

    void deleteById(Long id);

    AnimalIcon update(Long id, AnimalIcon animalIcon);
}
