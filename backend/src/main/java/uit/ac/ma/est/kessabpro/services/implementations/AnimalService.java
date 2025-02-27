package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
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

    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;


    public AnimalService(UserRepository userRepository, AnimalRepository animalRepository) {
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
    }

    private UUID getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();
        return loggedInUser.getId();
    }

    @Override
    public Page<Animal> getAllAnimals(int page, int size, String search, String filterType) {
        Pageable pageable = PageRequest.of(page, size);
        UUID userId = getLoggedInUserId();

        if (search != null && search.length() > 3) {
            switch (filterType) {
                case "tag":
                    return animalRepository.findByUser_IdAndTagContainingIgnoreCase(userId, search, pageable);
                case "category":
                    return animalRepository.findByUser_IdAndCategory_TypeNameContainingIgnoreCase(userId, search, pageable);
                case "weight":
                    try {
                        return animalRepository.findByUser_IdAndWeight(userId, new BigDecimal(search), pageable);
                    } catch (NumberFormatException e) {
                        return Page.empty();
                    }
                case "sex":
                    return animalRepository.findByUser_IdAndSexIgnoreCase(userId, search, pageable);
            }
        }

        return animalRepository.findByUser_Id(userId, pageable);
    }

    @Override
    public Optional<Animal> getAnimalById(UUID id) {
        UUID userId = getLoggedInUserId();
        return animalRepository.findById(id).filter(animal -> animal.getUser().getId().equals(userId));
    }

    @Override
    public Animal createAnimal(Animal animal) {
        UUID userId = getLoggedInUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        animal.setUser(user); // Set the logged-in user as the owner
        return animalRepository.save(animal);
    }

    @Override
    public Animal updateAnimal(UUID id, Animal animal) {
        UUID userId = getLoggedInUserId();

        return animalRepository.findById(id)
                .filter(existingAnimal -> existingAnimal.getUser().getId().equals(userId))
                .map(existingAnimal -> {
                    animal.setId(id);
                    animal.setUser(existingAnimal.getUser());
                    return animalRepository.save(animal);
                })
                .orElse(null);
    }

    @Override
    public boolean deleteAnimal(UUID id) {
        UUID userId = getLoggedInUserId();

        return animalRepository.findById(id)
                .filter(animal -> animal.getUser().getId().equals(userId))
                .map(animal -> {
                    animalRepository.deleteById(id);
                    return true;
                })
                .orElse(false);
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
        UUID userId = getLoggedInUserId();
        return animalRepository.findByUser_IdAndSale_Id(userId, saleId);
    }

    @Override
    public List<Animal> getAnimalsByBuyerId(UUID buyerId) {
        UUID userId = getLoggedInUserId();
        return animalRepository.findByUser_IdAndSale_Buyer_Id(userId, buyerId);
    }


    @Override
    public List<Animal> getUnsoldAnimals() {
        UUID userId = getLoggedInUserId();
        return animalRepository.findByUser_IdAndPickUpDateNull(userId);
    }

}
