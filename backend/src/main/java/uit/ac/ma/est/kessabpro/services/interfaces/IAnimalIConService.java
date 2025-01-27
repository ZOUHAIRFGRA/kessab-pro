package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;

import java.util.List;
import java.util.Optional;

public interface IAnimalIconService {

    AnimalIcon save(AnimalIcon animalIcon);

    // Use Long instead of UUID for findById
    Optional<AnimalIcon> findById(Long id);

    List<AnimalIcon> findAll();

    // Use Long instead of UUID for deleteById
    void deleteById(Long id);

    // Use Long instead of UUID for update
    AnimalIcon update(Long id, AnimalIcon animalIcon);
}
