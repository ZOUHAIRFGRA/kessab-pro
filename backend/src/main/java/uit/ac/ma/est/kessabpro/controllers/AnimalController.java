package uit.ac.ma.est.kessabpro.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalCategoryService;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private AnimalCategoryService animalCategoryService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAnimal(@ModelAttribute AnimalDTO animalDTO) {
        try {

            if (animalDTO.getTag() == null || animalDTO.getSex() == null || animalDTO.getBirthDate() == null ||
                    animalDTO.getPrice() == null || animalDTO.getWeight() == null || animalDTO.getCategory() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("❌ Missing required fields! Please check all fields.");
            }

            UUID categoryId;
            try {
                categoryId = UUID.fromString(animalDTO.getCategory());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("❌ Invalid category ID format!");
            }

            AnimalCategory category = animalCategoryService.getCategoryById(categoryId)
                    .orElseThrow(() -> new RuntimeException("❌ Category not found for ID: " + categoryId));


            Animal animal = AnimalMapper.toEntity(animalDTO);
            animal.setCategory(category);

            if (animalDTO.isImagesExists()) {
                UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);
                List<String> uploadedImagePaths = animalService.uploadAnimalImages(animalDTO.getTag(), animalDTO.getImages());
                animal.setImagePaths(uploadedImagePaths);
//                System.out.println("✅ Images uploaded: " + uploadedImagePaths);
            } else {
                System.out.println("⚠️ No images provided.");
            }

            Animal createdAnimal = animalService.createAnimal(animal);
            AnimalDTO createdAnimalDTO = AnimalMapper.toDTO(createdAnimal);

            return new ResponseEntity<>(createdAnimalDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.err.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Internal Server Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalDTO> getAnimalById(@PathVariable UUID id) {
        Optional<Animal> animal = animalService.getAnimalById(id);
        return animal.map(a -> ResponseEntity.ok(AnimalMapper.toDTO(a)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<AnimalDTO>> getAllAnimals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "tag") String filterType) {

        Page<Animal> animals = animalService.getAllAnimals(page, size, search, filterType);

        Page<AnimalDTO> animalDTOPage = animals.map(AnimalMapper::toDTO);

        return ResponseEntity.ok(animalDTOPage);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnimalDTO> updateAnimal(@PathVariable UUID id, @ModelAttribute AnimalDTO animalDTO) {
        try {
            if (animalDTO.getTag() == null || animalDTO.getSex() == null || animalDTO.getBirthDate() == null ||
                    animalDTO.getPrice() == null || animalDTO.getWeight() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            AnimalCategory category = null;
            if (animalDTO.getCategory() != null) {
                UUID categoryId;
                try {
                    categoryId = UUID.fromString(animalDTO.getCategory());
                    category = animalCategoryService.getCategoryById(categoryId)
                            .orElseThrow(() -> new RuntimeException("❌ Category not found for ID: " + categoryId));
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
                }
            }

            Optional<Animal> existingAnimalOpt = animalService.getAnimalById(id);
            if (!existingAnimalOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            Animal existingAnimal = existingAnimalOpt.get();

            Animal animal = AnimalMapper.toEntity(animalDTO);
            animal.setCategory(category);
            List<String> currentImagePaths = existingAnimal.getImagePaths() != null ?
                    new ArrayList<>(existingAnimal.getImagePaths()) : new ArrayList<>();
            System.out.println("Initial currentImagePaths from DB: " + currentImagePaths);

            if (animalDTO.isImagesExists()) {
                UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);
                List<String> uploadedImagePaths = animalService.uploadAnimalImages(animalDTO.getTag(), animalDTO.getImages());
                System.out.println("Uploaded imagePaths: " + uploadedImagePaths);
                currentImagePaths.addAll(uploadedImagePaths);
            }

            List<String> imagesToDelete = animalDTO.getImagesToDelete();
            if (imagesToDelete != null && !imagesToDelete.isEmpty()) {
                System.out.println("Images to delete from FormData: " + imagesToDelete);
                animalService.deleteAnimalImages(imagesToDelete);
                currentImagePaths.removeAll(imagesToDelete);
                System.out.println("After applying deletions: " + currentImagePaths);
            }

            // Existing imagePaths handling (unchanged for this fix)
            if (animalDTO.getImagePaths() != null && !animalDTO.getImagePaths().isEmpty()) {
                String imagePathsRaw = animalDTO.getImagePaths().get(0);
                System.out.println("Raw imagePaths from FormData: " + imagePathsRaw);
                try {
                    Object rawParsed = objectMapper.readValue(imagePathsRaw, Object.class);
                    List<String> submittedImagePaths;
                    if (rawParsed instanceof List && !((List<?>) rawParsed).isEmpty() && ((List<?>) rawParsed).get(0) instanceof List) {
                        submittedImagePaths = objectMapper.convertValue(((List<?>) rawParsed).get(0), List.class);
                    } else if (rawParsed instanceof List) {
                        submittedImagePaths = objectMapper.convertValue(rawParsed, List.class);
                    } else {
                        throw new JsonProcessingException("Invalid imagePaths format") {};
                    }
                    System.out.println("Parsed imagePaths: " + submittedImagePaths);
                    currentImagePaths.clear();
                    currentImagePaths.addAll(submittedImagePaths);
                    if (imagesToDelete != null) {
                        currentImagePaths.removeAll(imagesToDelete);
                    }
                    System.out.println("After applying submitted imagePaths and deletions: " + currentImagePaths);
                } catch (JsonProcessingException e) {
                    System.out.println("Note: imagePaths parsing skipped (using fallback): " + currentImagePaths);                    System.out.println("Using currentImagePaths with deletions applied: " + currentImagePaths);
                }
            }

            animal.setImagePaths(currentImagePaths);
            System.out.println("Final imagePaths set on animal: " + currentImagePaths);

            Animal updatedAnimal = animalService.updateAnimal(id, animal);
            if (updatedAnimal == null) {
                return ResponseEntity.notFound().build();
            }

            AnimalDTO updatedAnimalDTO = AnimalMapper.toDTO(updatedAnimal);
            System.out.println("Updated animal DTO: " + updatedAnimalDTO);
            return ResponseEntity.ok(updatedAnimalDTO);

        } catch (RuntimeException e) {
            System.err.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            System.err.println("❌ Internal Server Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable UUID id) {
        return animalService.deleteAnimal(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/by-sale/{saleId}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsBySaleId(@PathVariable UUID saleId) {
        List<Animal> animals = animalService.getAnimalsBySaleId(saleId);
        List<AnimalDTO> animalDTOs = animals.stream().map(AnimalMapper::toDTO).toList();
        return ResponseEntity.ok(animalDTOs);
    }

    @GetMapping("/by-buyer/{buyerId}")
    public ResponseEntity<List<AnimalDTO>> getAnimalsByBuyerId(@PathVariable UUID buyerId) {
        List<Animal> animals = animalService.getAnimalsByBuyerId(buyerId);
        List<AnimalDTO> animalDTOs = animals.stream().map(AnimalMapper::toDTO).toList();
        return ResponseEntity.ok(animalDTOs);
    }

    @GetMapping("/unsold")
    public ResponseEntity<List<Animal>> getUnsoldAnimals() {
        return ResponseEntity.ok(animalService.getUnsoldAnimals());
    }

}
