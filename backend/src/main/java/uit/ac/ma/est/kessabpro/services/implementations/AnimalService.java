package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.web.multipart.MultipartFile;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalService;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalService implements IAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Override
    public Animal createAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    @Override
    public Optional<Animal> getAnimalById(UUID id) {
        return animalRepository.findById(id);
    }

    @Override
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }



    @Override
    public Animal updateAnimal(UUID id, Animal animal) {
        if (animalRepository.existsById(id)) {
            animal.setId(id);
            return animalRepository.save(animal);
        } else {
            return null; // or throw exception
        }
    }

    @Override
    public boolean deleteAnimal(UUID id) {
        if (animalRepository.existsById(id)) {
            animalRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<String> uploadAnimalImages(String animalTag, List<MultipartFile> images) throws IOException {
        List<String> animalImages = new ArrayList<>();

        // ✅ Ensure the uploads directory exists
        UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);

        for (MultipartFile file : images) {
            String fileName = UploadHelper.getCustomFileName(animalTag, file);
            File image = new File(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR, fileName); // ✅ Safe file path creation
            file.transferTo(image);
            animalImages.add("/uploads/animals/" + fileName); // ✅ Return relative path for frontend usage
        }

        return animalImages;
    }


}
