package uit.ac.ma.est.kessabpro.services.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import uit.ac.ma.est.kessabpro.models.entities.Animal;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAnimalService {
    Page<Animal> getAllAnimals(int page, int size, String search, String filterType);

    Optional<Animal> getAnimalById(UUID id);

    Animal createAnimal(Animal animal);

    Animal updateAnimal(UUID id, Animal animal);

    List<Animal> getUnsoldAnimals();

    Long getAnimalsCount();

    // New method to delete images
    void deleteAnimalImages(List<String> imagesToDelete);

    boolean deleteAnimal(UUID id);

    List<Animal> getAnimalsBySaleId(UUID saleId);
    List<Animal> getAnimalsByBuyerId(UUID buyerId);

    List<String> uploadAnimalImages(String animalTag, List<MultipartFile> images) throws IOException;
}
