package uit.ac.ma.est.kessabpro.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import uit.ac.ma.est.kessabpro.helpers.UploadHelper;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnimalDTO> createAnimal(@ModelAttribute AnimalDTO animalDTO) throws IOException {
        Animal animal = AnimalMapper.toEntity(animalDTO);

        if (animalDTO.isImagesExists()) {
            UploadHelper.createDirIfNotExist(UploadHelper.ANIMAL_IMAGES_UPLOAD_DIR);

            List<String> uploadedImagePaths = animalService.uploadAnimalImages(animal.getTag(), animalDTO.getImages());

            animal.setImagePaths(uploadedImagePaths);
        }

        Animal createdAnimal = animalService.createAnimal(animal);

        AnimalDTO createdAnimalDTO = AnimalMapper.toDTO(createdAnimal);
        return new ResponseEntity<>(createdAnimalDTO, HttpStatus.CREATED);
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
}
