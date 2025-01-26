package uit.ac.ma.est.kessabpro.services.interfaces;

import uit.ac.ma.est.kessabpro.models.entities.Animal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalService {
    Animal createAnimal(Animal animal);
    Optional<Animal> getAnimalById(UUID id);
    List<Animal> getAllAnimals();
    Animal updateAnimal(UUID id, Animal animal);
    boolean deleteAnimal(UUID id);
}
