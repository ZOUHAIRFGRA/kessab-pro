package uit.ac.ma.est.kessabpro.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.io.IOException;
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

    @PutMapping("/{id}")
    public ResponseEntity<AnimalDTO> updateAnimal(@PathVariable UUID id, @RequestBody AnimalDTO animalDTO) throws JsonProcessingException {
        Animal animal = AnimalMapper.toEntity(animalDTO);

        Animal updatedAnimal = animalService.updateAnimal(id, animal);
        return updatedAnimal != null ? ResponseEntity.ok(AnimalMapper.toDTO(updatedAnimal)) : ResponseEntity.notFound().build();
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

}
