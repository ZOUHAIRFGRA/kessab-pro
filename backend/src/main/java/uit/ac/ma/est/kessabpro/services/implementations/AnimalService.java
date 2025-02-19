package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.IAnimalService;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalService implements IAnimalService {

    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @Override
    public Page<Animal> getAllAnimals(int page, int size, String search, String filterType) {
        Pageable pageable = PageRequest.of(page, size);

        if (search != null && search.length() > 3) {
            switch (filterType) {
                case "tag":
                    return animalRepository.findByTagContainingIgnoreCase(search, pageable);
                case "category":
                    return animalRepository.findByCategory_TypeNameContainingIgnoreCase(search, pageable);
                case "weight":
                    try {
                        return animalRepository.findByWeight(new BigDecimal(search), pageable);
                    } catch (NumberFormatException e) {
                        return Page.empty();
                    }
                case "sex":
                    return animalRepository.findBySexIgnoreCase(search, pageable);
            }
        }

        return animalRepository.findAll(pageable);
    }

    @Override
    public Optional<Animal> getAnimalById(UUID id) {
        return animalRepository.findById(id);
    }

    @Override
    public Animal createAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    @Override
    public Animal updateAnimal(UUID id, Animal animal) {
        if (animalRepository.existsById(id)) {
            animal.setId(id);
            return animalRepository.save(animal);
        }
        return null;
    }

    @Override
    public boolean deleteAnimal(UUID id) {
        if (animalRepository.existsById(id)) {
            animalRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<String> uploadAnimalImages(String animalTag, List<MultipartFile> images) throws IOException {
        List<String> animalImages = new ArrayList<>();
        UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);
        for (MultipartFile file : images) {
            String fileName = UploadHelper.getCustomFileName(animalTag, file);
            File image = new File(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR, fileName);
            file.transferTo(image);
            animalImages.add("/uploads/animals/" + fileName);
        }
        return animalImages;
    }


    @Override
    public List<Animal> getAnimalsBySaleId(UUID saleId) {
        return animalRepository.findBySale_Id(saleId);
    }

    @Override
    public List<Animal> getAnimalsByBuyerId(UUID buyerId) {
        return animalRepository.findBySale_Buyer_Id(buyerId);
    }

}
