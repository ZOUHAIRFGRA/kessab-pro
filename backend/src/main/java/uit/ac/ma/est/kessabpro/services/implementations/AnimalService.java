package uit.ac.ma.est.kessabpro.services.implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
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
    private static final String UPLOADS_DIR = UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR;


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
    public Long getAnimalsCount() {
        UUID userId = getLoggedInUserId();
        return Long.valueOf(animalRepository.countByUser_Id(userId));
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
                    existingAnimal.setTag(animal.getTag());
                    existingAnimal.setSex(animal.getSex());
                    existingAnimal.setBirthDate(animal.getBirthDate());
                    existingAnimal.setPrice(animal.getPrice());
                    existingAnimal.setWeight(animal.getWeight());
                    existingAnimal.setCategory(animal.getCategory());

                    // Directly set the provided imagePaths, no merging or appending
                    if (animal.getImagePaths() != null) {
                        try {
                            existingAnimal.setImagePaths(new ArrayList<>(animal.getImagePaths()));
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                        System.out.println("Service: Setting imagePaths to: " + animal.getImagePaths());
                    } else {
                        System.out.println("Service: No new imagePaths provided, keeping existing: " + existingAnimal.getImagePaths());
                    }

                    return animalRepository.save(existingAnimal);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public boolean deleteAnimal(UUID id) {
        UUID userId = getLoggedInUserId();

        Optional<Animal> animalOpt = animalRepository.findById(id)
                .filter(animal -> animal.getUser().getId().equals(userId));

        if (!animalOpt.isPresent()) {
            System.out.println("Animal with ID " + id + " not found or does not belong to user " + userId);
            return false;
        }

        Animal animal = animalOpt.get();

        List<String> imagePaths = animal.getImagePaths();
        if (imagePaths != null && !imagePaths.isEmpty()) {
            System.out.println("Processing images for animal: " + id);
            List<String> imagesToDelete = imagePaths.stream()
                    .filter(path -> path.startsWith("/uploads/animals/"))
                    .toList();
            if (!imagesToDelete.isEmpty()) {
                System.out.println("Deleting uploaded images: " + imagesToDelete);
                deleteAnimalImages(imagesToDelete);
            } else {
                System.out.println("No uploaded images to delete (only seeded images present).");
            }
        } else {
            System.out.println("No images to process for animal: " + id);
        }

        // Delete the animal (JPA cascade will handle AnimalActivitiesLog and AnimalMedicalLog)
        animalRepository.delete(animal);
        System.out.println("Successfully deleted animal with ID " + id + " and its associated logs");
        return true;
    }

    @Override
    public void deleteAnimalImages(List<String> imagesToDelete) {
        if (imagesToDelete == null || imagesToDelete.isEmpty()) {
            System.out.println("No images to delete provided.");
            return;
        }

        for (String imagePath : imagesToDelete) {
            // skip imgs used in seeding or not uploaded
            if (imagePath == null || !imagePath.startsWith("/uploads/animals/")) {
                System.err.println("❌ Skipping invalid or non-uploaded image path: " + imagePath);
                continue;
            }

            String fileName = imagePath.split("/uploads/animals/")[1];
            String fullPath = UPLOADS_DIR + File.separator + fileName;
            File file = new File(fullPath);

            System.out.println("Attempting to delete file: " + fullPath);
            System.out.println("Upload dir: " + UPLOADS_DIR);
            System.out.println("File name: " + fileName);

            if (file.exists()) {
                if (file.delete()) {
                    System.out.println("✅ Successfully deleted image: " + imagePath);
                } else {
                    System.err.println("❌ Failed to delete image (delete failed): " + imagePath);
                }
            } else {
                System.err.println("❌ File does not exist: " + fullPath);
            }
        }
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
        return animalRepository.findByUser_IdAndSaleNull(userId);
    }



}
